'use client';

import {BLUR_DATA_URL, PLACEHOLDER_IMAGE_PATH} from '@/lib/image';
import {motion, useInView} from 'framer-motion';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {useMemo, useRef} from 'react';

export default function About() {
  const t = useTranslations('about');
  const paragraphs = useMemo(() => t.raw('paragraphs') as string[], [t]);
  const chips = useMemo(() => t.raw('chips') as string[], [t]);
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
      <div className="container-shell grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="soft-grain relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)]">
          <Image
            src={PLACEHOLDER_IMAGE_PATH}
            alt={t('imageAlt')}
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
        </div>

        <div className="space-y-7 self-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">{t('eyebrow')}</p>
          <h2 className="font-display text-4xl leading-[1.08] font-normal text-[var(--color-ink)] md:text-5xl">{t('title')}</h2>

          <div className="space-y-4 text-[15px] font-light text-[var(--color-ink-muted)] md:text-base">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="flex flex-wrap gap-2.5">
            {chips.map((chip) => (
              <span key={chip} className="rounded-full border border-[var(--color-border)] px-3.5 py-1.5 text-xs tracking-[0.08em] text-[var(--color-ink-muted)]">
                {chip}
              </span>
            ))}
          </div>

          <blockquote className="border-l border-[var(--color-accent)] pl-4">
            <p className="font-display text-3xl leading-tight font-light italic text-[var(--color-ink)]">“{t('quote')}”</p>
            <footer className="mt-2 text-sm text-[var(--color-ink-muted)]">{t('quoteAuthor')}</footer>
          </blockquote>
        </div>
      </div>
    </motion.section>
  );
}
