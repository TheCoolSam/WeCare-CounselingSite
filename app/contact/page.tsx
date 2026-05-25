'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Phone, Mail, ArrowLeft } from 'lucide-react';

export default function ContactPage() {
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
    <div className="min-h-screen bg-ivory-50 relative flex flex-col justify-between">
      {/* Editorial Grid overlay */}
      <div className="absolute inset-0 editorial-grid opacity-20 pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-ivory-50 border-b border-stone-200 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex justify-between items-center">
          <Link href="/" className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-forest-700">
            WECARE <span className="font-sans font-light text-stone-500 text-xs tracking-widest uppercase align-middle ml-1">Counseling</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-stone-700 hover:text-forest-600 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-36 pb-24 px-5 sm:px-8 relative z-10 flex-grow">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="text-[10px] tracking-[0.3em] font-bold text-gold-600 uppercase mb-3 block">
              SECURE PORTAL
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-light text-stone-900 mb-6">
              Get in <span className="italic text-forest-700 font-normal">Touch</span>
            </h1>
            <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Initiate your clinical partnership today. All inquiries are securely processed under absolute HIPAA confidentiality.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Contact Info (Left column) */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="md:col-span-5 space-y-8 text-left"
            >
              <div>
                <span className="text-[9px] tracking-widest font-bold text-stone-400 uppercase block mb-3">
                  DIRECT CHANNELS
                </span>
                <h3 className="font-serif text-2xl font-light text-stone-900 mb-4">Immediate Queries</h3>
                <p className="text-xs text-stone-500 font-sans leading-relaxed">
                  If you prefer direct voice communication, feel free to call during standard business hours (8 AM - 6 PM CST).
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

              <div className="border border-stone-300 bg-white p-6 shadow-sm">
                <h3 className="font-sans font-bold text-xs text-stone-800 uppercase mb-2">Initial Consultations</h3>
                <p className="text-xs text-stone-500 leading-relaxed font-sans">
                  All initial fit assessments are complimentary and confidential. We are here to support your transition every step of the way.
                </p>
              </div>
            </motion.div>

            {/* Contact Form (Right column) */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-7"
            >
              <div className="border border-stone-300 bg-white p-8 sm:p-10 shadow-lg relative">
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
                      <option value="" disabled className="bg-white">Select Specialty Pathway... *</option>
                      <option value="individual" className="bg-white">Individual Therapy</option>
                      <option value="couples" className="bg-white">Couples Therapy</option>
                      <option value="family" className="bg-white">Family & Team Support</option>
                      <option value="consultation" className="bg-white">Free Consultation</option>
                      <option value="other" className="bg-white">Other / Inquiry</option>
                    </select>
                    {/* Floating label mimicking native placeholder behavior */}
                    {formState.subject && (
                      <span className="absolute text-[10px] text-stone-400 uppercase tracking-widest font-bold -translate-y-5 scale-75 top-0 -z-10 origin-[0]">
                        Clinical Pathway
                      </span>
                    )}
                  </div>

                  {/* Message outline underline area */}
                  <div className="relative z-0 w-full group">
                    <textarea
                      id="message"
                      rows={5}
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
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-forest-900 text-ivory-100 py-16 px-5 sm:px-8 border-t border-forest-800 mt-auto relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="font-serif text-xl font-bold tracking-wider text-white mb-2">WECARE COUNSELING</h3>
          <p className="text-xs tracking-widest text-gold-400 font-bold uppercase mb-6">Gina Botshtein, LCSW</p>
          
          <div className="flex flex-wrap justify-center gap-6 text-xs font-sans mb-8">
            <a href="tel:+14146172201" className="flex items-center gap-2 text-forest-200 hover:text-gold-400 transition-colors">
              <Phone className="w-3.5 h-3.5 text-gold-400" /> +1 (414) 617-2201
            </a>
            <span className="text-forest-800">|</span>
            <a href="mailto:Gina@wccounseling.net" className="flex items-center gap-2 text-forest-200 hover:text-gold-400 transition-colors break-all">
              <Mail className="w-3.5 h-3.5 text-gold-400" /> Gina@wccounseling.net
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
