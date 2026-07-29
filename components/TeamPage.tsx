import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Container } from './Container'
import { SiteHeader } from './SiteHeader'
import { ButtonLink } from './ButtonLink'
import { team, getInitials, type TeamMember } from '../lib/team'
import { normalizeLocale, tr, type AppLocale } from '../lib/i18n'

function Avatar({ member, size = 'md' }: { member: TeamMember; size?: 'md' | 'lg' }) {
  const wrapperBase =
    'relative aspect-square w-full overflow-hidden rounded-full border border-zinc-200 dark:border-zinc-800'
  const initialsTextSize = size === 'lg' ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl'

  if (member.photo) {
    return (
      <div className={`${wrapperBase} bg-zinc-100 dark:bg-zinc-900`}>
        <Image
          src={member.photo}
          alt={member.name}
          fill
          sizes={size === 'lg' ? '(max-width: 1024px) 50vw, 240px' : '(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 200px'}
          className="object-cover"
        />
      </div>
    )
  }

  return (
    <div
      className={`${wrapperBase} flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-fuchsia-100 dark:from-sky-900/40 dark:via-zinc-900 dark:to-fuchsia-900/40`}
    >
      <span className={`font-semibold tracking-tight text-zinc-900 dark:text-white ${initialsTextSize}`}>
        {getInitials(member.name)}
      </span>
    </div>
  )
}

function MemberCard({
  member,
  locale,
  onOpen,
}: {
  member: TeamMember
  locale: AppLocale
  onOpen?: (member: TeamMember) => void
}) {
  const isInteractive = Boolean(member.bio && onOpen)

  const inner = (
    <>
      <div className="mx-auto w-28 sm:w-32">
        <Avatar member={member} />
      </div>

      <div className="mt-5 text-center">
        <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-white">
          {member.name}
        </h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
          {member.role[locale]}
        </p>

        {isInteractive ? (
          <p className="mt-4 text-sm font-semibold text-zinc-900 dark:text-white">
            {tr(locale, 'mehr erfahren', 'learn more')}{' '}
            <span className="inline-block transition group-hover:translate-x-0.5">→</span>
          </p>
        ) : null}

        {(member.email || member.linkedin) && (
          <div className="mt-4 flex items-center justify-center gap-3">
            {member.email ? (
              <a
                href={`mailto:${member.email}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
                aria-label={tr(locale, `E-Mail an ${member.name}`, `Email ${member.name}`)}
                title={member.email}
              >
                <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4">
                  <path
                    fill="currentColor"
                    d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 2v.4l8 5 8-5V7H4Zm16 2.6-7.4 4.6a1 1 0 0 1-1.2 0L4 9.6V17h16V9.6Z"
                  />
                </svg>
              </a>
            ) : null}
            {member.linkedin ? (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
                aria-label={`LinkedIn: ${member.name}`}
                title="LinkedIn"
              >
                <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4">
                  <path
                    fill="currentColor"
                    d="M6.94 6.5a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM4.8 21.6h4.3V8.3H4.8v13.3ZM13 8.3h-4.1v13.3h4.1v-7c0-1.9.4-3.7 2.7-3.7 2.2 0 2.2 2.1 2.2 3.8v7h4.1v-7.7c0-3.8-.8-6.7-5.2-6.7-2.1 0-3.5 1.1-4.1 2.2h-.1V8.3Z"
                  />
                </svg>
              </a>
            ) : null}
          </div>
        )}
      </div>
    </>
  )

  if (isInteractive) {
    return (
      <button
        type="button"
        onClick={() => onOpen?.(member)}
        className="group block w-full rounded-3xl border border-zinc-200 bg-white p-6 text-left transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-950"
        aria-haspopup="dialog"
      >
        {inner}
      </button>
    )
  }

  return (
    <article className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      {inner}
    </article>
  )
}

function MemberModal({
  member,
  locale,
  onClose,
}: {
  member: TeamMember
  locale: AppLocale
  onClose: () => void
}) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`team-modal-${member.slug}-title`}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden
      />

      <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-900 transition hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
          aria-label={tr(locale, 'Schließen', 'Close')}
        >
          <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4">
            <path
              fill="currentColor"
              d="M6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12 19 6.4 17.6 5 12 10.6 6.4 5Z"
            />
          </svg>
        </button>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="w-32 flex-none sm:w-40">
            <Avatar member={member} size="lg" />
          </div>
          <div className="min-w-0 flex-1 pr-8 sm:pr-0">
            <h3
              id={`team-modal-${member.slug}-title`}
              className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white"
            >
              {member.name}
            </h3>
            <p className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
              {member.role[locale]}
            </p>
            {member.bio ? (
              <p className="mt-5 text-base leading-7 text-zinc-600 dark:text-zinc-300">
                {member.bio[locale]}
              </p>
            ) : null}

            {(member.email || member.linkedin) && (
              <div className="mt-6 flex items-center gap-3">
                {member.email ? (
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex h-10 items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
                  >
                    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4">
                      <path
                        fill="currentColor"
                        d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 2v.4l8 5 8-5V7H4Zm16 2.6-7.4 4.6a1 1 0 0 1-1.2 0L4 9.6V17h16V9.6Z"
                      />
                    </svg>
                    {tr(locale, 'E-Mail', 'Email')}
                  </a>
                ) : null}
                {member.linkedin ? (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
                  >
                    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4">
                      <path
                        fill="currentColor"
                        d="M6.94 6.5a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM4.8 21.6h4.3V8.3H4.8v13.3ZM13 8.3h-4.1v13.3h4.1v-7c0-1.9.4-3.7 2.7-3.7 2.2 0 2.2 2.1 2.2 3.8v7h4.1v-7.7c0-3.8-.8-6.7-5.2-6.7-2.1 0-3.5 1.1-4.1 2.2h-.1V8.3Z"
                      />
                    </svg>
                    LinkedIn
                  </a>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function TeamPage() {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)

  const [activeMember, setActiveMember] = useState<TeamMember | null>(null)

  const founders = team.filter((m) => Boolean(m.bio))
  const members = team.filter((m) => !m.bio)

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
                {tr(locale, 'Unser Team', 'Our team')}
              </p>
              <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
                {tr(locale, 'Die Menschen hinter Ecommlab', 'The people behind Ecommlab')}
              </h1>
              <p className="mt-5 max-w-3xl text-pretty text-base leading-7 text-zinc-600 dark:text-zinc-300">
                {tr(
                  locale,
                  'Ein schlagkräftiges Team aus klugen Köpfen, das jede Aufgabe meistert. Zusätzlich verfügen wir über ein breites Netzwerk an Experten, die wir bei Bedarf projektbezogen heranziehen können – mit Ecommlab als Hauptansprechpartner für Kommunikation, Steuerung und Qualitätssicherung.',
                  'A close-knit team of bright minds that delivers on any challenge. We also have a broad network of specialists we can bring in on demand — with Ecommlab as your single point of contact for communication, coordination and quality assurance.',
                )}
              </p>
            </div>
          </Container>
        </section>

        {founders.length > 0 ? (
          <section className="py-14 sm:py-16">
            <Container>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                  {tr(locale, 'Geschäftsführung', 'Management')}
                </h2>
                <p className="mt-2 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
                  {tr(
                    locale,
                    'Über 30 Jahre gemeinsame Erfahrung in E-Commerce, Software-Entwicklung und Performance Marketing. Klick auf eine Karte, um mehr zu erfahren.',
                    'More than 30 combined years of experience in e-commerce, software development and performance marketing. Click a card to learn more.',
                  )}
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {founders.map((member) => (
                  <MemberCard
                    key={member.slug}
                    member={member}
                    locale={locale}
                    onOpen={setActiveMember}
                  />
                ))}
              </div>
            </Container>
          </section>
        ) : null}

        {members.length > 0 ? (
          <section className="py-14 sm:py-16">
            <Container>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                  {tr(locale, 'Das Team', 'The team')}
                </h2>
                <p className="mt-2 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
                  {tr(
                    locale,
                    'Spezialist:innen aus Entwicklung, Design, Marketing und Projektmanagement.',
                    'Specialists from development, design, marketing and project management.',
                  )}
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {members.map((member) => (
                  <MemberCard key={member.slug} member={member} locale={locale} />
                ))}
              </div>
            </Container>
          </section>
        ) : null}

        <section className="py-14 sm:py-16">
          <Container>
            <div className="rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950 sm:p-10">
              <div className="grid gap-6 lg:grid-cols-3 lg:items-center">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                    {tr(locale, 'Werde Teil unseres Teams', 'Become part of our team')}
                  </h2>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
                    {tr(
                      locale,
                      'Wir suchen regelmäßig Verstärkung – wirf einen Blick auf unsere offenen Positionen oder schreib uns eine Initiativbewerbung.',
                      'We’re regularly hiring — check out our open positions or send us a speculative application.',
                    )}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <ButtonLink href="/karriere">
                    {tr(locale, 'Offene Positionen', 'Open positions')}
                  </ButtonLink>
                  <ButtonLink href="mailto:hello@ecommlab.io">
                    {tr(locale, 'E-Mail schreiben', 'Send email')}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      {activeMember ? (
        <MemberModal
          member={activeMember}
          locale={locale}
          onClose={() => setActiveMember(null)}
        />
      ) : null}
    </div>
  )
}
