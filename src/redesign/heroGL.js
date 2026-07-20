/**
 * Custom WebGL slideshow for the Arena hero.
 *
 * A single fullscreen quad renders two photo textures and dissolves between
 * them through a procedural-noise displacement field. On top of the
 * transition the shader adds:
 *   - a pointer ripple (radial wave that follows the cursor and decays)
 *   - a scroll-velocity warp with chromatic splitting, so fast scrolling
 *     physically "drags" the image
 *
 * No three.js dependency — the whole effect is ~1 quad + 1 program, so raw
 * WebGL keeps the bundle small and the frame loop fully under our control.
 * The loop pauses when the hero leaves the viewport or the tab is hidden.
 */

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const FRAG = `
precision highp float;

varying vec2 v_uv;

uniform sampler2D u_tex0;
uniform sampler2D u_tex1;
uniform vec2  u_res;      /* canvas px */
uniform vec2  u_img0;     /* texture0 natural px */
uniform vec2  u_img1;     /* texture1 natural px */
uniform float u_progress; /* 0 → 1 transition */
uniform float u_time;
uniform vec2  u_mouse;        /* uv space */
uniform float u_mouseForce;   /* 0..1, decays */
uniform float u_velocity;     /* scroll velocity, signed, ~[-1,1] */

/* hash + value noise */
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

/* object-fit: cover */
vec2 coverUv(vec2 uv, vec2 canvas, vec2 img) {
  float ca = canvas.x / canvas.y;
  float ia = img.x / img.y;
  vec2 s = (ca > ia) ? vec2(1.0, ia / ca) : vec2(ca / ia, 1.0);
  return (uv - 0.5) * s + 0.5;
}

void main() {
  vec2 uv = v_uv;
  float aspect = u_res.x / u_res.y;

  /* ---- pointer ripple ---- */
  vec2 m = (uv - u_mouse) * vec2(aspect, 1.0);
  float d = length(m);
  float ripple = sin(d * 34.0 - u_time * 5.0) * exp(-d * 5.5) * u_mouseForce;
  uv += normalize(m + 1e-6) * ripple * 0.012;

  /* ---- scroll velocity warp ---- */
  float vel = clamp(u_velocity, -1.0, 1.0);
  uv.y += vel * 0.045 * sin(uv.x * 3.1415);

  /* ---- displacement transition ---- */
  float p = u_progress;
  float n = noise(uv * 4.0 + u_time * 0.06);
  vec2 disp = vec2(n - 0.5, n - 0.5);

  vec2 uvA = uv + disp * 0.35 * p;
  vec2 uvB = uv - disp * 0.35 * (1.0 - p);

  vec2 cA = coverUv(uvA, u_res, u_img0);
  vec2 cB = coverUv(uvB, u_res, u_img1);

  /* chromatic split scales with motion energy */
  float energy = abs(vel) * 0.6 + p * (1.0 - p) * 1.4 + abs(ripple) * 2.0;
  vec2 shift = vec2(0.0035, 0.0) * energy / max(0.25, 1.0);

  vec4 a = vec4(
    texture2D(u_tex0, cA + shift).r,
    texture2D(u_tex0, cA).g,
    texture2D(u_tex0, cA - shift).b,
    1.0
  );
  vec4 b = vec4(
    texture2D(u_tex1, cB + shift).r,
    texture2D(u_tex1, cB).g,
    texture2D(u_tex1, cB - shift).b,
    1.0
  );

  /* noise-shaped mix edge so the dissolve sweeps organically */
  float mixer = smoothstep(0.0, 1.0, p + (n - 0.5) * 0.35 * (1.0 - abs(2.0 * p - 1.0)));
  vec4 color = mix(a, b, clamp(mixer, 0.0, 1.0));

  /* gentle vignette grounds the type */
  float vig = smoothstep(1.25, 0.45, length((v_uv - 0.5) * vec2(aspect, 1.0)));
  color.rgb *= mix(0.72, 1.0, vig);

  gl_FragColor = color;
}
`

function compile(gl, type, src) {
  const sh = gl.createShader(type)
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error('heroGL shader error:', gl.getShaderInfoLog(sh))
    gl.deleteShader(sh)
    return null
  }
  return sh
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export function createHeroGL(canvas, urls, { interval = 6000, transition = 1700, onReady } = {}) {
  const gl = canvas.getContext('webgl', {
    antialias: false,
    alpha: false,
    depth: false,
    stencil: false,
    powerPreference: 'high-performance',
  })
  if (!gl) return null

  const vs = compile(gl, gl.VERTEX_SHADER, VERT)
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
  if (!vs || !fs) return null

  const prog = gl.createProgram()
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('heroGL link error:', gl.getProgramInfoLog(prog))
    return null
  }
  gl.useProgram(prog)

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const aPos = gl.getAttribLocation(prog, 'a_pos')
  gl.enableVertexAttribArray(aPos)
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

  const U = {}
  for (const name of ['u_tex0', 'u_tex1', 'u_res', 'u_img0', 'u_img1', 'u_progress', 'u_time', 'u_mouse', 'u_mouseForce', 'u_velocity']) {
    U[name] = gl.getUniformLocation(prog, name)
  }
  gl.uniform1i(U.u_tex0, 0)
  gl.uniform1i(U.u_tex1, 1)

  /* ---- state ---- */
  const textures = []          // { tex, w, h }
  let current = 0
  let next = 1
  let progress = 0
  let transitioning = false
  let transitionStart = 0
  let lastSwitch = performance.now()
  let mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }
  let mouseForce = 0
  let velocity = 0
  let velocityTarget = 0
  let raf = 0
  let running = false
  let destroyed = false
  let readyFired = false

  function makeTexture(img) {
    const tex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    return { tex, w: img.naturalWidth, h: img.naturalHeight }
  }

  // Load sequentially-ish: first image ASAP (fires onReady), rest in background.
  urls.forEach((url, i) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => {
      if (destroyed) return
      textures[i] = makeTexture(img)
      if (i === 0 && !readyFired) {
        readyFired = true
        onReady?.()
      }
    }
    img.src = url
  })

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
    const w = Math.round(canvas.clientWidth * dpr)
    const h = Math.round(canvas.clientHeight * dpr)
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
      gl.viewport(0, 0, w, h)
    }
  }
  const ro = new ResizeObserver(resize)
  ro.observe(canvas)

  function frame(now) {
    if (!running || destroyed) return
    raf = requestAnimationFrame(frame)

    const a = textures[current]
    if (!a) return
    const b = textures[next] || a

    // auto-advance
    if (!transitioning && textures.length > 1 && now - lastSwitch > interval && textures[next]) {
      transitioning = true
      transitionStart = now
    }
    if (transitioning) {
      const t = Math.min(1, (now - transitionStart) / transition)
      progress = easeInOutCubic(t)
      if (t >= 1) {
        transitioning = false
        progress = 0
        current = next
        next = (next + 1) % urls.length
        lastSwitch = now
      }
    }

    // smooth pointer + decay
    mouse.x += (mouse.tx - mouse.x) * 0.08
    mouse.y += (mouse.ty - mouse.y) * 0.08
    mouseForce *= 0.94
    velocity += (velocityTarget - velocity) * 0.08
    velocityTarget *= 0.9

    resize()
    const curTex = transitioning || progress > 0 ? textures[current] : a
    const nxtTex = b

    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, curTex.tex)
    gl.activeTexture(gl.TEXTURE1)
    gl.bindTexture(gl.TEXTURE_2D, nxtTex.tex)

    gl.uniform2f(U.u_res, canvas.width, canvas.height)
    gl.uniform2f(U.u_img0, curTex.w, curTex.h)
    gl.uniform2f(U.u_img1, nxtTex.w, nxtTex.h)
    gl.uniform1f(U.u_progress, progress)
    gl.uniform1f(U.u_time, now / 1000)
    gl.uniform2f(U.u_mouse, mouse.x, 1.0 - mouse.y)
    gl.uniform1f(U.u_mouseForce, mouseForce)
    gl.uniform1f(U.u_velocity, velocity)

    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  return {
    start() {
      if (running || destroyed) return
      running = true
      lastSwitch = performance.now()
      raf = requestAnimationFrame(frame)
    },
    stop() {
      running = false
      cancelAnimationFrame(raf)
    },
    pointer(x, y) {
      // x, y in [0,1] relative to canvas
      mouse.tx = x
      mouse.ty = y
      mouseForce = Math.min(1, mouseForce + 0.12)
    },
    scrollVelocity(v) {
      velocityTarget = Math.max(-1, Math.min(1, v))
    },
    destroy() {
      destroyed = true
      running = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      textures.forEach((t) => t && gl.deleteTexture(t.tex))
      gl.deleteProgram(prog)
      gl.deleteBuffer(buf)
    },
  }
}
