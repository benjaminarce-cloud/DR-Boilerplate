'use client';

import doctorConfig from '@/lib/doctor.config';
import {useTranslations} from 'next-intl';

export default function CertificationsBar() {
  const t = useTranslations('certifications');

  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)] py-8">
      <div className="container-shell space-y-4">
        <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">{t('label')}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {doctorConfig.credentials.map((credential) => (
            <div
              key={credential}
              className="flex min-h-10 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2 text-[11px] tracking-[0.08em] text-[var(--color-ink-muted)]"
            >
              {credential}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
