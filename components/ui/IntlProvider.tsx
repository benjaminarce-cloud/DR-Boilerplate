'use client';

import {MESSAGE_CATALOG, DEFAULT_LOCALE, buildLocaleCookie, getLocaleFromCookie, normalizeLocale, type Locale} from '@/lib/i18n';
import {usePathname, useRouter} from 'next/navigation';
import {NextIntlClientProvider} from 'next-intl';
import {useEffect, useMemo, useState, type ReactNode} from 'react';

function getInitialLocale(): Locale {
  if (typeof document === 'undefined') {
    return DEFAULT_LOCALE;
  }

  const cookieLocale = getLocaleFromCookie(document.cookie);

  if (cookieLocale) {
    return cookieLocale;
  }

  return normalizeLocale(window.navigator.language);
}

export default function IntlProvider({children}: {children: ReactNode}) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const cookieLocale = getLocaleFromCookie(document.cookie);

    if (cookieLocale) {
      if (cookieLocale !== locale) {
        setLocale(cookieLocale);
      }

      return;
    }

    const browserLocale = normalizeLocale(window.navigator.language);
    document.cookie = buildLocaleCookie(browserLocale);

    if (browserLocale !== locale) {
      setLocale(browserLocale);
      router.refresh();
    }
  }, [locale, pathname, router]);

  const messages = useMemo(() => MESSAGE_CATALOG[locale], [locale]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="America/Mexico_City">
      {children}
    </NextIntlClientProvider>
  );
}
