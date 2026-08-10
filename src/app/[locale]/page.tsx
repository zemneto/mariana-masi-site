import { useLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AREAS_DE_INTERESSE, PROFILE } from "@/content/profile";
import { RESEARCH_INTRO } from "@/content/research";
import { INSTITUTO_NEXIUM_URL } from "@/lib/site";
import { MediaFrame } from "@/components/MediaFrame";
import { Reveal } from "@/components/Reveal";
import { AbstractLines } from "@/components/AbstractLines";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function Kicker({ n }: { n: string }) {
  return (
    <span className="font-display text-sm tabular-nums text-tinta-suave/70">
      {n}
    </span>
  );
}

function HomeContent() {
  const t = useTranslations("home");
  const locale = useLocale() as "pt" | "en";

  return (
    <>
      {/* 00 — Hero */}
      <section className="relative border-b border-tinta/10">
        <div className="mx-auto grid max-w-[1600px] lg:grid-cols-12">
          <div className="flex min-w-0 flex-col justify-center px-6 pt-24 pb-14 sm:px-8 lg:col-span-7 lg:px-12 lg:pt-32 lg:pb-24 xl:pl-20">
            <div className="mb-8 overflow-hidden">
              <p className="marquee-track flex w-max shrink-0 gap-[2ch] text-[11px] font-medium tracking-[0.25em] text-tinta-suave uppercase">
                <span>
                  {AREAS_DE_INTERESSE.map((area) => area.titulo[locale]).join(
                    "   —   ",
                  )}
                  {"   —   "}
                </span>
                <span aria-hidden="true">
                  {AREAS_DE_INTERESSE.map((area) => area.titulo[locale]).join(
                    "   —   ",
                  )}
                  {"   —   "}
                </span>
              </p>
            </div>
            <h1 className="font-display text-[15vw] leading-[0.92] font-[200] tracking-wide break-words text-tinta uppercase sm:text-[10vw] lg:text-[5.4vw] xl:text-[76px]">
              {PROFILE.name}
            </h1>
            <p className="mt-6 text-base text-tinta-suave sm:text-lg">
              {PROFILE.role[locale]}
            </p>
            <p className="mt-8 max-w-lg font-display text-xl leading-relaxed text-tinta/90 sm:text-2xl">
              {PROFILE.positioning[locale]}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="rounded-full bg-tinta px-6 py-3 text-sm font-medium text-papel transition-opacity hover:opacity-85"
              >
                {t("heroCtaAbout")}
              </Link>
              <Link
                href="/insights"
                className="rounded-full border border-tinta/25 px-6 py-3 text-sm font-medium text-tinta transition-colors hover:border-tinta"
              >
                {t("heroCtaInsights")}
              </Link>
            </div>
          </div>

          <MediaFrame
            className="min-h-[420px] lg:col-span-5 lg:min-h-0"
            src="/photos/mariana-hero.jpg"
            alt={PROFILE.name}
            priority
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

      {/* 02 — Áreas de interesse */}
      <section className="border-t border-tinta/10 px-6 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <Kicker n="02" />
              <h2 className="mt-2 font-display text-2xl text-tinta">
                {t("areasHeading")}
              </h2>
              <AbstractLines className="mt-6 hidden h-16 w-40 lg:block" />
            </div>
          </div>

          <div className="mt-10 border-t border-tinta/15">
            {AREAS_DE_INTERESSE.map((area, index) => (
              <Reveal key={area.slug} delay={index * 0.08}>
                <div className="group grid gap-2 border-b border-tinta/15 py-7 sm:grid-cols-12 sm:items-baseline sm:gap-6 sm:py-9">
                  <span
                    className="font-display text-sm tabular-nums sm:col-span-1"
                    style={{ color: area.cor }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl font-[200] text-tinta transition-transform duration-300 sm:col-span-6 sm:text-3xl sm:group-hover:translate-x-3">
                    {area.titulo[locale]}
                  </h3>
                  <p className="text-sm text-tinta-suave sm:col-span-5 sm:text-right">
                    {area.descricao[locale]}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 03/04 — Insights + Pesquisa */}
      <section className="border-t border-tinta/10 px-6 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <Kicker n="03" />
            <h2 className="mt-2 font-display text-2xl text-tinta">
              {t("insightsHeading")}
            </h2>
            <p className="mt-6 max-w-sm text-tinta-suave">
              {t("insightsEmpty")}
            </p>
            <Link
              href="/insights"
              className="mt-5 inline-block text-sm text-acento hover:underline"
            >
              {t("insightsCta")} →
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <Kicker n="04" />
            <h2 className="mt-2 font-display text-2xl text-tinta">
              {t("researchHeading")}
            </h2>
            <p className="mt-6 max-w-sm text-tinta-suave">
              {RESEARCH_INTRO[locale]}
            </p>
            <Link
              href="/research"
              className="mt-5 inline-block text-sm text-acento hover:underline"
            >
              {t("researchCta")} →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 05/06 — Perfil + Instituto Nexium */}
      <section className="border-t border-tinta/10 px-6 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <Kicker n="05" />
            <h2 className="mt-2 font-display text-2xl text-tinta">
              {t("profileHeading")}
            </h2>
            <p className="mt-6 max-w-sm text-tinta-suave">
              {PROFILE.role[locale]}
            </p>
            <Link
              href="/about"
              className="mt-5 inline-block text-sm text-acento hover:underline"
            >
              {t("profileCta")} →
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <Kicker n="06" />
            <h2 className="mt-2 font-display text-2xl text-tinta">
              {t("clinicalHeading")}
            </h2>
            <p className="mt-6 max-w-sm text-tinta-suave">
              {t("clinicalText")}
            </p>
            <a
              href={INSTITUTO_NEXIUM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block text-sm text-acento hover:underline"
            >
              {t("clinicalCta")} ↗
            </a>
          </Reveal>
        </div>
      </section>

      {/* 07 — Newsletter */}
      <section className="border-t border-tinta/10 px-6 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-[1600px] gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Kicker n="07" />
            <h2 className="mt-2 font-display text-2xl text-tinta">
              {t("newsletterHeading")}
            </h2>
          </div>
          <Reveal className="lg:col-span-6 lg:col-start-5">
            <p className="max-w-sm text-tinta-suave">
              {t("newsletterText")}
            </p>
            <form className="mt-8 flex max-w-md flex-col gap-2">
              <input
                type="email"
                disabled
                placeholder={t("newsletterPlaceholder")}
                className="border-b border-tinta/25 bg-transparent py-2 text-tinta placeholder:text-tinta-suave/50 focus:border-tinta focus:outline-none disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled
                className="mt-4 w-fit text-sm font-medium text-tinta-suave disabled:cursor-not-allowed"
              >
                {t("newsletterButton")} →
              </button>
            </form>
            <p className="mt-3 text-xs text-tinta-suave/70">
              {t("newsletterNote")}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
