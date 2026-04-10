'use client';

import doctorConfig from '@/lib/doctor.config';
import {motion, useInView} from 'framer-motion';
import {useTranslations} from 'next-intl';
import {useMemo, useRef} from 'react';

type Testimonial = {
  quote: string;
  name: string;
  procedure: string;
};

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const items = useMemo(() => t.raw('items') as Testimonial[], [t]);
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, {once: true, amount: 0.15});

  return (
    <section ref={ref} className="section-shell">
      <div className="container-shell grid gap-8 lg:grid-cols-12 lg:gap-10">
        <motion.div
          initial={{opacity: 0, y: 24}}
          animate={isInView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.65, ease: 'easeOut'}}
          className="space-y-4 lg:col-span-4"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">{t('eyebrow')}</p>
          <h2 className="font-display text-4xl leading-tight font-normal text-[var(--color-ink)] md:text-5xl">{t('title')}</h2>

          {doctorConfig.reviewScore && doctorConfig.reviewCount && doctorConfig.reviewSource ? (
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <p className="font-display text-5xl leading-none text-[var(--color-ink)]">{doctorConfig.reviewScore}</p>
              <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
                {doctorConfig.reviewCount} · {doctorConfig.reviewSource}
              </p>
            </div>
          ) : null}
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
          className="space-y-3 lg:col-span-8"
        >
          {items.map((item) => (
            <motion.article
              key={`${item.name}-${item.procedure}`}
              variants={{
                hidden: {opacity: 0, y: 14},
                show: {opacity: 1, y: 0}
              }}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 md:p-6"
            >
              <p className="text-sm text-[var(--color-ink-muted)]">{item.quote}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
