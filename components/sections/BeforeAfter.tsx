'use client';

import {motion, useInView} from 'framer-motion';
import {useTranslations} from 'next-intl';
import {useMemo, useRef} from 'react';

type BeforeAfterItem = {
  procedure: string;
};

export default function BeforeAfter() {
  const t = useTranslations('beforeAfter');
  const items = useMemo(() => t.raw('items') as BeforeAfterItem[], [t]);
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, {once: true, amount: 0.15});

  return (
    <section id="before-after" ref={ref} className="section-anchor section-shell">
      <div className="container-shell space-y-8">
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={isInView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.6, ease: 'easeOut'}}
          className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">{t('bannerTitle')}</p>
          <p className="mt-2 text-sm text-[var(--color-ink-muted)]">{t('bannerCopy')}</p>
        </motion.div>

        <motion.div
          initial={{opacity: 0, y: 24}}
          animate={isInView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.7, ease: 'easeOut'}}
          className="space-y-4"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">{t('eyebrow')}</p>
          <h2 className="font-display text-4xl font-normal text-[var(--color-ink)] md:text-5xl">{t('title')}</h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.08
              }
            }
          }}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {items.map((item) => (
            <motion.article
              key={item.procedure}
              variants={{
                hidden: {opacity: 0, y: 16},
                show: {opacity: 1, y: 0}
              }}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
            >
              <h3 className="font-display text-2xl text-[var(--color-ink)]">{item.procedure}</h3>
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs tracking-[0.08em] text-[var(--color-ink-muted)]">
                <p className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-center">{t('beforeLabel')}</p>
                <p className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-center">{t('afterLabel')}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <p className="text-xs tracking-[0.08em] text-[var(--color-ink-muted)]">{t('caption')}</p>
      </div>
    </section>
  );
}
