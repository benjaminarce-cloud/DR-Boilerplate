'use client';

import Button from '@/components/ui/Button';
import type {DoctorProfile} from '@/lib/doctors';
import {doctors} from '@/lib/doctors';
import {BLUR_DATA_URL} from '@/lib/image';
import {AnimatePresence, motion, useInView} from 'framer-motion';
import Cal from '@calcom/embed-react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {useEffect, useMemo, useRef, useState} from 'react';

export default function Booking() {
  const t = useTranslations('booking');
  const tDoctors = useTranslations('booking.doctors');
  const tLanguages = useTranslations('booking.languageBadges');
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, {once: true, amount: 0.15});
  const [activeDoctor, setActiveDoctor] = useState<DoctorProfile | null>(null);

  const doctorCards = useMemo(() => doctors, []);

  useEffect(() => {
    if (!activeDoctor) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setActiveDoctor(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeDoctor]);

  return (
    <>
      <section id="booking" ref={ref} className="section-anchor section-shell">
        <div className="container-shell">
          <motion.div
            initial={{opacity: 0, y: 24}}
            animate={isInView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.65, ease: 'easeOut'}}
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
            {doctorCards.map((doctor) => {
              const name = tDoctors(doctor.nameKey);
              const specialty = tDoctors(doctor.specialtyKey);
              const hasCalendar = doctor.calUsername.trim().length > 0;

              return (
                <motion.article
                  key={doctor.id}
                  variants={{
                    hidden: {opacity: 0, y: 20},
                    show: {opacity: 1, y: 0}
                  }}
                  className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={doctor.photoPlaceholder}
                      alt={t('photoAlt', {name})}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                    />
                  </div>
                  <div className="space-y-4 p-6">
                    <div>
                      <h3 className="font-display text-3xl font-medium text-[var(--color-ink)]">{name}</h3>
                      <p className="text-sm font-light text-[var(--color-ink-muted)]">{specialty}</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">{t('languagesLabel')}</p>
                      <div className="flex gap-2">
                        {doctor.languages.map((language) => (
                          <span
                            key={`${doctor.id}-${language}`}
                            className="rounded-full border border-[var(--color-border)] px-3 py-1 text-[11px] font-medium tracking-[0.08em] text-[var(--color-ink-muted)]"
                          >
                            {tLanguages(language)}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="primary"
                      fullWidth
                      disabled={!hasCalendar}
                      onClick={() => setActiveDoctor(doctor)}
                      className={hasCalendar ? '' : 'cursor-not-allowed opacity-60'}
                    >
                      {hasCalendar ? t('cta', {name}) : t('unavailable')}
                    </Button>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {activeDoctor ? (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
            className="fixed inset-0 z-[60] bg-black/60 p-4 md:p-6"
            onClick={() => setActiveDoctor(null)}
            aria-modal="true"
            role="dialog"
            aria-label={t('modalTitle', {name: tDoctors(activeDoctor.nameKey)})}
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
                  <p className="font-display text-3xl leading-none text-[var(--color-ink)]">{tDoctors(activeDoctor.nameKey)}</p>
                  <p className="mt-1 text-sm text-[var(--color-ink-muted)]">{tDoctors(activeDoctor.specialtyKey)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveDoctor(null)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-ink-muted)] transition-colors duration-200 hover:text-[var(--color-ink)]"
                  aria-label={t('close')}
                >
                  <span aria-hidden="true">✕</span>
                </button>
              </header>
              <div className="h-full min-h-[70vh] w-full">
                <Cal calLink={activeDoctor.calUsername} className="h-full w-full" />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
