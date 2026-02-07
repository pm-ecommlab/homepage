import { LeistungDetailPage } from '../../components/LeistungDetailPage'
import { getLeistungBySlug } from '../../lib/leistungDetails'

export default function LeistungStrategyConsulting() {
  const leistung = getLeistungBySlug('strategy-consulting')
  if (!leistung) return null
  return <LeistungDetailPage leistung={leistung} />
}

