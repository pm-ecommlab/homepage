import { LeistungDetailPage } from '../../components/LeistungDetailPage'
import { getLeistungBySlug } from '../../lib/leistungDetails'

export default function LeistungPlatformIntegration() {
  const leistung = getLeistungBySlug('platform-integration')
  if (!leistung) return null
  return <LeistungDetailPage leistung={leistung} />
}

