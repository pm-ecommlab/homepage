import Link from 'next/link'
import { useRouter } from 'next/router'
import { ButtonLink } from './ButtonLink'
import { Container } from './Container'
import { SiteHeader } from './SiteHeader'
import type { JobPosting } from '../lib/jobs'
import { normalizeLocale, tr } from '../lib/i18n'

function Bullets({ items, locale }: { items: readonly { de: string; en: string }[]; locale: 'de' | 'en' }) {
  return (
    <ul className="mt-4 grid gap-2 text-base leading-7 text-zinc-600 dark:text-zinc-300">
      {items.map((item) => (
        <li key={item.de} className="flex gap-3">
          <span className="mt-2 h-2 w-2 flex-none rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <span>{item[locale]}</span>
        </li>
      ))}
    </ul>
  )
}

export function JobDetailPage({ job }: { job: JobPosting }) {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)

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
              <Link
                href="/karriere"
                className="text-sm font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
              >
                ← {tr(locale, 'Zurück zur Karriereübersicht', 'Back to careers')}
              </Link>

              <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
                {job.title[locale]}
              </h1>
              <div className="mt-6 space-y-4 text-base leading-7 text-zinc-600 dark:text-zinc-300">
                {job.intro.map((p) => (
                  <p key={p.de}>{p[locale]}</p>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={`mailto:${job.applyEmail}`}>{tr(locale, 'Bewerben', 'Apply')}</ButtonLink>
                <ButtonLink
                  href={`mailto:${job.applyEmail}?subject=${encodeURIComponent(
                    tr(locale, `Bewerbung: ${job.title.de}`, `Application: ${job.title.en}`),
                  )}`}
                  variant="secondary"
                >
                  {tr(locale, 'Mit Betreff öffnen', 'Open with subject')}
                </ButtonLink>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-14 sm:py-16">
          <Container>
            <div className="grid gap-4 lg:grid-cols-3">
              {job.sections.map((s) => (
                <div
                  key={s.title?.de ?? s.type}
                  className="rounded-3xl border border-zinc-200 bg-white p-7 dark:border-zinc-800 dark:bg-zinc-950 sm:p-8"
                >
                  {s.title ? (
                    <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                      {s.title[locale]}
                    </h2>
                  ) : null}
                  {s.type === 'bullets' ? <Bullets items={s.items} locale={locale} /> : null}
                  {s.type === 'paragraphs' ? (
                    <div className="mt-4 space-y-4 text-base leading-7 text-zinc-600 dark:text-zinc-300">
                      {s.items.map((p) => (
                        <p key={p.de}>{p[locale]}</p>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-14 sm:py-16">
          <Container>
            <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900/30 sm:p-10">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                {tr(locale, 'Bewerben', 'Apply')}
              </h2>
              <p className="mt-2 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
                {tr(locale, 'Bewerbe dich unter ', 'Apply via ')}
                <span className="font-semibold">{job.applyEmail}</span>.
              </p>
              <div className="mt-6">
                <ButtonLink href={`mailto:${job.applyEmail}`}>{tr(locale, 'E-Mail schreiben', 'Send email')}</ButtonLink>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </div>
  )
}

