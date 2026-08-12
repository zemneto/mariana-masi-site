import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  INSTITUTO_NEXIUM_URL,
  NAV_ITEMS,
} from "@/lib/site";
import { PROFILE } from "@/content/profile";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale() as "pt" | "en";

  return (
    <footer className="border-t border-tinta/15 bg-tinta text-papel/90">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-14 sm:grid-cols-3 sm:px-8">
        <div>
          <p className="font-display font-[200] text-lg tracking-wide uppercase">
            {PROFILE.name}
          </p>
          <p className="mt-2 font-condensed text-xs text-papel/70">{PROFILE.role[locale]}</p>
        </div>

        <div>
          <p className="font-condensed text-[11px] tracking-[0.12em] uppercase text-papel/70">
            {t("navHeading")}
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-papel/80 transition-colors hover:text-papel"
                >
                  {tNav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-condensed text-[11px] tracking-[0.12em] uppercase text-papel/70">
            {t("profilesHeading")}
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-papel/80 transition-colors hover:text-papel"
              >
                Instagram — {INSTAGRAM_HANDLE}
              </a>
            </li>
          </ul>

          <p className="mt-6 font-condensed text-[11px] tracking-[0.12em] uppercase text-papel/70">
            {t("clinicalHeading")}
          </p>
          <a
            href={INSTITUTO_NEXIUM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm text-papel/80 transition-colors hover:text-papel"
          >
            Instituto Nexium ↗
          </a>
        </div>
      </div>

      <div className="border-t border-papel/15 px-6 py-4 text-center font-condensed text-[10px] tracking-[0.06em] text-papel/60 sm:px-8">
        {t("legalCopyright", { year: new Date().getFullYear() })}
      </div>
    </footer>
  );
}
