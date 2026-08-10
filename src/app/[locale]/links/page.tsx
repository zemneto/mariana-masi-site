import Image from "next/image";
import type { Metadata } from "next";
import { useLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PROFILE } from "@/content/profile";
import { getPublishedArticles } from "@/content/insights";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  INSTITUTO_NEXIUM_URL,
} from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  return { title: { absolute: PROFILE.name } };
}

export default async function LinksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LinksContent />;
}

function LinksContent() {
  const t = useTranslations("links");
  const locale = useLocale() as "pt" | "en";
  const [latestArticle] = getPublishedArticles(locale);

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-sm flex-col items-center px-6 py-16 text-center">
      <div className="relative h-28 w-28 overflow-hidden rounded-full bg-tinta/5">
        <Image
          src="/photos/mariana-portrait.jpg"
          alt={PROFILE.name}
          fill
          className="object-cover"
          sizes="112px"
        />
      </div>
      <h1 className="mt-5 font-display text-2xl text-tinta">{PROFILE.name}</h1>
      <p className="mt-1 text-sm text-tinta-suave">{PROFILE.role[locale]}</p>

      <div className="mt-8 flex w-full flex-col gap-3">
        {latestArticle && (
          <Link
            href={`/insights/${latestArticle.slug}`}
            className="w-full rounded-full border border-tinta/20 px-6 py-3 text-sm font-medium text-tinta transition-colors hover:border-tinta"
          >
            {t("latestArticle")}
          </Link>
        )}
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full rounded-full border border-tinta/20 px-6 py-3 text-sm font-medium text-tinta transition-colors hover:border-tinta"
        >
          {t("instagram")} — {INSTAGRAM_HANDLE}
        </a>
        <a
          href={INSTITUTO_NEXIUM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full rounded-full border border-tinta/20 px-6 py-3 text-sm font-medium text-tinta transition-colors hover:border-tinta"
        >
          {t("clinicalCare")} ↗
        </a>
        <Link
          href="/contact"
          className="w-full rounded-full bg-tinta px-6 py-3 text-sm font-medium text-papel transition-opacity hover:opacity-85"
        >
          {t("contact")}
        </Link>
      </div>
    </div>
  );
}
