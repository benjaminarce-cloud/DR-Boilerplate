import enMessages from '@/messages/en.json';
import esMessages from '@/messages/es.json';
import type {AbstractIntlMessages} from 'next-intl';

export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';
export const SUPPORTED_LOCALES = ['es', 'en'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'es';

export const MESSAGE_CATALOG: Record<Locale, AbstractIntlMessages> = {
  en: enMessages as unknown as AbstractIntlMessages,
  es: esMessages as unknown as AbstractIntlMessages
};

export function isLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

export function normalizeLocale(value: string | null | undefined): Locale {
  if (!value) {
    return DEFAULT_LOCALE;
  }

  const lowerValue = value.toLowerCase();

  if (lowerValue.startsWith('es')) {
    return 'es';
  }

  if (lowerValue.startsWith('en')) {
    return 'en';
  }

  return DEFAULT_LOCALE;
}

export function getLocaleFromCookie(cookieString: string): Locale | null {
  const localeCookie = cookieString
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${LOCALE_COOKIE_NAME}=`));

  if (!localeCookie) {
    return null;
  }

  const localeValue = localeCookie.split('=')[1];
  return isLocale(localeValue) ? localeValue : normalizeLocale(localeValue);
}

export function buildLocaleCookie(locale: Locale): string {
  return `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=31536000; samesite=lax`;
}
