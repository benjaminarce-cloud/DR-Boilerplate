'use client';

import doctorConfig from '@/lib/doctor.config';
import {motion, useInView} from 'framer-motion';
import {useTranslations} from 'next-intl';
import {useMemo, useRef} from 'react';

type ProcedureView = {
  key: string;
  name: string;
  description: string;
  highlight: boolean;
};

export default function Procedures() {
  const t = useTranslations('procedures');
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, {once: true, amount: 0.15});

  const procedures = useMemo<ProcedureView[]>(
    () =>
      doctorConfig.procedures.map((procedure) => ({
        key: procedure.key,
        name: t(`catalog.${procedure.key}.name`),
        description: t(`catalog.${procedure.key}.description`),
        highlight: procedure.highlight
      })),
    [t]
  );

  const featured = procedures.filter((procedure) => procedure.highlight);
  const catalog = procedures.filter((procedure) => !procedure.highlight);

  return (
    <section id="procedures" ref={ref} className="section-anchor section-shell">
      <div className="container-shell">
        <motion.div
          initial={{opacity: 0, y: 24}}
          animate={isInView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.7, ease: 'easeOut'}}
          className="mx-auto mb-12 max-w-3xl space-y-4"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">{t('eyebrow')}</p>
          <h2 className="font-display text-4xl leading-tight font-normal text-[var(--color-ink)] md:text-5xl">{t('title')}</h2>
          <p className="max-w-2xl text-sm font-light text-[var(--color-ink-muted)] md:text-base">{t('subtitle')}</p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-12">
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={isInView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.55, ease: 'easeOut', delay: 0.05}}
            className="space-y-4 lg:col-span-5"
          >
            {featured.map((procedure, index) => (
              <article key={procedure.key} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <p className="text-xs tracking-[0.12em] text-[var(--color-accent)]">0{index + 1}</p>
                <h3 className="mt-2 font-display text-3xl leading-tight text-[var(--color-ink)]">{procedure.name}</h3>
                <p className="mt-3 text-sm text-[var(--color-ink-muted)]">{procedure.description}</p>
                <a href="#contact" className="mt-4 inline-flex text-sm text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-dark)]">
                  {t('learnMore')} →
                </a>
              </article>
            ))}
          </motion.div>

          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={isInView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.6, ease: 'easeOut', delay: 0.12}}
            className="divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] lg:col-span-7"
          >
            {catalog.map((procedure) => (
              <article key={procedure.key} className="grid gap-4 p-5 md:grid-cols-[13rem_1fr] md:items-start md:p-6">
                <h3 className="font-display text-2xl leading-tight text-[var(--color-ink)]">{procedure.name}</h3>
                <p className="text-sm text-[var(--color-ink-muted)]">{procedure.description}</p>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
