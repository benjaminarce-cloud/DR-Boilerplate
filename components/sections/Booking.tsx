'use client';

import Cal from '@calcom/embed-react';
import Button from '@/components/ui/Button';
import doctorConfig from '@/lib/doctor.config';
import {AnimatePresence, motion, useInView} from 'framer-motion';
import {useTranslations} from 'next-intl';
import {useEffect, useRef, useState} from 'react';

export default function Booking() {
  const t = useTranslations('booking');
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, {once: true, amount: 0.15});
  const hasCalendar = doctorConfig.calUsername.trim().length > 0;
  const hasReviewMeta = Boolean(doctorConfig.reviewScore && doctorConfig.reviewCount && doctorConfig.reviewSource);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  return (
    <>
      <section id="booking" ref={ref} className="section-anchor section-shell">
        <div className="container-shell">
          <motion.div
            initial={{opacity: 0, y: 24}}
            animate={isInView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.65, ease: 'easeOut'}}
            className="mx-auto mb-10 max-w-3xl space-y-4 text-center"
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">{t('eyebrow')}</p>
            <h2 className="font-display text-4xl leading-tight font-normal text-[var(--color-ink)] md:text-5xl">{t('title', {doctorName: doctorConfig.name})}</h2>
            <p className="text-sm font-light text-[var(--color-ink-muted)] md:text-base">{t('subtitle')}</p>
          </motion.div>

          <motion.article
            initial={{opacity: 0, y: 24}}
            animate={isInView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.7, ease: 'easeOut', delay: 0.1}}
            className="mx-auto max-w-4xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8"
          >
            <div className="grid gap-7 md:grid-cols-[1.2fr_1fr]">
              <div className="space-y-4">
                <p className="font-display text-4xl leading-tight text-[var(--color-ink)]">{doctorConfig.name}</p>
                <p className="text-sm text-[var(--color-ink-muted)]">{doctorConfig.title}</p>
                <p className="text-sm text-[var(--color-ink-muted)]">{doctorConfig.address}</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">{t('languagesLabel')}</p>
                  <div className="flex gap-2">
                    <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-[11px] font-medium tracking-[0.08em] text-[var(--color-ink-muted)]">
                      {t('languageBadges.es')}
                    </span>
                    <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-[11px] font-medium tracking-[0.08em] text-[var(--color-ink-muted)]">
                      {t('languageBadges.en')}
                    </span>
                  </div>
                </div>

                {hasReviewMeta ? (
                  <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 text-sm text-[var(--color-ink-muted)]">
                    <p>
                      {doctorConfig.reviewScore} · {doctorConfig.reviewCount} {t('reviews')} · {doctorConfig.reviewSource}
                    </p>
                  </div>
                ) : null}

                <Button
                  type="button"
                  variant="primary"
                  fullWidth
                  disabled={!hasCalendar}
                  onClick={() => setIsOpen(true)}
                  className={hasCalendar ? '' : 'cursor-not-allowed opacity-60'}
                >
                  {hasCalendar ? t('cta', {doctorShortName: doctorConfig.shortName}) : t('unavailable')}
                </Button>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
            className="fixed inset-0 z-[60] bg-black/60 p-4 md:p-6"
            onClick={() => setIsOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={t('modalTitle', {doctorName: doctorConfig.name})}
          >
            <motion.div
              initial={{opacity: 0, y: 12}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: 8}}
              transition={{duration: 0.25, ease: 'easeOut'}}
              className="mx-auto flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]"
              onClick={(event) => event.stopPropagation()}
            >
              <header className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4 md:px-6">
                <div>
                  <p className="font-display text-3xl leading-none text-[var(--color-ink)]">{doctorConfig.name}</p>
                  <p className="mt-1 text-sm text-[var(--color-ink-muted)]">{doctorConfig.title}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-ink-muted)] transition-colors duration-200 hover:text-[var(--color-ink)]"
                  aria-label={t('close')}
                >
                  <span aria-hidden="true">✕</span>
                </button>
              </header>
              <div className="h-full min-h-[70vh] w-full">
                <Cal calLink={doctorConfig.calUsername} className="h-full w-full" />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
