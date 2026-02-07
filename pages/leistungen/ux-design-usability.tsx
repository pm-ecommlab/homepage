import { LeistungDetailPage } from '../../components/LeistungDetailPage'
import { getLeistungBySlug } from '../../lib/leistungDetails'

export default function LeistungUxDesignUsability() {
  const leistung = getLeistungBySlug('ux-design-usability')
  if (!leistung) return null
  return <LeistungDetailPage leistung={leistung} />
}

