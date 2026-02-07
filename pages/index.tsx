import Head from 'next/head'
import { EcommlabPage } from '../components/EcommlabPage'

export default function Home() {
  return (
    <>
      <Head>
        <title>Ecommlab – Relaunch</title>
        <meta
          name="description"
          content="Neu aufbereitete Inhalte der ecommlab.io Startseite, umgesetzt mit Next.js, TypeScript und Tailwind CSS."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EcommlabPage />
    </>
  )
}
