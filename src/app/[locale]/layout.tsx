import type { Metadata } from "next";
import { Jost, Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { routing } from "@/i18n/routing";
import { INSTAGRAM_URL, SITE_URL } from "@/lib/site";
import { PROFILE } from "@/content/profile";
import "../globals.css";

// Placeholder pro font-family "Avenir Next" da logo — vamos trocar pra Adobe
// Fonts (Avenir Next Ultra Light, via Web Project) assim que o José mandar o
// link de embed do Creative Cloud. Jost é a alternativa gratuita mais
// próxima (geométrica, mesmo peso ultra-fino).
const displayFont = Jost({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-display-loaded",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isPt = locale === "pt";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: isPt
        ? "Mariana Masi — Psicóloga & Neuropsicóloga"
        : "Mariana Masi — Psychologist & Neuropsychologist",
      template: "%s — Mariana Masi",
    },
    description: isPt
      ? "Explorando as conexões entre neuropsicologia, cognição, envelhecimento e as tecnologias que moldam o futuro da saúde mental."
      : "Exploring the connections between neuropsychology, cognition, aging and the technologies shaping the future of mental healthcare.",
    alternates: {
      canonical: isPt ? "/" : "/en",
      languages: {
        "pt-BR": "/",
        "en-US": "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: isPt ? "pt_BR" : "en_US",
      siteName: "Mariana Masi",
      title: isPt
        ? "Mariana Masi — Psicóloga & Neuropsicóloga"
        : "Mariana Masi — Psychologist & Neuropsychologist",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.name,
    jobTitle: PROFILE.role.en,
    url: SITE_URL,
    sameAs: [INSTAGRAM_URL],
  };

  return (
    <html
      lang={locale === "pt" ? "pt-BR" : "en-US"}
      className={`${displayFont.variable} ${inter.variable}`}
    >
      <body className="flex min-h-screen flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <NextIntlClientProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
