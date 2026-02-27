'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, ArrowLeft } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How much does therapy cost?",
      answer: "Individual therapy sessions are $150 per hour. I'm happy to discuss fees and options during your initial consultation."
    },
    {
      question: "What happens in the first session?",
      answer: "The first session is about getting to know each other. We'll discuss what brings you to therapy, your goals, and your history. I'll explain my approach and answer any questions you have. There's no pressure—this is a space for you to explore whether we're a good fit."
    },
    {
      question: "How long does therapy typically last?",
      answer: "This varies greatly depending on your goals and needs. Some clients find relief in 8-12 sessions, while others benefit from longer-term support. We'll regularly check in on your progress and adjust as needed. You're always in control of your therapeutic journey."
    },
    {
      question: "Do you offer online/telehealth sessions?",
      answer: "Yes! I offer secure video sessions through a HIPAA-compliant platform. Many clients prefer the convenience and comfort of meeting from home. Online sessions are just as effective as in-person for most therapeutic work."
    },
    {
      question: "Is therapy confidential?",
      answer: "Absolutely. Everything you share is confidential and protected by law (HIPAA). The only exceptions are if you're at risk of harming yourself or others, or if there's suspected child or elder abuse—in which case I'm legally required to take action to ensure safety."
    },
    {
      question: "What's your cancellation policy?",
      answer: "I require 24 hours notice for cancellations. Late cancellations or no-shows may be charged the full session fee, as that time was reserved exclusively for you. Life happens though—let's talk if you're facing circumstances beyond your control."
    },
    {
      question: "How do I know if therapy is right for me?",
      answer: "If you're feeling stuck, overwhelmed, or simply curious about personal growth, therapy can help. You don't need to be in crisis to benefit. The best time to start is when you're ready to invest in yourself. Reach out and we can explore whether working together feels like the right fit."
    },
    {
      question: "What types of therapy do you offer?",
      answer: "I offer individual therapy for adults, couples therapy, and family/team support. My approach is integrative, drawing from CBT, psychodynamic therapy, mindfulness-based practices, and solution-focused therapy. I tailor the approach to each client's unique needs and goals."
    },
    {
      question: "Can I bring someone with me to a session?",
      answer: "Absolutely! For couples or family therapy, bringing others is part of the process. For individual therapy, you're welcome to bring a support person to your first session if it helps you feel more comfortable. Just let me know in advance."
    }
  ];

  return (
    <div className="min-h-screen bg-ivory-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-forest-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="font-serif text-xl sm:text-2xl font-bold text-forest-700 hover:text-forest-800 transition-colors">
            WeCare
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/#about" className="hidden md:inline text-sm font-medium text-stone-700 hover:text-forest-600 transition-colors">
              About
            </Link>
            <Link href="/#services" className="hidden md:inline text-sm font-medium text-stone-700 hover:text-forest-600 transition-colors">
              Services
            </Link>
            <Link href="/contact" className="text-sm font-medium text-forest-600 hover:text-forest-700 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-16 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-sm font-semibold text-forest-600 uppercase tracking-widest mb-3 block">FAQ</span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-stone-600">
              Everything you need to know about getting started with therapy
            </p>
          </motion.div>

          {/* FAQ List */}
          <div className="space-y-3 mb-12">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.04 * index }}
                className="bg-white rounded-xl border border-stone-200/60 overflow-hidden hover:border-forest-200 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left hover:bg-forest-50/30 transition-colors flex justify-between items-center gap-4"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-semibold text-stone-900 text-sm sm:text-base">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-forest-500" />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 sm:px-6 pb-4 sm:pb-5 pt-1 text-stone-600 leading-relaxed text-sm sm:text-base">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center bg-white rounded-2xl p-8 border border-stone-200/60 shadow-lg"
          >
            <h3 className="font-serif text-2xl font-bold text-stone-900 mb-3">Still have questions?</h3>
            <p className="text-stone-600 mb-6 max-w-xl mx-auto">
              I'm here to help. Reach out to discuss your needs and see if we're a good fit.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact">
                <motion.span
                  className="inline-block px-7 py-3 bg-forest-600 hover:bg-forest-700 text-white font-semibold rounded-full transition-colors cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get in Touch
                </motion.span>
              </Link>
              <Link href="/quiz">
                <motion.span
                  className="inline-block px-7 py-3 bg-white hover:bg-forest-50 text-forest-700 font-semibold rounded-full border-2 border-forest-200 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Take the Quiz
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-ivory-200 py-10 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="font-serif text-xl font-bold text-white mb-2">WeCare Counseling</h3>
          <p className="text-stone-400 mb-4 text-sm">Gina Botshtein, LCSW</p>
          <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
            <a href="tel:+14146172201" className="text-stone-400 hover:text-forest-300 transition-colors">
              +1 (414) 617-2201
            </a>
            <span className="text-stone-600">|</span>
            <a href="mailto:Gina@wccounseling.net" className="text-stone-400 hover:text-forest-300 transition-colors">
              Gina@wccounseling.net
            </a>
          </div>
          <p className="text-xs text-stone-500">
            © {new Date().getFullYear()} WeCare Counseling. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
