import type { Metadata } from "next";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ACADEMIC_PROFILES,
  AREAS_DE_INTERESSE,
  EDUCATION_TIMELINE,
  PROFILE,
} from "@/content/profile";
import { MediaFrame } from "@/components/MediaFrame";
import { Reveal } from "@/components/Reveal";

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

function Kicker({ n }: { n: string }) {
  return (
    <span className="font-display text-sm tabular-nums text-tinta-suave/70">
      {n}
    </span>
  );
}

function AboutContent() {
  const t = useTranslations("about");
  const locale = useLocale() as "pt" | "en";

  return (
    <>
      {/* Hero */}
      <section className="border-b border-tinta/10">
        <div className="mx-auto grid max-w-[1600px] lg:grid-cols-12">
          <div className="flex min-w-0 flex-col justify-center px-6 pt-20 pb-14 sm:px-8 lg:col-span-7 lg:px-12 lg:pt-28 lg:pb-20 xl:pl-20">
            <Kicker n="—" />
            <h1 className="mt-2 font-display text-6xl leading-[0.95] font-[200] text-tinta sm:text-7xl">
              {t("heading")}
            </h1>
          </div>
          <MediaFrame
            className="min-h-[420px] lg:col-span-5 lg:min-h-0"
            src="/photos/mariana-about.jpg"
            alt={PROFILE.name}
            sizes="(min-width: 1024px) 42vw, 100vw"
          />
        </div>
      </section>

      {/* 01 — Introdução */}
      <section className="px-6 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-[1600px] gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Kicker n="01" />
            <h2 className="mt-2 font-display text-2xl text-tinta">
              {t("introHeading")}
            </h2>
          </div>
          <Reveal className="space-y-5 text-lg leading-relaxed text-tinta-suave lg:col-span-7 lg:col-start-5">
            {PROFILE.introduction[locale].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 02/03 — Trajetória + Neuropsicologia */}
      <section className="border-t border-tinta/10 px-6 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <Kicker n="02" />
            <h2 className="mt-2 font-display text-2xl text-tinta">
              {t("journeyHeading")}
            </h2>
            <p className="mt-6 max-w-sm text-tinta-suave">
              {t("journeyText")}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Kicker n="03" />
            <h2 className="mt-2 font-display text-2xl text-tinta">
              {t("neuropsychologyHeading")}
            </h2>
            <p className="mt-6 max-w-sm text-tinta-suave">
              {t("neuropsychologyText")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 04 — Interesses de pesquisa */}
      <section className="border-t border-tinta/10 px-6 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1600px]">
          <div className="lg:col-span-3">
            <Kicker n="04" />
            <h2 className="mt-2 font-display text-2xl text-tinta">
              {t("researchInterestsHeading")}
            </h2>
          </div>

          <div className="mt-10 border-t border-tinta/15">
            {AREAS_DE_INTERESSE.map((area, index) => (
              <Reveal key={area.slug} delay={index * 0.08}>
                <div className="grid gap-2 border-b border-tinta/15 py-6 sm:grid-cols-12 sm:items-baseline sm:gap-6">
                  <span
                    className="font-display text-sm tabular-nums sm:col-span-1"
                    style={{ color: area.cor }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl font-[200] text-tinta sm:col-span-4">
                    {area.titulo[locale]}
                  </h3>
                  <p className="text-sm text-tinta-suave sm:col-span-7 sm:text-right">
                    {area.descricao[locale]}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — Experiência clínica */}
      <section className="border-t border-tinta/10 px-6 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-[1600px] gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Kicker n="05" />
            <h2 className="mt-2 font-display text-2xl text-tinta">
              {t("clinicalHeading")}
            </h2>
          </div>
          <Reveal className="lg:col-span-7 lg:col-start-5">
            <p className="max-w-md text-tinta-suave">{t("clinicalText")}</p>
            <a
              href="https://institutonexium.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-acento hover:underline"
            >
              {t("clinicalCta")} ↗
            </a>
          </Reveal>
        </div>
      </section>

      {/* 06/07 — Formação + Credenciais */}
      <section className="border-t border-tinta/10 px-6 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <Kicker n="06" />
            <h2 className="mt-2 font-display text-2xl text-tinta">
              {t("educationHeading")}
            </h2>
            {EDUCATION_TIMELINE.length === 0 ? (
              <p className="mt-6 max-w-sm text-tinta-suave">
                {t("educationEmpty")}
              </p>
            ) : (
              <ul className="mt-6 space-y-4">
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
          </Reveal>
          <Reveal delay={0.1}>
            <Kicker n="07" />
            <h2 className="mt-2 font-display text-2xl text-tinta">
              {t("credentialsHeading")}
            </h2>
            <p className="mt-6 max-w-sm text-tinta-suave">
              {t("credentialsEmpty")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 08 — Perfis acadêmicos */}
      <section className="border-t border-tinta/10 px-6 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-[1600px] gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Kicker n="08" />
            <h2 className="mt-2 font-display text-2xl text-tinta">
              {t("academicHeading")}
            </h2>
          </div>
          <Reveal className="lg:col-span-7 lg:col-start-5">
            {ACADEMIC_PROFILES.every((profile) => !profile.url) ? (
              <p className="max-w-sm text-tinta-suave">
                {t("academicEmpty")}
              </p>
            ) : (
              <ul className="flex flex-wrap gap-6">
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
          </Reveal>
        </div>
      </section>
    </>
  );
}
