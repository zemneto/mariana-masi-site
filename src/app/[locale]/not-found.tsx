import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/Container";
import { Kicker } from "@/components/Kicker";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="px-6 py-24 sm:px-8 sm:py-32">
      <Container className="max-w-2xl px-0">
        <Kicker>404</Kicker>
        <h1 className="mt-2 font-display font-[200] text-5xl leading-[1.02] text-tinta sm:text-6xl">
          {t("heading")}
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-tinta-suave">
          {t("text")}
        </p>
        <Link
          href="/"
          className="mt-8 inline-block bg-tinta px-6 py-3 font-condensed text-xs tracking-[0.06em] text-papel uppercase transition-opacity hover:opacity-85"
        >
          {t("cta")}
        </Link>
      </Container>
    </section>
  );
}
