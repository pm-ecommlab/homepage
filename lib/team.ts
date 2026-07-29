export type TeamMember = {
  slug: string
  name: string
  role: { de: string; en: string }
  bio?: { de: string; en: string }
  photo?: string
  email?: string
  linkedin?: string
}

export const team: readonly TeamMember[] = [
  {
    slug: 'andrey-cekovski',
    name: 'Andrey Cekovski',
    role: {
      de: 'Geschäftsführer & Technologie-Strategie',
      en: 'Managing Director & Technology Strategy',
    },
    bio: {
      de: 'Über 15 Jahre Erfahrung in Software Development und Performance Online Marketing. Projektleitung für Kunden wie Allianz, Thomas Cook, PayPal, HRS, alltours, Galeria Kaufhof und Conrad Electronic. Zuletzt CTO der One Advertising AG (diva-e Advertising GmbH). Dipl.-Informatik an der TUM. Schwerpunkte: Konzeption und Optimierung technischer und betrieblicher Prozesse, Entwicklung technologischer Strategien sowie Performance Online Marketing und Digitalstrategien.',
      en: 'More than 15 years of experience in software development and performance online marketing. Led projects for clients like Allianz, Thomas Cook, PayPal, HRS, alltours, Galeria Kaufhof and Conrad Electronic. Most recently CTO of One Advertising AG (diva-e Advertising GmbH). Computer Science degree (Dipl.-Informatik) from TUM. Focus areas: design and optimization of technical and operational processes, technology strategy and standards, performance online marketing and digital strategies.',
    },
  },
  {
    slug: 'pavel-mihaylov',
    name: 'Pavel Mihaylov',
    role: {
      de: 'Geschäftsführer & E-Commerce Development',
      en: 'Managing Director & E-Commerce Development',
    },
    bio: {
      de: 'Über 15 Jahre Erfahrung in E-Commerce-Projekten und mehr als 80 erfolgreich umgesetzte Projekte für Kunden wie Newone, Pfundskerl, Liquid Life, Terracanis, Picard, Peter Kaiser, Sport Conrad und Sioux. Zuletzt Head of E-Commerce Development bei der One Commerce GmbH. Dipl.-Informatik an der TUM. Schwerpunkte: technische Konzeption von E-Commerce- und IT-Systemlandschaften, Umsetzung individueller und anspruchsvoller Shopsysteme und Prozesse sowie E-Commerce Performance Optimization.',
      en: 'More than 15 years of experience in e-commerce projects and over 80 successfully delivered projects for clients like Newone, Pfundskerl, Liquid Life, Terracanis, Picard, Peter Kaiser, Sport Conrad and Sioux. Most recently Head of E-Commerce Development at One Commerce GmbH. Computer Science degree (Dipl.-Informatik) from TUM. Focus areas: technical design of e-commerce and IT system landscapes, implementation of custom and demanding shop systems and processes, and e-commerce performance optimization.',
    },
  },
  {
    slug: 'claudia-toepfer',
    name: 'Claudia Töpfer',
    role: {
      de: 'Content Marketing & Editorial',
      en: 'Content Marketing & Editorial',
    },
  },
  {
    slug: 'georgi-kasev',
    name: 'Georgi Kasev',
    role: {
      de: 'Frontend Development',
      en: 'Frontend Development',
    },
  },
  {
    slug: 'yurii-savchenko',
    name: 'Yurii Savchenko',
    role: {
      de: 'Backend Development',
      en: 'Backend Development',
    },
  },
  {
    slug: 'alex-strilenko',
    name: 'Alex Strilenko',
    role: {
      de: 'Frontend Development',
      en: 'Frontend Development',
    },
  },
  {
    slug: 'andrey-stoychev',
    name: 'Andrey Stoychev',
    role: {
      de: 'Projektmanagement',
      en: 'Project Management',
    },
  },
  {
    slug: 'anna-sibiryakova',
    name: 'Anna Sibiryakova',
    role: {
      de: 'SEO-Expertin',
      en: 'SEO Expert',
    },
  },
  {
    slug: 'mila-tabakova',
    name: 'Mila Tabakova',
    role: {
      de: 'Affiliate Marketing',
      en: 'Affiliate Marketing',
    },
  },
  {
    slug: 'yordanka-mihova',
    name: 'Yordanka Mihova',
    role: {
      de: 'QA Manager',
      en: 'QA Manager',
    },
  },
] as const

export function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}
