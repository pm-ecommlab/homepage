import { LeistungDetailPage } from '../../components/LeistungDetailPage'
import { getLeistungBySlug } from '../../lib/leistungDetails'

export default function LeistungPrerformanceBoosting() {
  const leistung = getLeistungBySlug('prerformance-boosting')
  if (!leistung) return null
  return <LeistungDetailPage leistung={leistung} />
}

