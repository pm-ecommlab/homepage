import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { Container } from './Container'
import { SiteHeader } from './SiteHeader'
import { portfolioItems, portfolioTags } from '../lib/portfolio'
import { normalizeLocale, tr } from '../lib/i18n'

export function PortfolioPage() {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)
  const [active, setActive] = useState<(typeof portfolioTags)[number]>('Show All')
  const baseHref = locale === 'en' ? '/projects' : '/referenzen'

  const filtered = useMemo(() => {
    if (active === 'Show All') return portfolioItems
    return portfolioItems.filter((p) => p.tags.includes(active))
  }, [active])

  const tagLabel = (tag: (typeof portfolioTags)[number]) => {
    if (tag === 'Show All') return tr(locale, 'Alle', 'Show All')
    return tag
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.14),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.14),transparent_55%),radial-gradient(circle_at_50%_75%,rgba(24,24,27,0.10),transparent_60%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.20),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.20),transparent_55%),radial-gradient(circle_at_50%_75%,rgba(255,255,255,0.10),transparent_60%)]"
          />

          <Container>
            <div className="py-14 sm:py-18">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300">
                {tr(locale, 'Referenzen', 'Cases')}
              </p>
              <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
                {tr(locale, 'Projekte, die wir umgesetzt haben', 'Projects we delivered')}
              </h1>
            </div>
          </Container>
        </section>

        <section className="py-10 sm:py-12">
          <Container>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-base text-zinc-600 dark:text-zinc-300">
                <span className="font-semibold text-zinc-900 dark:text-white">
                  {tr(locale, 'Filtern:', 'Filter:')}
                </span>{' '}
                {tagLabel(active)}
              </div>
              <div className="flex flex-wrap gap-2">
                {portfolioTags.map((t) => {
                  const isActive = t === active
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setActive(t)}
                      className={[
                        'rounded-full border px-4 py-2 text-sm font-semibold transition',
                        isActive
                          ? 'border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-950'
                          : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900',
                      ].join(' ')}
                    >
                      {tagLabel(t)}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {filtered.map((item) => (
                <Link
                  key={item.slug}
                  href={`${baseHref}/${item.slug}`}
                  className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      priority={item.slug === 'newone'}
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                      {item.title}
                    </h2>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/30 dark:text-zinc-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      </main>
    </div>
  )
}

