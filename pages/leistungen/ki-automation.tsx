import { LeistungDetailPage } from '../../components/LeistungDetailPage'
import { getLeistungBySlug } from '../../lib/leistungDetails'

export default function LeistungKiAutomation() {
  const leistung = getLeistungBySlug('ki-automation')
  if (!leistung) return null
  return <LeistungDetailPage leistung={leistung} />
}

