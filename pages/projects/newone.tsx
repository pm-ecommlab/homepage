import { PortfolioDetailPage } from '../../components/PortfolioDetailPage'

export default function ProjectNewone() {
  return <PortfolioDetailPage slug="newone" />
}

export function getServerSideProps({
  locale,
}: {
  locale?: string
}): { props: Record<string, never> } | { redirect: { destination: string; permanent: boolean } } {
  if (locale === 'de') {
    return { redirect: { destination: '/referenzen/newone', permanent: true } }
  }
  return { props: {} }
}
