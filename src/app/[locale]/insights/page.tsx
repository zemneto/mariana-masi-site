import type { Metadata } from "next";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
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
    <>
      <section className="border-b border-tinta/15 px-6 py-24 sm:px-8 sm:py-28">
        <Container className="max-w-3xl px-0">
          <h1 className="font-display font-[200] text-5xl leading-[1.02] text-tinta sm:text-6xl">
            {t("heading")}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-tinta">
            {t("intro")}
          </p>
        </Container>
      </section>

      <section className="px-6 py-16 sm:px-8 sm:py-20">
        <Container className="max-w-3xl px-0">
          {articles.length === 0 ? (
            <p className="text-tinta-suave">{t("empty")}</p>
          ) : (
            <ul className="divide-y divide-tinta/15 border-t border-tinta/15">
              {articles.map((article, index) => (
                <Reveal key={article.slug} delay={index * 0.06}>
                  <li className="py-8">
                    <Link href={`/insights/${article.slug}`} className="group">
                      <p className="font-condensed text-[11px] tracking-[0.1em] text-acento uppercase">
                        {article.category}
                      </p>
                      <h2 className="mt-2 font-display font-[500] text-2xl text-tinta transition-transform duration-300 group-hover:translate-x-2">
                        {article.title}
                      </h2>
                      {article.excerpt && (
                        <p className="mt-2 text-tinta-suave">
                          {article.excerpt}
                        </p>
                      )}
                      <p className="mt-3 font-condensed text-[11px] text-graphite">
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
                </Reveal>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}
