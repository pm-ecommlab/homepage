import Head from 'next/head'
import { useRouter } from 'next/router'
import { Container } from '../components/Container'
import { SiteHeader } from '../components/SiteHeader'
import { normalizeLocale, tr } from '../lib/i18n'

function H2({ children }: { children: string }) {
  return (
    <h2 className="mt-10 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
      {children}
    </h2>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{children}</p>
}

export default function Nutzungsbedingungen() {
  const router = useRouter()
  const locale = normalizeLocale(router.locale)

  return (
    <>
      <Head>
        <title>{`${tr(locale, 'AGBs', 'Terms')} – Ecommlab`}</title>
        <meta
          name="description"
          content={tr(
            locale,
            'Allgemeine Geschäftsbedingungen der Ecommlab GmbH.',
            'Terms and conditions of Ecommlab GmbH.',
          )}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen">
        <SiteHeader />
        <main>
          <section className="py-14 sm:py-16">
            <Container>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300">
                {tr(locale, 'Rechtliches', 'Legal')}
              </p>
              <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
                {tr(locale, 'AGBs', 'Terms')}
              </h1>

              <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950 sm:p-10">
                <P>{tr(locale, 'Datum des Inkrafttretens – 1. Januar 2024', 'Effective date – January 1, 2024')}</P>
                <P>
                  {tr(
                    locale,
                    'Diese Bedingungen regeln den Zugang zu und die Nutzung aller Inhalte, Produkte und Dienste auf dieser Website. Ihr Zugang unterliegt Ihrer Zustimmung zu den hier enthaltenen Bestimmungen sowie allen weiteren von uns veröffentlichten Regeln und Richtlinien.',
                    'These terms govern access to and use of all content, products, and services on this website. Access is subject to your acceptance of these terms and all additional rules and policies published by us.',
                  )}
                </P>
                <P>
                  {tr(
                    locale,
                    'Bitte lesen Sie diese Vereinbarung sorgfältig. Wenn Sie mit einem Teil dieser Bedingungen nicht einverstanden sind, dürfen Sie unsere Dienste nicht nutzen.',
                    'Please read this agreement carefully. If you disagree with any part of these terms, you must not use our services.',
                  )}
                </P>

                <H2>{tr(locale, 'Geistiges Eigentum', 'Intellectual property')}</H2>
                <P>
                  {tr(
                    locale,
                    'Diese Vereinbarung überträgt kein geistiges Eigentum von Ecommlab GmbH oder Dritten auf Sie. Alle Rechte, Ansprüche und Interessen verbleiben ausschließlich bei Ecommlab GmbH bzw. deren Lizenzgebern.',
                    'This agreement does not transfer any intellectual property of Ecommlab GmbH or third parties to you. All rights, title, and interest remain solely with Ecommlab GmbH and its licensors.',
                  )}
                </P>

                <H2>{tr(locale, 'Dienstleistungen von Dritten', 'Third-party services')}</H2>
                <P>
                  {tr(
                    locale,
                    'Bei der Nutzung unserer Dienste können Dienste Dritter eingesetzt werden. Die Nutzung erfolgt auf eigenes Risiko. Wir übernehmen keine Verantwortung für Inhalte, Waren oder Dienstleistungen solcher Drittanbieter.',
                    'Our services may include third-party services. Their use is at your own risk. We are not responsible for content, goods, or services provided by third parties.',
                  )}
                </P>

                <H2>{tr(locale, 'Konten', 'Accounts')}</H2>
                <P>
                  {tr(
                    locale,
                    'Falls ein Konto erforderlich ist, müssen Sie vollständige und korrekte Informationen bereitstellen. Sie sind verantwortlich für alle Aktivitäten in Ihrem Konto sowie für die Sicherheit Ihrer Zugangsdaten.',
                    'If an account is required, you must provide complete and accurate information. You are responsible for all activity in your account and for keeping your credentials secure.',
                  )}
                </P>

                <H2>{tr(locale, 'Terminierung', 'Termination')}</H2>
                <P>
                  {tr(
                    locale,
                    'Wir können den Zugang zu unseren Diensten jederzeit mit oder ohne Grund, mit oder ohne Vorankündigung beenden oder aussetzen. Bestimmungen, die ihrer Natur nach fortgelten sollen, bleiben auch nach Beendigung wirksam.',
                    'We may terminate or suspend access to our services at any time, with or without cause or notice. Provisions that by their nature should survive termination remain in effect.',
                  )}
                </P>

                <H2>{tr(locale, 'Haftungsausschluss', 'Disclaimer')}</H2>
                <P>
                  {tr(
                    locale,
                    'Unsere Dienste werden „wie besehen“ und „wie verfügbar“ bereitgestellt. Ecommlab GmbH schließt jegliche ausdrücklichen oder stillschweigenden Gewährleistungen aus.',
                    'Our services are provided “as is” and “as available”. Ecommlab GmbH disclaims all express or implied warranties.',
                  )}
                </P>

                <H2>{tr(locale, 'Zuständigkeit und anwendbares Recht', 'Jurisdiction and governing law')}</H2>
                <P>
                  {tr(
                    locale,
                    'Sofern gesetzlich zulässig, unterliegen diese Bedingungen den Gesetzen Bulgariens. Gerichtsstand für Streitigkeiten sind die zuständigen Gerichte in Bulgarien.',
                    'To the extent permitted by law, these terms are governed by the laws of Bulgaria. The competent courts in Bulgaria have jurisdiction for disputes.',
                  )}
                </P>

                <H2>{tr(locale, 'Änderungen', 'Changes')}</H2>
                <P>
                  {tr(
                    locale,
                    'Ecommlab GmbH kann diese Bedingungen jederzeit ändern. Bei wesentlichen Änderungen informieren wir vor Inkrafttreten der Änderungen über die Website oder per Mitteilung.',
                    'Ecommlab GmbH may change these terms at any time. For material changes, we will notify you on the website or via other notice before they take effect.',
                  )}
                </P>
              </div>
            </Container>
          </section>
        </main>
      </div>
    </>
  )
}

