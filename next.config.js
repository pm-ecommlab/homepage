/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Slimmer Cloud Run image (see Dockerfile)
  output: 'standalone',
  i18n: {
    locales: ['de', 'en'],
    defaultLocale: 'de',
  },
  async redirects() {
    return [
      // Nur Seiten-URLs umleiten, keine Dateien unter /public/portfolio/*
      { source: '/portfolio', destination: '/referenzen', permanent: true },
      { source: '/portfolio/:slug([^/.]+)', destination: '/referenzen/:slug', permanent: true },
    ]
  },
}

module.exports = nextConfig
