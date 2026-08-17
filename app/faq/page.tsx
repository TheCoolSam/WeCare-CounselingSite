'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, ArrowLeft, ArrowRight } from 'lucide-react';
import SiteFooter from '../components/SiteFooter';
import { LOCATION_FAQS } from '../lib/constants';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How much does a therapeutic session cost?",
      answer: "Sessions are $150 for a fifty-minute hour. I'm happy to discuss fees and out-of-network options during our first call."
    },
    {
      question: "Which insurance plans do you accept?",
      answer: "I am in-network with Aetna, Aetna Medicare, Medicaid, Medicare, UnitedHealthcare / Optum Medicaid, UnitedHealthcare / Optum Medicare, UnitedHealthcare UHC | UBH, WPS Health Solution, and Community Care. Please verify your specific mental health benefits with your carrier. For other plans, I can provide a monthly statement for out-of-network reimbursement."
    },
    {
      question: "What should I expect in our initial consultation?",
      answer: "Our first meeting is a chance to get to know each other. We'll talk about what's going on in your life, what you're hoping to change, and whether we're a good fit. No pressure."
    },
    {
      question: "How long does the therapeutic process typically extend?",
      answer: "It depends on your goals. Some people find what they need in 8-12 sessions, while others prefer ongoing support. We'll check in regularly and adjust as we go."
    },
    {
      question: "Do you offer telehealth / secure virtual sessions?",
      answer: "Yes, I offer secure video sessions through a HIPAA-compliant platform. Many clients prefer the convenience of meeting from home."
    },
    {
      question: "Is the clinical information completely confidential?",
      answer: "Everything you share stays between us. The only exceptions are situations involving immediate danger or suspected abuse — these are legally required disclosures."
    },
    {
      question: "What is your clinical cancellation policy?",
      answer: "I ask for 24 hours' notice if you need to cancel. Late cancellations or no-shows are billed at the full session rate."
    },
    {
      question: "How do I determine if this therapeutic framework is right for me?",
      answer: "You don't need to be in crisis to benefit from therapy. If you're feeling stuck, going through a transition, or just want to grow — that's reason enough. Reach out and we'll figure out if it's a good fit."
    },
    {
      question: "What types of therapy do you offer?",
      answer: "I specialize in individual therapy, couples counseling, and family support. My approach blends cognitive, behavioral, and mindfulness-based methods, customized to what works best for you."
    },
    {
      question: "Can I bring a partner or support person to my session?",
      answer: "Yes. For couples and family work, having your partner or family member there is often part of the process. For individual sessions, you're welcome to bring a support person to our first meeting if that helps you feel comfortable — just let me know ahead of time."
    },
    ...LOCATION_FAQS,
  ];

  return (
    <div className="min-h-screen bg-stone-50 relative flex flex-col justify-between">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-100 py-4">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex justify-between items-center">
          <Link href="/" className="font-sans font-extrabold text-lg sm:text-xl tracking-tight text-stone-900">
            WeCare <span className="text-forest-600 font-light">Counseling</span>
          </Link>
          <div className="flex items-center gap-4 sm:gap-6 text-[10px] sm:text-xs uppercase tracking-widest font-bold text-stone-600">
            <Link href="/" className="hover:text-forest-600 transition-colors">Home</Link>
            <Link href="/#about" className="hidden md:inline hover:text-forest-600 transition-colors">About</Link>
            <Link href="/#services" className="hidden md:inline hover:text-forest-600 transition-colors">Services</Link>
            <Link href="/#journey" className="hidden md:inline hover:text-forest-600 transition-colors">Journey</Link>
            <Link href="/#insurance" className="hidden md:inline hover:text-forest-600 transition-colors">Insurance</Link>
            <Link href="/faq" className="hover:text-forest-600 transition-colors">FAQ</Link>
            <Link href="/contact" className="text-forest-600 hover:text-forest-700 transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-24 px-5 sm:px-8 relative z-10 flex-grow">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="font-sans font-extrabold text-4xl sm:text-5xl text-stone-900 tracking-tight mb-4 text-balance">
              Frequently Asked Questions
            </h1>
            <p className="text-sm sm:text-base text-stone-500 max-w-xl mx-auto leading-relaxed">
              Common questions about therapy, fees, location, and what to expect.
            </p>
          </motion.div>

          {/* FAQ Accordions (Ruled horizontal bars) */}
          <div className="space-y-0 border-t border-stone-200 mb-16">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.04 * index }}
                className="border-b border-stone-200 overflow-hidden bg-white/40 px-4 hover:bg-white/90 transition-all rounded-none"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full py-6 text-left flex justify-between items-center gap-6 group transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-600"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-page-content-${index}`}
                  id={`faq-page-header-${index}`}
                >
                  <span className="font-sans text-sm sm:text-base font-bold text-stone-900 group-hover:text-forest-700 transition-colors">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-6 h-6 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 group-hover:text-forest-700 transition-colors"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </motion.div>
                </button>
                <motion.div
                  id={`faq-page-content-${index}`}
                  role="region"
                  aria-labelledby={`faq-page-header-${index}`}
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pr-8 text-stone-500 leading-relaxed text-xs sm:text-sm font-sans text-left">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Minimalist Catalog CTA Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center border border-stone-200 bg-white p-8 sm:p-12 rounded-3xl"
          >
            <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-stone-900 mb-4">
              Need more details?
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mb-8 max-w-xl mx-auto leading-relaxed font-sans">
              I am gladly here to review your individual concerns and coordinate a complimentary consult call before committing to sessions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <motion.span
                  className="inline-block px-8 py-3.5 border border-stone-200 hover:bg-stone-50 text-stone-600 text-xs uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer rounded-full"
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center gap-2 justify-center">
                    <ArrowLeft className="w-3.5 h-3.5" /> Return Home
                  </span>
                </motion.span>
              </Link>
              <Link href="/contact">
                <motion.span
                  className="inline-block px-8 py-3.5 bg-forest-600 hover:bg-forest-700 text-white text-xs uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer rounded-full"
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center gap-2 justify-center">
                    Send Message <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
