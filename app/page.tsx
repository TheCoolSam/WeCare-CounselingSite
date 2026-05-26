'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, ArrowRight, Menu, X, ChevronDown } from 'lucide-react';
import HealingJourney from './components/HealingJourney';
import ginaPhoto from './components/gina.jpg';

// Scroll animation wrapper component
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Navigation Bar
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Journey', href: '#journey' },
    { label: 'Insurance', href: '#insurance' },
    { label: 'FAQ', href: '/faq' },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-100 py-3'
          : 'bg-transparent py-5'
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          <Link href="/" className="group">
            <span className="font-sans font-extrabold text-lg sm:text-xl tracking-tight text-stone-900">
              WeCare <span className="text-forest-600 font-light">Counseling</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.href.startsWith('/') ? (
                  <Link href={link.href} className="text-xs font-semibold tracking-wider text-stone-600 hover:text-forest-600 transition-colors uppercase">
                    {link.label}
                  </Link>
                ) : (
                  <a href={link.href} className="text-xs font-semibold tracking-wider text-stone-600 hover:text-forest-600 transition-colors uppercase">
                    {link.label}
                  </a>
                )}
              </li>
            ))}
            <li>
              <Link href="/contact">
                <motion.span
                  className="inline-block px-5 py-2 bg-forest-600 hover:bg-forest-700 text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer shadow-md shadow-forest-600/10"
                  whileTap={{ scale: 0.97 }}
                >
                  Contact
                </motion.span>
              </Link>
            </li>
          </ul>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 hover:bg-stone-50 rounded-full transition-colors text-stone-800"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-stone-950/40 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 md:hidden"
            >
              <div className="flex flex-col p-8 pt-20">
                <div className="space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                    >
                      {link.href.startsWith('/') ? (
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-3 px-4 text-sm font-bold uppercase tracking-wider text-stone-800 hover:text-forest-600 hover:bg-stone-50 rounded-xl transition-colors"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-3 px-4 text-sm font-bold uppercase tracking-wider text-stone-800 hover:text-forest-600 hover:bg-stone-50 rounded-xl transition-colors"
                        >
                          {link.label}
                        </a>
                      )}
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 pt-6 border-t border-stone-100"
                >
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="block text-center py-3 px-6 bg-forest-600 hover:bg-forest-700 text-white font-bold rounded-full text-xs uppercase tracking-widest transition-all"
                  >
                    Get in Touch
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="mt-8 space-y-3 text-xs tracking-wider text-stone-500"
                >
                  <a href="tel:+14146172201" className="flex items-center gap-2.5 hover:text-forest-600 transition-colors">
                    <Phone className="w-4 h-4 text-forest-600" /> +1 (414) 617-2201
                  </a>
                  <a href="mailto:Gina@wccounseling.net" className="flex items-center gap-2.5 hover:text-forest-600 transition-colors break-all">
                    <Mail className="w-4 h-4 text-forest-600" /> Gina@wccounseling.net
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Hero Section (Pristine background, no generic blobs)
function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center px-5 sm:px-8 pt-28 pb-20 bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.15}>
              <h1 className="font-sans font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-stone-900 tracking-tight leading-[1.05] mb-6">
                Gina <br />
                <span className="text-forest-600">Botshtein</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase mb-8">
                Licensed Clinical Social Worker
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <p className="text-xl sm:text-2xl md:text-3xl text-stone-800 mb-6 leading-snug font-light">
                Therapy isn't one size fits all.{' '}
                <span className="text-forest-700 italic font-serif">It's a journey we design together.</span>
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-base text-stone-500 mb-8 leading-relaxed max-w-xl">
                With a rare blend of clinical expertise, deep compassion, and genuine warmth, I create personalized therapy experiences that honor your unique story.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.35}>
              <Link href="/contact">
                <motion.span
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-forest-600 hover:bg-forest-700 text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-lg shadow-forest-600/10 transition-all cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get in Touch
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.span>
              </Link>
            </ScrollReveal>
          </div>

          {/* Right Column (Minimalist cards) */}
          <div className="lg:col-span-5 space-y-8">
            <ScrollReveal delay={0.15}>
              <div className="border-l-2 border-stone-200 pl-6">
                <h3 className="text-base font-semibold text-stone-900 mb-1">Personalized Care</h3>
                <p className="text-sm text-stone-500">Therapy shaped around your specific needs, goals, and life.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="border-l-2 border-stone-200 pl-6">
                <h3 className="text-base font-semibold text-stone-900 mb-1">Holistic Approach</h3>
                <p className="text-sm text-stone-500">Addressing mind, emotions, relationships, and personal growth together.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.45}>
              <div className="border-l-2 border-stone-200 pl-6">
                <h3 className="text-base font-semibold text-stone-900 mb-1">Proven Experience</h3>
                <p className="text-sm text-stone-500">Three decades of helping individuals, couples, and teams thrive.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// About Section (Portrait Left, Spaced modern columns right)
function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32 px-5 sm:px-8 bg-white relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column */}
          <div className="md:col-span-5">
            <ScrollReveal>
              <div className="relative max-w-sm mx-auto">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-stone-200 shadow-md relative">
                  <Image
                    src={ginaPhoto}
                    alt="Gina Botshtein, LCSW"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column */}
          <div className="md:col-span-7">
            <ScrollReveal delay={0.1}>
              <h2 className="font-sans font-extrabold text-4xl sm:text-5xl text-stone-900 tracking-tight mb-8">
                Meet Gina
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-6 text-base text-stone-600 leading-relaxed font-normal">
                <p className="text-lg sm:text-xl text-stone-900 font-light leading-relaxed">
                  For over 30 years, I've had the profound privilege of supporting individuals, families, and teams through life's most challenging moments and transformative growth.
                </p>
                <p>
                  My therapeutic methodology integrates clinical expertise with genuine compassion, creating an environment where you feel truly heard, validated, and structurally equipped to cultivate lasting, meaningful change.
                </p>
                <blockquote className="pl-5 border-l-4 border-forest-600 font-serif italic text-lg text-stone-800 my-6 py-1 leading-relaxed">
                  “Healing is not about correcting a broken mechanism; it is about uncovering, honoring, and cultivating the natural wisdom and resilience that has always resided within you.”
                </blockquote>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="mt-12 pt-8 border-t border-stone-200">
                <h3 className="font-sans font-bold text-stone-900 text-xs sm:text-sm tracking-wider uppercase mb-6">
                  Professional Credentials
                </h3>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6 text-sm text-stone-600 font-sans leading-relaxed">
                  <div>
                    <p className="font-bold text-stone-900">Licensed Clinical Social Worker</p>
                  </div>
                  <div>
                    <p className="font-bold text-stone-900">Master of Clinical Social Work</p>
                  </div>
                  <div>
                    <p className="font-bold text-stone-900">30+ Years Private & Clinical Practice</p>
                  </div>
                  <div>
                    <p className="font-bold text-stone-900">Specialized Training in Family Systems</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// Services Section (Flat, Editorial, Apple-Grade)
function ServicesSection() {
  const services = [
    {
      num: '01',
      title: 'Individual Therapy',
      description: 'Grounded, one-on-one sessions addressing anxiety, depressive cycles, life transitions, and intentional personal growth.',
      focus: 'Personalized plans • Cognitive & body-based methods • A safe, supportive space • Flexible scheduling'
    },
    {
      num: '02',
      title: 'Couples Therapy',
      description: 'Rebuild trust, break repetitive conflict cycles, and deeply enrich intimacy through structured communication and partnership work.',
      focus: 'Communication skills • Resolving recurring conflicts • Rebuilding intimacy • Pre-marital counseling'
    },
    {
      num: '03',
      title: 'Family & Team Support',
      description: 'Navigate complex family dynamics and organizational team challenges with solution-focused communication plans.',
      focus: 'Family dynamics • Parenting support • Team communication • Whole-system wellness'
    }
  ];

  return (
    <section id="services" className="py-24 sm:py-32 px-5 sm:px-8 bg-stone-50 border-t border-b border-stone-200/50">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <h2 className="font-sans font-extrabold text-4xl sm:text-5xl text-stone-900 tracking-tight mb-4">
              How I Can Help
            </h2>
            <p className="text-base sm:text-lg text-stone-500 leading-relaxed font-normal">
              Thoughtful, personalized approaches designed around your unique story.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {services.map((service, index) => (
            <ScrollReveal key={index} delay={0.08 * index}>
              <div className="flex flex-col justify-between h-full text-left">
                <div>
                  <div className="font-serif italic text-4xl sm:text-5xl text-stone-300 mb-6 font-light select-none">
                    {service.num}
                  </div>
                  <h3 className="text-2xl font-bold font-sans text-stone-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-stone-500 mb-8 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="border-t border-stone-200/60 pt-6 mt-auto">
                  <p className="text-[10px] tracking-wider font-bold text-stone-400 uppercase mb-2">Focus Areas</p>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans font-medium">
                    {service.focus}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// Insurance Section
function InsuranceSection() {
  const insurancePlans = [
    { name: 'Medicaid' },
    { name: 'Badger Care' },
    { name: 'United Healthcare' },
    { name: 'WPS' },
    { name: 'Medicare' }
  ];

  return (
    <section id="insurance" className="py-24 sm:py-32 px-5 sm:px-8 bg-stone-50 relative border-t border-b border-stone-200/50">
      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="font-sans font-extrabold text-4xl sm:text-5xl text-stone-900 tracking-tight mb-4">
              Accepted Insurance Plans
            </h2>
            <p className="text-base sm:text-lg text-stone-500 leading-relaxed">
              I am currently an in-network provider for several major plans to ensure care remains highly accessible within our community.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {insurancePlans.map((plan, index) => (
            <ScrollReveal key={index} delay={0.08 * index}>
              <motion.div
                className="px-6 py-8 rounded-2xl border text-center bg-white border-stone-200 hover:border-forest-600 shadow-sm transition-all duration-300 flex items-center justify-center min-h-[96px]"
                whileHover={{ y: -3 }}
              >
                <h3 className="text-lg font-bold font-sans text-stone-900">
                  {plan.name}
                </h3>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <p className="text-stone-400 text-xs italic leading-relaxed">
              * For other insurance carriers, I can provide a comprehensive monthly statement for potential out-of-network reimbursement. We highly recommend verifying your specific mental health benefits with your carrier.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      quote: "I put off therapy for years because I expected it to feel cold and clinical. Gina was the opposite — warm, real, and genuinely helpful. She gave me practical tools I still use every day.",
      author: "S.M.",
      type: "Individual Client",
    },
    {
      quote: "My partner and I were growing apart. Gina helped us understand why, rebuild trust, and communicate in ways that actually stick.",
      author: "M. & J.",
      type: "Couples Counseling Clients",
    },
    {
      quote: "I've seen other therapists before, but Gina is different. She's warm but direct — she'll gently push you to see things you couldn't see on your own.",
      author: "D.L.",
      type: "Individual Therapy Client",
    },
    {
      quote: "From the first session, I felt completely safe. Gina is thoughtful, non-judgmental, and her guidance has genuinely changed how I think about myself.",
      author: "A.K.",
      type: "Transitions Client",
    },
  ];

  return (
    <section id="testimonials" className="py-24 sm:py-32 px-5 sm:px-8 bg-white relative">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="font-sans font-extrabold text-4xl sm:text-5xl text-stone-900 tracking-tight mb-4">
              What Clients Say
            </h2>
            <p className="text-base sm:text-lg text-stone-500 leading-relaxed font-normal">
              Words from people who've been where you are.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={0.08 * index}>
              <div className="bg-stone-50 p-8 sm:p-10 rounded-2xl border border-stone-200 flex flex-col justify-between h-full">
                <blockquote className="text-stone-800 leading-relaxed mb-6 text-base font-serif italic text-left">
                  “{testimonial.quote}”
                </blockquote>

                <div className="border-t border-stone-200 pt-4 flex items-center mt-auto text-left">
                  <div>
                    <p className="font-sans font-bold text-stone-900 text-xs sm:text-sm uppercase">{testimonial.author}</p>
                    <p className="text-xs text-stone-400 font-semibold uppercase mt-0.5">{testimonial.type}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <p className="text-center text-[10px] tracking-wider uppercase font-bold text-stone-400 mt-12">
            * Client initials are utilized to preserve absolute clinical confidentiality in strict compliance with HIPAA frameworks.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How much does a therapeutic session cost?",
      answer: "Sessions are $150 for a fifty-minute hour. I'm happy to discuss fees and out-of-network options during our first call."
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
    }
  ];

  return (
    <section id="faq" className="py-24 sm:py-32 px-5 sm:px-8 bg-stone-50 border-t border-b border-stone-200/50 relative">
      <div className="max-w-3xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-stone-900 tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-stone-500 leading-relaxed">
              Common questions about therapy, fees, and what to expect.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={0.03 * index}>
              <div className="bg-white rounded-2xl border border-stone-200/60 overflow-hidden hover:border-forest-600 transition-colors">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center gap-6 group focus:outline-none"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-sans font-semibold text-stone-900 text-sm sm:text-base">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-forest-600" />
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
                  <div className="px-6 pb-5 pt-1 text-stone-500 leading-relaxed text-xs sm:text-sm font-sans text-left">
                    {faq.answer}
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 text-center">
            <p className="text-stone-500 text-sm font-sans mb-4">Still have questions?</p>
            <Link href="/contact">
              <motion.span
                className="inline-block px-7 py-3 bg-forest-600 hover:bg-forest-700 text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all cursor-pointer shadow-md shadow-forest-600/10"
                whileTap={{ scale: 0.98 }}
              >
                Reach Out
              </motion.span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// Contact Section (Apple solid-box inputs, absolute privacy)
function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || 'xaqqenpb';
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

  const inputClasses = "w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-stone-400 focus:bg-white rounded-xl text-sm focus:outline-none transition-all text-stone-900 placeholder:text-stone-400";

  return (
    <section id="contact" className="py-24 sm:py-32 px-5 sm:px-8 bg-white relative">
      <div className="max-w-5xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16 max-w-2xl mx-auto">
             <h2 className="font-sans font-extrabold text-4xl sm:text-5xl text-stone-900 tracking-tight mb-4">
              Get in Touch
            </h2>
            <p className="text-base sm:text-lg text-stone-500 leading-relaxed font-normal">
              Ready to start your journey? Reach out today to schedule your initial consultation.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (Direct Contact Details - Flat, Apple-Grade) */}
          <div className="md:col-span-5 text-left">
            <ScrollReveal delay={0.1}>
              <div className="space-y-8">
                <div>
                  <p className="text-sm sm:text-base text-stone-500 font-sans leading-relaxed">
                    Prefer to call or email? Initial consultations are always free and confidential.
                  </p>
                </div>

                <div className="space-y-6 pt-4 border-t border-stone-200/80">
                  <div className="text-left">
                    <a href="tel:+14146172201" className="inline-flex items-center gap-2 font-semibold text-stone-800 hover:text-forest-600 transition-colors text-base sm:text-lg">
                      <Phone className="w-4 h-4 text-forest-600" />
                      +1 (414) 617-2201
                    </a>
                  </div>
                  <div className="text-left">
                    <a href="mailto:Gina@wccounseling.net" className="inline-flex items-center gap-2 font-semibold text-stone-800 hover:text-forest-600 transition-colors text-base sm:text-lg">
                      <Mail className="w-4 h-4 text-forest-600" />
                      Gina@wccounseling.net
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column (Message Form - Flat, Clean) */}
          <div className="md:col-span-7">
            <ScrollReveal delay={0.2}>
              <div className="border border-stone-200 bg-white p-8 sm:p-10 rounded-2xl shadow-sm relative">
                <h3 className="font-sans font-bold text-stone-900 text-lg mb-6 text-left">Send a Message</h3>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 border border-forest-300 bg-forest-50 text-forest-800 text-xs font-bold rounded-xl uppercase tracking-wider">
                    Thank you! I typically respond personally within 24 hours.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 border border-red-300 bg-red-50 text-red-800 text-xs font-bold rounded-xl uppercase tracking-wider">
                    Submission issue. Please try calling or emailing directly.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  <div>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className={inputClasses}
                      placeholder="Full Name *"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className={inputClasses}
                        placeholder="Email Address *"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className={inputClasses}
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>

                  <div>
                    <select
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-stone-400 focus:bg-white rounded-xl text-sm focus:outline-none transition-all text-stone-600"
                    >
                      <option value="" disabled>Select Service Option... *</option>
                      <option value="individual">Individual Therapy</option>
                      <option value="couples">Couples Therapy</option>
                      <option value="family">Family & Team Support</option>
                      <option value="other">Other / Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <textarea
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-stone-400 focus:bg-white rounded-xl text-sm focus:outline-none transition-all text-stone-900 placeholder:text-stone-400 resize-none"
                      placeholder="How can I best support you? (Optional)"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-forest-600 hover:bg-forest-700 disabled:bg-stone-300 text-white font-semibold rounded-xl text-xs uppercase tracking-widest transition-all cursor-pointer"
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>

                  <p className="text-[10px] tracking-wider text-stone-400 font-medium text-center mt-4">
                    Your inquiry is confidential and fully HIPAA compliant.
                  </p>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-forest-900 text-stone-200 py-16 px-5 sm:px-8 border-t border-forest-800 relative z-10 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-sans font-extrabold text-lg text-white mb-2 tracking-tight">WECARE COUNSELING</h3>
            <p className="text-xs tracking-widest text-gold-400 font-bold uppercase mb-4">Gina Botshtein, LCSW</p>
            <p className="text-xs text-forest-200/80 leading-relaxed font-sans max-w-sm font-normal">
              Providing three decades of compassionate, evidence-based therapy to help individuals, couples, and teams cultivate structural healing and emotional wholeness.
            </p>
          </div>
          <div>
            <h4 className="text-xs tracking-widest font-bold text-white uppercase mb-5">Pages</h4>
            <div className="space-y-3 font-sans text-xs">
              <Link href="/" className="block text-forest-200 hover:text-gold-400 transition-colors font-semibold uppercase tracking-wider">Home</Link>
              <Link href="/faq" className="block text-forest-200 hover:text-gold-400 transition-colors font-semibold uppercase tracking-wider">FAQ</Link>
              <Link href="/contact" className="block text-forest-200 hover:text-gold-400 transition-colors font-semibold uppercase tracking-wider">Contact</Link>
              <Link href="/privacy" className="block text-forest-200 hover:text-gold-400 transition-colors font-semibold uppercase tracking-wider">Privacy Policy</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs tracking-widest font-bold text-white uppercase mb-5">Direct Contact</h4>
            <div className="space-y-3 font-sans text-xs">
              <a href="tel:+14146172201" className="flex items-center gap-2.5 text-forest-200 hover:text-gold-400 transition-colors font-semibold tracking-wide">
                <Phone className="w-3.5 h-3.5 text-gold-400" /> +1 (414) 617-2201
              </a>
              <a href="mailto:Gina@wccounseling.net" className="flex items-center gap-2.5 text-forest-200 hover:text-gold-400 transition-colors font-semibold tracking-wide break-all">
                <Mail className="w-3.5 h-3.5 text-gold-400" /> Gina@wccounseling.net
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-forest-800 pt-8 text-center flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] tracking-wider font-bold text-forest-300 uppercase">
          <p>© {new Date().getFullYear()} WeCare Counseling. All rights reserved.</p>
          <p className="text-[9px] text-forest-400">HIPAA Compliant</p>
        </div>
      </div>
    </footer>
  );
}

// Main Page
export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <HealingJourney />
        <InsuranceSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
