'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, ArrowRight, Menu, X, ChevronDown, Check, Award, Compass, Heart } from 'lucide-react';
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
            className="md:hidden p-2 hover:bg-stone-50 rounded-full transition-colors text-stone-850"
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

// Hero Section (Clean two-column spread)
function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center px-5 sm:px-8 pt-28 pb-20 bg-stone-50 overflow-hidden">
      {/* Subtle modern soft gradients */}
      <div className="absolute top-1/4 right-[10%] w-96 h-96 bg-forest-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-[5%] w-80 h-80 bg-gold-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (Huge bold Apple-grade headlines) */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.1}>
              <span className="text-xs font-bold tracking-widest text-forest-600 uppercase mb-4 block">
                Gina Botshtein, LCSW
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <h1 className="font-sans font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-stone-950 tracking-tight leading-[1.05] mb-6">
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
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-forest-600 hover:bg-forest-700 text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-lg shadow-forest-600/15 transition-all cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get in Touch
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.span>
              </Link>
            </ScrollReveal>
          </div>

          {/* Right Column (Minimalist, beautiful card summaries) */}
          <div className="lg:col-span-5 space-y-4">
            {[
              {
                title: 'Personalized Care',
                desc: 'Therapy tailored to your unique needs, goals, and life circumstances.',
                icon: <Compass className="w-5 h-5 text-forest-600" />
              },
              {
                title: 'Holistic Approach',
                desc: 'Addressing mind, emotions, relationships, and personal growth together.',
                icon: <Heart className="w-5 h-5 text-forest-600" />
              },
              {
                title: 'Proven Excellence',
                desc: 'Three decades of helping individuals, couples, and teams thrive.',
                icon: <Award className="w-5 h-5 text-forest-600" />
              }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={0.15 * i}>
                <motion.div
                  className="bg-white p-6 rounded-2xl border border-stone-200/60 hover:border-forest-200 shadow-sm transition-all duration-300"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-stone-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-stone-500 leading-relaxed font-normal">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
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
          
          {/* Left Column (Clean, simple rectangular photo spread) */}
          <div className="md:col-span-5">
            <ScrollReveal>
              <div className="relative max-w-sm mx-auto">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-stone-200/80 shadow-lg relative">
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

          {/* Right Column (Pure, lightweight high-contrast copy block) */}
          <div className="md:col-span-7">
            <ScrollReveal delay={0.1}>
              <span className="text-xs font-bold tracking-widest text-forest-600 uppercase mb-4 block">
                About The Practitioner
              </span>
              <h2 className="font-sans font-extrabold text-4xl sm:text-5xl text-stone-950 tracking-tight mb-8">
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
                <blockquote className="pl-5 border-l-4 border-forest-600 font-serif italic text-lg text-stone-850 my-6 py-1 leading-relaxed">
                  “Healing is not about correcting a broken mechanism; it is about uncovering, honoring, and cultivating the natural wisdom and resilience that has always resided within you.”
                </blockquote>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="mt-8 p-6 bg-stone-50 rounded-2xl border border-stone-200/60">
                <h3 className="font-bold text-stone-900 text-sm sm:text-base mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-forest-600" />
                  Credentials & Training
                </h3>
                <ul className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm text-stone-600">
                  {[
                    'Licensed Clinical Social Worker (LCSW)',
                    "Master's Degree in Clinical Social Work",
                    '30+ Years of Private & Clinical Practice',
                    'Advanced Systems Theory Specialization',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-forest-600 flex-shrink-0" />
                      <span className="font-sans font-medium text-stone-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// Services Section
function ServicesSection() {
  const services = [
    {
      title: 'Individual Therapy',
      description: 'Grounded, one-on-one sessions addressing anxiety, depressive cycles, life transitions, and intentional personal growth.',
      features: [
        'Personalized treatment plans',
        'Cognitive & somatic approaches',
        'Safe, highly validating space',
        'Flexible scheduling options'
      ],
      accent: 'forest',
      svg: (
        <svg className="w-6 h-6 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: 'Couples Therapy',
      description: 'Rebuild trust, break repetitive conflict cycles, and deeply enrich intimacy through structured communication and partnership work.',
      features: [
        'Communication skill-building',
        'Root conflict resolution',
        'Intimacy & secure connection',
        'Pre-marital alignment work'
      ],
      accent: 'gold',
      svg: (
        <svg className="w-6 h-6 text-gold-650" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: 'Family & Team Support',
      description: 'Navigate complex family dynamics and organizational team challenges with solution-focused communication plans.',
      features: [
        'Family systems analysis',
        'Conscious parenting support',
        'Collaborative team dynamics',
        'Systemic wellness planning'
      ],
      accent: 'forest',
      svg: (
        <svg className="w-6 h-6 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  return (
    <section id="services" className="py-24 sm:py-32 px-5 sm:px-8 bg-stone-50 border-t border-b border-stone-200/50">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-forest-600 uppercase mb-4 block">
              Clinical Specializations
            </span>
            <h2 className="font-sans font-extrabold text-4xl sm:text-5xl text-stone-950 tracking-tight mb-4">
              How I Can Help
            </h2>
            <p className="text-base sm:text-lg text-stone-500 leading-relaxed font-normal">
              Tailored, evidence-based therapy pathways configured to honor your individual narrative and goals.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ScrollReveal key={index} delay={0.08 * index}>
              <motion.div
                className="h-full bg-white p-8 rounded-2xl border border-stone-200/60 shadow-sm hover:shadow-xl transition-all duration-350 flex flex-col justify-between"
                whileHover={{ y: -6 }}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                    service.accent === 'gold' ? 'bg-gold-50 text-gold-650' : 'bg-forest-50 text-forest-600'
                  }`}>
                    {service.svg}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-sans text-stone-950 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-stone-550 mb-8 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="border-t border-stone-100 pt-6">
                  <h4 className="text-xs font-bold text-forest-750 uppercase tracking-widest mb-4">Core Focus Areas</h4>
                  <ul className="space-y-2.5">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-600">
                        <Check className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />
                        <span className="font-sans font-medium text-stone-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      quote: "I avoided starting therapy for years because I feared clinical stiffness. Gina completely dissolved that barrier. She offers a validating, warm space combined with active clinical tools that yield immediate, practical healing.",
      author: "S.M.",
      type: "Individual Client",
    },
    {
      quote: "My partner and I were structurally drifting. Gina didn't just referee; she helped us uncover formative causes, rebuild trust, and develop deep relational boundaries that we continue to rely on.",
      author: "M. & J.",
      type: "Couples Counseling Clients",
    },
    {
      quote: "I have consulted multiple practitioners, but Gina is entirely distinctive. She maintains a warm, validating clinical posture—challenging you with gentle, direct wisdom that creates structural self-realization.",
      author: "D.L.",
      type: "Individual Therapy Client",
    },
    {
      quote: "Gina's space immediately establishes absolute safety. She is deeply validating, structured, and completely non-judgmental. Her guidance has structurally transformed my inner mental landscape.",
      author: "A.K.",
      type: "Transitions Client",
    },
  ];

  return (
    <section id="testimonials" className="py-24 sm:py-32 px-5 sm:px-8 bg-white relative">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-forest-600 uppercase mb-4 block">
              Client Reflections
            </span>
            <h2 className="font-sans font-extrabold text-4xl sm:text-5xl text-stone-950 tracking-tight mb-4">
              What Clients Say
            </h2>
            <p className="text-base sm:text-lg text-stone-500 leading-relaxed font-normal">
              Authentic stories from individuals and couples who have experienced structural healing and emotional wholeness under my care.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={0.08 * index}>
              <div className="bg-stone-50 p-8 sm:p-10 rounded-2xl border border-stone-200/60 flex flex-col justify-between h-full">
                <blockquote className="text-stone-850 leading-relaxed mb-6 text-base font-serif italic text-left">
                  “{testimonial.quote}”
                </blockquote>

                <div className="border-t border-stone-200/50 pt-4 flex items-center justify-between mt-auto">
                  <div>
                    <p className="font-sans font-bold text-stone-950 text-xs sm:text-sm tracking-wider uppercase">{testimonial.author}</p>
                    <p className="text-xs text-stone-400 font-semibold uppercase mt-0.5">{testimonial.type}</p>
                  </div>
                  <span className="text-gold-600 text-xs">★★★★★</span>
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
            <span className="text-xs font-bold tracking-widest text-forest-600 uppercase mb-4 block">
              Coverage & Accessibility
            </span>
            <h2 className="font-sans font-extrabold text-4xl sm:text-5xl text-stone-950 tracking-tight mb-4">
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
                className="px-6 py-8 rounded-2xl border text-center bg-white border-stone-250 hover:border-forest-600 shadow-sm transition-all duration-300 flex items-center justify-center min-h-[96px]"
                whileHover={{ y: -3 }}
              >
                <h3 className="text-lg font-bold font-sans text-stone-950">
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

// FAQ Section
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How much does a therapeutic session cost?",
      answer: "Individual clinical sessions are structured at $150 per fifty-minute hour. Detailed fee lists and out-of-network alternatives are gladly reviewed during our initial consultation."
    },
    {
      question: "What should I expect in our initial consultation?",
      answer: "Our first session functions as a mutual exploration. We will map out your current landscapes, core challenges, and clinical goals. This is a secure, low-pressure diagnostic assessment to ensure my systemic approach aligns beautifully with your vision."
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
      answer: "Absolutely. In strict compliance with HIPAA federal laws and clinical social work ethics, everything you share remains private. The only legal boundaries to confidentiality concern immediate risk of harm to yourself/others, or suspected child/elder abuse."
    },
    {
      question: "What is your clinical cancellation policy?",
      answer: "I require a strict twenty-four-hour notification for cancellations. Late cancellations or missed consultations without notice are billed at the full standard session fee to respect scheduled clinical blocks."
    },
    {
      question: "How do I determine if this therapeutic framework is right for me?",
      answer: "If you feel relationally stuck, emotionally stagnant, or are seeking intentional personal growth, therapy is a profound gift. You do not need to be in crisis to invest in clinical growth. Reach out today and we can determine if this is the correct fit."
    }
  ];

  return (
    <section id="faq" className="py-24 px-5 sm:px-8 bg-white relative">
      <div className="max-w-3xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-forest-600 uppercase mb-4 block">
              Clinical Clarity
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-stone-950 tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-stone-500 leading-relaxed">
              Essential procedural details regarding fee structures, session configurations, and getting started on your clinical path.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={0.03 * index}>
              <div className="bg-stone-50 rounded-2xl border border-stone-200/60 overflow-hidden hover:border-forest-600 transition-colors">
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
                Inquire Directly
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
    <section id="contact" className="py-24 px-5 sm:px-8 bg-stone-50 border-t border-stone-200/50">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-forest-600 uppercase mb-4 block">
              Secure Communications
            </span>
            <h2 className="font-sans font-extrabold text-4xl sm:text-5xl text-stone-950 tracking-tight mb-4">
              Get in Touch
            </h2>
            <p className="text-base sm:text-lg text-stone-500 leading-relaxed font-normal">
              Ready to start your journey? Reach out today to schedule your initial consultation.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-12 gap-12 items-start">
          {/* Left Column (Direct Contact Details) */}
          <div className="md:col-span-5">
            <ScrollReveal delay={0.1}>
              <div className="space-y-8 text-left">
                <div>
                  <h3 className="font-sans font-bold text-stone-900 text-lg sm:text-xl mb-3">Direct Channels</h3>
                  <p className="text-sm text-stone-500 font-sans leading-relaxed mb-6">
                    If you prefer direct voice communication, feel free to call during standard business hours (8 AM - 6 PM CST).
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      label: 'Phone Contact',
                      value: '+1 (414) 617-2201',
                      href: 'tel:+14146172201',
                      icon: <Phone className="w-4 h-4 text-forest-600" />
                    },
                    {
                      label: 'Secure Email',
                      value: 'Gina@wccounseling.net',
                      href: 'mailto:Gina@wccounseling.net',
                      icon: <Mail className="w-4 h-4 text-forest-600" />
                    }
                  ].map((item, i) => (
                    <div key={i} className="bg-white border border-stone-200/60 rounded-2xl p-5 shadow-sm">
                      <span className="text-[10px] tracking-wider font-bold text-stone-400 uppercase block mb-1">{item.label}</span>
                      <a href={item.href} className="inline-flex items-center gap-2.5 font-bold text-stone-850 hover:text-forest-600 transition-colors text-base">
                        {item.icon}
                        {item.value}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="border border-stone-200 bg-white p-6 rounded-2xl shadow-sm">
                  <h4 className="text-xs tracking-wider font-bold text-stone-900 uppercase mb-2">Initial Consultations</h4>
                  <p className="text-xs text-stone-500 leading-relaxed font-sans font-normal">
                    All initial fit assessments are complimentary and confidential. We are here to support your transition every step of the way.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column (Priscilla Form Box) */}
          <div className="md:col-span-7">
            <ScrollReveal delay={0.2}>
              <div className="border border-stone-200 bg-white p-8 sm:p-10 rounded-2xl shadow-lg relative">
                <h3 className="font-sans font-bold text-stone-900 text-lg mb-6 text-left">Submit Secure Inquiry</h3>

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
                      <option value="" disabled>Select Specialty Pathway... *</option>
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
                    className="w-full py-3.5 bg-forest-600 hover:bg-forest-700 disabled:bg-stone-300 text-white font-bold uppercase tracking-wider text-xs rounded-xl shadow-md transition-colors"
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? 'Sending Transmission...' : 'Submit Secure Inquiry'}
                  </motion.button>

                  <p className="text-[10px] tracking-wider text-stone-400 font-bold uppercase text-center mt-4">
                    By submitting this secure portal inquiry, you authorize confidential correspondence.
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
            <h4 className="text-xs tracking-widest font-bold text-white uppercase mb-5">Quick Indexes</h4>
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
          <p className="text-[9px] text-forest-400">Confidential & HIPAA Compliant Healthcare Space</p>
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
        <HealingJourney />
        <InsuranceSection />
        <AboutSection />
        <ServicesSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
