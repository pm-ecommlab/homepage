export type JobSection =
  | { type: 'paragraphs'; title?: { de: string; en: string }; items: readonly { de: string; en: string }[] }
  | { type: 'bullets'; title: { de: string; en: string }; items: readonly { de: string; en: string }[] }

export type JobPosting = {
  slug: 'senior-frontend-developer' | 'senior-php-magento-developer' | 'senior-fullstack-developer'
  title: { de: string; en: string }
  intro: readonly { de: string; en: string }[]
  sections: readonly JobSection[]
  applyEmail: string
}

export const jobs: readonly JobPosting[] = [
  {
    slug: 'senior-frontend-developer',
    title: { de: '(Senior) Frontend developer (m/w/d)', en: '(Senior) Frontend Developer (m/f/d)' },
    applyEmail: 'hello@ecommlab.io',
    intro: [
      {
        de: 'Ecommlab GmbH, ein dynamisch expandierendes Unternehmen mit Sitz in Deutschland, spezialisiert auf die Entwicklung von E-Commerce-Lösungen, strebt danach, sein Team durch die Rekrutierung von qualifizierten Fachkräften zu verstärken.',
        en: 'Ecommlab GmbH is a fast-growing company based in Germany, specialized in building e-commerce solutions. We are looking to strengthen our team with talented professionals.',
      },
      {
        de: 'Die Gründungspartner von Ecommlab bringen einen reichen Erfahrungsschatz mit, da sie zuvor als Chief Technology Officers (CTOs) in renommierten deutschen IT-Firmen tätig waren.',
        en: 'Our founding partners bring deep experience from previous CTO roles at well-known German IT companies.',
      },
    ],
    sections: [
      {
        type: 'bullets',
        title: { de: 'Was du tun wirst', en: 'What you will do' },
        items: [
          {
            de: 'Implementiere hochwertige und skalierbare Lösungen basierend auf dem LAMP-Stack und modernen Frontend-Technologien und Methoden (wie React, Vue, Angular, PWA)',
            en: 'Implement high-quality, scalable solutions based on the LAMP stack and modern frontend technologies and practices (React, Vue, Angular, PWA)',
          },
          {
            de: 'Entwickle neue und verbessere bestehende individuelle Shop-Funktionalitäten sowie deren Verbindung zu externen Systemen',
            en: 'Build new and improve existing custom shop functionalities and their integrations with external systems',
          },
          {
            de: 'Konzipiere, implementiere und verbessere benutzerdefinierte Module (z.B. für Magento / Shopware)',
            en: 'Design, implement, and enhance custom modules (e.g., for Magento / Shopware)',
          },
          {
            de: 'Bewerte und führe innovative und fortschrittliche Frontend-Technologien basierend auf PWA und GraphQL ein',
            en: 'Evaluate and introduce advanced frontend technologies based on PWA and GraphQL',
          },
          {
            de: 'Übernimm die End-to-End-Verantwortung für Produktfunktionen und sichere die technische und operative Exzellenz dieser Produkte',
            en: 'Take end-to-end ownership of product features and ensure technical and operational excellence',
          },
          {
            de: 'Trage zum Produkt- und Serviceentwicklungsprozess bei; Entwerfe und teste deine eigenen Hypothesen durch das Sammeln und Messen von Daten',
            en: 'Contribute to product and service development; design and test hypotheses by collecting and measuring data',
          },
        ],
      },
      {
        type: 'bullets',
        title: { de: 'Das bringst du mit', en: 'What you bring' },
        items: [
          {
            de: 'Wir suchen proaktive Problemlöser, die motiviert sind zu lernen und fähig zur Zusammenarbeit und zum Austausch von Ideen',
            en: 'You are a proactive problem solver, eager to learn, collaborate, and share ideas',
          },
          { de: 'Ein Studium in Informatik oder einem verwandten Feld', en: 'Degree in computer science or a related field' },
          { de: 'Effektive Kommunikationsfähigkeiten in mündlicher und schriftlicher Form', en: 'Strong verbal and written communication skills' },
          {
            de: 'Eigeninitiative, mit der Fähigkeit, mit begrenzter Aufsicht und als Teamplayer zu arbeiten',
            en: 'Ownership mindset — able to work with limited supervision and as a team player',
          },
          {
            de: 'Mehrjährige Erfahrung in der Entwicklung komplexer Webanwendungen und Backend-Entwicklung',
            en: 'Several years of experience building complex web applications and backend systems',
          },
          {
            de: 'Du kannst erstklassige Frontends mit HTML, LESS/SASS, JavaScript und responsiven Frameworks implementieren',
            en: 'You can implement top-class frontends with HTML, LESS/SASS, JavaScript, and responsive frameworks',
          },
          { de: 'Praktische Erfahrung mit JS-Frameworks wie React, Vue.js oder Angular', en: 'Hands-on experience with JS frameworks like React, Vue.js, or Angular' },
          { de: 'Erfahrung mit Progressive Web Apps, GraphQL, Node.js oder Next.js ist von Vorteil', en: 'Experience with PWAs, GraphQL, Node.js, or Next.js is a plus' },
          { de: 'Erfahrung mit Magento und/oder Shopware sowie mit gängigen Frameworks wie Zend oder Symfony ist von Vorteil', en: 'Experience with Magento and/or Shopware and frameworks like Zend or Symfony is a plus' },
          { de: 'Sichere Anwendung von Bash und Shell ist von Vorteil', en: 'Comfort with Bash and shell scripting is a plus' },
        ],
      },
      {
        type: 'bullets',
        title: { de: 'Das erwartet dich', en: 'What you can expect' },
        items: [
          { de: 'Eine freundliche Arbeitsumgebung, die darauf abzielt, hochwertige Produkte und Dienstleistungen für die Kunden zu liefern', en: 'A friendly environment focused on delivering high-quality products and services' },
          { de: 'Flache Hierarchie mit schnellen Entscheidungsprozessen und lösungsorientiertem Ansatz', en: 'Flat hierarchy with fast decisions and a solution-oriented mindset' },
          { de: 'Flexible Arbeitszeiten, entspannte Arbeitsatmosphäre und die Möglichkeit zum Home-Office', en: 'Flexible working hours, relaxed atmosphere, and the option to work from home' },
          { de: 'Arbeit an herausfordernden Projekten mit erfahrener Leitung', en: 'Work on challenging projects with experienced leadership' },
          { de: 'Potenzial für Wachstum (Teamleitung) und zukünftige Schulungen', en: 'Growth opportunities (incl. leadership) and continuous training' },
          { de: 'Attraktive Vergütung im oberen Bereich', en: 'Attractive compensation' },
          { de: 'Budget für Lernen und Entwicklungsmöglichkeiten sowohl zeitlich als auch finanziell', en: 'Time and budget for learning and development' },
          { de: 'Hochklassige Hardware (auch zur privaten Nutzung) und weitere Vorteile', en: 'High-end hardware (also for private use) and additional perks' },
        ],
      },
    ],
  },
  {
    slug: 'senior-php-magento-developer',
    title: { de: '(Senior) PHP / Magento developer (m/w/d)', en: '(Senior) PHP / Magento Developer (m/f/d)' },
    applyEmail: 'hello@ecommlab.io',
    intro: [
      {
        de: 'Ecommlab GmbH, ein dynamisch expandierendes Unternehmen mit Sitz in Deutschland, spezialisiert auf die Entwicklung von E-Commerce-Lösungen, strebt danach, sein Team durch die Rekrutierung von qualifizierten Fachkräften zu verstärken.',
        en: 'Ecommlab GmbH is a fast-growing company based in Germany, specialized in building e-commerce solutions. We are looking to strengthen our team with talented professionals.',
      },
      {
        de: 'Die Gründungspartner von Ecommlab bringen einen reichen Erfahrungsschatz mit, da sie zuvor als Chief Technology Officers (CTOs) in renommierten deutschen IT-Firmen tätig waren.',
        en: 'Our founding partners bring deep experience from previous CTO roles at well-known German IT companies.',
      },
    ],
    sections: [
      {
        type: 'bullets',
        title: { de: 'Was du tun wirst', en: 'What you will do' },
        items: [
          { de: 'Implementiere hochwertige und skalierbare Lösungen basierend auf Magento Commerce und Magento Open Source', en: 'Implement high-quality, scalable solutions based on Magento Commerce and Magento Open Source' },
          { de: 'Entwickle neue und verbessere bestehende individuelle Shop-Funktionalitäten sowie deren Anbindung an externe Systeme', en: 'Build and improve custom shop functionality and integrations with external systems' },
          { de: 'Konzipiere, implementiere und verbessere Magento-Module', en: 'Design, implement, and enhance Magento modules' },
          { de: 'Integriere fortschrittliche Frontend-Lösungen basierend auf PWA und GraphQL', en: 'Integrate advanced frontend solutions based on PWA and GraphQL' },
          { de: 'Übernimm die End-to-End-Verantwortung für Produktfunktionen und sichere die technische und betriebliche Exzellenz dieser Produkte', en: 'Take end-to-end ownership of product features and ensure technical and operational excellence' },
          { de: 'Trage zum Entwicklungsprozess der Produkte und Dienstleistungen bei; Entwerfe und teste deine eigenen Hypothesen durch Sammeln und Messen von Daten', en: 'Contribute to product/service development; design and test hypotheses by collecting and measuring data' },
        ],
      },
      {
        type: 'bullets',
        title: { de: 'Das bringst du mit', en: 'What you bring' },
        items: [
          {
            de: 'Neben akademischen Qualifikationen suchen wir proaktive Problemlöser, die motiviert sind zu lernen und fähig zur Zusammenarbeit und zum Austausch von Ideen, und vor allem Teamplayer',
            en: 'Beyond academics, you are a proactive problem solver, eager to learn, collaborate, and share ideas — a true team player',
          },
          { de: 'Abschluss in Informatik oder einem verwandten Bereich', en: 'Degree in computer science or a related field' },
          { de: 'Effektive Kommunikationsfähigkeiten in mündlicher und schriftlicher Form', en: 'Strong verbal and written communication skills' },
          { de: 'Eigeninitiative, mit der Fähigkeit, unter begrenzter Aufsicht zu arbeiten und ein Teamplayer zu sein', en: 'Ownership mindset; able to work with limited supervision and collaborate as a team' },
          { de: 'Mehrjährige Erfahrung in der Entwicklung komplexer Webanwendungen und Backend-Entwicklung', en: 'Several years of experience building complex web applications and backend systems' },
          { de: 'Erfahrung mit Magento sowie mit gängigen Frameworks wie Zend oder Symfony', en: 'Experience with Magento and common frameworks like Zend or Symfony' },
          { de: 'Erfahrung mit Versionskontrollsystemen, Varnish und Elasticsearch', en: 'Experience with version control, Varnish, and Elasticsearch' },
          { de: 'Sichere Anwendung von Bash und Shell', en: 'Strong Bash and shell skills' },
          { de: 'Fokus auf hohe Codequalität in Übereinstimmung mit Codekonventionen und strukturierten Deployment-Prozessen', en: 'High code quality mindset, following conventions and structured deployment processes' },
          { de: 'Erfahrung mit Progressive Web Apps, GraphQL, Node.js oder Next.js ist von Vorteil', en: 'Experience with PWAs, GraphQL, Node.js, or Next.js is a plus' },
        ],
      },
      {
        type: 'bullets',
        title: { de: 'Das erwartet dich', en: 'What you can expect' },
        items: [
          { de: 'Eine freundliche Arbeitsumgebung, die darauf abzielt, hochwertige Produkte und Dienstleistungen für die Kunden zu liefern', en: 'A friendly environment focused on delivering high-quality products and services' },
          { de: 'Flache Hierarchie mit schnellen Entscheidungsprozessen und lösungsorientiertem Ansatz', en: 'Flat hierarchy with fast decisions and a solution-oriented mindset' },
          { de: 'Flexible Arbeitszeiten, entspannte Arbeitsatmosphäre und die Möglichkeit zum Home-Office', en: 'Flexible working hours, relaxed atmosphere, and the option to work from home' },
          { de: 'Arbeit an herausfordernden Projekten mit erfahrener Leitung', en: 'Work on challenging projects with experienced leadership' },
          { de: 'Potenzial für Wachstum (Teamleitung) und zukünftige Schulungen', en: 'Growth opportunities (incl. leadership) and continuous training' },
          { de: 'Attraktive Vergütung im oberen Bereich', en: 'Attractive compensation' },
          { de: 'Budget für Lernen und Entwicklungsmöglichkeiten sowohl zeitlich als auch finanziell', en: 'Time and budget for learning and development' },
          { de: 'Hochklassige Hardware (auch zur privaten Nutzung) und weitere Vorteile', en: 'High-end hardware (also for private use) and additional perks' },
        ],
      },
    ],
  },
  {
    slug: 'senior-fullstack-developer',
    title: { de: '(Senior) Fullstack developer (m/w/d)', en: '(Senior) Fullstack Developer (m/f/d)' },
    applyEmail: 'hello@ecommlab.io',
    intro: [
      {
        de: 'Ecommlab GmbH, ein dynamisch expandierendes Unternehmen mit Sitz in Deutschland, spezialisiert auf die Entwicklung von E-Commerce-Lösungen, strebt danach, sein Team durch die Rekrutierung von qualifizierten Fachkräften zu verstärken.',
        en: 'Ecommlab GmbH is a fast-growing company based in Germany, specialized in building e-commerce solutions. We are looking to strengthen our team with talented professionals.',
      },
      {
        de: 'Die Gründungspartner von Ecommlab bringen einen reichen Erfahrungsschatz mit, da sie zuvor als Chief Technology Officers (CTOs) in renommierten deutschen IT-Firmen tätig waren.',
        en: 'Our founding partners bring deep experience from previous CTO roles at well-known German IT companies.',
      },
    ],
    sections: [
      {
        type: 'bullets',
        title: { de: 'Was du tun wirst', en: 'What you will do' },
        items: [
          { de: 'Implementiere hochwertige und skalierbare Lösungen basierend auf dem LAMP-Stack und modernsten Frontend-Technologien und Methoden (wie React, Vue, Angular, PWA)', en: 'Implement high-quality, scalable solutions based on the LAMP stack and modern frontend technologies and practices (React, Vue, Angular, PWA)' },
          { de: 'Entwickle neue und verbessere bestehende individuelle Shop-Funktionalitäten sowie deren Verbindung zu externen Systemen', en: 'Build new and improve existing custom shop functionalities and integrations with external systems' },
          { de: 'Konzipiere, implementiere und verbessere benutzerdefinierte Module (z.B. für Magento / Shopware)', en: 'Design, implement, and enhance custom modules (e.g., for Magento / Shopware)' },
          { de: 'Bewerte und führe innovative und fortschrittliche Frontend-Technologien basierend auf PWA und GraphQL ein', en: 'Evaluate and introduce advanced frontend technologies based on PWA and GraphQL' },
          { de: 'Übernimm die komplette Verantwortung für die Produktfunktionen und garantiere die technische und betriebliche Exzellenz dieser Produkte', en: 'Take full ownership of product features and guarantee technical and operational excellence' },
          { de: 'Trage zum Entwicklungsprozess der Produkte und Dienstleistungen bei; Entwerfe und teste deine eigenen Hypothesen durch das Sammeln und Messen von Daten', en: 'Contribute to product/service development; design and test hypotheses by collecting and measuring data' },
        ],
      },
      {
        type: 'bullets',
        title: { de: 'Das bringst du mit', en: 'What you bring' },
        items: [
          { de: 'Wir suchen proaktive Problemlöser, die motiviert sind zu lernen und fähig zur Zusammenarbeit und zum Austausch von Ideen', en: 'You are a proactive problem solver, eager to learn, collaborate, and share ideas' },
          { de: 'Abschluss in Informatik oder einem verwandten Bereich', en: 'Degree in computer science or a related field' },
          { de: 'Effektive Kommunikationsfähigkeiten in mündlicher und schriftlicher Form', en: 'Strong verbal and written communication skills' },
          { de: 'Eigeninitiative, mit der Fähigkeit, unter begrenzter Aufsicht zu arbeiten und ein Teamplayer zu sein', en: 'Ownership mindset; able to work with limited supervision and collaborate as a team' },
          { de: 'Mehrjährige Erfahrung in der Entwicklung komplexer Webanwendungen und Backend-Entwicklung', en: 'Several years of experience building complex web applications and backend systems' },
          { de: 'Du kannst erstklassige Frontends mit HTML, LESS/SASS, JavaScript und responsiven Frameworks implementieren', en: 'You can implement top-class frontends with HTML, LESS/SASS, JavaScript, and responsive frameworks' },
          { de: 'Praktische Erfahrung mit JS-Frameworks wie React, Vue.js oder Angular', en: 'Hands-on experience with JS frameworks like React, Vue.js, or Angular' },
          { de: 'Erfahrung mit Progressive Web Apps, GraphQL, Node.js oder Next.js ist von Vorteil', en: 'Experience with PWAs, GraphQL, Node.js, or Next.js is a plus' },
          { de: 'Erfahrung mit Magento und/oder Shopware sowie mit gängigen Frameworks wie Zend oder Symfony ist von Vorteil', en: 'Experience with Magento and/or Shopware and frameworks like Zend or Symfony is a plus' },
          { de: 'Sichere Anwendung von Bash und Shell ist von Vorteil', en: 'Comfort with Bash and shell scripting is a plus' },
        ],
      },
      {
        type: 'bullets',
        title: { de: 'Das erwartet dich', en: 'What you can expect' },
        items: [
          { de: 'Eine freundliche Arbeitsumgebung, die darauf abzielt, hochwertige Produkte und Dienstleistungen für die Kunden zu liefern', en: 'A friendly environment focused on delivering high-quality products and services' },
          { de: 'Flache Hierarchie mit schnellen Entscheidungsprozessen und lösungsorientiertem Ansatz', en: 'Flat hierarchy with fast decisions and a solution-oriented mindset' },
          { de: 'Flexible Arbeitszeiten, entspannte Arbeitsatmosphäre und die Möglichkeit zum Home-Office', en: 'Flexible working hours, relaxed atmosphere, and the option to work from home' },
          { de: 'Arbeit an herausfordernden Projekten mit erfahrener Leitung', en: 'Work on challenging projects with experienced leadership' },
          { de: 'Potenzial für Wachstum (Teamleitung) und zukünftige Schulungen', en: 'Growth opportunities (incl. leadership) and continuous training' },
          { de: 'Attraktive Vergütung im oberen Bereich', en: 'Attractive compensation' },
          { de: 'Budget für Lernen und Entwicklungsmöglichkeiten sowohl zeitlich als auch finanziell', en: 'Time and budget for learning and development' },
          { de: 'Hochklassige Hardware (auch zur privaten Nutzung) und weitere Vorteile', en: 'High-end hardware (also for private use) and additional perks' },
        ],
      },
    ],
  },
] as const

export function getJobBySlug(slug: string) {
  return jobs.find((j) => j.slug === slug)
}

