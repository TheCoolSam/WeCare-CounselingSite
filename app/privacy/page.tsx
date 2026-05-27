'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
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
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="font-sans font-extrabold text-4xl sm:text-5xl text-stone-900 tracking-tight mb-4 text-balance">
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 font-sans tracking-wide">
              Last updated: January 2026
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-10 text-stone-600 leading-relaxed font-sans text-sm sm:text-base text-left bg-white p-8 sm:p-12 rounded-3xl border border-stone-200"
          >
            {/* Introduction */}
            <section>
              <h2 className="font-sans font-extrabold text-xl sm:text-2xl text-stone-900 mb-4">
                Introduction
              </h2>
              <p className="leading-relaxed">
                WeCare Counseling (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our,&rdquo; or &ldquo;Practice&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and contact portal (collectively, the &ldquo;Site&rdquo;).
              </p>
            </section>

            <hr className="border-stone-100" />

            {/* Information We Collect */}
            <section>
              <h2 className="font-sans font-extrabold text-xl sm:text-2xl text-stone-900 mb-4">Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-stone-800 mb-2">Contact Form Information</h3>
                  <p className="leading-relaxed">When you use our contact form, we collect your name, email address, phone number, and message. This information is processed through Formspree, a third-party service provider, and is used solely to respond to your inquiry.</p>
                </div>
                <div>
                  <h3 className="font-bold text-stone-800 mb-2">Automatic Information</h3>
                  <p className="leading-relaxed">We may automatically collect certain information about your device, including browser type, operating system, and referring URLs. This data helps us improve our website and user experience.</p>
                </div>
              </div>
            </section>

            <hr className="border-stone-100" />

            {/* How We Use Your Information */}
            <section>
              <h2 className="font-sans font-extrabold text-xl sm:text-2xl text-stone-900 mb-4">How We Use Your Information</h2>
              <ul className="space-y-3">
                {[
                  "To respond to your inquiries and provide information about our services",
                  "To send you updates about WeCare Counseling services (if you've requested contact)",
                  "To improve and optimize our website and services",
                  "To prevent fraudulent transactions and protect the security of our Site"
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-forest-600 text-base leading-none mt-0.5">•</span>
                    <span className="leading-relaxed">{text}</span>
                  </li>
                ))}
              </ul>
            </section>

            <hr className="border-stone-100" />

            {/* HIPAA Compliance */}
            <section className="bg-stone-50 p-6 sm:p-8 rounded-2xl border border-stone-200">
              <h2 className="font-sans font-extrabold text-xl sm:text-2xl text-stone-900 mb-4">
                HIPAA Compliance
              </h2>
              <p className="mb-4 leading-relaxed">
                As a licensed clinical social worker providing therapy services, Gina Botshtein is required to comply with the Health Insurance Portability and Accountability Act (HIPAA). When you become a therapy client, all clinical information is protected under HIPAA regulations.
              </p>
              <p className="text-stone-500 leading-relaxed font-sans text-xs bg-white p-4 border border-stone-100 rounded-xl">
                <strong className="text-stone-900">IMPORTANT NOTICE:</strong> This website and its general contact forms are not part of HIPAA-covered services. If you require HIPAA-protected communication, please call us directly at +1 (414) 617-2201 or email Gina@wccounseling.net to establish a confidential communication channel.
              </p>
            </section>

            <hr className="border-stone-100" />

            {/* Third-Party Services */}
            <section>
              <h2 className="font-sans font-extrabold text-xl sm:text-2xl text-stone-900 mb-4">Third-Party Services</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-stone-800 mb-2">Formspree</h3>
                  <p className="leading-relaxed">We use Formspree to process contact form submissions. Formspree acts as a data processor and may store your information temporarily to deliver your message to us. Their privacy practices are governed by their own privacy policy.</p>
                </div>
                <div>
                  <h3 className="font-bold text-stone-800 mb-2">Hosting</h3>
                  <p className="leading-relaxed">Our website is hosted on Namecheap&apos;s Stellar hosting. We may use analytics tools to understand how users interact with our Site. These are handled securely and in compliance with privacy regulations.</p>
                </div>
              </div>
            </section>

            <hr className="border-stone-100" />

            {/* Your Privacy Rights */}
            <section>
              <h2 className="font-sans font-extrabold text-xl sm:text-2xl text-stone-900 mb-4">Your Privacy Rights</h2>
              <p className="mb-6 leading-relaxed">
                You have the right to access, update, or delete the personal information we hold about you. If you would like to exercise any of these rights, please contact us at:
              </p>
              <div className="border border-stone-200 rounded-2xl p-6 grid sm:grid-cols-2 gap-4 bg-stone-50">
                <div>
                  <p className="font-bold text-stone-800 text-sm">WeCare Counseling</p>
                  <p className="text-xs text-stone-500 font-sans mt-1">Gina Botshtein, LCSW</p>
                </div>
                <div className="space-y-1 text-xs sm:text-sm font-sans font-medium text-stone-600">
                  <p>Email: Gina@wccounseling.net</p>
                  <p>Phone: +1 (414) 617-2201</p>
                </div>
              </div>
            </section>

            <hr className="border-stone-100" />

            {/* Security */}
            <section>
              <h2 className="font-sans font-extrabold text-xl sm:text-2xl text-stone-900 mb-4">Security of Your Information</h2>
              <p className="leading-relaxed">
                We use administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security of your information.
              </p>
            </section>

            <hr className="border-stone-100" />

            {/* Contact Us */}
            <section className="bg-forest-900 text-white p-8 sm:p-10 rounded-2xl">
              <h2 className="font-sans font-extrabold text-2xl text-white mb-4">Contact Us</h2>
              <p className="mb-6 text-forest-200 text-xs sm:text-sm leading-relaxed">
                If you have questions about this Privacy Policy or our privacy practices, please contact us directly:
              </p>
              <div className="grid sm:grid-cols-2 gap-6 text-xs sm:text-sm pt-4 border-t border-forest-800">
                <div>
                  <p className="text-gold-400 font-bold uppercase tracking-wider mb-1">Phone</p>
                  <a href="tel:+14146172201" className="font-bold text-white hover:text-gold-400 transition-colors text-base sm:text-lg">
                    +1 (414) 617-2201
                  </a>
                </div>
                <div>
                  <p className="text-gold-400 font-bold uppercase tracking-wider mb-1">Email</p>
                  <a href="mailto:Gina@wccounseling.net" className="font-bold text-white hover:text-gold-400 transition-colors text-base sm:text-lg break-all">
                    Gina@wccounseling.net
                  </a>
                </div>
              </div>
            </section>

            {/* Updates */}
            <section className="text-center text-xs text-stone-400 pt-8 border-t border-stone-100">
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on the Site with an updated &ldquo;Last Updated&rdquo; date.
              </p>
            </section>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-forest-900 text-stone-200 py-16 px-5 sm:px-8 border-t border-forest-800 relative z-10 mt-auto">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="font-sans font-extrabold text-lg text-white mb-2 tracking-tight">WECARE COUNSELING</h3>
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

