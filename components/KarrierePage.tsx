import Link from 'next/link'
import { useRouter } from 'next/router'
import { ButtonLink } from './ButtonLink'
import { Container } from './Container'
import { SiteHeader } from './SiteHeader'
import { jobs } from '../lib/jobs'
import { normalizeLocale, tr } from '../lib/i18n'

export function KarrierePage() {
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
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300">
                {tr(locale, 'Karriere', 'Careers')}
              </p>
              <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
                {tr(locale, 'Komm in unser Team', 'Join our team')}
              </h1>
              <p className="mt-5 max-w-3xl text-pretty text-base leading-7 text-zinc-600 dark:text-zinc-300">
                {tr(
                  locale,
                  'In unserem Team erlebst du eine außergewöhnliche und einzigartige Arbeitsatmosphäre, geprägt durch die Zusammenarbeit mit hochqualifizierten Spezialisten.',
                  'In our team, you’ll experience a unique atmosphere shaped by collaboration with highly qualified specialists.',
                )}
              </p>
            </div>
          </Container>
        </section>

        <section className="py-14 sm:py-16">
          <Container>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="space-y-4 text-base leading-7 text-zinc-600 dark:text-zinc-300">
                  <p>
                    {tr(
                      locale,
                      'Von ihnen kannst du auf hohem Niveau lernen und wesentlich zur Entwicklung von Spitzenprodukten beitragen. Du erhältst die Chance, an der Entwicklung innovativer Funktionen mitzuwirken, die das moderne E-Commerce-Erlebnis entscheidend verbessern. Trotz unserer umfassenden Erfahrung genießen wir die Dynamik und Flexibilität einer Start-up-Kultur, in der wir Projekte von der Basis auf neu aufbauen.',
                      'You will learn at a high level and contribute to building great products. You’ll help develop innovative features that improve modern e-commerce experiences. Despite our experience, we keep the dynamism and flexibility of a start-up culture and rebuild projects from the ground up.',
                    )}
                  </p>
                  <p>
                    {tr(
                      locale,
                      'Wir fördern in dir eine Kultur des kalkulierten Risikos, erkennen den Wert von Fehlern an und nutzen diese als Lernchancen für das gesamte Team. Unsere Unternehmenskultur ist von Offenheit und Transparenz geprägt, und wir sind stets offen für deine innovativen Ideen. Wir schätzen deine frischen Perspektiven und kreativen Impulse, die du in unser Unternehmen einbringst, und freuen uns auf die fortlaufende Bereicherung unserer Arbeitsweise durch deine Beiträge.',
                      'We promote a culture of calculated risk, value mistakes as learning opportunities, and grow together as a team. Our culture is open and transparent, and we welcome your ideas. We value fresh perspectives and creative impulses — and look forward to your contributions.',
                    )}
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-zinc-200 bg-white p-7 dark:border-zinc-800 dark:bg-zinc-950 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300">
                  {tr(locale, 'Schnellkontakt', 'Quick contact')}
                </p>
                <h2 className="mt-3 text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                  {tr(locale, 'Passt das zu dir?', 'Is this you?')}
                </h2>
                <p className="mt-2 text-base leading-7 text-zinc-600 dark:text-zinc-300">
                  {tr(
                    locale,
                    'Schick uns ein paar Infos zu dir – wir melden uns zeitnah.',
                    'Send us a few details about you — we’ll get back to you soon.',
                  )}
                </p>
                <div className="mt-6">
                  <ButtonLink href="mailto:hello@ecommlab.io">{tr(locale, 'E-Mail schreiben', 'Send email')}</ButtonLink>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-14 sm:py-16">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                  {tr(locale, 'Offene Positionen', 'Open positions')}
                </h2>
                <p className="mt-2 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
                  {tr(locale, 'Aktuell suchen wir Unterstützung in diesen Bereichen.', 'We are currently hiring for these roles.')}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <Link
                  key={job.slug}
                  href={`/karriere/${job.slug}`}
                  className="group rounded-3xl border border-zinc-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <div className="text-lg font-semibold text-zinc-900 dark:text-white">
                    {job.title[locale]}
                  </div>
                  <div className="mt-6 text-sm font-semibold text-zinc-900 dark:text-white">
                    {tr(locale, 'mehr', 'more')}{' '}
                    <span className="inline-block transition group-hover:translate-x-0.5">→</span>
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

