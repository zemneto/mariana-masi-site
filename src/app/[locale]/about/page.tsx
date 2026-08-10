import Image from "next/image";
import type { Metadata } from "next";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ACADEMIC_PROFILES,
  AREAS_DE_INTERESSE,
  EDUCATION_TIMELINE,
  PROFILE,
} from "@/content/profile";
import { Container } from "@/components/Container";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("heading") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations("about");
  const locale = useLocale() as "pt" | "en";

  return (
    <Container className="max-w-3xl py-16 sm:py-20">
      <h1 className="font-display text-4xl font-light text-tinta sm:text-5xl">
        {t("heading")}
      </h1>

      <div className="relative mt-10 aspect-[3/4] w-full max-w-sm overflow-hidden rounded-sm bg-tinta/5">
        <Image
          src="/photos/mariana-about.jpg"
          alt={PROFILE.name}
          fill
          className="object-cover grayscale"
          sizes="384px"
        />
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-tinta">
          {t("introHeading")}
        </h2>
        <div className="mt-4 space-y-5 text-lg leading-relaxed text-tinta-suave">
          {PROFILE.introduction[locale].map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="mt-12 border-t border-tinta/10 pt-10">
        <h2 className="font-display text-2xl text-tinta">
          {t("journeyHeading")}
        </h2>
        <p className="mt-4 text-tinta-suave">{t("journeyText")}</p>
      </section>

      <section className="mt-12 border-t border-tinta/10 pt-10">
        <h2 className="font-display text-2xl text-tinta">
          {t("neuropsychologyHeading")}
        </h2>
        <p className="mt-4 text-tinta-suave">{t("neuropsychologyText")}</p>
      </section>

      <section className="mt-12 border-t border-tinta/10 pt-10">
        <h2 className="font-display text-2xl text-tinta">
          {t("researchInterestsHeading")}
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {AREAS_DE_INTERESSE.map((area) => (
            <li key={area.slug}>
              <p className="font-display text-base text-tinta">
                {area.titulo[locale]}
              </p>
              <p className="mt-1 text-sm text-tinta-suave">
                {area.descricao[locale]}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 border-t border-tinta/10 pt-10">
        <h2 className="font-display text-2xl text-tinta">
          {t("clinicalHeading")}
        </h2>
        <p className="mt-4 text-tinta-suave">{t("clinicalText")}</p>
        <a
          href="https://institutonexium.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm text-acento hover:underline"
        >
          {t("clinicalCta")} ↗
        </a>
      </section>

      <section className="mt-12 border-t border-tinta/10 pt-10">
        <h2 className="font-display text-2xl text-tinta">
          {t("educationHeading")}
        </h2>
        {EDUCATION_TIMELINE.length === 0 ? (
          <p className="mt-4 text-tinta-suave">{t("educationEmpty")}</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {EDUCATION_TIMELINE.map((item) => (
              <li key={item.period}>
                <p className="text-sm text-tinta-suave">{item.period}</p>
                <p className="font-display text-base text-tinta">
                  {item.title[locale]}
                </p>
                {item.institution && (
                  <p className="text-sm text-tinta-suave">
                    {item.institution}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-12 border-t border-tinta/10 pt-10">
        <h2 className="font-display text-2xl text-tinta">
          {t("credentialsHeading")}
        </h2>
        <p className="mt-4 text-tinta-suave">{t("credentialsEmpty")}</p>
      </section>

      <section className="mt-12 border-t border-tinta/10 pt-10 pb-4">
        <h2 className="font-display text-2xl text-tinta">
          {t("academicHeading")}
        </h2>
        {ACADEMIC_PROFILES.every((profile) => !profile.url) ? (
          <p className="mt-4 text-tinta-suave">{t("academicEmpty")}</p>
        ) : (
          <ul className="mt-4 flex flex-wrap gap-4">
            {ACADEMIC_PROFILES.filter((profile) => profile.url).map(
              (profile) => (
                <li key={profile.label}>
                  <a
                    href={profile.url ?? undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-acento hover:underline"
                  >
                    {profile.label} ↗
                  </a>
                </li>
              ),
            )}
          </ul>
        )}
      </section>
    </Container>
  );
}
