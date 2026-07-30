import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { Container } from './Container'
import { SiteHeader } from './SiteHeader'
import { getCaseBySlug, getCaseNeighbors } from '../lib/portfolioCases'
import { normalizeLocale, tr } from '../lib/i18n'

type FlatFact = { icon: 'plus' | 'dot'; text: string; strong?: boolean }

function Icon({ kind }: { kind: FlatFact['icon'] }) {
  if (kind === 'dot') {
    return (
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        className="mt-1.5 h-4 w-4 flex-none text-zinc-500 dark:text-zinc-400"
      >
        <path
          fill="currentColor"
          d="M10 1.5A8.5 8.5 0 1 0 18.5 10 8.51 8.51 0 0 0 10 1.5Zm0 15.5A7 7 0 1 1 17 10a7 7 0 0 1-7 7Z"
        />
      </svg>
    )
  }

  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className="mt-1.5 h-4 w-4 flex-none text-zinc-500 dark:text-zinc-400"
    >
      <path
        fill="currentColor"
        d="M18 9H11V2a1 1 0 0 0-2 0v7H2a1 1 0 0 0 0 2h7v7a1 1 0 0 0 2 0v-7h7a1 1 0 0 0 0-2Z"
      />
    </svg>
  )
}

function ShareBar({ title, locale }: { title: string; locale: 'de' | 'en' }) {
  const [url, setUrl] = useState<string>('')
  useEffect(() => {
    setUrl(window.location.href)
  }, [])

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  function ShareIcon({ kind }: { kind: 'facebook' | 'x' | 'linkedin' }) {
    if (kind === 'facebook') {
      return (
        <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5">
          <path
            fill="currentColor"
            d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.2c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.2v3.2H10V22h3.5Z"
          />
        </svg>
      )
    }

    if (kind === 'linkedin') {
      return (
        <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5">
          <path
            fill="currentColor"
            d="M6.94 6.5a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM4.8 21.6h4.3V8.3H4.8v13.3ZM13 8.3h-4.1v13.3h4.1v-7c0-1.9.4-3.7 2.7-3.7 2.2 0 2.2 2.1 2.2 3.8v7h4.1v-7.7c0-3.8-.8-6.7-5.2-6.7-2.1 0-3.5 1.1-4.1 2.2h-.1V8.3Z"
          />
        </svg>
      )
    }

    return (
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.8-6.2L6.7 22H3.6l7.3-8.4L1 2h6.4l4.4 5.7L18.9 2Zm-1.1 18h1.7L6.4 3.9H4.6L17.8 20Z"
        />
      </svg>
    )
  }

  function onShareClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!url) e.preventDefault()
  }

  return (
    <div className="mt-14">
      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
        {tr(locale, 'Teilen', 'Share your love')}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-900 transition hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
          href={url ? `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` : '#'}
          target="_blank"
          rel="noopener noreferrer nofollow"
          onClick={onShareClick}
          aria-disabled={!url}
          title="Facebook"
        >
          <span className="sr-only">Facebook</span>
          <ShareIcon kind="facebook" />
        </a>
        <a
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-900 transition hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
          href={url ? `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` : '#'}
          target="_blank"
          rel="noopener noreferrer nofollow"
          onClick={onShareClick}
          aria-disabled={!url}
          title="X"
        >
          <span className="sr-only">X</span>
          <ShareIcon kind="x" />
        </a>
        <a
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-900 transition hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
          href={url ? `https://www.linkedin.com/shareArticle?url=${encodedUrl}&title=${encodedTitle}` : '#'}
          target="_blank"
          rel="noopener noreferrer nofollow"
          onClick={onShareClick}
          aria-disabled={!url}
          title="LinkedIn"
        >
          <span className="sr-only">LinkedIn</span>
          <ShareIcon kind="linkedin" />
        </a>
      </div>
    </div>
  )
}

export function PortfolioDetailPage({ slug }: { slug: string }) {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)
  const item = getCaseBySlug(slug)
  const { prev, next } = getCaseNeighbors(slug)
  const basePath = locale === 'en' ? '/projects' : '/referenzen'

  const flatFacts = useMemo<FlatFact[]>(() => {
    const out: FlatFact[] = []
    const keyFacts = item?.keyFacts ?? []
    keyFacts.forEach((row) => {
      if (row.type === 'text') out.push({ icon: 'plus', text: row.text[locale] })
      else {
        out.push({ icon: 'plus', text: row.text[locale] })
        row.items.forEach((it) => out.push({ icon: 'dot', text: it[locale], strong: true }))
      }
    })
    if (out.length) out[0] = { ...out[0], strong: true }
    return out
  }, [item, locale])

  const splitIdx = Math.ceil(flatFacts.length / 2)
  const leftFacts = flatFacts.slice(0, splitIdx)
  const rightFacts = flatFacts.slice(splitIdx)

  if (router.isFallback) return null
  if (!item) return null

  return (
    <>
      <Head>
        <title>{`${item.title} – Ecommlab`}</title>
        <meta
          name="description"
          content={
            item.summary?.[locale] ??
            tr(locale, `${item.title} – Referenzprojekt von Ecommlab.`, `${item.title} — a selected Ecommlab project.`)
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen">
        <SiteHeader />
        <main>
          <section className="py-10 sm:py-14">
            <Container>
              <Link
                href={basePath}
                className="text-sm font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
              >
                ← {tr(locale, 'Zurück zu Referenzen', 'Back to Projects')}
              </Link>

              <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-start">
                <div className="lg:col-span-4">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
                    <Image src={item.imageSrc} alt={item.title} fill className="object-cover" />
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <h1 className="text-balance text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
                    {item.title}
                  </h1>

                  {item.summary ? (
                    <p className="mt-6 text-base leading-7 text-zinc-600 dark:text-zinc-300">
                      {item.summary[locale]}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: tr(locale, 'Service', 'Service'), value: item.meta.service ?? '—' },
                  { label: tr(locale, 'Technologie', 'Technology'), value: item.meta.technology ?? '—' },
                  { label: tr(locale, 'Datum', 'Date'), value: item.meta.year ?? item.meta.date },
                  { label: tr(locale, 'Ort', 'Location'), value: item.meta.location },
                ].map((m) => (
                  <div key={m.label}>
                    <hr className="border-zinc-200 dark:border-zinc-800" />
                    <div className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                      {m.label}
                    </div>
                    <div className="mt-3 text-base font-semibold text-zinc-900 dark:text-white">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <hr className="border-zinc-200 dark:border-zinc-800" />
              </div>

              {item.beforeKeyfactsImageSrc ? (
                <div className="mt-10">
                  <div className="relative aspect-[2/1] overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
                    <Image
                      src={item.beforeKeyfactsImageSrc}
                      alt={item.beforeKeyfactsImageAlt ?? item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 1200px"
                      priority
                    />
                  </div>
                </div>
              ) : null}

              <div className="mt-10">
                <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                  {tr(locale, 'Keyfacts', 'Key facts')}
                </h2>
                <hr className="mt-6 border-zinc-200 dark:border-zinc-800" />

                <div className="mt-8 grid gap-10 lg:grid-cols-2">
                  <div className="grid gap-4">
                    {leftFacts.map((f, idx) => (
                      <div key={`${f.text}-${idx}`} className="flex gap-3">
                        <Icon kind={f.icon} />
                        <div
                          className={[
                            'text-base leading-7',
                            f.strong ? 'font-semibold text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-300',
                          ].join(' ')}
                        >
                          {f.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-4">
                    {rightFacts.map((f, idx) => (
                      <div key={`${f.text}-${idx}`} className="flex gap-3">
                        <Icon kind={f.icon} />
                        <div
                          className={[
                            'text-base leading-7',
                            f.strong ? 'font-semibold text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-300',
                          ].join(' ')}
                        >
                          {f.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {item.beforeKeyfactsExtraImages?.length ? (
                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  {item.beforeKeyfactsExtraImages.map((img) => (
                    <div
                      key={img.src}
                      className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt ?? item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                  ))}
                </div>
              ) : null}

              <ShareBar title={item.title} locale={locale} />

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-3">
                  {prev ? (
                    <Link
                      href={`${basePath}/${prev.slug}`}
                      className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
                    >
                      ← {prev.title}
                    </Link>
                  ) : null}
                  {next ? (
                    <Link
                      href={`${basePath}/${next.slug}`}
                      className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
                    >
                      {next.title} →
                    </Link>
                  ) : null}
                </div>
              </div>
            </Container>
          </section>
        </main>
      </div>
    </>
  )
}
