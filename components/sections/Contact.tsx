'use client';

import Button from '@/components/ui/Button';
import {motion, useInView} from 'framer-motion';
import {useTranslations} from 'next-intl';
import {useMemo, useRef, type FormEvent} from 'react';

export default function Contact() {
  const t = useTranslations('contact');
  const procedureOptions = useMemo(() => t.raw('procedureOptions') as string[], [t]);
  const clinicAddress =
    process.env.NEXT_PUBLIC_CLINIC_ADDRESS ??
    'Blvrd Puerta de Hierro 5150, Puerta de Hierro, Zapopan, Jalisco, Mexico';
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+523312345678';
  const mapEmbed = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ?? 'https://maps.google.com/?q=Puerta+de+Hierro+Zapopan';

  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, {once: true, amount: 0.15});

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    // Placeholder only: ready to replace with API integration.
    console.log(t('form.consoleLog'), payload);
  };

  return (
    <section id="contact" ref={ref} className="section-anchor section-shell">
      <div className="container-shell grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{opacity: 0, y: 24}}
          animate={isInView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.65, ease: 'easeOut'}}
          className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">{t('eyebrow')}</p>
          <h2 className="mt-4 font-display text-4xl leading-tight font-normal text-[var(--color-ink)] md:text-5xl">{t('title')}</h2>
          <p className="mt-3 text-sm text-[var(--color-ink-muted)]">{t('subtitle')}</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-xs uppercase tracking-[0.14em] text-[var(--color-ink-muted)]">
                {t('form.fullName')}
              </label>
              <input
                id="fullName"
                name="fullName"
                required
                className="w-full rounded-xl border border-[var(--color-border)] bg-transparent px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition-colors duration-200 focus:border-[var(--color-accent)]"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs uppercase tracking-[0.14em] text-[var(--color-ink-muted)]">
                  {t('form.email')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-[var(--color-border)] bg-transparent px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition-colors duration-200 focus:border-[var(--color-accent)]"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-xs uppercase tracking-[0.14em] text-[var(--color-ink-muted)]">
                  {t('form.phone')}
                </label>
                <input
                  id="phone"
                  name="phone"
                  required
                  placeholder={t('form.phoneHint')}
                  className="w-full rounded-xl border border-[var(--color-border)] bg-transparent px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition-colors duration-200 focus:border-[var(--color-accent)]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="procedure" className="text-xs uppercase tracking-[0.14em] text-[var(--color-ink-muted)]">
                {t('form.procedure')}
              </label>
              <select
                id="procedure"
                name="procedure"
                required
                defaultValue=""
                className="w-full rounded-xl border border-[var(--color-border)] bg-transparent px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition-colors duration-200 focus:border-[var(--color-accent)]"
              >
                <option value="" disabled>
                  {t('form.procedurePlaceholder')}
                </option>
                {procedureOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-xs uppercase tracking-[0.14em] text-[var(--color-ink-muted)]">
                {t('form.message')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full rounded-xl border border-[var(--color-border)] bg-transparent px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition-colors duration-200 focus:border-[var(--color-accent)]"
              />
            </div>

            <Button type="submit" variant="primary" fullWidth>
              {t('form.submit')}
            </Button>
          </form>
        </motion.div>

        <motion.aside
          initial={{opacity: 0, y: 24}}
          animate={isInView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.7, ease: 'easeOut', delay: 0.1}}
          className="space-y-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">{t('info.title')}</p>
            <div className="mt-4 space-y-4 text-sm text-[var(--color-ink-muted)]">
              <p>
                <span className="block text-xs uppercase tracking-[0.12em]">{t('info.addressLabel')}</span>
                <span className="text-[var(--color-ink)]">{clinicAddress}</span>
              </p>
              <p>
                <span className="block text-xs uppercase tracking-[0.12em]">{t('info.whatsappLabel')}</span>
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^\d]/g, '')}`}
                  className="text-[var(--color-ink)] transition-colors duration-200 hover:text-[var(--color-accent-dark)]"
                >
                  {whatsapp}
                </a>
              </p>
              <p>
                <span className="block text-xs uppercase tracking-[0.12em]">{t('info.hoursLabel')}</span>
                <span className="text-[var(--color-ink)]">{t('info.hours')}</span>
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">{t('info.mapTitle')}</p>
            <div className="soft-grain relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]">
              <iframe
                src={mapEmbed}
                title={t('info.mapPlaceholder')}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a href={mapEmbed} target="_blank" rel="noreferrer" className="text-sm text-[var(--color-accent)] underline-offset-2 hover:underline">
              {t('info.mapLink')}
            </a>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
