'use client';

import {useTranslations} from 'next-intl';
import {useMemo} from 'react';

export default function CertificationsBar() {
  const t = useTranslations('certifications');
  const logos = useMemo(() => t.raw('logos') as string[], [t]);

  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)] py-8">
      <div className="container-shell space-y-4">
        <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">{t('label')}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {logos.map((logo) => (
            <div
              key={logo}
              className="flex h-10 min-w-34 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 text-[11px] tracking-[0.08em] text-[var(--color-ink-muted)]"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
