import type { MetadataRoute } from "next";
import { ARTICLES } from "@/content/insights";
import { SITE_URL } from "@/lib/site";

const ROTAS_FIXAS = ["", "/about", "/research", "/insights", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paginasFixas: MetadataRoute.Sitemap = ROTAS_FIXAS.map((rota) => ({
    url: `${SITE_URL}${rota}`,
    lastModified: new Date(),
    alternates: {
      languages: {
        "pt-BR": `${SITE_URL}${rota}`,
        "en-US": `${SITE_URL}/en${rota}`,
      },
    },
  }));

  const artigos: MetadataRoute.Sitemap = ARTICLES.filter(
    (article) => article.status === "published",
  ).map((article) => ({
    url:
      article.locale === "pt"
        ? `${SITE_URL}/insights/${article.slug}`
        : `${SITE_URL}/en/insights/${article.slug}`,
    lastModified: article.updatedAt ?? article.publishedAt,
  }));

  return [...paginasFixas, ...artigos];
}
