import { ecommlabServices } from '../lib/ecommlabContent'
import { useRouter } from 'next/router'
import { ButtonLink } from './ButtonLink'
import { Container } from './Container'
import { ServiceCard } from './ServiceCard'
import { SiteHeader } from './SiteHeader'
import { normalizeLocale, tr } from '../lib/i18n'

function Section({
  title,
  body,
  href,
  external = false,
  cta,
}: {
  title: string
  body: string
  href: string
  external?: boolean
  cta: string
}) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-7 dark:border-zinc-800 dark:bg-zinc-950 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
          {title}
        </h3>
        <ButtonLink href={href} external={external} variant="secondary">
          {cta}
        </ButtonLink>
      </div>
      <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{body}</p>
    </div>
  )
}

export function LeistungenPage() {
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
                {tr(locale, 'Leistungen', 'Services')}
              </p>
              <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
                {tr(
                  locale,
                  'Von Strategie bis Umsetzung – mit Fokus auf Wachstum, Experience und Performance',
                  'From strategy to delivery — focused on growth, experience, and performance',
                )}
              </h1>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="#ueberblick" variant="secondary">
                  {tr(locale, 'Überblick', 'Overview')}
                </ButtonLink>
                <ButtonLink href="/kontakt">
                  {tr(locale, 'Kontakt aufnehmen', 'Contact')}
                </ButtonLink>
              </div>
            </div>
          </Container>
        </section>

        <section id="ueberblick" className="py-14 sm:py-16">
          <Container>
            <div className="grid gap-4 lg:grid-cols-3">
              <Section
                title={tr(locale, 'E-Commerce', 'E-commerce')}
                body={tr(
                  locale,
                  'Unabhängig davon, ob Sie bereits ein etabliertes Offline-Geschäft und eine starke Marke besitzen, die nach Möglichkeiten sucht, sich erfolgreich in den Online-Bereich zu erweitern, oder ob Sie ein neues Online-Unternehmen sind, das bestrebt ist, eine hochklassige E-Commerce-Plattform zu entwickeln, bietet Ecommlab individuell angepasste Lösungen, die präzise auf Ihre spezifischen Anforderungen abgestimmt sind. Wir verstehen die einzigartigen Herausforderungen und Chancen, die mit der Digitalisierung von Geschäftsmodellen verbunden sind, und sind darauf spezialisiert, maßgeschneiderte, innovative und effiziente Strategien zu entwickeln, um Ihre Online-Präsenz zu optimieren und Ihr Geschäftswachstum zu fördern.',
                  'Whether you are an established offline business expanding online or a new digital venture building a premium shop, Ecommlab delivers tailored solutions for your exact requirements. We understand the challenges and opportunities of digitizing business models and develop innovative, efficient strategies to optimize your online presence and drive growth.',
                )}
                href="/leistungen/e-commerce"
                cta={tr(locale, 'mehr', 'more')}
              />
              <Section
                title={tr(locale, 'Web Development', 'Web development')}
                body={tr(
                  locale,
                  'Wir bieten umfassende Lösungen im Bereich des digitalen Marketings, die darauf ausgelegt sind, das Wachstum Ihres Unternehmens strategisch zu skalieren. Unsere Dienstleistungen zielen darauf ab, die Sichtbarkeit Ihrer Marke in der digitalen Landschaft deutlich zu steigern und Ihre Kundenbasis nachhaltig zu erweitern. Durch die Integration fortschrittlicher Marketingtechniken und -werkzeuge unterstützen wir Sie dabei, Ihre Online-Präsenz zu optimieren und eine stärkere Marktpräsenz zu etablieren. Unser Ansatz umfasst eine detaillierte Analyse Ihrer Zielgruppen, die Entwicklung maßgeschneiderter Strategien und die Implementierung effektiver Marketingkampagnen, um maximale Ergebnisse zu erzielen und Ihren geschäftlichen Erfolg langfristig zu sichern.',
                  'We build and scale high-quality webshops and websites that act as your digital storefront. Our approach combines strategy, user-centric design, modern technology, and performance best practices so your platform remains relevant, fast, and scalable as your business grows.',
                )}
                href="/leistungen/web-development"
                cta={tr(locale, 'mehr', 'more')}
              />
              <Section
                title={tr(locale, 'Online Marketing', 'Online marketing')}
                body={tr(
                  locale,
                  'Umfassende digitale Marketinglösungen, die darauf abzielen, Ihr Unternehmen effektiv zu skalieren, die Sichtbarkeit Ihrer Marke signifikant zu steigern und eine kontinuierliche Erweiterung Ihrer Kundenbasis zu fördern. Unsere Strategien sind darauf ausgerichtet, das Wachstum Ihres Geschäfts durch gezielte und innovative Ansätze im Online-Marketing zu beschleunigen, wobei ein besonderer Fokus auf der langfristigen Steigerung der Kundenbindung und der Erhöhung des Markenwerts liegt.',
                  'We digitalize marketing with a holistic, data-driven approach — from strategy to SEO/SEA and automation. Our goal: grow your brand visibility, acquire customers efficiently, and increase long-term retention and brand value.',
                )}
                href="/leistungen/onlinemarketing"
                cta={tr(locale, 'mehr', 'more')}
              />
            </div>
          </Container>
        </section>

        <section className="py-14 sm:py-16">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                  {tr(locale, 'Alle Leistungen', 'All services')}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {tr(locale, 'Schnellzugriff auf die einzelnen Leistungsbereiche.', 'Quick access to all service areas.')}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ecommlabServices.map((s) => (
                <ServiceCard
                  key={s.href}
                  title={tr(locale, s.titleDe, s.titleEn)}
                  description={tr(locale, s.descriptionDe, s.descriptionEn)}
                  href={s.href}
                />
              ))}
            </div>
          </Container>
        </section>

        <section className="py-14 sm:py-16">
          <Container>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900/30 sm:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300">
                  {tr(locale, 'Strategisch', 'Strategy')}
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                  {tr(locale, 'Strategische Auswahl von Partnern, Systemen und Tools', 'Strategic selection of partners, systems, and tools')}
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {tr(
                    locale,
                    'Die sorgfältige Auswahl von Partnern, Systemen und Tools im E-Commerce ermöglicht, dass Unternehmen agil, wettbewerbsfähig und kundenorientiert bleiben, was für den langfristigen Erfolg in einem sich schnell entwicknden Markt entscheidend ist.',
                    'Careful selection of partners, systems, and tools helps you stay agile, competitive, and customer-centric — crucial for long-term success in a fast-moving market.',
                  )}
                </p>
                <div className="mt-6">
                  <ButtonLink href="/leistungen/partners-und-tools" variant="secondary">
                    {tr(locale, 'Mehr erfahren', 'Learn more')}
                  </ButtonLink>
                </div>
              </div>

              <div className="rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950 sm:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300">
                  {tr(locale, 'Erfahrung', 'Experience')}
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                  {tr(locale, 'Wir verstehen Enterprise und Mittelstand', 'We understand enterprise & SMB')}
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {tr(
                    locale,
                    'Wir haben mit zahlreichen Enterprise- und Mittelstand-Kunden gearbeitet, für die wir skalierbare Lösungen umgesetzt haben. Diese Skills setzen wir bei all unseren Projekten ein.',
                    'We’ve worked with many enterprise and SMB clients and delivered scalable solutions. We bring these skills to every single project.',
                  )}
                </p>
                <div className="mt-6">
                  <ButtonLink href="/referenzen" variant="secondary">
                    {tr(locale, 'Referenzen ansehen', 'View work')}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-14 sm:py-16">
          <Container>
            <div className="rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950 sm:p-10">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                {tr(locale, 'Kontaktiere uns', 'Get in touch')}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                {tr(
                  locale,
                  'Wenn du uns sagst, welche Leistungsbereiche du als nächstes ausbauen willst, können wir die passenden nächsten Schritte planen.',
                  'Tell us which service areas you want to expand next — and we’ll plan the right next steps together.',
                )}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/kontakt">
                  {tr(locale, 'Zum Kontakt', 'Contact')}
                </ButtonLink>
                <ButtonLink href="/ecommlab" variant="secondary">
                  {tr(locale, 'Zur Startseite', 'Back to home')}
                </ButtonLink>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </div>
  )
}

