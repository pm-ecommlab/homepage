import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { BackToTopButton } from '../components/BackToTopButton'
import { SiteFooter } from '../components/SiteFooter'

function stripQueryAndHash(url: string) {
  return url.split('#')[0]?.split('?')[0] || '/'
}

function stripLocalePrefix(path: string) {
  // defaultLocale is "de" (no prefix), "en" is prefixed as /en/...
  if (path === '/en') return '/'
  if (path.startsWith('/en/')) return path.slice(3) || '/'
  if (path === '/de') return '/'
  if (path.startsWith('/de/')) return path.slice(3) || '/'
  return path || '/'
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const baseUrl =
    (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || '').replace(/\/$/, '') ||
    '' /* falls leer, nutzen wir relative URLs */

  const currentPath = stripLocalePrefix(stripQueryAndHash(router.asPath || '/'))
  const dePath = currentPath
  const enPath = currentPath === '/' ? '/en' : `/en${currentPath}`

  const deHref = `${baseUrl}${dePath}`
  const enHref = `${baseUrl}${enPath}`
  const canonical = router.locale === 'en' ? enHref : deHref

  return (
    <>
      <Head>
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="de" href={deHref} />
        <link rel="alternate" hrefLang="en" href={enHref} />
        <link rel="alternate" hrefLang="x-default" href={deHref} />
      </Head>
      <Component {...pageProps} />
      <SiteFooter />
      <BackToTopButton showAfter={350} />
    </>
  )
}
