'use client';

import {useTranslations} from 'next-intl';

type FooterLink = {
  id: string;
  label: string;
};

export default function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();
  const clinicName = process.env.NEXT_PUBLIC_CLINIC_NAME ?? 'DR. [NOMBRE]';
  const clinicAddress =
    process.env.NEXT_PUBLIC_CLINIC_ADDRESS ??
    'Blvrd Puerta de Hierro 5150, Puerta de Hierro, Zapopan, Jalisco, Mexico';
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+523312345678';
  const quickLinks = t.raw('quickLinks') as FooterLink[];

  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-bg)]">
      <div className="container-shell grid gap-12 py-16 md:grid-cols-3">
        <div className="space-y-4">
          <p className="font-display text-3xl font-semibold tracking-[0.1em]">{t('logo', {doctorName: clinicName})}</p>
          <p className="max-w-sm text-sm font-light text-[color:rgb(247_245_240/0.8)]">{t('tagline')}</p>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[color:rgb(247_245_240/0.64)]">{t('quickLinksTitle')}</p>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="text-sm text-[var(--color-bg)] transition-colors duration-200 hover:text-[var(--color-accent)]">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[color:rgb(247_245_240/0.64)]">{t('contactTitle')}</p>
          <p className="text-sm text-[var(--color-bg)]">{clinicAddress}</p>
          <a href={`https://wa.me/${whatsapp.replace(/[^\d]/g, '')}`} className="text-sm text-[var(--color-bg)] transition-colors duration-200 hover:text-[var(--color-accent)]">
            {whatsapp}
          </a>
        </div>
      </div>

      <div className="border-t border-[color:rgb(247_245_240/0.18)]">
        <div className="container-shell flex flex-col gap-3 py-5 text-xs text-[color:rgb(247_245_240/0.74)] md:flex-row md:items-center md:justify-between">
          <p>{t('copyright', {year: currentYear})}</p>
          <div className="flex items-center gap-5">
            <a href="#" className="transition-colors duration-200 hover:text-[var(--color-accent)]">
              {t('privacy')}
            </a>
            <a href="#" className="transition-colors duration-200 hover:text-[var(--color-accent)]">
              {t('terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
