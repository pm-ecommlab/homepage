import { PortfolioDetailPage } from '../../components/PortfolioDetailPage'

export default function ProjectLiquidLife() {
  return <PortfolioDetailPage slug="liquid-life" />
}

export function getServerSideProps({
  locale,
}: {
  locale?: string
}): { props: Record<string, never> } | { redirect: { destination: string; permanent: boolean } } {
  if (locale === 'de') {
    return { redirect: { destination: '/referenzen/liquid-life', permanent: true } }
  }
  return { props: {} }
}
