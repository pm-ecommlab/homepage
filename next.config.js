/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['de', 'en'],
    defaultLocale: 'de',
  },
  devIndicators: {
    buildActivity: false,
  },
}

module.exports = nextConfig
