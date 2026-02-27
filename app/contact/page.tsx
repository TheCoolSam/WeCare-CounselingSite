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
      const response = await fetch('https://formspree.io/f/xaqqenpb', {
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
    <div className="min-h-screen bg-ivory-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-forest-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="font-serif text-xl sm:text-2xl font-bold text-forest-700 hover:text-forest-800 transition-colors">
            WeCare
          </Link>
          <Link href="/" className="flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-forest-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-28 pb-16 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-sm font-semibold text-forest-600 uppercase tracking-widest mb-3 block">Contact</span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Ready to start your journey? Reach out today for a free consultation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-2 space-y-4"
            >
              <div className="bg-white rounded-xl p-5 border border-stone-200/60 hover:border-forest-200 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 bg-forest-50 rounded-lg flex items-center justify-center text-forest-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold text-stone-800">Phone</span>
                </div>
                <a href="tel:+14146172201" className="text-forest-600 hover:text-forest-700 transition-colors">
                  +1 (414) 617-2201
                </a>
              </div>

              <div className="bg-white rounded-xl p-5 border border-stone-200/60 hover:border-forest-200 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 bg-forest-50 rounded-lg flex items-center justify-center text-forest-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold text-stone-800">Email</span>
                </div>
                <a href="mailto:Gina@wccounseling.net" className="text-forest-600 hover:text-forest-700 transition-colors break-all text-sm">
                  Gina@wccounseling.net
                </a>
              </div>


              <div className="bg-forest-50 rounded-xl p-5 border border-forest-200">
                <h3 className="text-base font-semibold text-stone-900 mb-2">Prefer to talk first?</h3>
                <p className="text-sm text-stone-600 mb-3">
                  All initial consultations are free and confidential. Call or email to schedule yours today.
                </p>
                <Link
                  href="/quiz"
                  className="inline-block text-sm font-medium text-forest-600 hover:text-forest-700 transition-colors"
                >
                  Take the Quiz to find the right fit →
                </Link>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-3"
            >
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/60 shadow-lg">
                <h3 className="text-xl font-serif font-bold text-stone-900 mb-6">Send a Message</h3>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-forest-50 border border-forest-200 rounded-xl text-forest-800 text-sm"
                  >
                    <strong>Thank you!</strong> I'll get back to you within 24 hours.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm"
                  >
                    Something went wrong. Please try calling or emailing directly.
                  </motion.div>
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
                      placeholder="John Doe"
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
                        placeholder="john@example.com"
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
                        placeholder="(555) 123-4567"
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
                      <option value="consultation">Free Consultation</option>
                      <option value="other">Other / Not Sure</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1.5">Message (Optional)</label>
                    <textarea
                      id="message"
                      rows={5}
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

                  <p className="text-xs text-stone-500 text-center mt-3">
                    By submitting this form, you consent to being contacted about your inquiry.
                    All information is confidential and HIPAA-compliant.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
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
