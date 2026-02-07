export type PortfolioItem = {
  slug: string
  title: string
  imageSrc: string
  tags: readonly string[]
}

export const portfolioItems: readonly PortfolioItem[] = [
  {
    slug: 'newone',
    title: 'Newone',
    imageSrc: '/portfolio/newone.png',
    tags: ['Agency', 'Development', 'Digital', 'Ecommerce', 'Performance'],
  },
  {
    slug: 'baer-schuhe',
    title: 'Bär Schuhe',
    imageSrc: '/portfolio/baer-header.png',
    tags: ['Agency', 'Development', 'Digital', 'Ecommerce', 'Marketing', 'Performance', 'SEO'],
  },
  {
    slug: 'liquid-life',
    title: 'Liquid Life',
    imageSrc: '/portfolio/liquid-life.png',
    tags: [
      'Agency',
      'Design',
      'Development',
      'Digital',
      'Ecommerce',
      'Marketing',
      'Performance',
      'UI/UX',
      'Web design',
    ],
  },
  {
    slug: 'pfundskerl-xxl-de',
    title: 'Pfundskerl',
    imageSrc: '/portfolio/pfundskerl.jpeg',
    tags: ['Agency', 'Development', 'Digital', 'Ecommerce', 'Marketing', 'Performance', 'SEO', 'UI/UX'],
  },
  {
    slug: 'kaipara',
    title: 'Kaipara',
    imageSrc: '/portfolio/kaipara.jpg',
    tags: ['Agency', 'Design', 'Development', 'Digital', 'Ecommerce', 'UI/UX', 'Web design'],
  },
  {
    slug: 'riess-ambiente',
    title: 'Riess-Ambiente',
    imageSrc: '/portfolio/riess-ambiente.png',
    tags: [
      'Agency',
      'Design',
      'Development',
      'Digital',
      'Ecommerce',
      'Marketing',
      'Performance',
      'SEO',
      'UI/UX',
      'Web design',
    ],
  },
] as const

export const portfolioTags: readonly string[] = [
  'Show All',
  'Agency',
  'Development',
  'Digital',
  'Marketing',
  'Performance',
  'SEO',
  'Web design',
] as const

