import { useLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AREAS_DE_INTERESSE, PROFILE } from "@/content/profile";
import { RESEARCH_INTRO } from "@/content/research";
import { INSTITUTO_NEXIUM_URL } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { PhotoAttach } from "@/components/PhotoAttach";
import { Kicker } from "@/components/Kicker";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations("home");
  const locale = useLocale() as "pt" | "en";

  return (
    <div>
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
          </div>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-14">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 border border-acento/60 px-2.5 py-1 font-condensed text-[10px] tracking-[0.12em] text-acento uppercase">
                {t("profileHeading")}
              </span>
              <h1 className="mt-6 font-display font-[200] text-5xl leading-[1.02] text-tinta sm:text-6xl lg:text-[64px]">
                {PROFILE.name}
              </h1>
              <p className="mt-5 font-condensed text-xs tracking-[0.08em] text-tinta-suave uppercase">
                {PROFILE.role[locale]}
              </p>
              <p className="mt-8 max-w-lg text-xl leading-relaxed text-tinta/90 sm:text-2xl">
                {PROFILE.positioning[locale]}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/about"
                  className="bg-tinta px-6 py-3 font-condensed text-xs tracking-[0.06em] text-papel uppercase transition-opacity hover:opacity-85"
                >
                  {t("heroCtaAbout")}
                </Link>
                <Link
                  href="/insights"
                  className="border border-tinta/30 px-6 py-3 font-condensed text-xs tracking-[0.06em] text-tinta uppercase transition-colors hover:border-tinta"
                >
                  {t("heroCtaInsights")}
                </Link>
              </div>
            </div>
            <PhotoAttach
              className="mx-auto w-full max-w-[280px] lg:mx-0"
              src="/photos/mariana-hero.jpg"
              alt={PROFILE.name}
              caption={t("heroCtaAbout")}
              priority
              sizes="280px"
            />
          </div>
        </div>
      </section>

      {/* Introdução */}
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

      {/* Áreas de interesse */}
      <section className="border-t border-tinta/15 px-6 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[1200px]">
          <Kicker>§2</Kicker>
          <h2 className="mt-2 font-display font-[500] text-2xl text-tinta">
            {t("areasHeading")}
          </h2>

          <div className="mt-10 border-t border-tinta/15">
            {AREAS_DE_INTERESSE.map((area, index) => (
              <Reveal key={area.slug} delay={index * 0.08}>
                <div className="group grid gap-2 border-b border-tinta/15 py-7 sm:grid-cols-12 sm:items-baseline sm:gap-6">
                  <span className="font-condensed text-xs text-acento sm:col-span-1">
                    {area.codigo}
                  </span>
                  <h3 className="font-display font-[500] text-2xl text-tinta transition-transform duration-300 sm:col-span-5 sm:group-hover:translate-x-2">
                    {area.titulo[locale]}
                  </h3>
                  <p className="text-sm text-tinta-suave sm:col-span-6">
                    {area.descricao[locale]}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Insights + Pesquisa */}
      <section className="border-t border-tinta/15 px-6 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <Kicker>§3</Kicker>
            <h2 className="mt-2 font-display font-[500] text-2xl text-tinta">
              {t("insightsHeading")}
            </h2>
            <p className="mt-6 max-w-sm text-tinta-suave">
              {t("insightsEmpty")}
            </p>
            <Link
              href="/insights"
              className="mt-5 inline-block font-condensed text-xs tracking-[0.04em] text-acento uppercase hover:underline"
            >
              {t("insightsCta")} →
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <Kicker>§4</Kicker>
            <h2 className="mt-2 font-display font-[500] text-2xl text-tinta">
              {t("researchHeading")}
            </h2>
            <p className="mt-6 max-w-sm text-tinta-suave">
              {RESEARCH_INTRO[locale]}
            </p>
            <Link
              href="/research"
              className="mt-5 inline-block font-condensed text-xs tracking-[0.04em] text-acento uppercase hover:underline"
            >
              {t("researchCta")} →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Perfil + Instituto Nexium */}
      <section className="border-t border-tinta/15 px-6 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <Kicker>§5</Kicker>
            <h2 className="mt-2 font-display font-[500] text-2xl text-tinta">
              {t("profileHeading")}
            </h2>
            <p className="mt-6 max-w-sm text-tinta-suave">
              {PROFILE.role[locale]}
            </p>
            <Link
              href="/about"
              className="mt-5 inline-block font-condensed text-xs tracking-[0.04em] text-acento uppercase hover:underline"
            >
              {t("profileCta")} →
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <Kicker>§6</Kicker>
            <h2 className="mt-2 font-display font-[500] text-2xl text-tinta">
              {t("clinicalHeading")}
            </h2>
            <p className="mt-6 max-w-sm text-tinta-suave">
              {t("clinicalText")}
            </p>
            <a
              href={INSTITUTO_NEXIUM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block font-condensed text-xs tracking-[0.04em] text-acento uppercase hover:underline"
            >
              {t("clinicalCta")} ↗
            </a>
          </Reveal>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-tinta/15 px-6 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Kicker>§7</Kicker>
            <h2 className="mt-2 font-display font-[500] text-2xl text-tinta">
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
                className="border-b border-tinta/25 bg-transparent py-2 text-tinta placeholder:text-tinta-suave/60 focus:border-tinta focus:outline-none disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled
                className="mt-4 w-fit font-condensed text-xs tracking-[0.04em] text-tinta-suave uppercase disabled:cursor-not-allowed"
              >
                {t("newsletterButton")} →
              </button>
            </form>
            <p className="mt-3 font-condensed text-[11px] text-graphite">
              {t("newsletterNote")}
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
