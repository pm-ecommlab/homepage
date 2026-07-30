import { PortfolioDetailPage } from '../../components/PortfolioDetailPage'

export default function ProjectRiessAmbiente() {
  return <PortfolioDetailPage slug="riess-ambiente" />
}

export function getServerSideProps({
  locale,
}: {
  locale?: string
}): { props: Record<string, never> } | { redirect: { destination: string; permanent: boolean } } {
  if (locale === 'de') {
    return { redirect: { destination: '/referenzen/riess-ambiente', permanent: true } }
  }
  return { props: {} }
}
