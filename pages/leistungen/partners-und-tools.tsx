import { LeistungDetailPage } from '../../components/LeistungDetailPage'
import { getLeistungBySlug } from '../../lib/leistungDetails'

export default function LeistungPartnersUndTools() {
  const leistung = getLeistungBySlug('partners-und-tools')
  if (!leistung) return null
  return <LeistungDetailPage leistung={leistung} />
}

