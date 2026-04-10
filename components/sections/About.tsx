'use client';

import doctorConfig from '@/lib/doctor.config';
import {motion, useInView} from 'framer-motion';
import {useTranslations} from 'next-intl';
import {useMemo, useRef} from 'react';

export default function About() {
  const t = useTranslations('about');
  const paragraphs = useMemo(() => t.raw('paragraphs') as string[], [t]);
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, {once: true, amount: 0.15});

  return (
    <motion.section
      id="about"
      ref={ref}
      className="section-anchor section-shell"
      initial={{opacity: 0, y: 28}}
      animate={isInView ? {opacity: 1, y: 0} : {}}
      transition={{duration: 0.7, ease: 'easeOut'}}
    >
      <div className="container-shell grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="space-y-7 lg:col-span-7">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">{t('eyebrow')}</p>
          <h2 className="font-display text-4xl leading-[1.08] font-normal text-[var(--color-ink)] md:text-5xl">{t('title')}</h2>

          <div className="space-y-4 text-[15px] font-light text-[var(--color-ink-muted)] md:text-base">
            {paragraphs.map((paragraph, index) => (
              <p key={`${paragraph}-${index}`}>{t(`paragraphs.${index}`, {doctorName: doctorConfig.name})}</p>
            ))}
          </div>

          <blockquote className="border-l border-[var(--color-accent)] pl-4">
            <p className="font-display text-3xl leading-tight font-light italic text-[var(--color-ink)]">“{t('quote')}”</p>
            <footer className="mt-2 text-sm text-[var(--color-ink-muted)]">{t('quoteAuthor', {doctorShortName: doctorConfig.shortName})}</footer>
          </blockquote>
        </div>

        <aside className="space-y-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:col-span-5">
          <h3 className="font-display text-3xl text-[var(--color-ink)]">{doctorConfig.name}</h3>
          <p className="text-sm text-[var(--color-ink-muted)]">{doctorConfig.title}</p>

          <div className="flex flex-wrap gap-2.5">
            {doctorConfig.credentials.map((credential) => (
              <span key={credential} className="rounded-full border border-[var(--color-border)] px-3.5 py-1.5 text-xs tracking-[0.08em] text-[var(--color-ink-muted)]">
                {credential}
              </span>
            ))}
          </div>

          <div className="space-y-3 border-t border-[var(--color-border)] pt-4 text-sm text-[var(--color-ink-muted)]">
            <p>{doctorConfig.address}</p>
            <p>{doctorConfig.hospital}</p>
          </div>
        </aside>
      </div>
    </motion.section>
  );
}
