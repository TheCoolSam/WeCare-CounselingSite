'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Phone, Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import SiteFooter from '../components/SiteFooter';
import { PRACTICE_LOCATION } from '../lib/constants';

export default function ContactPage() {
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

  const isFormValid = Boolean(
    formState.name.trim() &&
    formState.email &&
    validateEmail(formState.email) &&
    formState.subject &&
    (!formState.phone || formState.phone.replace(/[^\d]/g, '').length === 10)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !hipaaChecked) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || 'xaqqenpb';
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
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
    <div className="min-h-screen bg-stone-50 relative flex flex-col justify-between">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-100 py-4">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex justify-between items-center">
          <Link href="/" className="font-sans font-extrabold text-lg sm:text-xl tracking-tight text-stone-900">
            WeCare <span className="text-forest-600 font-light">Counseling</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-stone-600 hover:text-forest-600 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-24 px-5 sm:px-8 relative z-10 flex-grow">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 max-w-2xl mx-auto"
          >
            <h1 className="font-sans font-extrabold text-4xl sm:text-5xl text-stone-900 tracking-tight mb-4">
              Get in Touch
            </h1>
            <p className="text-sm sm:text-base text-stone-500 leading-relaxed font-normal">
              Ready to start? Reach out to schedule a session in Milwaukee, Mequon, or nearby — in person or by telehealth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Contact Info (Left Column - Flat, Apple-Grade) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="md:col-span-5 text-left"
            >
              <div className="space-y-8">
                <div>
                  <p className="text-sm sm:text-base text-stone-500 font-sans leading-relaxed">
                    Prefer to call or email? Initial consultations are always free and confidential. {PRACTICE_LOCATION.serviceAreaSentence}
                  </p>
                </div>

                <div className="space-y-6 pt-6 border-t border-stone-200/80">
                  <p className="text-sm text-stone-600 font-sans">
                    {PRACTICE_LOCATION.locality}, {PRACTICE_LOCATION.region} {PRACTICE_LOCATION.postalCode}
                    <span className="block text-stone-400 text-xs mt-1">Serving {PRACTICE_LOCATION.shortLine}</span>
                  </p>
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
            </motion.div>

            {/* Contact Form (Right Column - Flat, Clean) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-7"
            >
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
                      id="contact-name"
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
                        id="contact-email"
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
                        id="contact-phone"
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
                      id="contact-subject"
                      required
                      aria-label="Select Service Option"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-stone-400 focus:bg-white rounded-xl text-sm focus:outline-none transition-all text-stone-600"
                    >
                      <option value="" disabled className="bg-white">Select Service Option... *</option>
                      <option value="individual" className="bg-white">Individual Therapy</option>
                      <option value="couples" className="bg-white">Couples Therapy</option>
                      <option value="family" className="bg-white">Family & Team Support</option>
                      <option value="other" className="bg-white">Other / Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <textarea
                      id="contact-message"
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
                      id="hipaa-consent"
                      type="checkbox"
                      required
                      checked={hipaaChecked}
                      onChange={(e) => setHipaaChecked(e.target.checked)}
                      className="w-4 h-4 mt-1 rounded border-stone-300 text-forest-600 focus:ring-forest-500 cursor-pointer"
                    />
                    <label htmlFor="hipaa-consent" className="text-xs text-stone-500 leading-relaxed select-none cursor-pointer">
                      I understand this form is for general inquiries and is not intended to transmit confidential medical or clinical information protected under HIPAA. *
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting || !hipaaChecked || !isFormValid}
                    className="w-full py-3 bg-forest-600 hover:bg-forest-700 disabled:bg-stone-300 text-white font-semibold rounded-xl text-xs uppercase tracking-widest transition-all cursor-pointer flex justify-center items-center gap-2"
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>

                  <p className="text-[10px] tracking-wider text-stone-400 font-medium text-center mt-4">
                    Please do not include clinical details here. For confidential matters, call or email directly.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
