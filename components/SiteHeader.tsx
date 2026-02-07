import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useId, useState } from 'react'
import { Container } from './Container'
import { normalizeLocale, tr } from '../lib/i18n'

const nav = [
  { labelDe: 'Home', labelEn: 'Home', href: '/' },
  { labelDe: 'Referenzen', labelEn: 'Work', href: '/referenzen' },
  { labelDe: 'Leistungen', labelEn: 'Services', href: '/leistungen' },
  { labelDe: 'Karriere', labelEn: 'Careers', href: '/karriere' },
  { labelDe: 'Kontakt', labelEn: 'Contact', href: '/kontakt' },
] as const

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const router = useRouter()
  const locale = normalizeLocale(router.locale)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/60 bg-white/70 backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/60">
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <Link
            href="/ecommlab"
            className="inline-flex items-center"
            aria-label={tr(locale, 'Ecommlab Seite', 'Ecommlab page')}
          >
            <span className="sr-only">ECOMMLAB</span>
            <Image
              src="/brand/logo.svg"
              alt="Ecommlab"
              width={180}
              height={48}
              className="h-8 w-auto dark:hidden"
              priority
            />
            <Image
              src="/brand/logo-white.svg"
              alt="Ecommlab"
              width={180}
              height={48}
              className="hidden h-8 w-auto dark:block"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-5 md:flex" aria-label="Hauptnavigation">
            {nav.map((item) => {
              const className =
                'text-base text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white'
              return (
                <Link key={item.href} className={className} href={item.href}>
                  {tr(locale, item.labelDe, item.labelEn)}
                </Link>
              )
            })}

            <div className="ml-2 flex items-center gap-1 rounded-full border border-zinc-200 bg-white/70 p-1 text-sm dark:border-zinc-800 dark:bg-zinc-950/50">
              <Link
                href={router.asPath}
                locale="de"
                className={[
                  'rounded-full px-2 py-1 font-semibold transition',
                  locale === 'de'
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white',
                ].join(' ')}
                aria-label="Deutsch"
              >
                DE
              </Link>
              <Link
                href={router.asPath}
                locale="en"
                className={[
                  'rounded-full px-2 py-1 font-semibold transition',
                  locale === 'en'
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white',
                ].join(' ')}
                aria-label="English"
              >
                EN
              </Link>
            </div>
          </nav>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white/80 text-zinc-900 shadow-sm backdrop-blur transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-50 dark:hover:bg-zinc-950 md:hidden"
            aria-label={open ? tr(locale, 'Navigation schließen', 'Close navigation') : tr(locale, 'Navigation öffnen', 'Open navigation')}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? tr(locale, 'Schließen', 'Close') : tr(locale, 'Menü', 'Menu')}</span>
            <span aria-hidden="true" className="relative block h-5 w-6">
              <span
                className={[
                  'absolute left-0 top-0 block h-[2px] w-6 rounded-full bg-current transition-transform',
                  open ? 'translate-y-[9px] rotate-45' : '',
                ].join(' ')}
              />
              <span
                className={[
                  'absolute top-[9px] block h-[2px] rounded-full bg-current transition-[opacity,transform,width]',
                  open ? 'left-0 w-6 opacity-0' : 'left-0 w-4 translate-x-2 opacity-100',
                ].join(' ')}
              />
              <span
                className={[
                  'absolute left-0 top-[18px] block h-[2px] w-6 rounded-full bg-current transition-transform',
                  open ? 'translate-y-[-9px] -rotate-45' : '',
                ].join(' ')}
              />
            </span>
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setOpen(false)}
        />

        <div
          id={panelId}
          role="dialog"
          aria-modal="true"
          className={`fixed right-0 top-0 z-50 h-dvh w-[88%] max-w-sm border-l border-zinc-200 bg-white p-5 shadow-2xl transition-transform dark:border-zinc-800 dark:bg-zinc-950 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="font-display text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {tr(locale, 'Navigation', 'Navigation')}
            </div>
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 text-base font-semibold text-zinc-900 shadow-sm transition hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
              onClick={() => setOpen(false)}
            >
              {tr(locale, 'Schließen', 'Close')}
            </button>
          </div>

          <nav className="mt-6 grid gap-1" aria-label={tr(locale, 'Mobile Navigation', 'Mobile navigation')}>
            {nav.map((item) => {
              const className =
                'rounded-xl px-3 py-3 text-base font-semibold text-zinc-900 hover:bg-zinc-50 dark:text-zinc-50 dark:hover:bg-zinc-900'

              return (
                <Link
                  key={item.href}
                  className={className}
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  {tr(locale, item.labelDe, item.labelEn)}
                </Link>
              )
            })}
          </nav>

          <div className="mt-6 border-t border-zinc-200 pt-6 text-sm leading-6 text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
            {tr(locale, 'Tipp: Mit ', 'Tip: Press ')}
            <kbd className="rounded border px-1">Esc</kbd>
            {tr(locale, ' kannst du das Menü schließen.', ' to close the menu.')}
          </div>
        </div>
      </div>
    </header>
  )
}

