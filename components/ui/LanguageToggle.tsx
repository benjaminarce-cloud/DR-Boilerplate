'use client';

import {Link, usePathname} from '@/i18n/navigation';
import {useLocale, useTranslations} from 'next-intl';

const locales = ['es', 'en'] as const;

export default function LanguageToggle() {
  const t = useTranslations('languageToggle');
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-1">
      {locales.map((localeOption) => {
        const isActive = localeOption === locale;

        return (
          <Link
            key={localeOption}
            href={pathname}
            locale={localeOption}
            aria-label={t('switchTo', {localeLabel: t(localeOption)})}
            className={`min-w-11 rounded-full px-3 py-1.5 text-center text-xs font-medium tracking-[0.08em] transition-colors duration-200 ${
              isActive
                ? 'bg-[var(--color-accent)] text-[var(--color-surface)]'
                : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'
            }`}
          >
            {t(localeOption)}
          </Link>
        );
      })}
    </div>
  );
}

