import type { Metadata } from "next";
import { Jost, Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { routing } from "@/i18n/routing";
import { INSTAGRAM_URL, SITE_URL } from "@/lib/site";
import { PROFILE } from "@/content/profile";
import "../globals.css";

// Fallback caso o kit Adobe Fonts (Avenir Next LT Pro, carregado via <link>
// abaixo) não resolva — domínio ainda não liberado no projeto Adobe, ou
// offline. Jost é geométrica e fina, mesmo espírito visual.
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
      <head>
        {/* Kit Adobe Fonts do projeto "Mariana Masi Site" — Avenir Next LT
            Pro. Só resolve nos domínios liberados no projeto (ver Domains em
            fonts.adobe.com); até lá, cai no fallback Jost definido acima. */}
        <link rel="stylesheet" href="https://use.typekit.net/qiq2iiw.css" />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <NextIntlClientProvider>
          <Header />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
