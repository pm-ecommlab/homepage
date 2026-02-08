import { Html, Head, Main, NextScript } from 'next/document'
import type { DocumentContext } from 'next/document'

export default function Document() {
  return (
    <Html lang="de">
      <Head />
      <body>
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
