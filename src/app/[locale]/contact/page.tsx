import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { CONTACT_EMAIL, INSTITUTO_NEXIUM_URL } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("heading") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactContent />;
}

function Kicker({ n }: { n: string }) {
  return (
    <span className="font-display text-sm tabular-nums text-tinta-suave/70">
      {n}
    </span>
  );
}

function ContactContent() {
  const t = useTranslations("contact");

  return (
    <>
      <section className="border-b border-tinta/10 px-6 py-24 sm:px-8 sm:py-32">
        <Container className="max-w-2xl px-0">
          <h1 className="font-display text-6xl leading-[0.95] font-[200] text-tinta sm:text-7xl">
            {t("heading")}
          </h1>
        </Container>
      </section>

      <section className="px-6 py-20 sm:px-8 sm:py-28">
        <Container className="max-w-2xl px-0">
          <Reveal>
            <Kicker n="01" />
            <h2 className="mt-2 font-display text-2xl text-tinta">
              {t("professionalHeading")}
            </h2>
            <p className="mt-4 max-w-md text-tinta-suave">
              {t("professionalText")}
            </p>
            <p className="mt-4 text-sm text-tinta-suave">
              {t("emailLabel")}:{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-acento hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-tinta/10 px-6 py-20 sm:px-8 sm:py-28">
        <Container className="max-w-2xl px-0">
          <Reveal>
            <Kicker n="02" />
            <h2 className="mt-2 font-display text-2xl text-tinta">
              {t("clinicalHeading")}
            </h2>
            <p className="mt-4 max-w-md text-tinta-suave">
              {t("clinicalText")}
            </p>
            <a
              href={INSTITUTO_NEXIUM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block rounded-full border border-tinta/25 px-6 py-3 text-sm font-medium text-tinta transition-colors hover:border-tinta"
            >
              {t("clinicalCta")} ↗
            </a>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
