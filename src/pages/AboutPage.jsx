import AboutHeroV2 from '../redesign/about/AboutHeroV2'
import AboutStoryV2 from '../redesign/about/AboutStoryV2'
import AboutCloseV2 from '../redesign/about/AboutCloseV2'

/**
 * אודות — the movement's story, and the one page that deliberately breaks the
 * site's page language (see DESIGN.MD §11).
 *
 * Every other dedicated page is a dark full-bleed poster hero followed by a
 * stack of marketing sections. This one is an editorial long-read: a light
 * typographic title page, ONE continuous narrative in a single measure, and a
 * compact dark colophon. Three sections, no more — the page's job is to be
 * read, so the only CTA is at the very end.
 *
 * The journey is told as named movements rather than a dated timeline: only
 * 2014 and the September 2018 academy opening are sourced. See the header of
 * src/data/aboutData.js for what is and isn't documented.
 */
export default function AboutPage({ onContactOpen }) {
  return (
    <main>
      <AboutHeroV2 />
      <AboutStoryV2 />
      <AboutCloseV2 onBook={() => onContactOpen?.('')} />
    </main>
  )
}
