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
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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
    { label: 'Insurance', href: '#insurance' },
    { label: 'FAQ', href: '/faq' },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-ivory-50 border-b border-stone-200/80 shadow-sm py-3'
          : 'bg-transparent py-5'
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-1.5">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-forest-700">
              WECARE <span className="font-sans font-light text-stone-500 text-xs tracking-widest uppercase align-middle ml-1">Counseling</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.href.startsWith('/') ? (
                  <Link href={link.href} className="text-xs uppercase tracking-widest font-bold text-stone-700 hover:text-forest-600 transition-colors relative py-1 group/link">
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-400 group-hover/link:w-full transition-all duration-300" />
                  </Link>
                ) : (
                  <a href={link.href} className="text-xs uppercase tracking-widest font-bold text-stone-700 hover:text-forest-600 transition-colors relative py-1 group/link">
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-400 group-hover/link:w-full transition-all duration-300" />
                  </a>
                )}
              </li>
            ))}
            <li>
              <Link href="/contact">
                <motion.span
                  className="inline-block px-6 py-2.5 border-2 border-forest-600 hover:bg-forest-600 text-forest-700 hover:text-white text-xs uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer"
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
            className="md:hidden p-2 hover:bg-ivory-100 transition-colors text-stone-800"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
              className="fixed inset-0 bg-stone-900/30 z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 h-full w-72 bg-ivory-50 border-l border-stone-200 shadow-xl z-50 md:hidden"
            >
              <div className="flex flex-col p-8 pt-20">
                <div className="space-y-2">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                    >
                      {link.href.startsWith('/') ? (
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-3 px-4 text-sm font-bold uppercase tracking-wider text-stone-800 hover:text-forest-600 hover:bg-ivory-100 transition-colors"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-3 px-4 text-sm font-bold uppercase tracking-wider text-stone-800 hover:text-forest-600 hover:bg-ivory-100 transition-colors"
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
                  className="mt-6 pt-6 border-t border-stone-200"
                >
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="block text-center py-3.5 px-6 border-2 border-forest-600 text-forest-700 font-bold uppercase tracking-widest text-xs transition-colors hover:bg-forest-600 hover:text-white"
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
                  <a href="tel:+14146172201" className="flex items-center gap-2 hover:text-forest-600 transition-colors py-1">
                    <Phone className="w-3.5 h-3.5 text-gold-500" /> +1 (414) 617-2201
                  </a>
                  <a href="mailto:Gina@wccounseling.net" className="flex items-center gap-2 hover:text-forest-600 transition-colors py-1">
                    <Mail className="w-3.5 h-3.5 text-gold-500" /> Gina@wccounseling.net
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
    <section id="hero" className="relative min-h-screen flex flex-col justify-center px-5 sm:px-8 pt-32 pb-20 bg-ivory-50 relative overflow-hidden">
      {/* Editorial grid lines background */}
      <div className="absolute inset-0 editorial-grid opacity-30 pointer-events-none" />

      {/* Soft warm circular gradients (no tech blobs) */}
      <div className="absolute top-1/4 right-[5%] w-96 h-96 bg-gold-200/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-[5%] w-80 h-80 bg-forest-200/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Large Typography */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.1}>
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-gold-600 uppercase mb-4 block">
                Est. 1996 • WeCare Counseling
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light text-stone-900 leading-[1.02] tracking-tight mb-6 text-balance">
                Gina <br />
                <span className="italic text-forest-700 font-normal">Botshtein</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="font-sans text-[10px] tracking-[0.2em] text-stone-400 font-bold uppercase mb-8">
                LCSW • Licensed Clinical Social Worker
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <p className="text-xl sm:text-2xl text-stone-700 mb-6 leading-relaxed max-w-2xl font-serif font-light italic">
                “Therapy isn't one size fits all. It is a collaborative, highly personal journey of restoration that we design together.”
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-sm sm:text-base text-stone-500 mb-8 leading-relaxed max-w-xl font-sans">
                With over three decades of clinical expertise, deep compassion, and genuine warmth, I create personalized, structured therapy spaces that honor your unique story.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.35}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact">
                  <motion.div
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-forest-600 bg-forest-700 hover:bg-forest-600 text-white font-bold uppercase tracking-widest text-xs transition-all duration-300 cursor-pointer shadow-lg shadow-forest-900/10"
                    whileTap={{ scale: 0.98 }}
                  >
                    Schedule First Visit
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.div>
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column - Arched Asymmetric Portrait Frame */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
            <ScrollReveal delay={0.2}>
              <div className="relative w-[280px] sm:w-[320px] md:w-[350px] aspect-[3/4] max-w-full">
                {/* Asymmetrical backing cards */}
                <div className="absolute top-4 -left-4 w-full h-full border border-stone-200 bg-ivory-100 -z-10" />
                <div className="absolute -top-4 left-4 w-full h-full border border-gold-300/30 -z-20" />
                
                {/* Arched image container */}
                <div className="w-full h-full rounded-t-full overflow-hidden border border-gold-300/50 shadow-xl relative bg-ivory-200">
                  <Image
                    src={ginaPhoto}
                    alt="Gina Botshtein, LCSW"
                    fill
                    className="object-cover object-top hover:scale-105 transition-transform duration-700"
                    priority
                  />
                </div>

                {/* Elegant overlay badge */}
                <div className="absolute -bottom-5 -right-5 bg-forest-700 text-white py-4 px-6 border border-forest-800 shadow-xl">
                  <p className="font-serif italic text-lg text-gold-300">30+ Years</p>
                  <p className="text-[9px] tracking-widest uppercase font-bold text-forest-200">Clinical Practice</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Lower Horizontal Highlights Strip */}
        <div className="mt-24 border-t border-stone-200/80 pt-10 grid sm:grid-cols-3 gap-8">
          {[
            {
              title: 'Personalized Care',
              desc: 'Therapy structured entirely around your unique background, mental health objectives, and lifestyle.'
            },
            {
              title: 'Holistic Approach',
              desc: 'Integrating cognitive tools, emotional release, and somatic awareness to heal the whole individual.'
            },
            {
              title: 'Proven Excellence',
              desc: 'Three decades of clinical social work assisting individuals, couples, and teams to flourish.'
            }
          ].map((item, i) => (
            <ScrollReveal key={i} delay={0.1 * i}>
              <div className="border-l border-gold-400 pl-6">
                <span className="text-[9px] tracking-[0.25em] font-bold text-gold-600 block mb-2 uppercase">0{i + 1} / FOUNDATION</span>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">{item.title}</h3>
                <p className="text-xs text-stone-500 leading-relaxed font-sans">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  return (
    <section id="about" className="py-24 px-5 sm:px-8 bg-ivory-50 relative overflow-hidden border-b border-stone-200/60">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column - Art Catalog Image Offset */}
          <div className="md:col-span-5">
            <ScrollReveal>
              <div className="relative max-w-sm mx-auto">
                {/* Thin gold structural back frame */}
                <div className="absolute top-8 left-8 w-full h-full border border-gold-300/40 -z-10" />
                
                {/* Hairline image frame */}
                <div className="aspect-[4/5] rounded-none overflow-hidden border border-stone-300 shadow-xl relative bg-ivory-200">
                  <Image
                    src={ginaPhoto}
                    alt="Gina Botshtein, LCSW"
                    fill
                    className="object-cover hover:scale-102 transition-transform duration-700"
                    priority
                  />
                </div>
                
                {/* Micro catalog caption */}
                <div className="absolute -bottom-6 left-0 text-[9px] tracking-widest text-stone-400 font-bold uppercase">
                  Fig. 04 / GINA BOTSHTEIN, LCSW
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column - Luxury Editorial Text Block */}
          <div className="md:col-span-7">
            <ScrollReveal delay={0.1}>
              <span className="text-[10px] tracking-[0.3em] font-bold text-gold-600 uppercase mb-3 block">
                THE PRACTITIONER
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-stone-900 mb-8">
                Meet <span className="italic text-forest-700 font-normal">Gina</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-6 text-base text-stone-700 leading-relaxed font-sans">
                <p className="drop-cap">
                  For over thirty years, I have had the profound privilege of supporting individuals, couples, and organizational teams through life's most challenging thresholds and transformative growth processes.
                </p>
                <p>
                  My clinical methodology is rooted in a rare, refined blend of deep academic expertise, genuine compassion, and organic warmth. By removing the clinical stiffness often found in modern practices, I offer a grounded, validating space where you feel truly honored, heard, and structurally equipped to implement lasting change.
                </p>
                <blockquote className="pl-6 border-l-2 border-gold-400 font-serif italic text-lg text-stone-600 my-6 py-1 text-balance">
                  “Healing is not about correcting a broken mechanism; it is about uncovering, honoring, and cultivating the natural wisdom and resilience that has always resided within you.”
                </blockquote>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="mt-10 pt-8 border-t border-stone-200">
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-5 tracking-wide flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
                  </svg>
                  Credentials & Technical Training
                </h3>
                <ul className="grid sm:grid-cols-2 gap-4 text-sm text-stone-700">
                  {[
                    'Licensed Clinical Social Worker (LCSW)',
                    "Master's Degree in Clinical Social Work",
                    '30+ Years of Private & Clinical Practice',
                    'Advanced Systems Theory Specialization'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-4 h-4 mt-0.5 text-gold-500 flex-shrink-0">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" className="hidden" />
                          {/* Elegant miniature gold leaf SVG shape */}
                          <path d="M12 3c-1.2 2-3 4-5 6.5C5.8 11 5 12.8 5 14.5 5 18 8.1 21 12 21s7-3 7-6.5c0-1.7-.8-3.5-2-5C15 7 13.2 5 12 3zm0 2.5c.8 1.4 2.1 2.8 3.5 4.5.9 1.2 1.5 2.5 1.5 3.5 0 2.5-2.2 4.5-5 4.5s-5-2-5-4.5c0-1 .6-2.3 1.5-3.5 1.4-1.7 2.7-3.1 3.5-4.5z" />
                        </svg>
                      </div>
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
      description: 'Grounded, one-on-one sessions addressing anxiety, depressive cycles, life thresholds, deep trauma resolution, and intentional personal growth.',
      features: [
        'Personalized treatment plans',
        'Cognitive & somatic approaches',
        'Safe, validating space',
        'Flexible scheduling options'
      ],
      accent: 'forest',
      // Fine-line singular botanical leaf wireframe SVG
      svg: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3c-1.2 2-3 4-5 6.5C5.8 11 5 12.8 5 14.5 5 18 8.1 21 12 21s7-3 7-6.5c0-1.7-.8-3.5-2-5C15 7 13.2 5 12 3zm0 2.5c.8 1.4 2.1 2.8 3.5 4.5" />
        </svg>
      )
    },
    {
      title: 'Couples Therapy',
      description: 'Structured restoration to rebuild foundational trust, break rigid conflict cycles, and deeply enrich intimacy through guided, empathetic dialogue.',
      features: [
        'Communication skill-building',
        'Root conflict resolution',
        'Intimacy & secure connection',
        'Pre-marital alignment work'
      ],
      accent: 'gold',
      // Intertwining double leaf stems wireframe SVG
      svg: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 21c4-2 6-5 6-9s-2-6-4-9M16 21c-4-2-6-5-6-9s2-6 4-9" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 12h.01" />
        </svg>
      )
    },
    {
      title: 'Family & Team Support',
      description: 'Strategic counseling for family units and organizational teams to unpack structural dynamics, resolve blockages, and promote wellness.',
      features: [
        'Family systems analysis',
        'Conscious parenting support',
        'Collaborative team dynamics',
        'Systemic wellness planning'
      ],
      accent: 'forest',
      // Multi-branch connected botanical stems wireframe SVG
      svg: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 22V10M12 10c1.5-1.5 3-2 5-2M12 14c-1.5-1.5-3-2-5-2M12 10c0-2-1.5-4-4-5M17 8c0-1.5-1-3-3-3.5" />
        </svg>
      )
    }
  ];

  return (
    <section id="services" className="py-24 px-5 sm:px-8 bg-white border-b border-stone-200/60 relative">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="text-[10px] tracking-[0.3em] font-bold text-gold-600 uppercase mb-3 block">
              CLINICAL PATHWAYS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-stone-900 mb-6">
              Therapeutic <span className="italic text-forest-700 font-normal">Specializations</span>
            </h2>
            <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed font-sans">
              Comprehensive, evidence-based therapy pathways customized to honor your individual narrative and clinical objectives.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ScrollReveal key={index} delay={0.08 * index}>
              <motion.div
                className="h-full bg-ivory-50 p-8 border border-stone-200/80 hover:border-forest-600 hover:shadow-xl transition-all duration-500 group flex flex-col justify-between"
                whileHover={{ y: -6 }}
              >
                <div>
                  <div className={`w-14 h-14 border flex items-center justify-center mb-8 ${
                    service.accent === 'gold' ? 'border-gold-300 text-gold-600 bg-gold-50' : 'border-forest-200 text-forest-600 bg-forest-50'
                  }`}>
                    {service.svg}
                  </div>
                  
                  <span className="text-[9px] tracking-widest font-bold text-gold-600 uppercase block mb-3">
                    PATHWAY 0{index + 1}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4 transition-colors group-hover:text-forest-700">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 mb-8 leading-relaxed font-sans">
                    {service.description}
                  </p>
                </div>

                <div className="border-t border-stone-200/80 pt-6">
                  <h4 className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-4">Core Focus Areas</h4>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs text-stone-600">
                        <span className="w-3.5 h-3.5 text-gold-500 flex-shrink-0 mt-0.5">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="font-sans font-medium">{feature}</span>
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
      type: "Individual Restoration Client",
    },
    {
      quote: "My partner and I were structurally drifting. Gina didn't just referee; she helped us uncover formative blockages, rebuild trust, and develop deep relational boundaries that we continue to rely on.",
      author: "M. & J.",
      type: "Relational Restoration Clients",
    },
    {
      quote: "I have consulted multiple practitioners, but Gina is entirely distinctive. She maintains an elegant clinical posture—challenging you with gentle, direct wisdom that creates structural self-realization.",
      author: "D.L.",
      type: "Individual Restructuring Client",
    },
    {
      quote: "Gina's space immediately establishes absolute safety. She is deeply validating, clinical, and completely non-judgmental. Her guidance has structurally transformed my inner mental landscape.",
      author: "A.K.",
      type: "Transitions Counseling Client",
    },
  ];

  return (
    <section id="testimonials" className="py-24 px-5 sm:px-8 bg-white relative border-b border-stone-200/60">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="text-[10px] tracking-[0.3em] font-bold text-gold-600 uppercase mb-3 block">
              CLIENT REFLECTIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-stone-900 mb-6">
              Narratives of <span className="italic text-forest-700 font-normal">Restoration</span>
            </h2>
            <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed font-sans">
              Authentic reflections from individuals and partners who have experienced structural healing and emotional wholeness under Gina's guidance.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-10">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={0.08 * index}>
              <div className="relative h-full bg-ivory-50 p-8 sm:p-10 border border-stone-200/80 flex flex-col justify-between">
                {/* Large print-catalog brass quote marks */}
                <div className="font-serif text-6xl text-gold-300/60 leading-none mb-4 select-none">“</div>

                <blockquote className="text-stone-800 leading-relaxed mb-8 text-base sm:text-lg font-serif font-light italic text-left">
                  {testimonial.quote}
                </blockquote>

                <div className="border-t border-stone-200/80 pt-6 flex items-center justify-between mt-auto">
                  <div>
                    <p className="font-sans font-bold text-stone-950 text-xs tracking-wider uppercase">{testimonial.author}</p>
                    <p className="text-[10px] text-stone-400 tracking-widest font-semibold uppercase mt-0.5">{testimonial.type}</p>
                  </div>
                  <span className="text-gold-400 text-xs">★ ★ ★ ★ ★</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <p className="text-center text-[10px] tracking-wider uppercase font-bold text-stone-400 mt-12">
            * Client initials are utilized to preserve clinical confidentiality in strict compliance with HIPAA frameworks.
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
    <section id="insurance" className="py-24 px-5 sm:px-8 bg-ivory-200 relative overflow-hidden border-t border-b border-stone-200/60">
      {/* Subtle paper grid lines backdrop */}
      <div className="absolute inset-0 editorial-grid opacity-25 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="text-[10px] tracking-[0.3em] font-bold text-gold-600 uppercase mb-3 block">
              COVERAGE & ACCESSIBILITY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-stone-900 mb-6">
              Accepted <span className="italic text-forest-700 font-normal">Insurance Plans</span>
            </h2>
            <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed font-sans">
              I am currently an in-network provider for several major plans to ensure compassionate mental healthcare remains highly accessible within our community.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {insurancePlans.map((plan, index) => (
            <ScrollReveal key={index} delay={0.08 * index}>
              <motion.div
                className="relative px-6 py-10 border border-stone-300 bg-ivory-50 flex flex-col justify-between h-48 transition-all duration-300 hover:border-gold-500 hover:shadow-lg"
                whileHover={{ y: -4 }}
              >
                <div className="flex justify-between items-start">
                  <span className="text-[9px] tracking-widest font-bold text-gold-600 uppercase">
                    0{index + 1} / NETWORK
                  </span>
                  <div className="w-5 h-5 rounded-full border border-forest-500 flex items-center justify-center text-forest-600">
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-serif font-light text-stone-900">
                  {plan.name}
                </h3>
                
                <span className="text-[9px] tracking-widest font-semibold text-stone-400 uppercase">
                  In-Network Provider
                </span>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="mt-16 text-center max-w-2xl mx-auto">
            <p className="text-stone-500 text-xs italic leading-relaxed font-sans">
              * For other insurance carriers, I can provide a comprehensive monthly statement for potential out-of-network reimbursement. We highly recommend verifying your specific mental health benefits with your carrier beforehand.
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
    }
  ];

  return (
    <section id="faq" className="py-24 px-5 sm:px-8 bg-ivory-50 border-b border-stone-200/60 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.3em] font-bold text-gold-600 uppercase mb-3 block">
              CLINICAL CLARITY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-stone-900 mb-6">
              Frequently Asked <span className="italic text-forest-700 font-normal">Questions</span>
            </h2>
            <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Essential procedural details regarding fee structures, session configurations, and getting started on your clinical path.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-0 border-t border-stone-300">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={0.03 * index}>
              <div className="border-b border-stone-200/80 overflow-hidden">
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
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-16 text-center">
            <p className="text-stone-500 text-xs font-sans mb-4">Require further systemic details?</p>
            <Link href="/contact">
              <motion.span
                className="inline-block px-8 py-3.5 border border-forest-600 hover:bg-forest-600 text-forest-700 hover:text-white font-bold uppercase tracking-widest text-xs transition-colors cursor-pointer"
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

  return (
    <section id="contact" className="py-24 px-5 sm:px-8 bg-white relative">
      <div className="max-w-5xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="text-[10px] tracking-[0.3em] font-bold text-gold-600 uppercase mb-3 block">
              SECURE CONSULTATION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-stone-900 mb-6">
              Begin the <span className="italic text-forest-700 font-normal">Dialogue</span>
            </h2>
            <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Reach out today to coordinate a secure, confidential clinical session or review questions about care frameworks.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Contact Info (Left column, editorial list) */}
          <div className="md:col-span-5">
            <ScrollReveal delay={0.1}>
              <div className="space-y-8 text-left">
                <div>
                  <span className="text-[9px] tracking-widest font-bold text-stone-400 uppercase block mb-3">
                    CLINICAL COMMUNICATIONS
                  </span>
                  <h3 className="font-serif text-2xl font-light text-stone-900 mb-4">Direct Contact</h3>
                  <p className="text-xs text-stone-500 font-sans leading-relaxed mb-6">
                    For immediate scheduling, direct phone queries are welcome during clinical hours (8 AM - 6 PM CST).
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      label: 'Phone Contact',
                      value: '+1 (414) 617-2201',
                      href: 'tel:+14146172201',
                      icon: <Phone className="w-3.5 h-3.5 text-gold-600" />
                    },
                    {
                      label: 'Secure Email',
                      value: 'Gina@wccounseling.net',
                      href: 'mailto:Gina@wccounseling.net',
                      icon: <Mail className="w-3.5 h-3.5 text-gold-600" />
                    }
                  ].map((item, i) => (
                    <div key={i} className="border-b border-stone-200/80 pb-5">
                      <span className="text-[9px] tracking-widest font-bold text-gold-600 uppercase block mb-2">{item.label}</span>
                      <a href={item.href} className="inline-flex items-center gap-2.5 font-serif text-lg font-bold text-stone-800 hover:text-forest-700 transition-colors">
                        {item.icon}
                        {item.value}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="border border-stone-300 bg-ivory-50 p-6">
                  <h4 className="text-[10px] tracking-wider font-bold text-stone-800 uppercase mb-2">Confidentiality Frame</h4>
                  <p className="text-xs text-stone-500 leading-relaxed font-sans">
                    All electronic form submissions and direct calls are strictly confidential and fully compliant with HIPAA regulatory privacy standards.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact Form (Right column, luxury minimalist inputs) */}
          <div className="md:col-span-7">
            <ScrollReveal delay={0.2}>
              <div className="border border-stone-300 bg-ivory-50 p-8 sm:p-10 relative">
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-8 tracking-wide">Submit Secure Query</h3>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 border border-forest-300 bg-forest-50 text-forest-800 text-xs font-semibold uppercase tracking-wider">
                    ✓ Thank you! I typically respond personally within 24 hours.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 border border-red-300 bg-red-50 text-red-800 text-xs font-semibold uppercase tracking-wider">
                    ⚠️ Submission anomaly. Please try calling or emailing directly.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8 text-left">
                  
                  {/* Underlined name with Peer-focused animating label */}
                  <div className="relative z-0 w-full group">
                    <input
                      type="text"
                      id="name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="block py-3 px-0 w-full text-sm text-stone-900 bg-transparent border-0 border-b border-stone-300 appearance-none focus:outline-none focus:ring-0 focus:border-forest-600 peer placeholder-transparent"
                      placeholder="Full Name"
                    />
                    <label
                      htmlFor="name"
                      className="absolute text-xs sm:text-sm text-stone-400 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 peer-focus:text-forest-600"
                    >
                      Full Name *
                    </label>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-8">
                    {/* Underlined email with Peer-focused animating label */}
                    <div className="relative z-0 w-full group">
                      <input
                        type="email"
                        id="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="block py-3 px-0 w-full text-sm text-stone-900 bg-transparent border-0 border-b border-stone-300 appearance-none focus:outline-none focus:ring-0 focus:border-forest-600 peer placeholder-transparent"
                        placeholder="Email Address"
                      />
                      <label
                        htmlFor="email"
                        className="absolute text-xs sm:text-sm text-stone-400 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 peer-focus:text-forest-600"
                      >
                        Email Address *
                      </label>
                    </div>

                    {/* Underlined phone with Peer-focused animating label */}
                    <div className="relative z-0 w-full group">
                      <input
                        type="tel"
                        id="phone"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="block py-3 px-0 w-full text-sm text-stone-900 bg-transparent border-0 border-b border-stone-300 appearance-none focus:outline-none focus:ring-0 focus:border-forest-600 peer placeholder-transparent"
                        placeholder="Phone Number"
                      />
                      <label
                        htmlFor="phone"
                        className="absolute text-xs sm:text-sm text-stone-400 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 peer-focus:text-forest-600"
                      >
                        Phone (Optional)
                      </label>
                    </div>
                  </div>

                  {/* Specialty dropdown with refined border */}
                  <div className="relative z-0 w-full group">
                    <select
                      id="subject"
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="block py-3.5 px-0 w-full text-sm text-stone-700 bg-transparent border-0 border-b border-stone-300 appearance-none focus:outline-none focus:ring-0 focus:border-forest-600 font-sans"
                    >
                      <option value="" disabled className="bg-ivory-50">Select Specialty Pathway... *</option>
                      <option value="individual" className="bg-ivory-50">Individual Therapy</option>
                      <option value="couples" className="bg-ivory-50">Couples Therapy</option>
                      <option value="family" className="bg-ivory-50">Family & Team Support</option>
                      <option value="other" className="bg-ivory-50">Other / Inquiry</option>
                    </select>
                    {/* Floating label mimicking native placeholder behavior */}
                    {formState.subject && (
                      <span className="absolute text-[10px] text-stone-400 uppercase tracking-widest font-bold -translate-y-5 scale-75 top-0 -z-10 origin-[0]">
                        Clinical Pathway
                      </span>
                    )}
                  </div>

                  {/* Minimal Message outline underline area */}
                  <div className="relative z-0 w-full group">
                    <textarea
                      id="message"
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="block py-3 px-0 w-full text-sm text-stone-900 bg-transparent border-0 border-b border-stone-300 appearance-none focus:outline-none focus:ring-0 focus:border-forest-600 peer placeholder-transparent resize-none"
                      placeholder="Clinical Message"
                    />
                    <label
                      htmlFor="message"
                      className="absolute text-xs sm:text-sm text-stone-400 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 peer-focus:text-forest-600"
                    >
                      How can I best support you? (Optional)
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 border border-forest-600 bg-forest-700 hover:bg-forest-600 disabled:bg-stone-300 text-white font-bold uppercase tracking-widest text-xs transition-colors duration-300 shadow-md flex justify-center items-center gap-2"
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
    <footer className="bg-forest-900 text-ivory-100 py-16 px-5 sm:px-8 border-t border-forest-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-serif text-xl font-bold tracking-wider text-white mb-3">WECARE COUNSELING</h3>
            <p className="text-xs tracking-widest text-gold-400 font-bold uppercase mb-4">Gina Botshtein, LCSW</p>
            <p className="text-xs text-forest-200/80 leading-relaxed font-sans max-w-sm">
              Providing three decades of compassionate, evidence-based therapy to help individuals, couples, and team organizations cultivate structural healing and wholeness.
            </p>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.25em] font-bold text-white uppercase mb-5">Quick Indexes</h4>
            <div className="space-y-3 font-sans text-xs">
              <Link href="/" className="block text-forest-200 hover:text-gold-400 transition-colors font-semibold uppercase tracking-wider">Home</Link>
              <Link href="/faq" className="block text-forest-200 hover:text-gold-400 transition-colors font-semibold uppercase tracking-wider">FAQ</Link>
              <Link href="/contact" className="block text-forest-200 hover:text-gold-400 transition-colors font-semibold uppercase tracking-wider">Contact</Link>
              <Link href="/privacy" className="block text-forest-200 hover:text-gold-400 transition-colors font-semibold uppercase tracking-wider">Privacy Policy</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.25em] font-bold text-white uppercase mb-5">Direct Contact</h4>
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
        <div className="border-t border-forest-800 pt-8 text-center flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] tracking-wider uppercase font-bold text-forest-300">
            © {new Date().getFullYear()} WeCare Counseling. All rights reserved.
          </p>
          <p className="text-[9px] tracking-widest uppercase font-semibold text-forest-400">
            Confidential & HIPAA Compliant Healthcare Space
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
