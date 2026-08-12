export type LocalizedText = {
  pt: string;
  en: string;
};

export type AreaDeInteresse = {
  slug: string;
  codigo: string;
  titulo: LocalizedText;
  descricao: LocalizedText;
};

export type Article = {
  slug: string;
  locale: "pt" | "en";
  translationOf?: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  coverImage?: string;
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes?: number;
  featured: boolean;
  status: "draft" | "published";
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
  references?: Array<{ label: string; url?: string }>;
};

export type Publication = {
  id: string;
  title: string;
  authors: string[];
  journal?: string;
  year: number;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  url?: string;
  pdfUrl?: string;
  abstract?: string;
  type: "artigo" | "capitulo" | "livro" | "outro";
  featured: boolean;
};

export type ResearchProject = {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  status: "current" | "completed" | "proposed";
  startYear: number;
  endYear?: number;
  institution?: string;
  collaborators?: string[];
  researchAreas: string[];
  relatedPublications?: string[];
  externalLinks?: Array<{ label: string; url: string }>;
};
