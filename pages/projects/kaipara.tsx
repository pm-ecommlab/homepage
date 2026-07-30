import { PortfolioDetailPage } from '../../components/PortfolioDetailPage'

export default function ProjectKaipara() {
  return <PortfolioDetailPage slug="kaipara" />
}

export function getServerSideProps({
  locale,
}: {
  locale?: string
}): { props: Record<string, never> } | { redirect: { destination: string; permanent: boolean } } {
  if (locale === 'de') {
    return { redirect: { destination: '/referenzen/kaipara', permanent: true } }
  }
  return { props: {} }
}
