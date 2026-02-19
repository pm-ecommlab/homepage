import type { GetServerSideProps } from 'next'

export default function EcommlabRedirect() {
  return null
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Avoid duplicate content: /ecommlab should be the homepage (/)
  // Respect locale routing: /en/ecommlab -> /en
  const destination = ctx.locale === 'en' ? '/en' : '/'
  return {
    redirect: {
      destination,
      permanent: true,
    },
  }
}

