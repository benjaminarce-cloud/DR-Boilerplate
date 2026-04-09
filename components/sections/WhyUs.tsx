'use client';

import {motion, useInView} from 'framer-motion';
import {useTranslations} from 'next-intl';
import {useMemo, useRef, type ReactElement} from 'react';

type Pillar = {
  label: string;
  copy: string;
};

const icons: Array<ReactElement> = [
  <svg key="cert" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-8 w-8">
    <circle cx="16" cy="14" r="8" />
    <path d="m12 22-1 7 5-3 5 3-1-7" />
  </svg>,
  <svg key="tech" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-8 w-8">
    <rect x="6" y="7" width="20" height="18" rx="2" />
    <path d="M12 13h8M12 18h8" />
  </svg>,
  <svg key="care" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-8 w-8">
    <path d="M16 28s-9-5.4-9-12.2A5.4 5.4 0 0 1 16 12a5.4 5.4 0 0 1 9 3.8C25 22.6 16 28 16 28Z" />
    <path d="M16 12V6" />
  </svg>,
  <svg key="result" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-8 w-8">
    <path d="M7 21c2.6-4.5 6.2-6.8 10.8-6.8 3.1 0 5.5 1.1 7.2 3.2" />
    <path d="m20.5 9.5 4 1.2-1.2 4" />
    <circle cx="9" cy="21" r="2" />
  </svg>
];

export default function WhyUs() {
  const t = useTranslations('whyUs');
  const pillars = useMemo(() => t.raw('items') as Pillar[], [t]);
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, {once: true, amount: 0.15});

  return (
    <section ref={ref} className="section-shell bg-[var(--color-ink)]">
      <div className="container-shell">
        <motion.div
          initial={{opacity: 0, y: 24}}
          animate={isInView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.65, ease: 'easeOut'}}
          className="mx-auto mb-12 max-w-3xl space-y-4 text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">{t('eyebrow')}</p>
          <h2 className="font-display text-4xl leading-tight font-normal text-[var(--color-bg)] md:text-5xl">{t('title')}</h2>
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
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
        >
          {pillars.map((pillar, index) => (
            <motion.article
              key={pillar.label}
              variants={{
                hidden: {opacity: 0, y: 20},
                show: {opacity: 1, y: 0}
              }}
              className="space-y-5 rounded-2xl border border-[color:rgb(255_255_255/0.16)] bg-[color:rgb(255_255_255/0.02)] p-6"
            >
              <div className="text-[var(--color-accent)]">{icons[index]}</div>
              <h3 className="font-display text-3xl font-normal text-[var(--color-accent)]">{pillar.label}</h3>
              <p className="text-sm font-light text-[color:rgb(247_245_240/0.8)]">{pillar.copy}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
