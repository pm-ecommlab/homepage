import { PortfolioDetailPage } from '../../components/PortfolioDetailPage'

export default function ProjectBaerSchuhe() {
  return <PortfolioDetailPage slug="baer-schuhe" />
}

export function getServerSideProps({
  locale,
}: {
  locale?: string
}): { props: Record<string, never> } | { redirect: { destination: string; permanent: boolean } } {
  if (locale === 'de') {
    return { redirect: { destination: '/referenzen/baer-schuhe', permanent: true } }
  }
  return { props: {} }
}
