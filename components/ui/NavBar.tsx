'use client';

import LanguageToggle from '@/components/ui/LanguageToggle';
import {buttonClasses} from '@/components/ui/Button';
import {AnimatePresence, motion} from 'framer-motion';
import Link from 'next/link';
import {useTranslations} from 'next-intl';
import {useEffect, useMemo, useState} from 'react';

type NavLink = {
  id: string;
  label: string;
};

export default function NavBar() {
  const t = useTranslations('nav');
  const clinicName = process.env.NEXT_PUBLIC_CLINIC_NAME ?? '[NOMBRE]';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = useMemo(() => t.raw('links') as NavLink[], [t]);

  useEffect(() => {
    const onScroll = (): void => {
      setIsScrolled(window.scrollY > 60);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = (): void => setIsMenuOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          isScrolled
            ? 'border-b border-[var(--color-border)] bg-[color:rgb(255_255_255/0.9)] backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="container-shell flex h-22 items-center justify-between gap-4">
          <Link href="#home" className="font-display text-2xl font-semibold tracking-[0.14em] text-[var(--color-ink)]">
            {t('logo', {doctorName: clinicName})}
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.id}
                href={`#${link.id}`}
                className="text-sm font-medium tracking-[0.06em] text-[var(--color-ink-muted)] transition-colors duration-200 hover:text-[var(--color-ink)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageToggle />
            <Link href="#contact" className={buttonClasses('primary')}>
              {t('cta')}
            </Link>
          </div>

          <button
            type="button"
            aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] md:hidden"
          >
            <span className="sr-only">{isMenuOpen ? t('closeMenu') : t('openMenu')}</span>
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 block h-[1px] w-5 bg-[var(--color-ink)] transition-transform duration-200 ${
                  isMenuOpen ? 'translate-y-[7px] rotate-45' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] block h-[1px] w-5 bg-[var(--color-ink)] transition-opacity duration-200 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] block h-[1px] w-5 bg-[var(--color-ink)] transition-transform duration-200 ${
                  isMenuOpen ? '-translate-y-[7px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
            className="fixed inset-0 z-40 bg-[color:rgb(247_245_240/0.98)] backdrop-blur-xl md:hidden"
          >
            <div className="container-shell flex h-full flex-col justify-center gap-10 pt-16">
              <div className="flex justify-end">
                <LanguageToggle />
              </div>
              <nav className="flex flex-col gap-7">
                {links.map((link) => (
                  <Link
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={closeMenu}
                    className="font-display text-5xl font-normal text-[var(--color-ink)]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <Link href="#contact" onClick={closeMenu} className={buttonClasses('primary')}>
                {t('cta')}
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
