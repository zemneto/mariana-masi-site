import type { Metadata } from "next";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/Container";
import { getPublishedArticles } from "@/content/insights";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "insights" });
  return { title: t("heading") };
}

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <InsightsContent />;
}

function InsightsContent() {
  const t = useTranslations("insights");
  const locale = useLocale() as "pt" | "en";
  const articles = getPublishedArticles(locale);

  return (
    <Container className="max-w-3xl py-16 sm:py-20">
      <h1 className="font-display text-4xl font-[200] text-tinta sm:text-5xl">
        {t("heading")}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-tinta-suave">
        {t("intro")}
      </p>

      {articles.length === 0 ? (
        <p className="mt-12 border-t border-tinta/10 pt-10 text-tinta-suave">
          {t("empty")}
        </p>
      ) : (
        <ul className="mt-12 divide-y divide-tinta/10 border-t border-tinta/10">
          {articles.map((article) => (
            <li key={article.slug} className="py-8">
              <Link href={`/insights/${article.slug}`} className="group">
                <p className="text-xs font-medium uppercase tracking-wide text-acento">
                  {article.category}
                </p>
                <h2 className="mt-2 font-display text-2xl text-tinta group-hover:underline">
                  {article.title}
                </h2>
                {article.excerpt && (
                  <p className="mt-2 text-tinta-suave">{article.excerpt}</p>
                )}
                <p className="mt-3 text-sm text-tinta-suave/70">
                  {new Date(article.publishedAt).toLocaleDateString(
                    locale === "pt" ? "pt-BR" : "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      timeZone: "UTC",
                    },
                  )}
                  {article.readingTimeMinutes
                    ? ` · ${t("readingTime", { minutes: article.readingTimeMinutes })}`
                    : ""}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
