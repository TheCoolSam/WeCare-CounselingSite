'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, ArrowLeft } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How much does a therapeutic session cost?",
      answer: "Individual and couples clinical sessions are structured at $150 per fifty-minute hour. Detailed fee lists and modular package alternatives are gladly reviewed during your initial consultation."
    },
    {
      question: "What should I expect in our initial consultation?",
      answer: "Our first session functions as a mutual exploration. We will map out your current relational landscapes, personal threshold challenges, and your clinical goals. This is a secure, low-pressure diagnostic assessment to ensure my systemic approach aligns beautifully with your vision."
    },
    {
      question: "How long does the therapeutic process typically extend?",
      answer: "This is deeply personalized. Some clients achieve their initial targets in 8 to 12 weekly sessions, while others choose long-term maintenance blocks for continuing restoration and clinical support. We regularly check in on progress metrics together."
    },
    {
      question: "Do you offer telehealth / secure virtual sessions?",
      answer: "Yes. I conduct high-performance telehealth sessions through a completely secure, HIPAA-compliant clinical video platform. Many clients prefer the convenience, grounding safety, and privacy of meeting from their home environment."
    },
    {
      question: "Is the clinical information completely confidential?",
      answer: "Absolutely. In strict compliance with HIPAA federal laws and clinical social work ethics, everything you share remains private. The only legal boundaries to confidentiality concern immediate risk of harm to yourself/others, or suspected child/elder abuse, where clinical intervention is legally mandatory."
    },
    {
      question: "What is your clinical cancellation policy?",
      answer: "I require a strict twenty-four-hour notification for cancellations. Late cancellations or missed consultations without notice are billed at the full standard session fee to respect scheduled clinical blocks. Exceptional circumstances are gladly discussed individually."
    },
    {
      question: "How do I determine if this therapeutic framework is right for me?",
      answer: "If you feel relationally stuck, emotionally stagnant, or are consciously seeking structural personal restructuring, therapy is a profound gift. You do not need to be in crisis to invest in clinical growth. Reach out today and we can determine if this is the correct fit."
    },
    {
      question: "What types of therapy do you offer?",
      answer: "I specialize in Individual Psychotherapy, relational Couples Counseling, and systemic Family & Team dynamics workshops. My methodology integrates cognitive, behavioral, psychodynamic, and mindfulness-based modalities customized to your specific landscape."
    },
    {
      question: "Can I bring a partner or support person to my session?",
      answer: "Yes. In couples and family systems, collaborative presence is fundamental. For individual treatment, you are welcome to bring a support person to our initial consultation if it assists your safety and comfort. Please notify me beforehand so we can arrange the session format."
    }
  ];

  return (
    <div className="min-h-screen bg-ivory-50 relative flex flex-col justify-between">
      {/* Editorial grid overlay */}
      <div className="absolute inset-0 editorial-grid opacity-20 pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-ivory-50 border-b border-stone-200 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex justify-between items-center">
          <Link href="/" className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-forest-700">
            WECARE <span className="font-sans font-light text-stone-500 text-xs tracking-widest uppercase align-middle ml-1">Counseling</span>
          </Link>
          <div className="flex items-center gap-6 text-xs uppercase tracking-widest font-bold text-stone-700">
            <Link href="/#about" className="hidden md:inline hover:text-forest-600 transition-colors">About</Link>
            <Link href="/#services" className="hidden md:inline hover:text-forest-600 transition-colors">Services</Link>
            <Link href="/contact" className="text-forest-600 hover:text-forest-700 transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-36 pb-24 px-5 sm:px-8 relative z-10 flex-grow">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[10px] tracking-[0.3em] font-bold text-gold-600 uppercase mb-3 block">
              CLINICAL GUIDE
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-light text-stone-900 mb-6 text-balance">
              Frequently Asked <span className="italic text-forest-700 font-normal">Questions</span>
            </h1>
            <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto leading-relaxed">
              Transparent, practical details regarding session parameters, billing systems, and expectations on getting started.
            </p>
          </motion.div>

          {/* FAQ List */}
          <div className="space-y-0 border-t border-stone-300 mb-16">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.04 * index }}
                className="border-b border-stone-200/80 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full py-6 text-left flex justify-between items-center gap-6 group transition-colors focus:outline-none"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-stone-900 group-hover:text-forest-700 transition-colors">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-shrink-0 w-6 h-6 border border-stone-300 rounded-full flex items-center justify-center text-stone-400 group-hover:text-gold-600 group-hover:border-gold-400 transition-colors"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </motion.div>
                </button>
                <motion.div
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

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center border border-stone-300 bg-white p-8 sm:p-12"
          >
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-stone-900 mb-4">
              Require Further <span className="italic text-forest-700 font-normal">Systemic Details?</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mb-8 max-w-xl mx-auto leading-relaxed font-sans">
              I am gladly here to review your individual concerns and coordinate a secure alignment check before committing to sessions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <motion.span
                  className="inline-block px-8 py-3.5 border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer"
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center gap-2 justify-center">
                    <ArrowLeft className="w-3.5 h-3.5" /> Return Home
                  </span>
                </motion.span>
              </Link>
              <Link href="/contact">
                <motion.span
                  className="inline-block px-8 py-3.5 border border-forest-600 bg-forest-700 hover:bg-forest-600 text-white text-xs uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer shadow-md shadow-forest-900/10"
                  whileTap={{ scale: 0.98 }}
                >
                  Inquire Securely
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-forest-900 text-ivory-100 py-16 px-5 sm:px-8 border-t border-forest-800 relative z-10 mt-auto">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="font-serif text-xl font-bold tracking-wider text-white mb-2">WECARE COUNSELING</h3>
          <p className="text-xs tracking-widest text-gold-400 font-bold uppercase mb-4">Gina Botshtein, LCSW</p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm text-forest-200">
            <a href="tel:+14146172201" className="hover:text-gold-400 transition-colors">
              +1 (414) 617-2201
            </a>
            <span className="text-forest-800">|</span>
            <a href="mailto:Gina@wccounseling.net" className="hover:text-gold-400 transition-colors">
              Gina@wccounseling.net
            </a>
          </div>
          <div className="border-t border-forest-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] tracking-wider font-bold text-forest-300 uppercase">
            <p>© {new Date().getFullYear()} WeCare Counseling. All rights reserved.</p>
            <p className="text-[9px] text-forest-400">Confidential & HIPAA Compliant Healthcare Space</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
