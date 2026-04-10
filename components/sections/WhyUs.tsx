'use client';

import doctorConfig from '@/lib/doctor.config';
import {motion, useInView} from 'framer-motion';
import {useTranslations} from 'next-intl';
import {useMemo, useRef} from 'react';

type Pillar = {
  label: string;
  copy: string;
};

export default function WhyUs() {
  const t = useTranslations('whyUs');
  const pillars = useMemo(() => t.raw('items') as Pillar[], [t]);
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, {once: true, amount: 0.15});

  return (
    <section ref={ref} className="section-shell bg-[var(--color-ink)]">
      <div className="container-shell grid gap-8 lg:grid-cols-12 lg:gap-10">
        <motion.div
          initial={{opacity: 0, y: 24}}
          animate={isInView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.65, ease: 'easeOut'}}
          className="space-y-4 lg:col-span-4"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">{t('eyebrow')}</p>
          <h2 className="font-display text-4xl leading-tight font-normal text-[var(--color-bg)] md:text-5xl">{t('title')}</h2>

          <div className="space-y-2 border-l border-[color:rgb(255_255_255/0.25)] pl-4 text-sm text-[color:rgb(247_245_240/0.78)]">
            {doctorConfig.credentials.map((credential) => (
              <p key={credential}>{credential}</p>
            ))}
          </div>
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
          className="divide-y divide-[color:rgb(255_255_255/0.16)] rounded-2xl border border-[color:rgb(255_255_255/0.16)] bg-[color:rgb(255_255_255/0.02)] lg:col-span-8"
        >
          {pillars.map((pillar, index) => (
            <motion.article
              key={pillar.label}
              variants={{
                hidden: {opacity: 0, y: 14},
                show: {opacity: 1, y: 0}
              }}
              className="grid gap-3 p-5 md:grid-cols-[4rem_1fr] md:items-start md:p-6"
            >
              <p className="font-display text-4xl leading-none text-[color:rgb(255_255_255/0.26)]">{String(index + 1).padStart(2, '0')}</p>
              <div className="space-y-2">
                <h3 className="font-display text-2xl leading-tight text-[var(--color-bg)]">{pillar.label}</h3>
                <p className="text-sm text-[color:rgb(247_245_240/0.78)]">{pillar.copy}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
