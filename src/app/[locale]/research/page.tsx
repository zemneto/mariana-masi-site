import type { Metadata } from "next";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
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

function Kicker({ n }: { n: string }) {
  return (
    <span className="font-display text-sm tabular-nums text-tinta-suave/70">
      {n}
    </span>
  );
}

function ResearchContent() {
  const t = useTranslations("research");
  const locale = useLocale() as "pt" | "en";

  return (
    <>
      <section className="border-b border-tinta/10 px-6 py-24 sm:px-8 sm:py-32">
        <Container className="max-w-3xl px-0">
          <h1 className="font-display text-6xl leading-[0.95] font-[200] text-tinta sm:text-7xl">
            {t("heading")}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-tinta-suave">
            {RESEARCH_INTRO[locale]}
          </p>
        </Container>
      </section>

      <section className="px-6 py-20 sm:px-8 sm:py-28">
        <Container className="max-w-3xl px-0">
          <Reveal>
            <Kicker n="01" />
            <h2 className="mt-2 font-display text-2xl text-tinta">
              {t("questionsHeading")}
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-tinta-suave">
              {RESEARCH_QUESTIONS[locale]}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-tinta/10 px-6 py-20 sm:px-8 sm:py-28">
        <Container className="max-w-3xl px-0">
          <Reveal>
            <Kicker n="02" />
            <h2 className="mt-2 font-display text-2xl text-tinta">
              {t("projectsHeading")}
            </h2>
            {RESEARCH_PROJECTS.length === 0 ? (
              <p className="mt-4 max-w-xl text-tinta-suave">
                {t("projectsEmpty")}
              </p>
            ) : (
              <ul className="mt-6 space-y-6">
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
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-tinta/10 px-6 py-20 sm:px-8 sm:py-28">
        <Container className="max-w-3xl px-0">
          <Reveal>
            <Kicker n="03" />
            <h2 className="mt-2 font-display text-2xl text-tinta">
              {t("publicationsHeading")}
            </h2>
            {PUBLICATIONS.length === 0 ? (
              <p className="mt-4 max-w-xl text-tinta-suave">
                {t("publicationsEmpty")}
              </p>
            ) : (
              <ul className="mt-6 space-y-4">
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
          </Reveal>
        </Container>
      </section>
    </>
  );
}
