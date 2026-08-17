import React from 'react';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { PRACTICE_LOCATION } from './lib/constants';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://wccounseling.net'),
  title: {
    default: 'WeCare Counseling | Therapist in Milwaukee & Mequon | Gina Botshtein, LCSW',
    template: '%s | WeCare Counseling',
  },
  description:
    'Gina Botshtein, LCSW offers individual, couples, and family therapy in Milwaukee, Mequon, and nearby communities — in person and by telehealth. 30+ years of experience.',
  keywords:
    'therapist Milwaukee, therapist Mequon, counseling Milwaukee WI, LCSW, couples therapy, individual therapy, family therapy, telehealth Wisconsin',
  openGraph: {
    title: 'WeCare Counseling | Therapy in Milwaukee & Mequon',
    description:
      'Compassionate counseling with Gina Botshtein, LCSW for individuals, couples, and families across Milwaukee, Mequon, and nearby communities.',
    url: 'https://wccounseling.net',
    siteName: 'WeCare Counseling',
    type: 'website',
    images: ['/gina.jpg'],
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://wccounseling.net',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: PRACTICE_LOCATION.legalName,
    image: 'https://wccounseling.net/gina.jpg',
    '@id': 'https://wccounseling.net/#medicalbusiness',
    url: 'https://wccounseling.net',
    telephone: '+1-414-617-2201',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: PRACTICE_LOCATION.locality,
      addressRegion: PRACTICE_LOCATION.region,
      postalCode: PRACTICE_LOCATION.postalCode,
      addressCountry: PRACTICE_LOCATION.country,
    },
    areaServed: PRACTICE_LOCATION.areaServed.map((city) => ({
      '@type': 'City',
      name: city,
      addressRegion: 'WI',
      addressCountry: 'US',
    })),
    sameAs: [PRACTICE_LOCATION.psychologyTodayUrl],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    employee: {
      '@type': 'Person',
      name: 'Gina Botshtein',
      jobTitle: 'Licensed Clinical Social Worker',
      honorificSuffix: 'LCSW',
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Licensed Clinical Social Worker',
        recognizedBy: {
          '@type': 'Organization',
          name: 'State of Wisconsin',
        },
        identifier: '12758-123',
      },
      knowsLanguage: ['English', 'Russian'],
    },
    medicalSpecialty: 'MentalHealth',
    paymentAccepted: 'Insurance, Credit Card, Cash',
    knowsAbout: [
      'Anxiety',
      'Depression',
      'Grief',
      'Caregiver stress',
      'Life transitions',
      'Individual Therapy',
      'Couples Therapy',
      'Family Counseling',
    ],
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${plusJakarta.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3c5144" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
