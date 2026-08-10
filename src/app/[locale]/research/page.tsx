import type { Metadata } from "next";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import {
  PUBLICATIONS,
  RESEARCH_INTRO,
  RESEARCH_PROJECTS,
  RESEARCH_QUESTIONS,
} from "@/content/research";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "research" });
  return { title: t("heading") };
}

export default async function ResearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ResearchContent />;
}

function ResearchContent() {
  const t = useTranslations("research");
  const locale = useLocale() as "pt" | "en";

  return (
    <Container className="max-w-3xl py-16 sm:py-20">
      <h1 className="font-display text-4xl font-light text-tinta sm:text-5xl">
        {t("heading")}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-tinta-suave">
        {RESEARCH_INTRO[locale]}
      </p>

      <section className="mt-12 border-t border-tinta/10 pt-10">
        <h2 className="font-display text-2xl text-tinta">
          {t("questionsHeading")}
        </h2>
        <p className="mt-4 leading-relaxed text-tinta-suave">
          {RESEARCH_QUESTIONS[locale]}
        </p>
      </section>

      <section className="mt-12 border-t border-tinta/10 pt-10">
        <h2 className="font-display text-2xl text-tinta">
          {t("projectsHeading")}
        </h2>
        {RESEARCH_PROJECTS.length === 0 ? (
          <p className="mt-4 text-tinta-suave">{t("projectsEmpty")}</p>
        ) : (
          <ul className="mt-4 space-y-6">
            {RESEARCH_PROJECTS.map((project) => (
              <li key={project.id}>
                <p className="font-display text-lg text-tinta">
                  {project.title[locale]}
                </p>
                <p className="mt-1 text-sm text-tinta-suave">
                  {project.description[locale]}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-12 border-t border-tinta/10 pt-10 pb-4">
        <h2 className="font-display text-2xl text-tinta">
          {t("publicationsHeading")}
        </h2>
        {PUBLICATIONS.length === 0 ? (
          <p className="mt-4 text-tinta-suave">{t("publicationsEmpty")}</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {PUBLICATIONS.map((publication) => (
              <li key={publication.id}>
                <p className="text-tinta">{publication.title}</p>
                <p className="text-sm text-tinta-suave">
                  {publication.authors.join(", ")} · {publication.year}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Container>
  );
}
