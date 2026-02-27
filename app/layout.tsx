import React from 'react';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata = {
  title: 'WeCare Counseling - Gina Botshtein, LCSW | Therapy in Milwaukee',
  description: 'Professional therapy services for individuals, couples, and teams. Gina Botshtein, LCSW offers compassionate counseling with 30+ years of expertise.',
  keywords: 'therapy, counseling, LCSW, Milwaukee, couples therapy, individual therapy, mental health',
  openGraph: {
    title: 'WeCare Counseling - Gina Botshtein, LCSW',
    description: 'Professional therapy services with 30+ years of expertise. Compassionate counseling for individuals, couples, and teams.',
    url: 'https://wccounseling.net',
    siteName: 'WeCare Counseling',
    type: 'website',
  },
  robots: 'index, follow',
  canonical: 'https://wccounseling.net',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2d5016" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
