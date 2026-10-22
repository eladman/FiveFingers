import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Lecture-feedback links are /f/<code>; Vercel rewrites them to feedback.html
// (vercel.json). Mirror that in dev + preview so the QR flow works locally.
const feedbackRewrite = {
  name: 'feedback-rewrite',
  configureServer(server) {
    server.middlewares.use(rewrite)
  },
  configurePreviewServer(server) {
    server.middlewares.use(rewrite)
  },
}
function rewrite(req, _res, next) {
  if (/^\/f\/[a-z0-9]+\/?(\?.*)?$/i.test(req.url)) req.url = '/feedback.html'
  else if (/^\/lectures\/?(\?.*)?$/.test(req.url)) req.url = req.url.replace(/^\/lectures\/?/, '/lectures.html')
  next()
}

export default defineConfig({
  plugins: [react(), feedbackRewrite],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
        feedback: resolve(__dirname, 'feedback.html'),
        lectures: resolve(__dirname, 'lectures.html'),
      },
    },
  },
})
