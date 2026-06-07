import { useState } from 'react'
import { MapPin, Clock } from 'lucide-react'
import { locations } from '../../data/liabahData'
import { ISRAEL_PATH, VIEWBOX_W, VIEWBOX_H, project } from '../../data/israelOutline'
import { SectionBg, SectionHeading } from './shared'

export default function LiabahMap() {
  const [active, setActive] = useState(null)

  return (
    <section
      id="liabah-map"
      dir="rtl"
      className="relative w-full overflow-hidden bg-[#ffffff]"
    >
      <SectionBg watermark={false} />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading title="איפה אנחנו פועלים" subtitle="קבוצות ליבה ברחבי הארץ" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center pb-24">
          {/* Map */}
          <div className="order-2 lg:order-1 flex justify-center">
            <div
              className="relative w-[230px] sm:w-[300px]"
              style={{ aspectRatio: `${VIEWBOX_W} / ${VIEWBOX_H}` }}
            >
              <svg
                viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
                className="w-full h-full overflow-visible"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d={ISRAEL_PATH}
                  fill="#000032"
                  fillOpacity="0.06"
                  stroke="#000032"
                  strokeOpacity="0.22"
                  strokeWidth="6"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Pins — positioned by real geographic projection */}
              {locations.map((loc) => {
                const isActive = active === loc.id
                const { x, y } = project(loc.lng, loc.lat)
                return (
                  <button
                    key={loc.id}
                    onMouseEnter={() => setActive(loc.id)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(loc.id)}
                    onBlur={() => setActive(null)}
                    aria-label={`${loc.region} · ${loc.city}`}
                    className="absolute"
                    style={{
                      left: `${(x / VIEWBOX_W) * 100}%`,
                      top: `${(y / VIEWBOX_H) * 100}%`,
                      transform: 'translate(-50%, -100%)',
                    }}
                  >
                    <MapPin
                      size={isActive ? 30 : 22}
                      className="text-[#ff8714] drop-shadow transition-all duration-200"
                      fill={isActive ? '#ff8714' : '#ffffff'}
                      strokeWidth={2}
                    />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Locations list */}
          <div className="order-1 lg:order-2 flex flex-col gap-3">
            {locations.map((loc) => {
              const isActive = active === loc.id
              return (
                <div
                  key={loc.id}
                  onMouseEnter={() => setActive(loc.id)}
                  onMouseLeave={() => setActive(null)}
                  className={`rounded-xl border p-4 transition-all duration-200 ${
                    isActive ? 'border-[#ff8714] bg-[#ff8714]/[0.04] shadow-sm' : 'border-[#000032]/8 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-[#ff8714] shrink-0" />
                    <h3 className="font-heebo font-bold text-[#000032]">{loc.region}</h3>
                    <span className="font-heebo text-[#000032]/50 text-sm">· {loc.city}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 pr-1">
                    <Clock size={15} className="text-[#000032]/40 shrink-0" />
                    <span className="font-heebo text-[#000032]/60 text-sm">{loc.hours}</span>
                  </div>
                </div>
              )
            })}
            <p className="font-heebo text-[#000032]/45 text-sm mt-2">
              לא מצאתם קבוצה באזורכם? השאירו פרטים ונעדכן אתכם בפתיחת קבוצה קרובה.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
