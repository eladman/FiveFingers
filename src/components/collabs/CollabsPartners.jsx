import { SectionBg, SectionHeading } from '../liabah/shared'
import useReveal from '../../hooks/useReveal'

// Partner logos extracted from the catalog's closing page.
const PARTNERS = [
  { src: '/partners/idf.webp', name: 'צה״ל' },
  { src: '/partners/defense.webp', name: 'משרד הביטחון' },
  { src: '/partners/education.webp', name: 'משרד החינוך' },
  { src: '/partners/reichman.webp', name: 'אוניברסיטת רייכמן' },
  { src: '/partners/herzliya.webp', name: 'עיריית הרצליה' },
  { src: '/partners/tel-aviv-yafo.webp', name: 'עיריית תל אביב-יפו' },
  { src: '/partners/tzofim.webp', name: 'תנועת הצופים' },
  { src: '/partners/bnei-akiva.webp', name: 'בני עקיבא' },
  { src: '/partners/branco-weiss.webp', name: 'מכון ברנקו וייס' },
  { src: '/partners/ort.webp', name: 'רשת אורט' },
  { src: '/partners/azrieli.webp', name: 'קרן עזריאלי' },
  { src: '/partners/ssi.webp', name: 'SSI – Sport Social Impact' },
  { src: '/partners/hadar-habaa.webp', name: 'קרן הדר הב״א' },
]

/** "השותפים שלנו" — muted monochrome logo grid. */
export default function CollabsPartners() {
  const ref = useReveal({ selector: '.reveal', y: 30, stagger: 0.05, start: 'top 85%' })

  return (
    <section id="collabs-partners" ref={ref} dir="rtl" className="relative w-full overflow-hidden bg-surface">
      <SectionBg watermark={false} />
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading
          eyebrow="ביחד"
          title="השותפים שלנו"
          subtitle="ארגונים, מוסדות וגופים מובילים שבחרו לצעוד איתנו"
          animateClass="reveal"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 pb-24">
          {PARTNERS.map((p) => (
            <div
              key={p.src}
              className="reveal group flex items-center justify-center rounded-xl bg-white border border-navy/8 p-6 h-28 md:h-32 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <img
                src={p.src}
                alt={p.name}
                title={p.name}
                className="max-h-full max-w-full object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
