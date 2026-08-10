"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NAV_ITEMS, INSTITUTO_NEXIUM_URL } from "@/lib/site";
import { PROFILE } from "@/content/profile";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations("nav");
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-tinta/10 bg-papel/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4 sm:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
          onClick={() => setMenuAberto(false)}
        >
          <Image
            src="/brain-mark-color.png"
            alt=""
            width={80}
            height={80}
            className="h-9 w-9 sm:h-10 sm:w-10"
            priority
          />
          <span className="font-display text-sm tracking-[0.14em] text-tinta uppercase sm:text-base">
            {PROFILE.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[11px] font-medium tracking-[0.18em] text-tinta/75 uppercase transition-colors hover:text-tinta"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={INSTITUTO_NEXIUM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-tinta/25 px-4 py-2 text-xs font-medium uppercase tracking-wide text-tinta/70 transition-colors hover:border-tinta hover:text-tinta"
          >
            {t("clinicalCare")} ↗
          </a>
          <LanguageSwitcher />
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMenuAberto((aberto) => !aberto)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-tinta"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuAberto}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-6 w-6"
            >
              {menuAberto ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6l12 12M18 6L6 18"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 7h16M4 12h16M4 17h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuAberto && (
        <nav className="border-t border-tinta/10 bg-papel px-6 py-4 sm:px-8 lg:hidden">
          <div className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuAberto(false)}
                className="font-display text-sm text-tinta/80 hover:text-tinta"
              >
                {t(item.key)}
              </Link>
            ))}
            <a
              href={INSTITUTO_NEXIUM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block w-fit rounded-full border border-tinta/25 px-4 py-2 text-xs font-medium uppercase tracking-wide text-tinta/70"
            >
              {t("clinicalCare")} ↗
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
