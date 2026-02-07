import Head from 'next/head'
import { LeistungenPage } from '../components/LeistungenPage'

export default function Leistungen() {
  return (
    <>
      <Head>
        <title>Leistungen – Relaunch</title>
        <meta
          name="description"
          content="Neu aufbereitete Inhalte der ecommlab.io Leistungen-Seite, umgesetzt mit Next.js, TypeScript und Tailwind CSS."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LeistungenPage />
    </>
  )
}

