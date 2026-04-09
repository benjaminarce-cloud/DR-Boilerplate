import IntlProvider from '@/components/ui/IntlProvider';
import './globals.css';
import type {Metadata} from 'next';
import {Cormorant_Garamond, DM_Sans} from 'next/font/google';
import type {ReactNode} from 'react';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-display',
  display: 'swap'
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: '[DR. NOMBRE] | Cirugía Plástica Guadalajara',
  description:
    'Plantilla bilingüe premium para clínica de cirugía plástica en Guadalajara. Premium bilingual placeholder for a private plastic surgery clinic in Guadalajara.',
  openGraph: {
    title: '[DR. NOMBRE] | Cirugía Plástica Guadalajara',
    description:
      'Plantilla bilingüe premium para clínica de cirugía plástica en Guadalajara. Premium bilingual placeholder for a private plastic surgery clinic in Guadalajara.',
    images: [
      {
        url: '/images/og-placeholder.png',
        width: 1200,
        height: 630,
        alt: 'Clinic Open Graph placeholder'
      }
    ]
  },
  alternates: {
    languages: {
      'es-MX': '/',
      en: '/'
    }
  }
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="es-MX" suppressHydrationWarning>
      <body className={`${cormorant.variable} ${dmSans.variable} min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)]`}>
        <IntlProvider>{children}</IntlProvider>
      </body>
    </html>
  );
}
