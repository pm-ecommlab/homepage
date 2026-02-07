import { LeistungDetailPage } from '../../components/LeistungDetailPage'
import { getLeistungBySlug } from '../../lib/leistungDetails'

export default function LeistungSeoContent() {
  const leistung = getLeistungBySlug('seo-content')
  if (!leistung) return null
  return <LeistungDetailPage leistung={leistung} />
}

