import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    const gtmId = process.env.NEXT_PUBLIC_GTM_ID
    const locale = this.props.__NEXT_DATA__?.locale === 'en' ? 'en' : 'de'

    return (
      <Html lang={locale}>
        <Head>
          <script
            src="https://monitor.ecommlab.io/api/rum/script/rum_fc34c67850e5493dad8b9776e5ff42b1"
            async
            defer
          />

          {/*
            GTM immediately (not Cookiebot-blocked). Cookiebot CMP lives in GTM
            on Consent Initialization; GA4 gtag fires on cookie_consent_update.
          */}
          {gtmId ? (
            <>
              {/* eslint-disable-next-line @next/next/next-script-for-ga */}
              <script
                dangerouslySetInnerHTML={{
                  __html: `
window.dataLayer = window.dataLayer || [];
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');
`,
                }}
              />
            </>
          ) : null}
        </Head>
        <body>
          {gtmId ? (
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
                title="Google Tag Manager"
              />
            </noscript>
          ) : null}
          {/* Theme init: avoid flash before hydration */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
(function(){
  try {
    var stored = localStorage.getItem('theme');
    var systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored === 'dark' || stored === 'light' ? stored : (systemDark ? 'dark' : 'light');
    var root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  } catch (e) {}
})();`,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
