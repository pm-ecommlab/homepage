import Head from 'next/head'
import { PortfolioPage } from '../components/PortfolioPage'

export default function Referenzen() {
  return (
    <>
      <Head>
        <title>Referenzen – Ecommlab</title>
        <meta
          name="description"
          content="Ausgewählte Projekte, die wir gemeinsam mit unseren Kunden umgesetzt haben."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PortfolioPage />
    </>
  )
}

