import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/Container";
import { ARTICLES, getArticleBySlug, getPublishedArticles } from "@/content/insights";
import { PROFILE } from "@/content/profile";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return ARTICLES.filter((article) => article.status === "published").map(
    (article) => ({ locale: article.locale, slug: article.slug }),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug, locale as "pt" | "en");
  if (!article) return {};

  return {
    title: article.seoTitle ?? article.title,
    description: article.seoDescription ?? article.excerpt,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      images: article.ogImage ? [article.ogImage] : undefined,
      publishedTime: article.publishedAt,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = getArticleBySlug(slug, locale as "pt" | "en");
  if (!article) notFound();

  return <ArticleContent article={article} />;
}

function ArticleContent({
  article,
}: {
  article: NonNullable<ReturnType<typeof getArticleBySlug>>;
}) {
  const t = useTranslations("insights");
  const locale = useLocale() as "pt" | "en";
  const related = getPublishedArticles(locale)
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author,
      url: SITE_URL,
    },
  };

  return (
    <Container className="max-w-3xl py-16 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/insights"
        className="font-condensed text-xs text-tinta-suave uppercase transition-colors hover:text-tinta"
      >
        ← {t("backToInsights")}
      </Link>

      <p className="mt-8 font-condensed text-[11px] tracking-[0.1em] text-acento uppercase">
        {article.category}
      </p>
      <h1 className="mt-2 font-display font-[200] text-4xl text-tinta sm:text-5xl">
        {article.title}
      </h1>
      {article.subtitle && (
        <p className="mt-4 font-display font-[400] text-xl text-tinta-suave italic">
          {article.subtitle}
        </p>
      )}

      <p className="mt-6 font-condensed text-[11px] text-graphite">
        {article.author} ·{" "}
        {new Date(article.publishedAt).toLocaleDateString(
          locale === "pt" ? "pt-BR" : "en-US",
          { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" },
        )}
        {article.readingTimeMinutes
          ? ` · ${t("readingTime", { minutes: article.readingTimeMinutes })}`
          : ""}
      </p>

      <div className="prose prose-neutral mt-10 max-w-none text-lg leading-relaxed whitespace-pre-line text-tinta/90 prose-headings:font-display">
        {article.content}
      </div>

      {article.references && article.references.length > 0 && (
        <section className="mt-14 border-t border-tinta/15 pt-8">
          <h2 className="font-display font-[500] text-xl text-tinta">
            {t("referencesHeading")}
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-tinta-suave">
            {article.references.map((reference) => (
              <li key={reference.label}>
                {reference.url ? (
                  <a
                    href={reference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-tinta hover:underline"
                  >
                    {reference.label}
                  </a>
                ) : (
                  reference.label
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-12 border-t border-tinta/15 pt-8">
        <p className="font-display font-[200] text-base tracking-wide text-tinta uppercase">
          {PROFILE.name}
        </p>
        <p className="font-condensed text-xs text-tinta-suave">{PROFILE.role[locale]}</p>
      </section>

      {related.length > 0 && (
        <section className="mt-14 border-t border-tinta/15 pt-8">
          <h2 className="font-display font-[500] text-xl text-tinta">
            {t("relatedHeading")}
          </h2>
          <ul className="mt-4 space-y-4">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/insights/${item.slug}`}
                  className="font-display font-[500] text-lg text-tinta transition-colors hover:text-acento"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </Container>
  );
}
