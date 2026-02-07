import { LeistungDetailPage } from '../../components/LeistungDetailPage'
import { getLeistungBySlug } from '../../lib/leistungDetails'

export default function LeistungOnlineMarketing() {
  const leistung = getLeistungBySlug('onlinemarketing')
  if (!leistung) return null
  return <LeistungDetailPage leistung={leistung} />
}

