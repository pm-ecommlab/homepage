import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Container } from '../components/Container'
import { SiteHeader } from '../components/SiteHeader'
import { normalizeLocale, tr } from '../lib/i18n'

export default function Kontakt() {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)

  return (
    <>
      <Head>
        <title>{tr(locale, 'Kontakt', 'Contact')} – Ecommlab</title>
        <meta
          name="description"
          content={tr(
            locale,
            'Kontaktieren Sie Ecommlab – wir freuen uns auf Ihre Nachricht.',
            'Contact Ecommlab — we look forward to your message.',
          )}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
                  {tr(locale, 'Kontakt', 'Contact')}
                </p>
                <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
                  {tr(
                    locale,
                    'Sie wollen ein neues Projekt starten, in unser Team kommen oder nur „Hi“ sagen?',
                    'Want to start a new project, join our team, or just say hi?',
                  )}
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
                  {tr(locale, 'Wir freuen uns auf Ihre Nachricht.', 'We look forward to hearing from you.')}
                </p>
              </div>
            </Container>
          </section>

          <section className="py-14 sm:py-16">
            <Container>
              <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
                <div className="rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950 sm:p-10">
                  <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                    {tr(locale, 'Kontaktiere uns', 'Get in touch')}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                    {tr(
                      locale,
                      'Schreib uns kurz, worum es geht – wir melden uns zeitnah zurück.',
                      'Tell us briefly what it’s about — we’ll get back to you soon.',
                    )}
                  </p>

                  <form
                    className="mt-6 grid gap-4 sm:grid-cols-2"
                    action="mailto:hello@ecommlab.io"
                    method="post"
                    encType="text/plain"
                  >
                    <label className="grid gap-1">
                      <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        {tr(locale, 'Name', 'Name')}
                      </span>
                      <input
                        name="name"
                        className="h-11 rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none ring-0 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-500"
                        placeholder={tr(locale, 'Max Mustermann', 'Jane Doe')}
                      />
                    </label>

                    <label className="grid gap-1">
                      <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        {tr(locale, 'E-Mail', 'Email')}
                      </span>
                      <input
                        name="email"
                        type="email"
                        className="h-11 rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none ring-0 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-500"
                        placeholder={tr(locale, 'name@firma.de', 'name@company.com')}
                      />
                    </label>

                    <label className="grid gap-1 sm:col-span-2">
                      <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        {tr(locale, 'Nachricht', 'Message')}
                      </span>
                      <textarea
                        name="message"
                        rows={6}
                        className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-0 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-500"
                        placeholder={tr(locale, 'Wobei können wir helfen?', 'How can we help?')}
                      />
                    </label>

                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 dark:focus-visible:ring-white dark:focus-visible:ring-offset-zinc-950"
                      >
                        {tr(locale, 'Senden', 'Send')}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900/30 sm:p-10">
                  <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                    {tr(locale, 'Direkter Kontakt', 'Direct contact')}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                    E-Mail:{' '}
                    <a className="underline underline-offset-4 hover:no-underline" href="mailto:hello@ecommlab.io">
                      hello@ecommlab.io
                    </a>
                    <br />
                    Telefon: +49 89 41 61 62 48
                  </p>

                  <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm">
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
                      {tr(locale, 'Datenschutzbestimmungen', 'Privacy policy')}
                    </Link>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        </main>
      </div>
    </>
  )
}

