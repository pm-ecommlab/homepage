export type LocalizedText = {
  de: string
  en: string
}

export type LeistungSection = {
  title: LocalizedText
  body: LocalizedText
}

export type LeistungDetail = {
  slug:
    | 'e-commerce'
    | 'web-development'
    | 'onlinemarketing'
    | 'strategy-consulting'
    | 'ux-design-usability'
    | 'seo-content'
    | 'platform-integration'
    | 'prerformance-boosting'
    | 'ki-automation'
    | 'partners-und-tools'
  kicker: LocalizedText
  title: LocalizedText
  intro: LocalizedText
  sections: readonly LeistungSection[]
}

export const leistungDetails: readonly LeistungDetail[] = [
  {
    slug: 'e-commerce',
    kicker: { de: 'Leistungen', en: 'Services' },
    title: {
      de: 'Ihre E‑Commerce‑Lösungen – effizient, sicher, benutzerfreundlich',
      en: 'Your e-commerce solutions — efficient, secure, user-friendly',
    },
    intro: {
      de: 'Bei Ecommlab verstehen wir die Herausforderungen und Chancen des digitalen Handels. Als spezialisierte E‑Commerce‑Agentur bieten wir umfassende Lösungen für Online‑Shop‑Entwicklung und ‑Optimierung, zugeschnitten auf die spezifischen Bedürfnisse Ihres Unternehmens.',
      en: 'At Ecommlab, we understand the challenges and opportunities of digital commerce. As a specialized e-commerce agency, we provide end-to-end solutions for shop development and optimization — tailored to your business needs.',
    },
    sections: [
      {
        title: { de: 'Entwicklung maßgeschneiderter Online‑Shops', en: 'Custom online shop development' },
        body: {
          de: 'Wir erstellen einzigartige, benutzerfreundliche und ästhetisch ansprechende Online‑Shops. Unsere Experten nutzen moderne Technologien und Plattformen, damit Ihr Shop nicht nur gut aussieht, sondern auch funktional und skalierbar ist – von Produktpräsentation bis Checkout‑Optimierung.',
          en: 'We build unique, user-friendly, and visually strong online shops. Using modern technologies and platforms, we ensure your shop is scalable and functional — from product presentation to checkout optimization.',
        },
      },
      {
        title: { de: 'Optimierung für höhere Konversionen', en: 'Conversion optimization' },
        body: {
          de: 'Wir analysieren Ihren bestehenden Shop und identifizieren Verbesserungspotenziale. Mit bewährten UX/UI‑Strategien verbessern wir die Nutzerführung und steigern Konversionsraten nachhaltig.',
          en: 'We analyze your current shop to identify improvements. With proven UX/UI strategies, we improve user journeys and increase conversion rates sustainably.',
        },
      },
      {
        title: { de: 'Integration fortschrittlicher Funktionen', en: 'Advanced feature integrations' },
        body: {
          de: 'E‑Commerce entwickelt sich ständig weiter. Daher integrieren wir moderne Funktionen wie personalisierte Empfehlungen, Chatbots und automatisierte Marketing‑Tools, um das Einkaufserlebnis zu verbessern und Kundenbindung zu stärken.',
          en: 'E-commerce evolves fast. We integrate advanced features like personalized recommendations, chatbots, and marketing automation tools to improve the shopping experience and strengthen retention.',
        },
      },
      {
        title: { de: 'Datengetriebene Entscheidungsfindung', en: 'Data-driven decision making' },
        body: {
          de: 'Wir helfen Ihnen, fundierte Entscheidungen auf Basis von Daten zu treffen. Mit leistungsstarken Analysetools verstehen wir Kundenverhalten und passen Strategien gezielt an.',
          en: 'We help you make confident decisions based on data. Using powerful analytics, we understand customer behavior and adjust strategies with precision.',
        },
      },
      {
        title: { de: 'Unterstützung und Wartung', en: 'Support & maintenance' },
        body: {
          de: 'Auch nach dem Launch sind wir für Sie da – mit fortlaufender Unterstützung und Wartung, damit Ihr Shop reibungslos läuft und technologisch up‑to‑date bleibt.',
          en: 'After launch, we stay by your side with ongoing support and maintenance so your shop runs smoothly and remains up to date.',
        },
      },
    ],
  },
  {
    slug: 'web-development',
    kicker: { de: 'Leistungen', en: 'Services' },
    title: {
      de: 'Wir verwandeln innovative Ideen in funktionale, benutzerfreundliche Online‑Erlebnisse',
      en: 'We turn innovative ideas into functional, user-friendly digital experiences',
    },
    intro: {
      de: 'Webshops und Websites sind digitale Visitenkarten und zentral für Kundengewinnung und ‑bindung. Wir beraten, konzipieren und entwickeln hochwertige, benutzerzentrierte Webpräsenzen – skalierbar, schnell und zukunftssicher.',
      en: 'Websites and webshops are your digital storefront and key to acquisition and retention. We consult, design, and build user-centric web experiences — scalable, fast, and future-proof.',
    },
    sections: [
      {
        title: { de: 'Maßgeschneiderte Beratung', en: 'Tailored consulting' },
        body: {
          de: 'Gemeinsam entwickeln wir die optimale Online‑Strategie. Wir analysieren Ziele und Zielgruppen, damit Ihre Lösung nicht nur ansprechend und funktional ist, sondern auch effektiv kommuniziert.',
          en: 'We develop the right online strategy together. We analyze goals and audiences so your solution is not only beautiful and functional, but also communicates effectively.',
        },
      },
      {
        title: { de: 'Unser Fokus', en: 'Our focus' },
        body: {
          de: 'Beim Aufbau neuer Webpräsenzen stärken wir die Markenidentität und schaffen eine intuitive User Experience. Wir kombinieren moderne Technologien mit bewährten Methoden, damit Ihre Plattform langfristig relevant und leistungsstark bleibt.',
          en: 'We strengthen your brand identity and create an intuitive user experience. We combine modern technologies with proven methods so your platform stays relevant and high-performing long term.',
        },
      },
      {
        title: { de: 'Redesign‑ und Skalierungsdienste', en: 'Redesign & scaling' },
        body: {
          de: 'Für bestehende Webshops und Websites bieten wir Redesign und Skalierung: Wir revitalisieren Ihre Plattform, optimieren UX, Performance und Geschwindigkeit und bereiten sie auf mehr Traffic und wachsende Anforderungen vor.',
          en: 'For existing platforms, we redesign and scale: we refresh your experience, optimize UX and speed, and prepare your stack for increased traffic and new requirements.',
        },
      },
      {
        title: { de: 'Fokus auf Nutzerorientierung', en: 'User-centered by default' },
        body: {
          de: 'Nutzerorientierung steht im Zentrum – von der Konzeption bis zur Umsetzung. So entstehen Webshops und Websites, die ästhetisch überzeugen und sich nahtlos sowie intuitiv bedienen lassen.',
          en: 'User needs are central — from concept to delivery. The result: webshops and websites that look great and feel seamless and intuitive.',
        },
      },
    ],
  },
  {
    slug: 'onlinemarketing',
    kicker: { de: 'Leistungen', en: 'Services' },
    title: { de: 'Wir digitalisieren Marketing', en: 'We digitalize marketing' },
    intro: {
      de: 'Erfolgreiches Online‑Marketing braucht einen ganzheitlichen, datengetriebenen Ansatz: klare Ziele, Zielgruppenverständnis und die kontinuierliche Optimierung relevanter Kanäle. Wir helfen, Ihre Online‑Präsenz zu stärken und Wachstum nachhaltig zu sichern.',
      en: 'Great online marketing is holistic and data-driven: clear goals, deep audience understanding, and continuous optimization of key channels. We help strengthen your presence and drive sustainable growth.',
    },
    sections: [
      {
        title: { de: 'Online‑Marketing‑Strategie', en: 'Online marketing strategy' },
        body: {
          de: 'Mit agilen Methoden und kreativen Ansätzen entwickeln wir eine einzigartige, kundenorientierte Digital‑Marketing‑Strategie – für nachhaltigen Erfolg und messbare Wirkung.',
          en: 'Using agile methods and creative thinking, we craft a customer-centric digital marketing strategy — built for measurable, sustainable impact.',
        },
      },
      {
        title: { de: 'SEO', en: 'SEO' },
        body: {
          de: 'Auch die besten Angebote helfen nicht, wenn sie nicht gefunden werden. Mit professioneller Suchmaschinenoptimierung steigern wir Sichtbarkeit und Relevanz – zugeschnitten auf Ihre Website und Ihren Online‑Shop.',
          en: 'Even the best offers are useless if no one finds them. With professional SEO, we increase visibility and relevance — tailored to your website and online shop.',
        },
      },
      {
        title: { de: 'SEA und Display‑Ads', en: 'SEA & display ads' },
        body: {
          de: 'SEA und Display‑Ads ermöglichen eine gezielte, messbare Ansprache potenzieller Kunden. Wir planen, steuern und optimieren Kampagnen, um Markenbekanntheit zu steigern und Kundenakquise zu fördern.',
          en: 'SEA and display ads enable targeted, measurable acquisition. We plan, manage, and optimize campaigns to increase awareness and drive new customers.',
        },
      },
      {
        title: { de: 'Datenbasiertes Marketing', en: 'Data-driven marketing' },
        body: {
          de: 'Durch Analysen und saubere Attribution werden Entscheidungen präziser. Wir identifizieren Präferenzen und Verhaltensmuster, entwickeln personalisierte Kampagnen und verbessern Konversionsraten sowie ROI.',
          en: 'With analytics and clean attribution, decisions become sharper. We identify preferences and behavior patterns, build personalized campaigns, and improve conversion and ROI.',
        },
      },
      {
        title: { de: 'Web‑Analyse', en: 'Web analytics' },
        body: {
          de: 'Web‑Analyse liefert Einblicke in Nutzerverhalten (z. B. Verweildauer, Klickpfade, Konversionen). So identifizieren wir Schwachstellen, verbessern die Nutzererfahrung und steigern die Performance Ihrer Website.',
          en: 'Web analytics provides insights into behavior (time on site, paths, conversions). This helps us identify weaknesses, improve experience, and increase performance.',
        },
      },
      {
        title: { de: 'E‑Mail‑Marketing', en: 'Email marketing' },
        body: {
          de: 'Wir unterstützen strategisch oder operativ – von Setup bis Optimierung. So sichern wir den dauerhaften Erfolg Ihrer E‑Mail‑Marketing‑Kampagnen und erweitern Ihr Know‑how durch Schulungen.',
          en: 'We support you strategically or operationally — from setup to optimization. This ensures lasting results and builds internal know-how through training.',
        },
      },
    ],
  },
  {
    slug: 'strategy-consulting',
    kicker: { de: 'Leistungen', en: 'Services' },
    title: {
      de: 'Expertise von den ersten Interaktion bis hin zum Abschluss des Kaufvorganges und darüber hinaus',
      en: 'Expertise from first interaction to checkout — and beyond',
    },
    intro: {
      de: 'Erfolg im digitalen Handel beginnt mit einer fundierten Strategie. Jedes E‑Commerce‑Projekt ist einzigartig – deshalb entwickeln wir eine maßgeschneiderte Herangehensweise, die Ihr Geschäft in der digitalen Welt nach vorne bringt.',
      en: 'Success in digital commerce starts with a solid strategy. Every e-commerce project is unique — we build a tailored approach that moves your business forward.',
    },
    sections: [
      {
        title: { de: 'Zielgruppenanalyse und User‑Stories', en: 'Audience analysis & user stories' },
        body: {
          de: 'Wir tauchen tief in Ihre Zielgruppen ein, um Bedürfnisse und Verhaltensweisen zu verstehen. Mit detaillierten User‑Stories schaffen wir ein klares Bild Ihrer Kunden – als Basis für Strategien, die resonieren und konvertieren.',
          en: 'We dive deep into your audience to understand needs and behaviors. Detailed user stories create clarity — the foundation for strategies that resonate and convert.',
        },
      },
      {
        title: { de: 'UI/UX‑ & E‑Commerce‑Strategien', en: 'UI/UX & e-commerce strategies' },
        body: {
          de: 'Ein ansprechendes, intuitives Nutzererlebnis ist entscheidend für starke Konversionen. Wir entwerfen UI/UX‑Strategien, die ästhetisch überzeugen und gleichzeitig nahtlos funktionieren – mit Fokus auf Usability und Performance.',
          en: 'An intuitive experience is essential for strong conversions. We design UI/UX strategies that look great and work flawlessly — focused on usability and performance.',
        },
      },
      {
        title: { de: 'Konzept und Prototyping', en: 'Concept & prototyping' },
        body: {
          de: 'Wir übersetzen Visionen in greifbare Konzepte und Prototypen, die früh getestet und iterativ optimiert werden können. So stellen wir sicher, dass das finale Produkt Ihre Anforderungen erfüllt und die Erwartungen Ihrer Nutzer übertrifft.',
          en: 'We translate visions into concepts and prototypes that can be tested early and iterated fast. This ensures the final product meets requirements and exceeds user expectations.',
        },
      },
    ],
  },
  {
    slug: 'ux-design-usability',
    kicker: { de: 'Leistungen', en: 'Services' },
    title: { de: 'Kreieren von benutzerfokussierten Erfahrungen', en: 'Creating user-centric experiences' },
    intro: {
      de: 'Wir schaffen durchdachte, intuitive User‑Experience‑Designs, die nicht nur gut aussehen, sondern auch reibungslos funktionieren. Unsere Usability‑Optimierung sorgt dafür, dass jeder Aspekt Ihrer E‑Commerce‑Plattform auf die Bedürfnisse Ihrer Kunden zugeschnitten ist.',
      en: 'We create thoughtful, intuitive user experiences that look great and work smoothly. Usability optimization ensures every aspect of your platform fits your customers’ needs.',
    },
    sections: [
      {
        title: { de: 'Warum UX‑Design & Usability so wichtig sind', en: 'Why UX & usability matter' },
        body: {
          de: 'Benutzerfreundliches Design steigert Zufriedenheit und Bindung, erhöht Konversionsraten durch klare Navigation und reduziert Absprünge, weil Frustration und Missverständnisse vermieden werden.',
          en: 'User-friendly design boosts satisfaction and retention, increases conversions through clear navigation, and reduces bounce rates by preventing frustration and confusion.',
        },
      },
      {
        title: { de: 'Benutzerzentrierte Designansätze', en: 'User-centered design' },
        body: {
          de: 'Wir gestalten auf Basis echter Nutzerbedürfnisse und ‑verhalten – für Erlebnisse, die überzeugen und messbar performen.',
          en: 'We design based on real user needs and behaviors — for experiences that delight and perform measurably.',
        },
      },
      {
        title: { de: 'Responsives Webdesign', en: 'Responsive design' },
        body: {
          de: 'Unsere Designs funktionieren auf allen Geräten optimal – vom Desktop bis zum Smartphone.',
          en: 'Our designs work beautifully on every device — from desktop to smartphone.',
        },
      },
      {
        title: { de: 'Usability‑Tests', en: 'Usability testing' },
        body: {
          de: 'Regelmäßige Tests mit echten Nutzern stellen sicher, dass Designs nicht nur ästhetisch, sondern auch praktisch und benutzerfreundlich sind.',
          en: 'Regular testing with real users ensures designs are not only beautiful but also practical and easy to use.',
        },
      },
      {
        title: { de: 'Interaktionsdesign & Accessibility', en: 'Interaction design & accessibility' },
        body: {
          de: 'Wir schaffen interaktive Elemente, die das Einkaufserlebnis verbessern, und stellen sicher, dass Ihre Plattform für alle Nutzer zugänglich und bedienbar bleibt.',
          en: 'We craft interactions that improve shopping — and ensure your platform remains accessible for everyone.',
        },
      },
    ],
  },
  {
    slug: 'seo-content',
    kicker: { de: 'Leistungen', en: 'Services' },
    title: { de: 'Verbessern Sie Ihre Sichtbarkeit und Reichweite im digitalen Raum', en: 'Increase your visibility and reach online' },
    intro: {
      de: 'Eine starke Online‑Präsenz ist entscheidend, um im E‑Commerce erfolgreich zu sein. Mit SEO und Content‑Strategie sorgen wir dafür, dass Sie genau dort sichtbar werden, wo Ihre Kunden suchen.',
      en: 'A strong online presence is essential for e-commerce success. With SEO and content strategy, we make sure you are visible exactly where customers search.',
    },
    sections: [
      {
        title: { de: 'Warum SEO & Content entscheidend sind', en: 'Why SEO & content are crucial' },
        body: {
          de: 'Gezielte SEO‑Maßnahmen erhöhen Sichtbarkeit in Suchmaschinen, relevanter Content baut Markenautorität und Vertrauen auf und verbessert die Kundenbindung durch höhere Verweildauer.',
          en: 'SEO improves visibility in search. Relevant content builds authority and trust and increases engagement — strengthening customer retention.',
        },
      },
      {
        title: { de: 'SEO‑Audits & Keyword‑Optimierung', en: 'SEO audits & keyword optimization' },
        body: {
          de: 'Wir analysieren Ihre Website technisch und inhaltlich, identifizieren Quick‑Wins und optimieren Inhalte anhand relevanter Keywords.',
          en: 'We analyze your site technically and editorially, identify quick wins, and optimize content around relevant keywords.',
        },
      },
      {
        title: { de: 'On‑Page & Off‑Page SEO', en: 'On-page & off-page SEO' },
        body: {
          de: 'Von Meta‑Daten über Informationsarchitektur bis Backlinks: Wir optimieren alle Faktoren für nachhaltige Performance.',
          en: 'From metadata and information architecture to backlinks — we optimize the full stack for sustainable performance.',
        },
      },
      {
        title: { de: 'Content‑Audit, Strategie & Erstellung', en: 'Content audit, strategy & creation' },
        body: {
          de: 'Wir prüfen bestehenden Content, entwickeln eine maßgeschneiderte Strategie und erstellen Inhalte (z. B. Blog, Produkttexte, Guides), die Nutzer anziehen und konvertieren.',
          en: 'We review existing content, define a tailored strategy, and create assets (blog, product copy, guides) that attract users and convert.',
        },
      },
      {
        title: { de: 'Analyse & Reporting', en: 'Analysis & reporting' },
        body: {
          de: 'Regelmäßige Auswertungen und Reports machen Fortschritt transparent – und schaffen die Basis für kontinuierliche Optimierung.',
          en: 'Regular analysis and reporting make progress transparent — and power continuous optimization.',
        },
      },
    ],
  },
  {
    slug: 'platform-integration',
    kicker: { de: 'Leistungen', en: 'Services' },
    title: { de: 'Fördern Sie einen effizienten Datenaustausch in Ihrer Systemlandschaft', en: 'Enable efficient data exchange across your system landscape' },
    intro: {
      de: 'Plattformintegration ist ein zentraler Hebel im modernen E‑Commerce. Wir verbinden Systeme und Tools nahtlos, damit Prozesse effizienter werden und Kundenerlebnisse konsistent bleiben – über alle Touchpoints hinweg.',
      en: 'Platform integration is a key lever in modern e-commerce. We connect systems and tools seamlessly so processes become efficient and customer experiences stay consistent across touchpoints.',
    },
    sections: [
      {
        title: { de: 'Warum Plattformintegration wichtig ist', en: 'Why integration matters' },
        body: {
          de: 'Integration steigert Effizienz durch Automatisierung, verbessert die Customer Experience durch nahtlose Abläufe und sorgt für Datenkonsistenz – als Grundlage für valide Analysen und Entscheidungen.',
          en: 'Integration increases efficiency through automation, improves experience through seamless flows, and ensures consistent data — the basis for reliable analytics and decisions.',
        },
      },
      {
        title: { de: 'Analyse & Planung', en: 'Analysis & planning' },
        body: {
          de: 'Wir analysieren bestehende Systeme und definieren Integrationsbedürfnisse, Datenflüsse und Zielarchitektur.',
          en: 'We analyze your systems and define integration needs, data flows, and target architecture.',
        },
      },
      {
        title: { de: 'Tool‑Auswahl (iPaaS / API‑Management)', en: 'Tool selection (iPaaS / API management)' },
        body: {
          de: 'Wir wählen passende Tools und Technologien aus, um Ihre Plattformen effizient und zukunftssicher zu integrieren.',
          en: 'We pick the right tools and technologies to integrate your platforms efficiently and future-proof.',
        },
      },
      {
        title: { de: 'Implementierung, Testing & Betrieb', en: 'Implementation, testing & operations' },
        body: {
          de: 'Wir implementieren Integrationen, testen umfassend und bieten laufende Wartung und Support, damit alles stabil, sicher und aktuell bleibt.',
          en: 'We implement and test thoroughly and provide ongoing maintenance and support to keep everything stable, secure, and up to date.',
        },
      },
    ],
  },
  {
    slug: 'prerformance-boosting',
    kicker: { de: 'Leistungen', en: 'Services' },
    title: { de: 'Steigern Sie Ihre Leistung durch innovative Technologien', en: 'Boost performance with modern technologies' },
    intro: {
      de: 'Performance Boosting umfasst Maßnahmen zur Optimierung von Geschwindigkeit, Stabilität und Effizienz von Websites und Webanwendungen – für bessere User Experience, höhere Konversion und bessere Rankings.',
      en: 'Performance boosting improves speed, stability, and efficiency of websites and web apps — for better UX, higher conversion, and stronger rankings.',
    },
    sections: [
      {
        title: { de: 'Speed‑ & Conversion‑Rate‑Optimierung', en: 'Speed & conversion rate optimization' },
        body: {
          de: 'Wir verbessern Ladezeiten und optimieren die Nutzerführung, um mehr Nutzer zu Aktionen wie Kauf oder Registrierung zu bewegen.',
          en: 'We improve load times and user flows to increase purchases, signups, and other key actions.',
        },
      },
      {
        title: { de: 'Core Web Vitals', en: 'Core Web Vitals' },
        body: {
          de: 'Wir setzen Googles Standards für Nutzererfahrung um – für bessere UX und potenziell bessere Sichtbarkeit in Suchergebnissen.',
          en: 'We implement Google’s UX standards — improving experience and potentially search visibility.',
        },
      },
      {
        title: { de: 'Daten‑Analyse & Prozessoptimierung', en: 'Data analysis & process optimization' },
        body: {
          de: 'Durch Analysen identifizieren wir Engpässe und optimieren Prozesse zielgerichtet – für effizientere Abläufe und bessere Ergebnisse.',
          en: 'We find bottlenecks with data and optimize processes — for more efficient operations and better results.',
        },
      },
      {
        title: { de: 'Caching, CDN & Load Balancing', en: 'Caching, CDN & load balancing' },
        body: {
          de: 'Wir etablieren erweiterte Caching‑Strategien, integrieren CDNs und konfigurieren Load Balancing – für schnelle, ausfallsichere Plattformen auch bei hohem Traffic.',
          en: 'We set up advanced caching, integrate CDNs, and configure load balancing — for fast, resilient platforms even under heavy traffic.',
        },
      },
    ],
  },
  {
    slug: 'ki-automation',
    kicker: { de: 'Leistungen', en: 'Services' },
    title: { de: 'Gestalten Sie Ihre Prozesse mit revolutionären Technologien', en: 'Shape your processes with revolutionary technologies' },
    intro: {
      de: 'Mit KI‑gestützter Automatisierung steigern wir Effizienz, senken Kosten und schaffen außergewöhnliche Kundenerlebnisse. Wir helfen Ihnen, KI sinnvoll in Ihre E‑Commerce‑Prozesse zu integrieren – pragmatisch und messbar.',
      en: 'With AI-powered automation, we increase efficiency, reduce costs, and create outstanding customer experiences. We help you integrate AI into your e-commerce processes — pragmatic and measurable.',
    },
    sections: [
      {
        title: { de: 'KI‑Vorteile in Ihrem Business', en: 'Benefits of AI for your business' },
        body: {
          de: 'KI automatisiert Routinen, ermöglicht datengetriebene Entscheidungen und schafft personalisierte Kundenerlebnisse – von Empfehlungen bis zu maßgeschneiderten Kampagnen.',
          en: 'AI automates routines, enables data-driven decisions, and powers personalization — from recommendations to tailored campaigns.',
        },
      },
      {
        title: { de: 'Chatbots & Kundenservice', en: 'Chatbots & customer support' },
        body: {
          de: 'Automatisierte Chatbots beantworten Anfragen in Echtzeit, sind rund um die Uhr verfügbar und skalieren den Support ohne Qualitätsverlust.',
          en: 'Automated chatbots answer in real time, are available 24/7, and scale support without sacrificing quality.',
        },
      },
      {
        title: { de: 'Preisoptimierung', en: 'Price optimization' },
        body: {
          de: 'KI‑Algorithmen passen Preise dynamisch an – basierend auf Nachfrage, Wettbewerb und Marktbedingungen – für maximalen Umsatz bei Wettbewerbsfähigkeit.',
          en: 'AI algorithms adjust prices dynamically based on demand, competition, and market conditions — maximizing revenue while staying competitive.',
        },
      },
      {
        title: { de: 'Marketingautomatisierung', en: 'Marketing automation' },
        body: {
          de: 'KI ermöglicht hochgradig personalisierte Ansprache durch Analyse von Verhalten und Präferenzen – für höhere Engagement‑ und Conversion‑Rates.',
          en: 'AI enables highly personalized messaging through behavior and preference analysis — improving engagement and conversion.',
        },
      },
    ],
  },
  {
    slug: 'partners-und-tools',
    kicker: { de: 'Leistungen', en: 'Services' },
    title: { de: 'Strategische Auswahl von Partnern, Systemen und Tools', en: 'Strategic selection of partners, systems, and tools' },
    intro: {
      de: 'Die sorgfältige Auswahl von Partnern, Systemen und Tools im E‑Commerce ermöglicht, dass Unternehmen agil, wettbewerbsfähig und kundenorientiert bleiben – entscheidend für langfristigen Erfolg in einem sich schnell entwickelnden Markt.',
      en: 'Careful selection of partners, systems, and tools helps companies stay agile, competitive, and customer-centric — crucial for long-term success in a fast-moving market.',
    },
    sections: [
      {
        title: { de: 'Effizienzsteigerung', en: 'Efficiency gains' },
        body: {
          de: 'Die richtigen Tools und Systeme automatisieren und optimieren Prozesse – von Bestandsverwaltung über Auftragsabwicklung bis Kundenservice. Effiziente Abläufe helfen, mit dem Tempo des Online‑Handels Schritt zu halten.',
          en: 'The right tools automate and optimize processes — from inventory to fulfillment to customer support. Efficient operations keep pace with the speed of online commerce.',
        },
      },
      {
        title: { de: 'Skalierbarkeit', en: 'Scalability' },
        body: {
          de: 'Skalierbare Systeme und Tools ermöglichen Wachstum – auch bei steigenden Besucherzahlen und Bestellungen, ohne Performance oder Kundenerfahrung zu beeinträchtigen.',
          en: 'Scalable systems enable growth — even with increasing traffic and orders — without compromising performance or customer experience.',
        },
      },
      {
        title: { de: 'Verbesserte Kundenerfahrung', en: 'Better customer experience' },
        body: {
          de: 'Moderne E‑Commerce‑Systeme verbessern das Einkaufserlebnis, z. B. durch personalisierte Empfehlungen, reibungslose Zahlungsabwicklung und effiziente Suche. Ein positives Erlebnis stärkt Bindung und Weiterempfehlungen.',
          en: 'Modern systems improve shopping through personalization, frictionless payments, and efficient search. Great experiences increase retention and referrals.',
        },
      },
      {
        title: { de: 'Datenanalyse und Einblicke', en: 'Analytics & insights' },
        body: {
          de: 'Fortschrittliche Analysetools liefern Einblicke in Kundenverhalten, Markttrends und Geschäftsleistung – eine wichtige Basis für informierte Entscheidungen und strategische Planung.',
          en: 'Advanced analytics provide insights into customer behavior, trends, and performance — the foundation for informed decisions and planning.',
        },
      },
      {
        title: { de: 'Sicherheit und Compliance', en: 'Security & compliance' },
        body: {
          de: 'Mit steigenden Anforderungen an Datenschutz und Sicherheit wählen wir Systeme und Tools, die aktuellen Standards entsprechen und Datenintegrität gewährleisten.',
          en: 'With rising privacy and security demands, we choose systems that meet modern standards and ensure data integrity.',
        },
      },
      {
        title: { de: 'Wettbewerbsvorteil', en: 'Competitive advantage' },
        body: {
          de: 'Die richtigen Partnerschaften und Technologien schaffen Differenzierung – z. B. durch Zugang zu neuen Märkten, bessere Ressourcen und innovative Lösungen, die Sie von der Konkurrenz abheben.',
          en: 'The right partnerships and technologies differentiate you — through access to new markets, better resources, and innovation that sets you apart.',
        },
      },
    ],
  },
] as const

export function getLeistungBySlug(slug: LeistungDetail['slug']) {
  return leistungDetails.find((l) => l.slug === slug) ?? null
}

