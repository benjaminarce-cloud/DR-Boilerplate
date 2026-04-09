'use client';

import {buttonClasses} from '@/components/ui/Button';
import {BLUR_DATA_URL, PLACEHOLDER_IMAGE_PATH} from '@/lib/image';
import {motion} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {useTranslations} from 'next-intl';
import {useMemo} from 'react';

export default function Hero() {
  const t = useTranslations('hero');
  const headlineLines = useMemo(() => t('headline').split('|').map((line) => line.trim()), [t]);
  const stats = useMemo(() => t.raw('stats') as string[], [t]);

  return (
    <section id="home" className="section-anchor flex min-h-screen items-end bg-[var(--color-bg)] pt-28 pb-10 lg:pb-14">
      <div className="container-shell flex w-full flex-col gap-10">
        <div className="grid gap-10 lg:grid-cols-10 lg:items-center">
          <div className="space-y-7 lg:col-span-6">
            <motion.p
              initial={{opacity: 0, y: 18}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.6, ease: 'easeOut'}}
              className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]"
            >
              {t('eyebrow')}
            </motion.p>

            <motion.h1 className="font-display text-[2.7rem] leading-[1.05] font-light text-[var(--color-ink)] md:text-[4.2rem] xl:text-[5rem]">
              {headlineLines.map((line, lineIndex) => (
                <span key={line} className="block">
                  {line.split(' ').map((word, wordIndex) => (
                    <motion.span
                      key={`${word}-${lineIndex}-${wordIndex}`}
                      initial={{opacity: 0, y: 14}}
                      animate={{opacity: 1, y: 0}}
                      transition={{delay: (lineIndex * 3 + wordIndex) * 0.08, duration: 0.45, ease: 'easeOut'}}
                      className="mr-3 inline-block"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{opacity: 0, y: 18}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.28, duration: 0.6, ease: 'easeOut'}}
              className="max-w-2xl text-base font-light text-[var(--color-ink-muted)] md:text-lg"
            >
              {t('subhead')}
            </motion.p>

            <motion.div
              initial={{opacity: 0, y: 16}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.36, duration: 0.5, ease: 'easeOut'}}
              className="flex flex-wrap gap-3"
            >
              <Link href="#contact" className={buttonClasses('primary')}>
                {t('primaryCta')}
              </Link>
              <Link href="#procedures" className={buttonClasses('ghost')}>
                {t('secondaryCta')}
              </Link>
            </motion.div>

            <motion.div
              initial={{opacity: 0, y: 16}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.44, duration: 0.55, ease: 'easeOut'}}
              className="inline-flex items-center gap-2 text-sm text-[var(--color-ink-muted)]"
            >
              <span aria-hidden="true" className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[var(--color-border)]">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <rect x="7" y="10" width="10" height="9" rx="2" />
                  <path d="M9.5 10V8a2.5 2.5 0 0 1 5 0v2" />
                </svg>
              </span>
              <span>{t('trust')}</span>
            </motion.div>
          </div>

          <motion.div
            initial={{opacity: 0, y: 24}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.28, duration: 0.8, ease: 'easeOut'}}
            className="soft-grain relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] lg:col-span-4"
          >
            <Image
              src={PLACEHOLDER_IMAGE_PATH}
              alt={t('imageAlt')}
              fill
              sizes="(max-width: 1024px) 100vw, 38vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.5, duration: 0.6, ease: 'easeOut'}}
          className="border-t border-[var(--color-border)] pt-6"
        >
          <div className="flex flex-wrap gap-3">
            {stats.map((stat) => (
              <span
                key={stat}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-xs tracking-[0.08em] text-[var(--color-ink-muted)]"
              >
                {stat}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
