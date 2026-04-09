'use client';

import {buildLocaleCookie, isLocale, type Locale} from '@/lib/i18n';
import {useRouter} from 'next/navigation';
import {useLocale, useTranslations} from 'next-intl';
import {motion} from 'framer-motion';

const localeOrder: Locale[] = ['en', 'es'];

export default function LanguageToggle() {
  const t = useTranslations('languageToggle');
  const router = useRouter();
  const locale = useLocale();
  const activeLocale: Locale = isLocale(locale) ? locale : 'es';

  const onSelect = (nextLocale: Locale): void => {
    if (nextLocale === activeLocale) {
      return;
    }

    document.cookie = buildLocaleCookie(nextLocale);
    router.refresh();
  };

  return (
    <div className="inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-1">
      {localeOrder.map((localeValue) => {
        const isActive = localeValue === activeLocale;

        return (
          <button
            key={localeValue}
            type="button"
            aria-label={t('switchTo', {localeLabel: t(localeValue)})}
            onClick={() => onSelect(localeValue)}
            className="relative min-w-11 overflow-hidden rounded-full px-3 py-1.5 text-xs font-medium tracking-[0.08em]"
          >
            {isActive ? (
              <motion.span
                layoutId="locale-toggle-pill"
                className="absolute inset-0 rounded-full bg-[var(--color-accent)]"
                transition={{duration: 0.2, ease: 'easeInOut'}}
              />
            ) : null}
            <motion.span
              animate={{opacity: isActive ? 1 : 0.72}}
              transition={{duration: 0.2, ease: 'easeInOut'}}
              className={`relative z-10 ${isActive ? 'text-[var(--color-surface)]' : 'text-[var(--color-ink-muted)]'}`}
            >
              {t(localeValue)}
            </motion.span>
          </button>
        );
      })}
    </div>
  );
}
