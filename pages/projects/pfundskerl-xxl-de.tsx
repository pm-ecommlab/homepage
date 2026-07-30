import { PortfolioDetailPage } from '../../components/PortfolioDetailPage'

export default function ProjectPfundskerl() {
  return <PortfolioDetailPage slug="pfundskerl-xxl-de" />
}

export function getServerSideProps({
  locale,
}: {
  locale?: string
}): { props: Record<string, never> } | { redirect: { destination: string; permanent: boolean } } {
  if (locale === 'de') {
    return { redirect: { destination: '/referenzen/pfundskerl-xxl-de', permanent: true } }
  }
  return { props: {} }
}
