import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Kicker } from "@/components/Kicker";
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

function ContactContent() {
  const t = useTranslations("contact");

  return (
    <>
      <section className="border-b border-tinta/15 px-6 py-24 sm:px-8 sm:py-28">
        <Container className="max-w-2xl px-0">
          <h1 className="font-display font-[200] text-5xl leading-[1.02] text-tinta sm:text-6xl">
            {t("heading")}
          </h1>
        </Container>
      </section>

      <section className="px-6 py-20 sm:px-8 sm:py-24">
        <Container className="max-w-2xl px-0">
          <Reveal>
            <Kicker>§1</Kicker>
            <h2 className="mt-2 font-display font-[500] text-2xl text-tinta">
              {t("professionalHeading")}
            </h2>
            <p className="mt-4 max-w-md text-tinta-suave">
              {t("professionalText")}
            </p>
            <p className="mt-4 font-condensed text-xs text-tinta-suave">
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

      <section className="border-t border-tinta/15 px-6 py-20 sm:px-8 sm:py-24">
        <Container className="max-w-2xl px-0">
          <Reveal>
            <Kicker>§2</Kicker>
            <h2 className="mt-2 font-display font-[500] text-2xl text-tinta">
              {t("clinicalHeading")}
            </h2>
            <p className="mt-4 max-w-md text-tinta-suave">
              {t("clinicalText")}
            </p>
            <a
              href={INSTITUTO_NEXIUM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block border border-tinta/30 px-6 py-3 font-condensed text-xs tracking-[0.06em] text-tinta uppercase transition-colors hover:border-tinta"
            >
              {t("clinicalCta")} ↗
            </a>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
