import type { ReactNode } from 'react';
import { LOCATION_FAQS } from '../lib/constants';

const faqEntities = [
  {
    question: 'How much does a therapeutic session cost?',
    answer:
      "Sessions are $150 for a fifty-minute hour. I'm happy to discuss fees and out-of-network options during our first call.",
  },
  {
    question: 'Which insurance plans do you accept?',
    answer:
      'I am in-network with Aetna, Aetna Medicare, Medicaid, Medicare, UnitedHealthcare / Optum Medicaid, UnitedHealthcare / Optum Medicare, UnitedHealthcare UHC | UBH, WPS Health Solution, and Community Care. Please verify your specific mental health benefits with your carrier. For other plans, I can provide a monthly statement for out-of-network reimbursement.',
  },
  {
    question: 'Do you offer telehealth / secure virtual sessions?',
    answer:
      'Yes, I offer secure video sessions through a HIPAA-compliant platform. Many clients prefer the convenience of meeting from home.',
  },
  ...LOCATION_FAQS,
];

export const metadata = {
  title: {
    absolute: 'FAQ | Therapy with Gina Botshtein, LCSW in Milwaukee & Mequon',
  },
  description:
    'Answers about fees, insurance, telehealth, and where Gina Botshtein, LCSW sees clients in Milwaukee, Mequon, and nearby communities.',
  alternates: {
    canonical: 'https://wccounseling.net/faq/',
  },
};

export default function FAQLayout({ children }: { children: ReactNode }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqEntities.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}
