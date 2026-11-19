export interface Category {
  id: string;
  name: {
    en: string;
    pt: string;
  };
  slug: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: {
    en: string;
    pt: string;
  };
}

export const CATEGORIES: Category[] = [
  {
    id: "lead-generation",
    name: {
      en: "B2B Lead Generation",
      pt: "Prospecção B2B / Lead Generation"
    },
    slug: "lead-generation",
    color: "text-violet-600 dark:text-violet-400",
    bgColor: "bg-violet-50 dark:bg-violet-950/40",
    borderColor: "border-violet-200 dark:border-violet-800/60",
    description: {
      en: "Techniques, tools and strategies to extract, enrich and qualify B2B prospects from Google Maps.",
      pt: "Técnicas, ferramentas e estratégias para extrair, enriquecer e qualificar leads B2B no Google Maps."
    }
  },
  {
    id: "whatsapp-sales",
    name: {
      en: "WhatsApp Sales",
      pt: "WhatsApp Sales"
    },
    slug: "whatsapp-sales",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/40",
    borderColor: "border-emerald-200 dark:border-emerald-800/60",
    description: {
      en: "High-converting cold messaging templates, anti-ban warming protocols, and sales automation.",
      pt: "Scripts validados de alta conversão, aquecimento anti-ban de chips e automação de vendas no WhatsApp."
    }
  },
  {
    id: "crm-pipeline",
    name: {
      en: "CRM & Pipeline",
      pt: "CRM & Pipeline"
    },
    slug: "crm-pipeline",
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/40",
    borderColor: "border-indigo-200 dark:border-indigo-800/60",
    description: {
      en: "Visual Kanban funnels, follow-up automations, and sales pipeline optimization.",
      pt: "Funil visual estilo Kanban, automação de follow-ups e otimização do ciclo de vendas B2B."
    }
  },
  {
    id: "guides-tutorials",
    name: {
      en: "Guides & Tutorials",
      pt: "Tutoriais / Guides"
    },
    slug: "guides-tutorials",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-950/40",
    borderColor: "border-amber-200 dark:border-amber-800/60",
    description: {
      en: "Step-by-step guides to master Leadsx1B and maximize sales productivity.",
      pt: "Guias passo a passo práticos para dominar a plataforma Leadsx1B e multiplicar suas vendas."
    }
  }
];

export function getCategoryByName(categoryName: string): Category | undefined {
  return CATEGORIES.find(
    (c) =>
      c.name.en.toLowerCase() === categoryName.toLowerCase() ||
      c.name.pt.toLowerCase() === categoryName.toLowerCase() ||
      c.id.toLowerCase() === categoryName.toLowerCase()
  );
}
