import { LeistungDetailPage } from '../../components/LeistungDetailPage'
import { getLeistungBySlug } from '../../lib/leistungDetails'

export default function LeistungECommerce() {
  const leistung = getLeistungBySlug('e-commerce')
  if (!leistung) return null
  return <LeistungDetailPage leistung={leistung} />
}

