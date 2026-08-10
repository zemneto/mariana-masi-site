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
    <div className="flex items-center gap-1 text-[11px] font-medium tracking-wide text-tinta-suave">
      {routing.locales.map((loc, index) => (
        <span key={loc} className="flex items-center gap-1">
          {index > 0 && <span className="text-tinta-suave/40">/</span>}
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: loc })}
            aria-current={locale === loc}
            className={
              locale === loc
                ? "text-tinta"
                : "text-tinta-suave/70 transition-colors hover:text-tinta"
            }
          >
            {t(loc)}
          </button>
        </span>
      ))}
    </div>
  );
}
