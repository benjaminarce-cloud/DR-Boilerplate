'use client';

import {BLUR_DATA_URL, PLACEHOLDER_IMAGE_PATH} from '@/lib/image';
import {motion, useInView} from 'framer-motion';
import Image from 'next/image';
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
                staggerChildren: 0.1
              }
            }
          }}
          className="grid gap-6 xl:grid-cols-3"
        >
          {items.map((item) => (
            <motion.article
              key={item.procedure}
              variants={{
                hidden: {opacity: 0, y: 20},
                show: {opacity: 1, y: 0}
              }}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
            >
              <div className="grid grid-cols-2 gap-3">
                <figure className="space-y-2">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-[var(--color-border)]">
                    <Image
                      src={PLACEHOLDER_IMAGE_PATH}
                      alt={t('pairAlt', {procedure: item.procedure})}
                      fill
                      sizes="(max-width: 1280px) 50vw, 16vw"
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                    />
                  </div>
                  <figcaption className="text-xs tracking-[0.08em] text-[var(--color-ink-muted)]">{t('beforeLabel')}</figcaption>
                </figure>
                <figure className="space-y-2">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-[var(--color-border)]">
                    <Image
                      src={PLACEHOLDER_IMAGE_PATH}
                      alt={t('pairAlt', {procedure: item.procedure})}
                      fill
                      sizes="(max-width: 1280px) 50vw, 16vw"
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                    />
                  </div>
                  <figcaption className="text-xs tracking-[0.08em] text-[var(--color-ink-muted)]">{t('afterLabel')}</figcaption>
                </figure>
              </div>
              <p className="mt-4 font-display text-2xl text-[var(--color-ink)]">{item.procedure}</p>
            </motion.article>
          ))}
        </motion.div>

        <p className="text-xs tracking-[0.08em] text-[var(--color-ink-muted)]">{t('caption')}</p>
      </div>
    </section>
  );
}
