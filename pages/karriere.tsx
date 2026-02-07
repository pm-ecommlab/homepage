import Head from 'next/head'
import { KarrierePage } from '../components/KarrierePage'

export default function Karriere() {
  return (
    <>
      <Head>
        <title>Karriere – Ecommlab</title>
        <meta
          name="description"
          content="Komm in unser Team: Offene Positionen und Einblicke in unsere Arbeitsweise."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <KarrierePage />
    </>
  )
}

