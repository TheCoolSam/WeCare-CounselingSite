import React from 'react';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

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
    <html lang="en" className={`${cormorant.variable} ${plusJakarta.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2d5016" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              "name": "WeCare Counseling",
              "image": "https://wccounseling.net/gina.jpg",
              "@id": "https://wccounseling.net/#medicalbusiness",
              "url": "https://wccounseling.net",
              "telephone": "+1-414-617-2201",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Milwaukee",
                "addressRegion": "WI",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 43.0389,
                "longitude": -87.9065
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              },
              "employee": {
                "@type": "Therapist",
                "name": "Gina Botshtein",
                "jobTitle": "Licensed Clinical Social Worker"
              },
              "medicalSpecialty": "MentalHealth",
              "paymentAccepted": "Insurance, Credit Card, Cash",
              "knowsAbout": ["Individual Therapy", "Couples Therapy", "Family Counseling", "Executive Coaching"]
            })
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
