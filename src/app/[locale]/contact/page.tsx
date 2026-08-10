import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
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
    <Container className="max-w-2xl py-16 sm:py-20">
      <h1 className="font-display text-4xl font-[200] text-tinta sm:text-5xl">
        {t("heading")}
      </h1>

      <section className="mt-12 border-t border-tinta/10 pt-10">
        <h2 className="font-display text-2xl text-tinta">
          {t("professionalHeading")}
        </h2>
        <p className="mt-4 text-tinta-suave">{t("professionalText")}</p>
        <p className="mt-4 text-sm text-tinta-suave">
          {t("emailLabel")}:{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-acento hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </section>

      <section className="mt-12 border-t border-tinta/10 pt-10">
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
      </section>
    </Container>
  );
}
