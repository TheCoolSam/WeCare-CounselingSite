'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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

// Navigation
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
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
    { label: 'FAQ', href: '/faq' },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-forest-100'
          : 'bg-transparent'
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="group">
            <span className={`font-serif text-xl sm:text-2xl font-bold transition-colors ${isScrolled ? 'text-forest-700' : 'text-forest-800'
              }`}>
              WeCare <span className="font-normal">Counseling</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.href.startsWith('/') ? (
                  <Link href={link.href} className={`text-sm font-medium transition-colors hover:text-forest-600 ${isScrolled ? 'text-stone-700' : 'text-stone-800'
                    }`}>
                    {link.label}
                  </Link>
                ) : (
                  <a href={link.href} className={`text-sm font-medium transition-colors hover:text-forest-600 ${isScrolled ? 'text-stone-700' : 'text-stone-800'
                    }`}>
                    {link.label}
                  </a>
                )}
              </li>
            ))}
            <li>
              <Link href="/contact">
                <motion.span
                  className="inline-block px-5 py-2.5 bg-forest-600 hover:bg-forest-700 text-white text-sm font-semibold rounded-full transition-colors cursor-pointer"
                  whileHover={{ scale: 1.03 }}
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
            className="md:hidden p-2 rounded-lg hover:bg-forest-50 transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="w-6 h-6 text-stone-800" /> : <Menu className="w-6 h-6 text-stone-800" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 md:hidden"
            >
              <div className="flex flex-col p-8 pt-20">
                <div className="space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      {link.href.startsWith('/') ? (
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-3 px-4 text-lg text-stone-800 hover:text-forest-600 hover:bg-forest-50 rounded-lg transition-colors"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-3 px-4 text-lg text-stone-800 hover:text-forest-600 hover:bg-forest-50 rounded-lg transition-colors"
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
                  transition={{ delay: 0.35 }}
                  className="mt-6 pt-6 border-t border-stone-200"
                >
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="block text-center py-3 px-6 bg-forest-600 hover:bg-forest-700 text-white font-semibold rounded-full transition-colors"
                  >
                    Get in Touch
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 space-y-3 text-sm text-stone-500"
                >
                  <a href="tel:+14146172201" className="flex items-center gap-2 hover:text-forest-600 transition-colors">
                    <Phone className="w-4 h-4" /> +1 (414) 617-2201
                  </a>
                  <a href="mailto:Gina@wccounseling.net" className="flex items-center gap-2 hover:text-forest-600 transition-colors">
                    <Mail className="w-4 h-4" /> Gina@wccounseling.net
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

// Hero Section
function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center px-5 sm:px-8 pt-20 pb-16">
      {/* Soft background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-ivory-100 via-ivory-50 to-forest-50/30" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />

      {/* Decorative circles */}
      <div className="absolute top-1/4 right-[10%] w-72 h-72 bg-forest-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-[5%] w-56 h-56 bg-gold-200/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <div>


            <ScrollReveal delay={0.1}>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-stone-900 mb-4 tracking-tight leading-[1.1]">
                Gina<br />
                <span className="text-forest-700">Botshtein</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="text-base sm:text-lg text-stone-500 mb-6 font-medium tracking-wide uppercase">
                Licensed Clinical Social Worker
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-xl sm:text-2xl md:text-3xl text-stone-800 mb-6 leading-snug">
                Therapy isn't one size fits all.{' '}
                <span className="font-serif italic text-forest-700">It's a journey we design together.</span>
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <p className="text-base sm:text-lg text-stone-600 mb-8 leading-relaxed max-w-xl">
                With a rare blend of clinical expertise, deep compassion, and genuine warmth,
                I create personalized therapy experiences that honor your unique story.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/quiz">
                  <motion.div
                    className="flex items-center justify-center gap-2 px-7 py-3.5 bg-forest-600 hover:bg-forest-700 text-white font-semibold rounded-full shadow-lg shadow-forest-200/50 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Take the 2-Minute Quiz
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Link>
                <Link href="/contact">
                  <motion.div
                    className="flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-forest-50 text-forest-700 font-semibold rounded-full border-2 border-forest-200 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get in Touch
                  </motion.div>
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column — Highlights */}
          <div className="lg:pl-8">
            <ScrollReveal delay={0.2}>
              <div className="space-y-4">
                {[
                  {
                    title: 'Personalized Care',
                    desc: 'Therapy tailored to your unique needs, goals, and life circumstances.',
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                  },
                  {
                    title: 'Holistic Approach',
                    desc: 'Addressing mind, emotions, relationships, and personal growth together.',
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    ),
                  },
                  {
                    title: 'Proven Excellence',
                    desc: 'Three decades of helping individuals, couples, and teams thrive.',
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    ),
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="group relative bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-stone-200/60 hover:border-forest-200 hover:shadow-lg transition-all duration-300"
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-forest-50 group-hover:bg-forest-100 rounded-xl flex items-center justify-center text-forest-600 transition-colors flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-stone-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-stone-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24 px-5 sm:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <ScrollReveal>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={ginaPhoto}
                  alt="Gina Botshtein, LCSW"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-forest-200 rounded-3xl -z-10" />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gold-300/30 rounded-full blur-2xl" />
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal delay={0.1}>
              <span className="text-sm font-semibold text-forest-600 uppercase tracking-widest mb-3 block">About</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-6 leading-tight">
                Meet Gina
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-4 text-base sm:text-lg text-stone-700 leading-relaxed">
                <p>
                  For over 30 years, I've had the privilege of supporting individuals, families, and teams
                  through life's most challenging moments and transformative growth.
                </p>
                <p>
                  My approach blends clinical expertise with genuine compassion, creating a therapeutic
                  environment where you feel truly heard, understood, and empowered to create lasting change.
                </p>
                <p className="text-stone-500 italic border-l-2 border-forest-300 pl-4">
                  Whether you're navigating personal struggles, relationship challenges, or seeking deeper
                  self-understanding, I'm here to walk alongside you on your journey toward healing and wholeness.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="mt-8 p-6 bg-ivory-100 rounded-2xl border border-ivory-300">
                <h3 className="font-semibold text-stone-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Credentials & Training
                </h3>
                <ul className="space-y-2.5 text-sm sm:text-base text-stone-700">
                  {[
                    'Licensed Clinical Social Worker (LCSW)',
                    "Master's Degree in Clinical Social Work",
                    '30+ Years of Practice',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 bg-forest-500 rounded-full mt-2 flex-shrink-0" />
                      {item}
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
      description: 'One-on-one support for anxiety, depression, life transitions, trauma, and personal growth.',
      features: [
        'Personalized treatment plans',
        'Evidence-based approaches',
        'Safe, confidential space',
        'Flexible scheduling options'
      ],
      accent: 'forest',
    },
    {
      title: 'Couples Therapy',
      description: 'Rebuild trust, improve communication, and strengthen your relationship through guided partnership work.',
      features: [
        'Communication skills',
        'Conflict resolution',
        'Intimacy & connection',
        'Pre-marital counseling'
      ],
      accent: 'gold',
    },
    {
      title: 'Family & Team Support',
      description: 'Navigate family dynamics and organizational challenges with compassionate, solution-focused guidance.',
      features: [
        'Family systems work',
        'Parenting support',
        'Team dynamics',
        'Workplace wellness'
      ],
      accent: 'forest',
    }
  ];

  return (
    <section id="services" className="py-16 sm:py-24 px-5 sm:px-8 bg-ivory-50">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-forest-600 uppercase tracking-widest mb-3 block">Services</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
              How I Can Help
            </h2>
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto">
              Comprehensive therapy services tailored to your unique needs and goals
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ScrollReveal key={index} delay={0.1 * index}>
              <motion.div
                className="h-full bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/60 hover:border-forest-200 shadow-sm hover:shadow-xl transition-all duration-300 group"
                whileHover={{ y: -6 }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${service.accent === 'gold' ? 'bg-gold-50 text-gold-600' : 'bg-forest-50 text-forest-600'
                  }`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {index === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />}
                    {index === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />}
                    {index === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />}
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-3 group-hover:text-forest-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-stone-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-forest-700 uppercase tracking-wider">Key Areas</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-stone-700">
                        <svg className="w-4 h-4 text-forest-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
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
      quote: "I put off therapy for years because I didn't think it would help. Gina proved me wrong in the best way possible. She gave me real tools, not just 'how does that make you feel.'",
      author: "S.M.",
      type: "Individual Therapy",
    },
    {
      quote: "My husband and I were basically roommates at that point. Gina helped us actually hear each other again — not just talk at each other. We still have work to do, but we're doing it together now instead of alone.",
      author: "M. & J.",
      type: "Couples Therapy",
    },
    {
      quote: "I've seen a few therapists over the years, but Gina is different. She doesn't just listen — she challenges you in this really gentle way that makes you think. I've grown more in six months with her than in years on my own.",
      author: "D.L.",
      type: "Individual Therapy",
    },
    {
      quote: "I was nervous about starting therapy and almost cancelled my first appointment. Gina made me feel comfortable within the first five minutes. She gets it, and she doesn't judge. That's hard to find.",
      author: "A.K.",
      type: "Individual Therapy",
    },
  ];

  return (
    <section id="testimonials" className="py-16 sm:py-24 px-5 sm:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-forest-600 uppercase tracking-widest mb-3 block">Testimonials</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
              What Clients Say
            </h2>
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto">
              Real stories from people who've found healing and growth
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={0.1 * index}>
              <div className="relative h-full bg-ivory-50 p-6 sm:p-8 rounded-2xl border border-ivory-300 hover:border-forest-200 hover:shadow-lg transition-all duration-300">
                {/* Large quote mark */}
                <div className="font-serif text-6xl text-forest-200 leading-none mb-2 select-none">"</div>

                <blockquote className="text-stone-700 leading-relaxed mb-6 text-base">
                  {testimonial.quote}
                </blockquote>

                <div className="flex items-center gap-3 pt-4 border-t border-ivory-300">
                  <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-forest-700">{testimonial.author.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900 text-sm">{testimonial.author}</p>
                    <p className="text-xs text-stone-500">{testimonial.type}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <p className="text-center text-sm text-stone-500 mt-8 italic">
            Names shown as initials to protect client confidentiality. All testimonials are shared with consent.
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
    }
  ];

  return (
    <section id="faq" className="py-16 sm:py-24 px-5 sm:px-8 bg-ivory-50">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="text-sm font-semibold text-forest-600 uppercase tracking-widest mb-3 block">FAQ</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg text-stone-600">
              Everything you need to know about getting started
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={0.03 * index}>
              <div className="bg-white rounded-xl border border-stone-200/60 overflow-hidden hover:border-forest-200 transition-colors">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-5 sm:px-6 py-4 text-left flex justify-between items-center gap-4 hover:bg-forest-50/30 transition-colors"
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
                  <div className="px-5 sm:px-6 pb-4 pt-1 text-stone-600 leading-relaxed text-sm sm:text-base">
                    {faq.answer}
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-10 text-center">
            <p className="text-stone-600 mb-4">Still have questions?</p>
            <Link href="/contact">
              <motion.span
                className="inline-block px-7 py-3 bg-forest-600 hover:bg-forest-700 text-white font-semibold rounded-full transition-colors cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get in Touch
              </motion.span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// Contact Section
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
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
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

  const inputClasses = "w-full px-4 py-3 bg-ivory-50 border border-stone-200 rounded-xl focus:border-forest-400 focus:ring-2 focus:ring-forest-100 focus:outline-none transition-all text-stone-800 placeholder:text-stone-400";

  return (
    <section id="contact" className="py-16 sm:py-24 px-5 sm:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-forest-600 uppercase tracking-widest mb-3 block">Contact</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto">
              Ready to start your journey? Reach out today to schedule your first visit.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="md:col-span-2">
            <ScrollReveal delay={0.1}>
              <div className="space-y-4">
                {[
                  {
                    icon: <Phone className="w-5 h-5" />,
                    label: 'Phone',
                    value: '+1 (414) 617-2201',
                    href: 'tel:+14146172201',
                  },
                  {
                    icon: <Mail className="w-5 h-5" />,
                    label: 'Email',
                    value: 'Gina@wccounseling.net',
                    href: 'mailto:Gina@wccounseling.net',
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-ivory-50 rounded-xl p-5 border border-ivory-300 hover:border-forest-200 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 bg-forest-50 rounded-lg flex items-center justify-center text-forest-600">
                        {item.icon}
                      </div>
                      <span className="text-sm font-semibold text-stone-800">{item.label}</span>
                    </div>
                    <a href={item.href} className="text-forest-600 hover:text-forest-700 transition-colors text-sm break-all">
                      {item.value}
                    </a>
                  </div>
                ))}

              </div>
            </ScrollReveal>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-3">
            <ScrollReveal delay={0.2}>
              <div className="bg-ivory-50 rounded-2xl p-6 sm:p-8 border border-ivory-300">
                <h3 className="text-xl font-serif font-bold text-stone-900 mb-5">Send a Message</h3>

                {submitStatus === 'success' && (
                  <div className="mb-5 p-4 bg-forest-50 border border-forest-200 rounded-xl text-forest-800 text-sm">
                    Thank you! I'll get back to you within 24 hours.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm">
                    Something went wrong. Please try calling or emailing directly.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className={inputClasses}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1.5">Email *</label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1.5">Phone (Optional)</label>
                      <input
                        type="tel"
                        id="phone"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-1.5">What brings you to therapy? *</label>
                    <select
                      id="subject"
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className={inputClasses}
                    >
                      <option value="">Select an option...</option>
                      <option value="individual">Individual Therapy</option>
                      <option value="couples">Couples Therapy</option>
                      <option value="family">Family & Team Support</option>
                      <option value="other">Other / Not Sure</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1.5">Message (Optional)</label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className={`${inputClasses} resize-none`}
                      placeholder="Tell me a bit about what you're hoping to work on..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-forest-600 hover:bg-forest-700 disabled:bg-stone-300 text-white font-semibold py-3.5 rounded-full shadow-lg shadow-forest-200/30 transition-colors"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>

                  <p className="text-xs text-stone-500 text-center">
                    Your information is confidential and secure. I typically respond within 24 hours.
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
    <footer className="bg-stone-900 text-ivory-200 py-12 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-xl font-bold text-white mb-2">WeCare Counseling</h3>
            <p className="text-sm text-stone-400">Gina Botshtein, LCSW</p>
            <p className="text-sm text-stone-500 mt-2 leading-relaxed">
              30+ years of compassionate therapy for individuals, couples, and teams.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/" className="block text-sm text-stone-400 hover:text-forest-300 transition-colors">Home</Link>
              <Link href="/faq" className="block text-sm text-stone-400 hover:text-forest-300 transition-colors">FAQ</Link>
              <Link href="/contact" className="block text-sm text-stone-400 hover:text-forest-300 transition-colors">Contact</Link>
              <Link href="/privacy" className="block text-sm text-stone-400 hover:text-forest-300 transition-colors">Privacy Policy</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Get in Touch</h4>
            <div className="space-y-2">
              <a href="tel:+14146172201" className="flex items-center gap-2 text-sm text-stone-400 hover:text-forest-300 transition-colors">
                <Phone className="w-4 h-4" /> +1 (414) 617-2201
              </a>
              <a href="mailto:Gina@wccounseling.net" className="flex items-center gap-2 text-sm text-stone-400 hover:text-forest-300 transition-colors">
                <Mail className="w-4 h-4" /> Gina@wccounseling.net
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-stone-800 pt-6 text-center">
          <p className="text-xs text-stone-500">
            © {new Date().getFullYear()} WeCare Counseling. All rights reserved.
          </p>
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
