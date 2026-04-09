'use client';

import doctorConfig from '@/lib/doctor.config';
import {BLUR_DATA_URL, PLACEHOLDER_IMAGE_PATH} from '@/lib/image';
import {motion, useInView} from 'framer-motion';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {useRef} from 'react';

export default function Procedures() {
  const t = useTranslations('procedures');
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, {once: true, amount: 0.15});

  return (
    <section id="procedures" ref={ref} className="section-anchor section-shell">
      <div className="container-shell">
        <motion.div
          initial={{opacity: 0, y: 24}}
          animate={isInView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.7, ease: 'easeOut'}}
          className="mx-auto mb-12 max-w-3xl space-y-4 text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">{t('eyebrow')}</p>
          <h2 className="font-display text-4xl leading-tight font-normal text-[var(--color-ink)] md:text-5xl">{t('title')}</h2>
          <p className="text-sm font-light text-[var(--color-ink-muted)] md:text-base">{t('subtitle')}</p>
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
          className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          {doctorConfig.procedures.map((procedure) => {
            const name = t(`catalog.${procedure.key}.name`);
            const description = t(`catalog.${procedure.key}.description`);

            return (
              <motion.article
                key={procedure.key}
                variants={{
                  hidden: {opacity: 0, y: 24},
                  show: {opacity: 1, y: 0}
                }}
                whileHover={{y: -6}}
                transition={{duration: 0.35, ease: 'easeOut'}}
                className={`group overflow-hidden rounded-2xl border bg-[var(--color-surface)] ${
                  procedure.highlight
                    ? 'border-[var(--color-accent)] shadow-[0_20px_40px_-28px_rgba(184,153,110,0.55)]'
                    : 'border-[var(--color-border)]'
                }`}
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={PLACEHOLDER_IMAGE_PATH}
                    alt={t('imageAlt', {name})}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />
                </div>
                <div className="space-y-4 p-6">
                  <h3 className="font-display text-3xl font-medium text-[var(--color-ink)]">{name}</h3>
                  <p className="text-sm font-light text-[var(--color-ink-muted)]">{description}</p>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-sm text-[var(--color-accent)] transition-colors duration-200 group-hover:text-[var(--color-accent-dark)]"
                  >
                    <span>{t('learnMore')}</span>
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
