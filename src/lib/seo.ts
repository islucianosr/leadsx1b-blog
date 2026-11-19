import type { BlogPost, Locale } from "./blog";

export const SITE_CONFIG = {
  name: "Leadsx1B",
  legalName: "Leadsx1B Inc.",
  domain: "https://www.leads1xb.pro",
  blogDomain: (process.env.NEXT_PUBLIC_BLOG_URL || "https://www.leads1xb.pro").replace(/\/+$/, ""),
  twitterHandle: "@leadsx1b",
  defaultOgImage: "https://www.leads1xb.pro/images/blog-google-maps-lead-gen.png",
  defaultDescriptions: {
    en: "The #1 AI platform to extract verified B2B leads from Google Maps in under 3 minutes, organize in a visual CRM, and reach out on WhatsApp.",
    pt: "A plataforma #1 com IA para extrair leads verificados do Google Maps em menos de 3 minutos, organizar em CRM visual e disparar no WhatsApp."
  },
  keywords: {
    en: [
      "google maps lead generation",
      "b2b lead scraper ai",
      "extract leads google maps",
      "whatsapp cold outreach",
      "visual crm pipeline",
      "leadsx1b",
      "google maps email phone scraper",
      "b2b sales prospecting software"
    ],
    pt: [
      "extrair leads google maps",
      "prospecção b2b whatsapp",
      "raspador google maps ia",
      "crm integrado whatsapp",
      "leadsx1b",
      "como prospectar no whatsapp sem bloqueio",
      "gerador de leads b2b brasil angola portugal",
      "enriquecimento de leads ia"
    ]
  }
};

export interface HrefLangLink {
  rel: "alternate";
  hrefLang: string;
  href: string;
}

export function generateHreflangTags(post: BlogPost): HrefLangLink[] {
  const isPt = post.locale === "pt";
  const enSlug = isPt ? post.alternateSlug || post.slug : post.slug;
  const ptSlug = isPt ? post.slug : post.alternateSlug || post.slug;

  const enUrl = `${SITE_CONFIG.blogDomain}/blog/${enSlug}`;
  const ptUrl = `${SITE_CONFIG.blogDomain}/pt/blog/${ptSlug}`;

  return [
    { rel: "alternate", hrefLang: "en", href: enUrl },
    { rel: "alternate", hrefLang: "pt", href: ptUrl },
    { rel: "alternate", hrefLang: "x-default", href: enUrl }
  ];
}

export function generateBlogListingHreflang(): HrefLangLink[] {
  return [
    { rel: "alternate", hrefLang: "en", href: `${SITE_CONFIG.blogDomain}/blog` },
    { rel: "alternate", hrefLang: "pt", href: `${SITE_CONFIG.blogDomain}/pt/blog` },
    { rel: "alternate", hrefLang: "x-default", href: `${SITE_CONFIG.blogDomain}/blog` }
  ];
}

export function generateSoftwareApplicationSchema(locale: Locale) {
  const isPt = locale === "pt";
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Leadsx1B",
    "url": SITE_CONFIG.domain,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All (Web App)",
    "description": isPt ? SITE_CONFIG.defaultDescriptions.pt : SITE_CONFIG.defaultDescriptions.en,
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareVersion": "2.0",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "248"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Starter Plan",
        "price": "0",
        "priceCurrency": "EUR",
        "description": isPt ? "10 leads de teste gratuitos" : "10 free trial leads"
      },
      {
        "@type": "Offer",
        "name": "Lua Plan",
        "price": "19",
        "priceCurrency": "EUR",
        "description": isPt ? "1.000 leads/mês" : "1,000 leads/month"
      },
      {
        "@type": "Offer",
        "name": "Lifetime Deal",
        "price": "147",
        "priceCurrency": "EUR",
        "description": isPt ? "3.500 leads/mês vitalício" : "3,500 leads/month forever"
      },
      {
        "@type": "Offer",
        "name": "Pro Plan",
        "price": "69",
        "priceCurrency": "EUR",
        "description": isPt ? "10.000 leads/mês" : "10,000 leads/month"
      }
    ],
    "featureList": isPt
      ? [
          "Extração automatizada no Google Maps em menos de 3 minutos",
          "Validação de linhas ativas de WhatsApp com IA",
          "Filtro inteligente de empresas com ou sem website",
          "CRM visual Kanban integrado",
          "Disparo de mensagens no WhatsApp em 1 clique",
          "Segurança bancária com Supabase PostgreSQL e RLS"
        ]
      : [
          "Automated Google Maps extraction in under 3 minutes",
          "AI validation of active WhatsApp phone lines",
          "Smart filter for businesses with or without a website",
          "Integrated visual Kanban CRM pipeline",
          "1-click WhatsApp outreach",
          "Bank-grade security with Supabase PostgreSQL and RLS"
        ]
  };
}

export function generateFaqSchema(locale: Locale) {
  const isPt = locale === "pt";
  const faqs = isPt
    ? [
        {
          question: "Como extrair leads do Google Maps com IA no Leadsx1B?",
          answer: "No Leadsx1B, você digita o nicho comercial desejado e a localização geográfica. A plataforma extrai em tempo real centenas de empresas com nome, telefone, website e avaliações, validando se o número possui WhatsApp ativo em menos de 3 minutos."
        },
        {
          question: "Como prospectar no WhatsApp sem ser bloqueado pela Meta?",
          answer: "Para evitar bloqueios, realize o aquecimento gradual do chip durante 14 dias, utilize intervalos de 45 a 90 segundos entre envios, personalize as mensagens com os dados reais da empresa no Google Maps e mantenha a taxa de denúncias abaixo de 3%."
        },
        {
          question: "O Leadsx1B precisa de um CRM externo como Pipedrive ou HubSpot?",
          answer: "Não. O Leadsx1B já inclui um CRM visual Kanban integrado com etapas personalizáveis e botão de disparo direto no WhatsApp em cada card de contato."
        },
        {
          question: "Quais países e moedas o Leadsx1B suporta?",
          answer: "A plataforma foi desenhada prioritariamente para Brasil, Angola, Portugal, Moçambique e toda a Europa, com suporte nativo a BRL (R$), AOA (Kz), EUR (€) e USD ($)."
        }
      ]
    : [
        {
          question: "How do I extract B2B leads from Google Maps using Leadsx1B?",
          answer: "Simply input your target commercial niche and city. Leadsx1B's AI crawler pulls verified business listings with real-time phone validation, active WhatsApp check, and website data in under 3 minutes."
        },
        {
          question: "How can I do cold WhatsApp outreach without getting banned?",
          answer: "Follow our 14-day phone warming protocol, introduce randomized 45-90s delays between dispatches, use dynamic variables from Google Maps profiles, and keep your spam report rate under 3%."
        },
        {
          question: "Does Leadsx1B require a third-party CRM like HubSpot or Pipedrive?",
          answer: "No. Leadsx1B includes a built-in visual Kanban sales pipeline where contacts are automatically ingested with 1-click WhatsApp messaging."
        },
        {
          question: "What currencies and languages does Leadsx1B support?",
          answer: "Leadsx1B natively supports English, Portuguese, and French, with dynamic billing in USD ($), EUR (€), BRL (R$), and AOA (Kz)."
        }
      ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateJsonLd(post: BlogPost) {
  const isPt = post.locale === "pt";
  const url = `${SITE_CONFIG.blogDomain}${isPt ? "/pt" : ""}/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "headline": post.title,
    "description": post.seo.metaDescription,
    "image": [
      post.seo.ogImage.startsWith("http")
        ? post.seo.ogImage
        : `${SITE_CONFIG.blogDomain}${post.seo.ogImage}`
    ],
    "datePublished": `${post.date}T08:00:00+00:00`,
    "dateModified": `${post.date}T08:00:00+00:00`,
    "inLanguage": isPt ? "pt-BR" : "en-US",
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "jobTitle": post.author.role
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "url": SITE_CONFIG.domain,
    },
    "keywords": post.seo.keywords.join(", ")
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": isPt ? "Início" : "Home",
        "item": `${SITE_CONFIG.domain}${isPt ? "/pt" : ""}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${SITE_CONFIG.blogDomain}${isPt ? "/pt" : ""}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": url
      }
    ]
  };

  const faqSchema = generateFaqSchema(post.locale);

  return { articleSchema, breadcrumbSchema, faqSchema };
}
