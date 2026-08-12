"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 font-condensed text-[11px] tracking-wide text-tinta-suave">
      {routing.locales.map((loc, index) => (
        <span key={loc} className="flex items-center gap-1">
          {index > 0 && <span className="text-tinta-suave/50">/</span>}
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: loc })}
            aria-current={locale === loc}
            className={
              "px-1.5 py-1 " +
              (locale === loc
                ? "text-acento"
                : "text-tinta-suave transition-colors hover:text-tinta")
            }
          >
            {t(loc)}
          </button>
        </span>
      ))}
    </div>
  );
}
