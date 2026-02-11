import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ButtonLink } from './ButtonLink'
import { Container } from './Container'
import { LogoCarousel } from './LogoCarousel'
import { PartnerLogos } from './PartnerLogos'
import { ServiceCard } from './ServiceCard'
import { SiteHeader } from './SiteHeader'
import { TurnstileWidget } from './TurnstileWidget'
import { ecommlabServices } from '../lib/ecommlabContent'
import { portfolioItems } from '../lib/portfolio'
import { normalizeLocale, tr } from '../lib/i18n'

const serviceCategories = [
  {
    titleDe: 'Digitale Präsenz & Entwicklung',
    titleEn: 'Digital presence & development',
    subtitleDe: 'E-Commerce, Webentwicklung, Plattform-Integrationen',
    subtitleEn: 'E-commerce, web development, platform integrations',
    href: '/leistungen',
  },
  {
    titleDe: 'User Experience & Design',
    titleEn: 'User experience & design',
    subtitleDe: 'UX-Design & Usability',
    subtitleEn: 'UX design & usability',
    href: '/leistungen',
  },
  {
    titleDe: 'Marketing & Wachstum',
    titleEn: 'Marketing & growth',
    subtitleDe: 'Online-Marketing, SEO & Content, Digitales Marketing & Automatisierung',
    subtitleEn: 'Online marketing, SEO & content, digital marketing & automation',
    href: '/leistungen',
  },
  {
    titleDe: 'Strategie & Innovation',
    titleEn: 'Strategy & innovation',
    subtitleDe: 'Strategie & Beratung, KI & Automatisierung',
    subtitleEn: 'Strategy & consulting, AI & automation',
    href: '/leistungen',
  },
] as const

const homeProjectSlugs = [
  'pfundskerl-xxl-de',
  'riess-ambiente',
  'liquid-life',
  'baer-schuhe',
  'kaipara',
  'newone',
] as const

const homeProjects = homeProjectSlugs
  .map((slug) => portfolioItems.find((p) => p.slug === slug))
  .filter((p): p is NonNullable<(typeof portfolioItems)[number]> => Boolean(p))

const faqs = [
  {
    qDe: 'Was macht Ecommlab genau?',
    qEn: 'What does Ecommlab do?',
    aDe: 'Ecommlab unterstützt Unternehmen dabei, ihre E-Commerce-Prozesse zu optimieren – von der Strategie und Systemauswahl bis zur technischen Umsetzung und Automatisierung.',
    aEn: 'Ecommlab helps companies optimize their e-commerce processes — from strategy and platform selection to implementation and automation.',
  },
  {
    qDe: 'Für wen sind eure Leistungen geeignet?',
    qEn: 'Who are your services for?',
    aDe: 'Für Unternehmen, die E-Commerce neu aufbauen, optimieren oder skalieren möchten – vom Mittelstand bis Enterprise.',
    aEn: 'For companies that want to build, optimize, or scale e-commerce — from SMB to enterprise.',
  },
  {
    qDe: 'Mit welchen Systemen und Tools arbeitet ihr?',
    qEn: 'Which platforms and tools do you work with?',
    aDe: 'Wir setzen auf führende Plattformen und Technologien wie Shopify, Shopware, WooCommerce, HubSpot, Klaviyo und individuelle API-Integrationen – immer abgestimmt auf Ihre Anforderungen.',
    aEn: 'We work with leading platforms and technologies like Shopify, Shopware, WooCommerce, HubSpot, Klaviyo, and custom API integrations — tailored to your needs.',
  },
  {
    qDe: 'Bietet ihr auch Beratung ohne direkte Umsetzung an?',
    qEn: 'Do you offer consulting without implementation?',
    aDe: 'Ja – wir unterstützen bei Strategie, Systemauswahl, Roadmaps und Reviews, auch wenn die Umsetzung intern oder mit anderen Partnern erfolgt.',
    aEn: 'Yes — we support strategy, platform selection, roadmaps, and reviews, even if implementation happens in-house or with other partners.',
  },
  {
    qDe: 'Wie läuft eine Zusammenarbeit mit Ecommlab ab?',
    qEn: 'How does a typical collaboration work?',
    aDe: 'Typisch: kurzes Erstgespräch → Analyse & Zielbild → Konzept/Roadmap → Umsetzung in Iterationen → Messung & Optimierung.',
    aEn: 'Typical flow: quick intro call → analysis & target picture → concept/roadmap → iterative implementation → measurement & optimization.',
  },
] as const

export function EcommlabPage() {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [contactError, setContactError] = useState<string>('')
  const [contactFieldErrors, setContactFieldErrors] = useState<{
    name?: string
    email?: string
    message?: string
    captcha?: string
  }>({})
  const [captchaToken, setCaptchaToken] = useState<string>('')
  const [captchaKey, setCaptchaKey] = useState(0)
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden">
          <div aria-hidden className="absolute inset-0 -z-10">
            <video
              className="h-full w-full object-cover"
              src="/videos/hero.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
            {/* brighter look like wp.ecommlab.io */}
            <div className="absolute inset-0 bg-white/75 dark:bg-black/45" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.16),transparent_55%),radial-gradient(circle_at_70%_10%,rgba(168,85,247,0.12),transparent_55%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.26),transparent_55%),radial-gradient(circle_at_70%_10%,rgba(168,85,247,0.22),transparent_55%)]" />
          </div>

          <Container>
            <div className="py-20 sm:py-28">
              <h1 className="max-w-4xl text-balance font-display text-5xl font-semibold leading-[1.02] tracking-tight text-zinc-900 sm:text-7xl dark:text-white">
                Create.Inspire.
                <br />
                Perform.
              </h1>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="#leistungen">
                  {tr(locale, 'UNSERE LEISTUNGEN', 'OUR SERVICES')}
                </ButtonLink>
                <ButtonLink href="#was-machen-wir" variant="secondary">
                  {tr(locale, 'WAS MACHEN WIR', 'WHAT WE DO')}
                </ButtonLink>
              </div>

              <PartnerLogos />
            </div>
          </Container>
        </section>

        <section id="was-machen-wir" className="py-14 sm:py-16">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300">
                  {tr(locale, 'WAS MACHEN WIR', 'WHAT WE DO')}
                </p>
                <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                  {locale === 'en' ? (
                    <>
                      We help companies unlock their{' '}
                      <span className="whitespace-nowrap">e-commerce</span> potential
                    </>
                  ) : (
                    <>
                      Wir helfen Unternehmen, ihr <span className="whitespace-nowrap">E-Commerce</span>{' '}
                      Potenzial zu erschließen
                    </>
                  )}
                </h2>
              </div>
              <div className="text-zinc-600 dark:text-zinc-300">
                <p className="text-base">
                  {tr(
                    locale,
                    'Wir verwandeln Kundenbeziehungen in Partnerschaften und führen Ihr digitales Projekt zum Erfolg.',
                    'We turn customer relationships into partnerships and drive your digital project to success.',
                  )}
                </p>
                <p className="mt-4 text-base">
                  {tr(
                    locale,
                    'Wir arbeiten eng mit Ihnen zusammen, um das ideale E-Commerce-System und passende Lösungen zu identifizieren. Bei uns stehen Ihre Anforderungen und die Benutzererfahrung Ihrer Kunden stets im Mittelpunkt. Mit unserem Team aus versierten E-Commerce-Experten und vernetzten Entwicklern managen wir Projekte jeglicher Größe effizient und kompetent, auch auf internationaler Ebene.',
                    'We work closely with you to identify the ideal e-commerce platform and the right solutions. Your requirements and your customers’ experience are always at the center. With seasoned e-commerce experts and a strong developer network, we run projects of any size efficiently — also internationally.',
                  )}
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl border border-zinc-200 bg-white p-7 dark:border-zinc-800 dark:bg-zinc-950 sm:p-8">
                <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                  {tr(
                    locale,
                    'Mehr Umsatz, bessere Kundenerlebnisse, reibungslose Prozesse – mit Ecommlab.',
                    'More revenue, better customer experiences, smoother operations — with Ecommlab.',
                  )}
                </h3>
                <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-300">
                  {tr(
                    locale,
                    'Von der Optimierung bis zur Skalierung – wir machen Ihr E-Commerce fit für die Zukunft.',
                    'From optimization to scaling — we get your e-commerce ready for the future.',
                  )}
                </p>
                <div className="mt-6">
                  <ButtonLink href="/kontakt">
                    {tr(locale, 'Kontaktieren Sie uns', 'Contact us')}
                  </ButtonLink>
                </div>
              </div>

              <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-7 dark:border-zinc-800 dark:bg-zinc-900/30 sm:p-8">
                <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                  {tr(
                    locale,
                    'Wir arbeiten eng mit Ihnen zusammen, um das ideale E-Commerce-System und passende Lösungen zu identifizieren.',
                    'We work closely with you to identify the ideal e-commerce platform and the right solutions.',
                  )}
                </h3>
                <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-300">
                  {tr(
                    locale,
                    'Beginnen wir gemeinsam eine Reise, um Ihren Kunden ein herausragendes digitales Erlebnis zu bieten!',
                    'Let’s start a journey together to deliver an outstanding digital experience for your customers.',
                  )}
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-zinc-200 bg-white p-7 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="font-display text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                  15<span className="text-zinc-400">+</span>
                </div>
                <div className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-300">
                  {tr(locale, 'Jahre Erfahrung', 'Years of experience')}
                </div>
              </div>
              <div className="rounded-3xl border border-zinc-200 bg-white p-7 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="font-display text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                  300<span className="text-zinc-400">+</span>
                </div>
                <div className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-300">
                  {tr(locale, 'Erfolgreiche Projekte', 'Successful projects')}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section id="leistungen" className="py-14 sm:py-16">
          <Container>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300">
                  {tr(locale, 'Was können wir für Sie tun', 'What can we do for you')}
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                  {tr(locale, 'Leistungen, bei denen wir Ihnen helfen können', 'Services we can help you with')}
                </h2>
                <p className="mt-2 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
                  {tr(
                    locale,
                    'Wir sorgen dafür, dass Sie immer den besten digitalen Service bekommen.',
                    'We make sure you always get the best digital service.',
                  )}
                </p>
              </div>
              <ButtonLink href="/leistungen" variant="secondary">
                {tr(locale, 'Alle Leistungen', 'All services')}
              </ButtonLink>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {serviceCategories.map((c) => (
                <Link
                  key={c.titleDe}
                  href={c.href}
                  className="rounded-3xl border border-zinc-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-300">
                    {tr(locale, c.titleDe, c.titleEn)}
                  </div>
                  <div className="mt-3 text-base font-semibold text-zinc-900 dark:text-white">
                    {tr(locale, c.subtitleDe, c.subtitleEn)}
                  </div>
                  <div className="mt-6 text-sm font-semibold text-zinc-900 dark:text-white">
                    {tr(locale, 'Mehr erfahren', 'Learn more')} <span className="inline-block">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-14 sm:py-16">
          <Container>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300">
                  {tr(locale, 'So setzen wir Ideen um', 'How we deliver')}
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                  {tr(locale, 'Unsere Projekte', 'Selected projects')}
                </h2>
                <p className="mt-2 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
                  {tr(
                    locale,
                    'Gemeinsam mit unseren Kunden gestalten wir nachhaltigen Erfolg.',
                    'Together with our clients, we build sustainable success.',
                  )}
                </p>
              </div>
              <ButtonLink href="/referenzen" variant="secondary">
                {tr(locale, 'Unsere Referenzen', 'Our work')}
              </ButtonLink>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {homeProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/referenzen/${p.slug}`}
                  className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <div className="relative aspect-[16/9] bg-zinc-100 dark:bg-zinc-900">
                    <Image
                      src={p.imageSrc}
                      alt={tr(locale, `${p.title} – Projektbild`, `${p.title} – project image`)}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>

                  <div className="p-6">
                    <div className="text-lg font-semibold text-zinc-900 dark:text-white">{p.title}</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tags.slice(0, 3).map((t) => (
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

        <section className="py-14 sm:py-16">
          <Container>
            <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900/30 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300">
                {tr(locale, 'Die Basis für Ihren nachhaltigen Erfolg', 'The foundation for sustainable success')}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                {tr(locale, 'Strategische Auswahl von Partnern, Systemen und Tools', 'Strategic selection of partners, systems, and tools')}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                {tr(
                  locale,
                  'Die sorgfältige Auswahl von Partnern, Systemen und Tools im E-Commerce ermöglicht, dass Unternehmen agil, wettbewerbsfähig und kundenorientiert bleiben, was für den langfristigen Erfolg in einem sich schnell entwickelnden Markt entscheidend ist.',
                  'Careful selection of partners, systems, and tools in e-commerce helps companies stay agile, competitive, and customer-centric — crucial for long-term success in a fast-moving market.',
                )}
              </p>

              <LogoCarousel className="mt-8 rounded-2xl border border-zinc-200 bg-white/60 px-2 dark:border-zinc-800 dark:bg-zinc-950/40" />

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    n: '01.',
                    tDe: 'Effizienz & Skalierbarkeit',
                    tEn: 'Efficiency & scalability',
                    dDe: 'Automatisierte und skalierbare Systeme optimieren Abläufe, sparen Zeit und wachsen flexibel mit Ihrem Business.',
                    dEn: 'Automated, scalable systems streamline operations, save time, and grow with your business.',
                  },
                  {
                    n: '02.',
                    tDe: 'Kundenerlebnis & Bindung',
                    tEn: 'Customer experience & retention',
                    dDe: 'Personalisierte Empfehlungen, einfache Zahlungen und schnelle Suche schaffen Einkaufserlebnisse, die Kunden lieben.',
                    dEn: 'Personalized recommendations, frictionless payments, and fast search create shopping experiences customers love.',
                  },
                  {
                    n: '03.',
                    tDe: 'Daten & Sicherheit',
                    tEn: 'Data & security',
                    dDe: 'Nutzen Sie wertvolle Insights für bessere Entscheidungen – mit maximaler Datensicherheit und Compliance.',
                    dEn: 'Use valuable insights to make better decisions — with maximum data security and compliance.',
                  },
                  {
                    n: '04.',
                    tDe: 'Innovation & Wettbewerbsvorteil',
                    tEn: 'Innovation & competitive edge',
                    dDe: 'Setzen Sie auf moderne Technologien und Partnerschaften, um Märkte zu erobern und der Konkurrenz voraus zu sein.',
                    dEn: 'Leverage modern technologies and partnerships to win markets and stay ahead of the competition.',
                  },
                ].map((x) => (
                  <div
                    key={x.n}
                    className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
                  >
                    <div className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                      {x.n}
                    </div>
                    <div className="mt-2 text-base font-semibold text-zinc-900 dark:text-white">
                      {tr(locale, x.tDe, x.tEn)}
                    </div>
                    <p className="mt-2 text-base leading-7 text-zinc-600 dark:text-zinc-300">
                      {tr(locale, x.dDe, x.dEn)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <ButtonLink href="/leistungen/partners-und-tools">
                  {tr(locale, 'Mehr erfahren', 'Learn more')}
                </ButtonLink>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-14 sm:py-16">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300">
                  {tr(locale, 'Unser Anspruch', 'Our standard')}
                </p>
                <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                  {tr(
                    locale,
                    'Messbare Erfolge, zufriedene Kunden und nachhaltiges Wachstum.',
                    'Measurable results, happy customers, sustainable growth.',
                  )}
                </h2>
                <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-300">
                  {tr(
                    locale,
                    'Wir helfen E-Commerce-Unternehmen, ihr volles Potenzial auszuschöpfen – mit Strategie, Design, Technologie und datengetriebenem Wachstum.',
                    'We help e-commerce companies unlock their full potential — with strategy, design, technology, and data-driven growth.',
                  )}
                </p>
              </div>

              <div className="rounded-3xl border border-zinc-200 bg-white p-7 dark:border-zinc-800 dark:bg-zinc-950 sm:p-8">
                <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                  {tr(locale, 'Häufig gestellte Fragen (FAQ)', 'Frequently asked questions (FAQ)')}
                </h3>
                <div className="mt-6 grid gap-3">
                  {faqs.map((f) => (
                    <details
                      key={f.qDe}
                      className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 open:bg-white dark:border-zinc-800 dark:bg-zinc-900/30 dark:open:bg-zinc-950"
                    >
                      <summary className="cursor-pointer text-base font-semibold text-zinc-900 dark:text-white">
                        {tr(locale, f.qDe, f.qEn)}
                      </summary>
                      <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-300">
                        {tr(locale, f.aDe, f.aEn)}
                      </p>
                    </details>
                  ))}
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
                  'Schreib uns kurz, worum es geht – wir melden uns zeitnah zurück.',
                  'Tell us briefly what it’s about — we’ll get back to you soon.',
                )}
              </p>

              <form
                className="mt-6 grid gap-4 sm:grid-cols-2"
                onSubmit={async (e) => {
                  e.preventDefault()
                  setContactStatus('sending')
                  setContactError('')
                  setContactFieldErrors({})

                  const form = e.currentTarget
                  const fd = new FormData(form)
                  const payload = {
                    name: String(fd.get('name') ?? ''),
                    email: String(fd.get('email') ?? ''),
                    message: String(fd.get('message') ?? ''),
                    _hp: String(fd.get('_hp') ?? ''),
                    turnstileToken: captchaToken,
                  }

                  const nextErrors: typeof contactFieldErrors = {}
                  if (!payload.name.trim()) nextErrors.name = tr(locale, 'Pflichtfeld', 'Required')
                  if (!payload.email.trim()) nextErrors.email = tr(locale, 'Pflichtfeld', 'Required')
                  if (!payload.message.trim()) nextErrors.message = tr(locale, 'Pflichtfeld', 'Required')
                  if (!captchaToken) nextErrors.captcha = tr(locale, 'Bitte Captcha ausfüllen', 'Please complete the captcha')
                  if (Object.keys(nextErrors).length) {
                    setContactFieldErrors(nextErrors)
                    setContactError(tr(locale, 'Bitte prüfen Sie die markierten Felder.', 'Please check the highlighted fields.'))
                    setContactStatus('error')
                    return
                  }

                  try {
                    const r = await fetch('/api/contact', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(payload),
                    })
                    const raw = await r.text()
                    let json: { ok?: boolean; error?: string } | null = null
                    try {
                      json = raw ? (JSON.parse(raw) as { ok?: boolean; error?: string }) : null
                    } catch {
                      // non-JSON response (often HTML from proxy/redirect)
                    }

                    if (!r.ok || !json?.ok) {
                      const looksLikeHtml = raw.trim().startsWith('<!DOCTYPE') || raw.trim().startsWith('<html')
                      const fallback = looksLikeHtml
                        ? tr(
                            locale,
                            'Server-Antwort war HTML (Proxy/Redirect). Bitte prüfe, ob `/api/contact` wirklich auf die Next.js-App zeigt.',
                            'Server returned HTML (proxy/redirect). Please verify `/api/contact` routes to the Next.js app.',
                          )
                        : raw.slice(0, 200)
                      throw new Error(json?.error || fallback || 'Request failed')
                    }
                    form.reset()
                    setCaptchaToken('')
                    setCaptchaKey((k) => k + 1)
                    setContactStatus('sent')
                  } catch (err) {
                    setContactStatus('error')
                    setContactError(err instanceof Error ? err.message : 'Unknown error')
                  }
                }}
              >
                <input
                  name="_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                  defaultValue=""
                />
                <label className="grid gap-1">
                  <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    {tr(locale, 'Name', 'Name')}
                  </span>
                  <input
                    name="name"
                    required
                    minLength={2}
                    aria-invalid={Boolean(contactFieldErrors.name)}
                    onInvalid={(e) => {
                      const el = e.currentTarget
                      if (el.validity.valueMissing) {
                        el.setCustomValidity(tr(locale, 'Bitte Name eingeben.', 'Please enter your name.'))
                      } else if (el.validity.tooShort) {
                        el.setCustomValidity(
                          tr(locale, 'Bitte mindestens 2 Zeichen eingeben.', 'Please enter at least 2 characters.'),
                        )
                      } else {
                        el.setCustomValidity('')
                      }
                    }}
                    onInput={(e) => e.currentTarget.setCustomValidity('')}
                    className={[
                      'h-11 rounded-xl border bg-white px-3 text-sm text-zinc-900 outline-none ring-0 focus:border-zinc-400 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-500',
                      contactFieldErrors.name ? 'border-red-300 dark:border-red-900/60' : 'border-zinc-200 dark:border-zinc-800',
                    ].join(' ')}
                    placeholder={tr(locale, 'Max Mustermann', 'Jane Doe')}
                  />
                  {contactFieldErrors.name ? (
                    <div className="text-xs font-semibold text-red-700 dark:text-red-300">{contactFieldErrors.name}</div>
                  ) : null}
                </label>

                <label className="grid gap-1">
                  <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    {tr(locale, 'E-Mail', 'Email')}
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    aria-invalid={Boolean(contactFieldErrors.email)}
                    onInvalid={(e) => {
                      const el = e.currentTarget
                      if (el.validity.valueMissing) {
                        el.setCustomValidity(tr(locale, 'Bitte E-Mail eingeben.', 'Please enter your email address.'))
                      } else if (el.validity.typeMismatch) {
                        el.setCustomValidity(
                          tr(locale, 'Bitte eine gültige E-Mail eingeben.', 'Please enter a valid email address.'),
                        )
                      } else {
                        el.setCustomValidity('')
                      }
                    }}
                    onInput={(e) => e.currentTarget.setCustomValidity('')}
                    className={[
                      'h-11 rounded-xl border bg-white px-3 text-sm text-zinc-900 outline-none ring-0 focus:border-zinc-400 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-500',
                      contactFieldErrors.email ? 'border-red-300 dark:border-red-900/60' : 'border-zinc-200 dark:border-zinc-800',
                    ].join(' ')}
                    placeholder={tr(locale, 'name@firma.de', 'name@company.com')}
                  />
                  {contactFieldErrors.email ? (
                    <div className="text-xs font-semibold text-red-700 dark:text-red-300">{contactFieldErrors.email}</div>
                  ) : null}
                </label>

                <label className="grid gap-1 sm:col-span-2">
                  <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    {tr(locale, 'Nachricht', 'Message')}
                  </span>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    minLength={10}
                    aria-invalid={Boolean(contactFieldErrors.message)}
                    onInvalid={(e) => {
                      const el = e.currentTarget
                      if (el.validity.valueMissing) {
                        el.setCustomValidity(tr(locale, 'Bitte Nachricht eingeben.', 'Please enter a message.'))
                      } else if (el.validity.tooShort) {
                        el.setCustomValidity(
                          tr(locale, 'Bitte mindestens 10 Zeichen eingeben.', 'Please enter at least 10 characters.'),
                        )
                      } else {
                        el.setCustomValidity('')
                      }
                    }}
                    onInput={(e) => e.currentTarget.setCustomValidity('')}
                    className={[
                      'rounded-xl border bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-0 focus:border-zinc-400 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-500',
                      contactFieldErrors.message ? 'border-red-300 dark:border-red-900/60' : 'border-zinc-200 dark:border-zinc-800',
                    ].join(' ')}
                    placeholder={tr(locale, 'Wobei können wir helfen?', 'How can we help?')}
                  />
                  {contactFieldErrors.message ? (
                    <div className="text-xs font-semibold text-red-700 dark:text-red-300">
                      {contactFieldErrors.message}
                    </div>
                  ) : null}
                </label>

                <div className="sm:col-span-2">
                  {siteKey ? (
                    <>
                      <TurnstileWidget
                        key={captchaKey}
                        siteKey={siteKey}
                        onToken={(t) => setCaptchaToken(t)}
                        className="mt-1"
                      />
                      {contactFieldErrors.captcha ? (
                        <div className="mt-2 text-xs font-semibold text-red-700 dark:text-red-300">
                          {contactFieldErrors.captcha}
                        </div>
                      ) : null}
                    </>
                  ) : (
                    <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      {tr(
                        locale,
                        'Captcha ist noch nicht konfiguriert (NEXT_PUBLIC_TURNSTILE_SITE_KEY).',
                        'Captcha is not configured yet (NEXT_PUBLIC_TURNSTILE_SITE_KEY).',
                      )}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={contactStatus === 'sending'}
                    className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 dark:focus-visible:ring-white dark:focus-visible:ring-offset-zinc-950"
                  >
                    {contactStatus === 'sending'
                      ? tr(locale, 'Sende…', 'Sending…')
                      : tr(locale, 'Senden', 'Send')}
                  </button>
                  {contactStatus === 'sent' ? (
                    <div className="mt-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200">
                      {tr(
                        locale,
                        'Vielen Dank für Ihre Nachricht! Wir melden uns schnellstmöglich bei Ihnen zurück!',
                        'Thanks! We will get back to you as soon as possible.',
                      )}
                    </div>
                  ) : null}
                  {contactStatus === 'error' ? (
                    <div className="mt-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
                      {tr(locale, 'Senden fehlgeschlagen:', 'Sending failed:')} {contactError}
                    </div>
                  ) : null}
                </div>
              </form>
            </div>
          </Container>
        </section>
      </main>

      <footer className="border-t border-zinc-200 py-10 dark:border-zinc-800">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              ECOMMLAB GmbH © {new Date().getFullYear()}
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <Link
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                href="/impressum"
              >
                {tr(locale, 'Impressum', 'Legal notice')}
              </Link>
              <Link
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                href="/datenschutzbestimmungen"
              >
                {tr(locale, 'Datenschutz', 'Privacy')}
              </Link>
              <a
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                href="mailto:hello@ecommlab.io"
              >
                hello@ecommlab.io
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  )
}

