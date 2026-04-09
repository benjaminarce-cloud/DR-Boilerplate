'use client';

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
      <div className="container-shell">
        <motion.div
          initial={{opacity: 0, y: 24}}
          animate={isInView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.65, ease: 'easeOut'}}
          className="mx-auto mb-12 max-w-3xl space-y-4 text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">{t('eyebrow')}</p>
          <h2 className="font-display text-4xl leading-tight font-normal text-[var(--color-ink)] md:text-5xl">{t('title')}</h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {items.map((item) => (
            <motion.article
              key={`${item.name}-${item.procedure}`}
              variants={{
                hidden: {opacity: 0, y: 20},
                show: {opacity: 1, y: 0}
              }}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7"
            >
              <p className="font-display text-6xl leading-none text-[var(--color-accent)]">“</p>
              <p className="mt-3 text-sm font-light text-[var(--color-ink-muted)]">{item.quote}</p>
              <div className="mt-6 border-t border-[var(--color-border)] pt-4">
                <p className="text-sm font-medium text-[var(--color-ink)]">{item.name}</p>
                <p className="text-sm italic text-[var(--color-ink-muted)]">{item.procedure}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
