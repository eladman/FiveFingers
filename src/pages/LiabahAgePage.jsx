import { useEffect, useMemo } from 'react'
import AgeHero from '../redesign/liabah/age/AgeHero'
import AgeOverview from '../redesign/liabah/age/AgeOverview'
import AgeYearPlan from '../redesign/liabah/age/AgeYearPlan'
import AgeDetails from '../redesign/liabah/age/AgeDetails'
import AgeWhyAge from '../redesign/liabah/age/AgeWhyAge'
import AgeMoreTracks from '../redesign/liabah/age/AgeMoreTracks'
import AgeFinale from '../redesign/liabah/age/AgeFinale'
import { agePages, locationsForBand } from '../data/liabahAgeData'

/**
 * A ליבה age-band page — one component, three routes: #liabah/young ·
 * #liabah/middle · #liabah/high. All copy lives in liabahAgeData.js; the
 * locations are the parent page's, filtered to groups this band's grades
 * can actually join. Mounted with key={band} in App.jsx so switching
 * between bands remounts and replays each section's entrance.
 */
export default function LiabahAgePage({ band, onContactOpen }) {
  const page = agePages[band]
  const locations = useMemo(() => locationsForBand(band), [band])
  const onRegister = () => onContactOpen?.('קבוצות הנוער')

  // Hash routing has no per-route <title>; set it here and restore on leave.
  useEffect(() => {
    const prev = document.title
    document.title = `${page.navLabel} · קבוצות הנוער · חמש אצבעות`
    return () => { document.title = prev }
  }, [page])

  return (
    <main>
      <AgeHero page={page} onRegister={onRegister} />
      <AgeOverview page={page} />
      <AgeYearPlan page={page} />
      <AgeDetails page={page} locations={locations} onRegister={onRegister} />
      <AgeWhyAge page={page} />
      <AgeMoreTracks currentId={band} />
      <AgeFinale page={page} onRegister={onRegister} />
    </main>
  )
}
