// The page's chapters, in order, named by the brief's own section labels.
// They are the stops along the way: the desktop rail and the phone menu.
import { contact, day, donate, hero, offer, partner, partners, place, story, valley, values, vision, what, why } from './content'

export const CHAPTERS = [
  { id: 'top', label: hero.title },
  { id: 'story', label: story.kicker },
  { id: 'why', label: why.kicker },
  { id: 'what', label: what.kicker },
  { id: 'values', label: values.kicker },
  { id: 'place', label: place.kicker },
  { id: 'day', label: day.kicker },
  { id: 'offer', label: offer.kicker },
  { id: 'valley', label: valley.kicker },
  { id: 'partners', label: partners.kicker },
  { id: 'vision', label: vision.kicker },
  { id: 'partner', label: partner.kicker },
  { id: 'donate', label: donate.kicker },
  { id: 'contact', label: contact.kicker },
]
