'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, ArrowRight, Menu, X, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import HealingJourney from './components/HealingJourney';
import ginaPhoto from './components/gina.jpg';

// Premium Scroll animation wrapper with Apple-grade ease
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
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
          ? 'bg-white/70 backdrop-blur-xl shadow-sm border-b border-stone-200/30 py-3'
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
              className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-40 md:hidden"
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

// Hero Section (Pristine background, slow pulsing organic ambient glows)
function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center px-5 sm:px-8 pt-28 pb-20 bg-stone-50 overflow-hidden">
      {/* Ambient Pulsing Glow Spots */}
      <div className="absolute top-1/4 left-10 w-[45rem] h-[45rem] rounded-full bg-forest-100/10 blur-[130px] mix-blend-multiply pointer-events-none animate-pulse" style={{ animationDuration: '12s' }} />
      <div className="absolute bottom-1/3 right-10 w-[40rem] h-[40rem] rounded-full bg-gold-100/10 blur-[110px] mix-blend-multiply pointer-events-none animate-pulse" style={{ animationDuration: '16s' }} />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.15}>
              <h1 className="font-sans font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-forest-600 tracking-tight leading-[1.05] mb-6">
                Gina <br />
                <span>Botshtein</span>
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
          
          {/* Left Column (Asymmetric layered offsets & hover reveals) */}
          <div className="md:col-span-5">
            <ScrollReveal>
              <div className="relative max-w-sm mx-auto group">
                {/* Asymmetric Background Layer Plate */}
                <div className="absolute inset-0 bg-stone-100 rounded-3xl translate-x-4 translate-y-4 -z-10 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-500" />
                <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-stone-200 bg-stone-100 shadow-md relative group-hover:-translate-y-1 transition-transform duration-500">
                  <Image
                    src={ginaPhoto}
                    alt="Gina Botshtein, LCSW"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
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

// Custom nature-themed animated SVG icons
const SproutIcon = ({ animate }: { animate: boolean }) => (
  <svg className="w-5 h-5 text-forest-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <motion.path
      d="M12 22C12 22 12 17 12 10C12 6.5 14.5 4 18 4C18 4 19 6.5 17 8.5C15 10.5 12 10.9 12 10.9"
      initial={{ pathLength: 0 }}
      animate={animate ? { pathLength: 1 } : { pathLength: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
    />
    <motion.path
      d="M12 14C12 14 9.5 12.5 7.5 13C5.5 13.5 5 15.5 5 15.5C5 15.5 7 16 9 15C11 14 12 14 12 14"
      initial={{ pathLength: 0 }}
      animate={animate ? { pathLength: 1 } : { pathLength: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
    />
  </svg>
);

const CouplesIcon = ({ animate }: { animate: boolean }) => (
  <svg className="w-5 h-5 text-forest-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <motion.path
      d="M11 20C11 16 9 12 5 12C5 12 4.5 7.5 8 6C11.5 4.5 11 10 11 10"
      initial={{ pathLength: 0 }}
      animate={animate ? { pathLength: 1 } : { pathLength: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
    />
    <motion.path
      d="M11 20C11 16 13 12 17 12C17 12 17.5 7.5 14 6C10.5 4.5 11 10 11 10"
      initial={{ pathLength: 0 }}
      animate={animate ? { pathLength: 1 } : { pathLength: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
    />
  </svg>
);

const BranchIcon = ({ animate }: { animate: boolean }) => (
  <svg className="w-5 h-5 text-forest-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <motion.path
      d="M5 20c4-2 7-6 8-11"
      initial={{ pathLength: 0 }}
      animate={animate ? { pathLength: 1 } : { pathLength: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
    />
    <motion.path
      d="M9 13c1-2.5 3-3.5 5.5-3c1.5.5 2 2.5 0 3.5s-4.5 0-5.5-.5z"
      initial={{ pathLength: 0 }}
      animate={animate ? { pathLength: 1 } : { pathLength: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
    />
    <motion.path
      d="M13 9c.5-2.5 2-3.5 4.5-3.5s2.5 2 1.5 3.5-5 .5-6 0z"
      initial={{ pathLength: 0 }}
      animate={animate ? { pathLength: 1 } : { pathLength: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
    />
  </svg>
);

// Services Section (Flat, Editorial, Apple-Grade Accordion)
function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

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
    <section id="services" className="py-24 sm:py-32 px-5 sm:px-8 bg-stone-50 border-t border-b border-stone-200/50 relative overflow-hidden">
      {/* Dynamic Ambient Glow Spot behind accordion */}
      <div className="absolute top-1/4 right-0 w-[30rem] h-[30rem] rounded-full bg-forest-100/10 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Sticky Panel */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 text-left">
            <ScrollReveal>
              <h2 className="font-serif italic text-4xl sm:text-5xl text-stone-900 tracking-tight mb-6 font-light">
                How I Can Help
              </h2>
              <p className="text-base sm:text-lg text-stone-500 leading-relaxed font-sans font-light max-w-md">
                Thoughtful, personalized approaches designed around your unique story and tailored for a trusting partnership.
              </p>
            </ScrollReveal>
          </div>

          {/* Right Accordion Panel */}
          <div className="lg:col-span-7 space-y-4">
            {services.map((service, index) => {
              const isOpen = activeIndex === index;
              return (
                <ScrollReveal key={index} delay={0.05 * index}>
                  <div
                    onClick={() => setActiveIndex(isOpen ? null : index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveIndex(isOpen ? null : index);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isOpen}
                    aria-controls={`service-content-${index}`}
                    id={`service-header-${index}`}
                    className={`group border-b border-stone-200/80 py-8 transition-all duration-500 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-2 ${
                      activeIndex !== null && !isOpen ? 'opacity-40 hover:opacity-85' : 'opacity-100'
                    }`}
                  >
                    {/* Accordion Header */}
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex gap-6 items-baseline text-left">
                        <span className="font-serif italic text-xl sm:text-2xl text-stone-400 select-none font-light">
                          {service.num}
                        </span>
                        <h3 className="text-2xl font-bold font-sans text-stone-900 tracking-tight group-hover:text-forest-700 transition-colors">
                          {service.title}
                        </h3>
                      </div>
                      <span className="text-stone-400 text-xl font-light group-hover:text-forest-700 transition-colors select-none">
                        {isOpen ? '—' : '+'}
                      </span>
                    </div>

                    {/* Accordion Body (Fluid Framer Motion Height Reveal) */}
                    <motion.div
                      id={`service-content-${index}`}
                      role="region"
                      aria-labelledby={`service-header-${index}`}
                      initial={false}
                      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 pl-12 text-left">
                        <p className="text-sm sm:text-base text-stone-600 mb-6 font-sans font-light leading-relaxed max-w-2xl">
                          {service.description}
                        </p>
                        
                        <div className="border-t border-stone-200/50 pt-5">
                          <p className="text-[10px] tracking-wider font-bold text-stone-400 uppercase mb-3">Focus Areas</p>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                            {service.focus.split(' • ').map((item, idx) => (
                              <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-600 font-sans font-medium leading-relaxed">
                                {index === 0 && <SproutIcon animate={isOpen} />}
                                {index === 1 && <CouplesIcon animate={isOpen} />}
                                {index === 2 && <BranchIcon animate={isOpen} />}
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// Insurance Section
function InsuranceSection() {
  const insurancePlans = [
    { name: 'Aetna' },
    { name: 'United Healthcare' },
    { name: 'United Medicare Advantage' },
    { name: 'Medicare' },
    { name: 'Medicaid' },
    { name: 'Badger Care' },
    { name: 'WPS' }
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

        <ScrollReveal delay={0.1}>
          <div className="max-w-4xl mx-auto bg-white border border-stone-200/80 p-8 sm:p-12 rounded-3xl shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-forest-500/10 via-forest-600/30 to-forest-500/10" />
            
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
              {insurancePlans.map((plan, index) => (
                <motion.span
                  key={index}
                  whileHover={{ y: -2, backgroundColor: '#f5f7f6', borderColor: '#3c5144', color: '#3c5144' }}
                  className="px-5 py-3 rounded-full border border-stone-200/80 bg-stone-50 text-stone-700 font-sans text-sm sm:text-base font-bold shadow-xs cursor-default transition-all duration-300"
                >
                  {plan.name}
                </motion.span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
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

  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);

  const activeIndex = Math.abs(page % testimonials.length);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(interval);
  }, [page, isHovered]);

  return (
    <section id="testimonials" className="py-24 sm:py-32 px-5 sm:px-8 bg-white relative">
      <div className="max-w-4xl mx-auto">
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

        <ScrollReveal delay={0.1}>
          <div
            className="relative min-h-[380px] sm:min-h-[320px] md:min-h-[260px] bg-stone-50 p-8 sm:p-12 md:p-14 rounded-3xl border border-stone-200 flex flex-col justify-between overflow-hidden shadow-sm select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="absolute right-8 top-4 text-9xl font-serif text-stone-200/50 pointer-events-none select-none select-none">“</span>

            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={page}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({ x: dir > 0 ? 30 : -30, opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (dir: number) => ({ x: dir < 0 ? 30 : -30, opacity: 0 })
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-between h-full relative z-10 flex-grow"
              >
                <blockquote className="text-stone-800 leading-relaxed mb-8 text-base sm:text-lg md:text-xl font-serif italic text-left pr-4">
                  “{testimonials[activeIndex].quote}”
                </blockquote>

                <div className="border-t border-stone-200/80 pt-6 flex items-center text-left">
                  <div>
                    <p className="font-sans font-bold text-stone-900 text-xs sm:text-sm uppercase tracking-wider">{testimonials[activeIndex].author}</p>
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mt-1">{testimonials[activeIndex].type}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-8 right-8 flex items-center gap-4 z-20">
              <div className="flex gap-1.5 mr-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const dir = idx > activeIndex ? 1 : -1;
                      setPage([idx, dir]);
                    }}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      idx === activeIndex ? 'bg-forest-600 w-4' : 'bg-stone-300 hover:bg-stone-400'
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={() => paginate(-1)}
                  className="w-7 h-7 rounded-full border border-stone-200 hover:border-forest-600 bg-white flex items-center justify-center text-stone-500 hover:text-forest-600 transition-colors shadow-sm focus:outline-none"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => paginate(1)}
                  className="w-7 h-7 rounded-full border border-stone-200 hover:border-forest-600 bg-white flex items-center justify-center text-stone-500 hover:text-forest-600 transition-colors shadow-sm focus:outline-none"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
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
                  className="w-full px-6 py-4 text-left flex justify-between items-center gap-6 group focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-600"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-content-${index}`}
                  id={`faq-header-${index}`}
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
                  id={`faq-content-${index}`}
                  role="region"
                  aria-labelledby={`faq-header-${index}`}
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
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
  });
  const [hipaaChecked, setHipaaChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormState({ ...formState, phone: formatted });
  };

  const handleBlur = (field: 'name' | 'email' | 'phone') => {
    setTouched({ ...touched, [field]: true });
  };

  const errors = {
    name: touched.name && !formState.name.trim() ? 'Name is required' : '',
    email: touched.email && (!formState.email ? 'Email is required' : !validateEmail(formState.email) ? 'Please enter a valid email address' : ''),
    phone: touched.phone && formState.phone && formState.phone.replace(/[^\d]/g, '').length < 10 ? 'Phone number must be 10 digits' : '',
  };

  const isFormValid = formState.name.trim() && formState.email && validateEmail(formState.email) && (!formState.phone || formState.phone.replace(/[^\d]/g, '').length === 10);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !hipaaChecked) return;
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
        setTouched({ name: false, email: false, phone: false });
        setHipaaChecked(false);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

  const getInputClass = (fieldName: 'name' | 'email' | 'phone') => {
    const base = "w-full px-4 py-3 bg-stone-50 border rounded-xl text-sm focus:outline-none transition-all text-stone-900 placeholder:text-stone-400";
    if (!touched[fieldName]) {
      return `${base} border-stone-200 focus:border-stone-400 focus:bg-white`;
    }
    if (errors[fieldName]) {
      return `${base} border-red-300 focus:border-red-400 focus:bg-white ring-1 ring-red-300/30 bg-red-50/10`;
    }
    return `${base} border-emerald-200 focus:border-emerald-400 focus:bg-white ring-1 ring-emerald-100/30 bg-emerald-50/5`;
  };

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
                  <div className="mb-6 p-4 border border-gold-300 bg-gold-50/20 text-gold-900 text-xs font-bold rounded-xl uppercase tracking-wider">
                    Submission issue. Please try calling or emailing directly.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  <div>
                    <input
                      id="home-contact-name"
                      type="text"
                      required
                      aria-label="Full Name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      onBlur={() => handleBlur('name')}
                      className={getInputClass('name')}
                      placeholder="Full Name *"
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-500 mt-1 pl-1 font-medium">{errors.name}</p>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        id="home-contact-email"
                        type="email"
                        required
                        aria-label="Email Address"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        onBlur={() => handleBlur('email')}
                        className={getInputClass('email')}
                        placeholder="Email Address *"
                      />
                      {errors.email && (
                        <p className="text-[11px] text-red-500 mt-1 pl-1 font-medium">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <input
                        id="home-contact-phone"
                        type="tel"
                        aria-label="Phone Number"
                        value={formState.phone}
                        onChange={handlePhoneChange}
                        onBlur={() => handleBlur('phone')}
                        className={getInputClass('phone')}
                        placeholder="Phone Number"
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-red-500 mt-1 pl-1 font-medium">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <select
                      id="home-contact-subject"
                      required
                      aria-label="Select Service Option"
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
                      id="home-contact-message"
                      rows={5}
                      aria-label="How can I best support you?"
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-stone-400 focus:bg-white rounded-xl text-sm focus:outline-none transition-all text-stone-900 placeholder:text-stone-400 resize-none"
                      placeholder="How can I best support you? (Optional)"
                    />
                  </div>

                  <div className="flex items-start gap-3 mt-4 mb-2">
                    <input
                      id="home-hipaa-consent"
                      type="checkbox"
                      required
                      checked={hipaaChecked}
                      onChange={(e) => setHipaaChecked(e.target.checked)}
                      className="w-4 h-4 mt-1 rounded border-stone-300 text-forest-600 focus:ring-forest-500 cursor-pointer"
                    />
                    <label htmlFor="home-hipaa-consent" className="text-xs text-stone-500 leading-relaxed select-none cursor-pointer">
                      I understand this form is for general inquiries and is not intended to transmit confidential medical or clinical information protected under HIPAA. *
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting || !hipaaChecked || !isFormValid}
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
