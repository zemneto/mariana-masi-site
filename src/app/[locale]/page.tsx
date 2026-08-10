import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/Container";
import { AREAS_DE_INTERESSE, PROFILE } from "@/content/profile";
import { INSTITUTO_NEXIUM_URL } from "@/lib/site";

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
    <>
      <section className="border-b border-tinta/10">
        <Container className="grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <h1 className="font-display text-5xl font-[200] leading-[1.05] text-tinta sm:text-6xl">
              {PROFILE.name}
            </h1>
            <p className="mt-3 text-lg text-tinta-suave">
              {PROFILE.role[locale]}
            </p>
            <p className="mt-8 max-w-xl font-display text-xl leading-relaxed text-tinta/90 sm:text-2xl">
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

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-tinta/5">
            <Image
              src="/photos/mariana-hero.jpg"
              alt={PROFILE.name}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 420px, 100vw"
            />
          </div>
        </Container>
      </section>

      <section className="border-b border-tinta/10 py-16 sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="font-display text-2xl text-tinta">
            {t("introHeading")}
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-tinta-suave">
            {PROFILE.introduction[locale].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-tinta/10 py-16 sm:py-20">
        <Container>
          <h2 className="font-display text-2xl text-tinta">
            {t("areasHeading")}
          </h2>
          <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {AREAS_DE_INTERESSE.map((area) => (
              <div
                key={area.slug}
                className="border-t-2 pt-4"
                style={{ borderTopColor: area.cor }}
              >
                <h3 className="font-display text-lg text-tinta">
                  {area.titulo[locale]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-tinta-suave">
                  {area.descricao[locale]}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-tinta/10 py-16 sm:py-20">
        <Container className="max-w-3xl">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-display text-2xl text-tinta">
              {t("insightsHeading")}
            </h2>
            <Link
              href="/insights"
              className="shrink-0 text-sm text-acento hover:underline"
            >
              {t("insightsCta")} →
            </Link>
          </div>
          <p className="mt-6 text-tinta-suave">{t("insightsEmpty")}</p>
        </Container>
      </section>

      <section className="border-b border-tinta/10 py-16 sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="font-display text-2xl text-tinta">
            {t("researchHeading")}
          </h2>
          <p className="mt-4 text-tinta-suave">
            {locale === "pt"
              ? "Áreas de interesse em pesquisa que orientam o trabalho investigativo da Mariana."
              : "Research interests that guide Mariana's investigative work."}
          </p>
          <Link
            href="/research"
            className="mt-5 inline-block text-sm text-acento hover:underline"
          >
            {t("researchCta")} →
          </Link>
        </Container>
      </section>

      <section className="border-b border-tinta/10 py-16 sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="font-display text-2xl text-tinta">
            {t("profileHeading")}
          </h2>
          <p className="mt-4 text-tinta-suave">{PROFILE.role[locale]}</p>
          <Link
            href="/about"
            className="mt-5 inline-block text-sm text-acento hover:underline"
          >
            {t("profileCta")} →
          </Link>
        </Container>
      </section>

      <section className="border-b border-tinta/10 bg-tinta/[0.03] py-16 sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="font-display text-2xl text-tinta">
            {t("clinicalHeading")}
          </h2>
          <p className="mt-4 text-tinta-suave">{t("clinicalText")}</p>
          <a
            href={INSTITUTO_NEXIUM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block rounded-full border border-tinta/25 px-6 py-3 text-sm font-medium text-tinta transition-colors hover:border-tinta"
          >
            {t("clinicalCta")} ↗
          </a>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="font-display text-2xl text-tinta">
            {t("newsletterHeading")}
          </h2>
          <p className="mt-4 text-tinta-suave">{t("newsletterText")}</p>
          <form className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              disabled
              placeholder={t("newsletterPlaceholder")}
              className="flex-1 rounded-full border border-tinta/20 bg-transparent px-5 py-3 text-sm text-tinta placeholder:text-tinta-suave/60 disabled:cursor-not-allowed disabled:opacity-60"
            />
            <button
              type="submit"
              disabled
              className="shrink-0 rounded-full bg-tinta/40 px-6 py-3 text-sm font-medium text-papel disabled:cursor-not-allowed"
            >
              {t("newsletterButton")}
            </button>
          </form>
          <p className="mt-3 text-xs text-tinta-suave/70">
            {t("newsletterNote")}
          </p>
        </Container>
      </section>
    </>
  );
}
