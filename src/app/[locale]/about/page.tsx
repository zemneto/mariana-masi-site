import type { Metadata } from "next";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ACADEMIC_PROFILES,
  AREAS_DE_INTERESSE,
  EDUCATION_TIMELINE,
  PROFILE,
} from "@/content/profile";
import { PhotoAttach } from "@/components/PhotoAttach";
import { Kicker } from "@/components/Kicker";
import { Stamp } from "@/components/Stamp";
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

function AboutContent() {
  const t = useTranslations("about");
  const locale = useLocale() as "pt" | "en";

  return (
    <>
      {/* Hero */}
      <section className="border-b border-tinta/15">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-0 px-6 pt-14 pb-16 sm:grid-cols-[56px_1fr] sm:px-8 sm:pt-20 sm:pb-20">
          <div className="hidden font-condensed text-[10px] leading-[1.9] text-graphite sm:block">
            <div className="mb-6">
              rev.
              <br />
              {new Date().getFullYear()}
            </div>
            <div className="mb-6">
              CFP
              <br />
              ativo
            </div>
            <div className="mb-6">
              CEPSIC
              <br />
              2014
            </div>
          </div>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-14">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 border border-acento/60 px-2.5 py-1 font-condensed text-[10px] tracking-[0.12em] text-acento uppercase">
                {t("stampBadge")}
              </span>
              <h1 className="mt-6 font-display font-[200] text-5xl leading-[1.02] text-tinta sm:text-6xl lg:text-[64px]">
                {PROFILE.name}
              </h1>
              <p className="mt-5 font-condensed text-xs tracking-[0.08em] text-tinta-suave uppercase">
                {PROFILE.role[locale]}
              </p>
              <p className="mt-8 max-w-lg text-xl leading-relaxed text-tinta/90">
                {PROFILE.positioning[locale]}
              </p>
            </div>
            <PhotoAttach
              className="mx-auto w-full max-w-[280px] lg:mx-0"
              src="/photos/mariana-about.jpg"
              alt={PROFILE.name}
              caption={t("heading")}
              sizes="280px"
            />
          </div>
        </div>
      </section>

      {/* Nota complementar */}
      <section className="px-6 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Kicker>§1</Kicker>
            <h2 className="mt-2 font-display font-[500] text-2xl text-tinta">
              {t("introHeading")}
            </h2>
          </div>
          <Reveal className="space-y-5 border-l-2 border-tinta/15 pl-6 text-lg leading-relaxed text-tinta lg:col-span-7 lg:col-start-5">
            {PROFILE.introduction[locale].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Neuropsicologia — nota reflexiva */}
      <section className="border-t border-tinta/15 px-6 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Kicker>§2</Kicker>
            <h2 className="mt-2 font-display font-[500] text-2xl text-tinta">
              {t("neuropsychologyHeading")}
            </h2>
          </div>
          <Reveal className="border-l-2 border-tinta/15 pl-6 text-lg leading-relaxed text-tinta lg:col-span-7 lg:col-start-5">
            <p>{t("neuropsychologyText")}</p>
          </Reveal>
        </div>
      </section>

      {/* Formação — histórico do registro */}
      <section className="border-t border-tinta/15 px-6 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[1200px]">
          <Kicker>§3</Kicker>
          <h2 className="mt-2 font-display font-[500] text-2xl text-tinta">
            {t("educationHeading")}
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start">
            <div>
              {EDUCATION_TIMELINE.map((item, index) => (
                <Reveal key={item.period} delay={index * 0.05}>
                  <div className="grid grid-cols-[88px_1fr] gap-6 border-t border-tinta/15 py-5 first:border-t-0">
                    <span className="font-condensed text-xs text-acento">
                      {item.period}
                    </span>
                    <div>
                      <h3 className="font-display font-[500] text-lg text-tinta">
                        {item.title[locale]}
                      </h3>
                      {item.institution && (
                        <p className="mt-1 text-sm text-tinta-suave">
                          {item.institution}
                        </p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <PhotoAttach
              className="mx-auto hidden w-full max-w-[220px] lg:mx-0 lg:block"
              rotate="rotate-2"
              src="/photos/mariana-hero.jpg"
              alt={PROFILE.name}
              caption="Anexo"
              sizes="220px"
            />
          </div>
        </div>
      </section>

      {/* Áreas de atuação */}
      <section className="border-t border-tinta/15 px-6 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[1200px]">
          <Kicker>§4</Kicker>
          <h2 className="mt-2 font-display font-[500] text-2xl text-tinta">
            {t("researchInterestsHeading")}
          </h2>

          <div className="mt-10 border-t border-tinta/15">
            {AREAS_DE_INTERESSE.map((area, index) => (
              <Reveal key={area.slug} delay={index * 0.08}>
                <div className="grid gap-2 border-b border-tinta/15 py-7 sm:grid-cols-12 sm:items-baseline sm:gap-6">
                  <span className="font-condensed text-xs text-acento sm:col-span-1">
                    {area.codigo}
                  </span>
                  <h3 className="font-display font-[500] text-xl text-tinta sm:col-span-4">
                    {area.titulo[locale]}
                  </h3>
                  <p className="text-sm text-tinta-suave sm:col-span-7">
                    {area.descricao[locale]}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Experiência clínica */}
      <section className="border-t border-tinta/15 px-6 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Kicker>§5</Kicker>
            <h2 className="mt-2 font-display font-[500] text-2xl text-tinta">
              {t("clinicalHeading")}
            </h2>
          </div>
          <Reveal className="lg:col-span-7 lg:col-start-5">
            <p className="max-w-md text-lg leading-relaxed text-tinta">
              {t("clinicalText")}
            </p>
            <a
              href="https://institutonexium.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block font-condensed text-xs tracking-[0.04em] text-acento uppercase hover:underline"
            >
              {t("clinicalCta")} ↗
            </a>
          </Reveal>
        </div>
      </section>

      {/* Credenciais */}
      <section className="border-t border-tinta/15 px-6 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Kicker>§6</Kicker>
            <h2 className="mt-2 font-display font-[500] text-2xl text-tinta">
              {t("credentialsHeading")}
            </h2>
          </div>
          <Reveal className="flex flex-wrap items-center gap-8 lg:col-span-7 lg:col-start-5">
            <Stamp>
              {t("stampBadge")}
              <br />
              CFP
            </Stamp>
            <p className="max-w-md text-sm leading-relaxed text-tinta-suave">
              {t("credentialsEmpty")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Perfis acadêmicos */}
      <section className="border-t border-tinta/15 px-6 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Kicker>§7</Kicker>
            <h2 className="mt-2 font-display font-[500] text-2xl text-tinta">
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
                        className="font-condensed text-xs text-acento uppercase hover:underline"
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
