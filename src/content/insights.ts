import type { Article } from "./types";

// Nenhum artigo publicado ainda — arquitetura pronta para a Fase 2.
// Cada idioma é uma entrada independente; um artigo em inglês aponta para o
// original via `translationOf` (slug do artigo em pt).
export const ARTICLES: Article[] = [];

export function getPublishedArticles(locale: "pt" | "en") {
  return ARTICLES.filter(
    (article) => article.status === "published" && article.locale === locale,
  ).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getFeaturedArticles(locale: "pt" | "en") {
  return getPublishedArticles(locale).filter((article) => article.featured);
}

export function getArticleBySlug(slug: string, locale: "pt" | "en") {
  return ARTICLES.find(
    (article) =>
      article.slug === slug &&
      article.locale === locale &&
      article.status === "published",
  );
}
