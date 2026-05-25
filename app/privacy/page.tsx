'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, Mail, FileText, ShieldCheck } from 'lucide-react';

export default function PrivacyPolicy() {
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
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[10px] tracking-[0.3em] font-bold text-gold-600 uppercase mb-3 block">
              CLINICAL COMPLIANCE
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-light text-stone-900 mb-4 text-balance">
              Privacy <span className="italic text-forest-700 font-normal">Policy</span>
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
            className="space-y-12 text-stone-700 leading-relaxed font-sans text-sm sm:text-base text-left"
          >
            {/* Introduction */}
            <section className="border border-stone-300 bg-white p-8 sm:p-10 shadow-lg relative rounded-none">
              <span className="text-[9px] tracking-widest font-bold text-gold-600 uppercase block mb-3">
                01 / INTRODUCTORY STATEMENTS
              </span>
              <h2 className="font-serif text-2xl font-light text-stone-900 mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-forest-700" />
                Introduction
              </h2>
              <p className="text-stone-600 leading-relaxed">
                WeCare Counseling (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our,&rdquo; or &ldquo;Company&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the &ldquo;Site&rdquo;).
              </p>
            </section>

            {/* Information We Collect */}
            <section className="border border-stone-300 bg-white p-8 sm:p-10 shadow-lg relative rounded-none">
              <span className="text-[9px] tracking-widest font-bold text-gold-600 uppercase block mb-3">
                02 / DATA ACQUISITION
              </span>
              <h2 className="font-serif text-2xl font-light text-stone-900 mb-6">Information We Collect</h2>
              <div className="space-y-6">
                <div className="border-l-2 border-gold-500 pl-4 py-1">
                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">Contact Form Information</h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">When you use our contact form, we collect your name, email address, phone number, and message. This information is processed through Formspree, a third-party service provider, and is used solely to respond to your inquiry.</p>
                </div>
                <div className="border-l-2 border-gold-500 pl-4 py-1">
                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">Automatic Information</h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">We may automatically collect certain information about your device, including browser type, operating system, and referring URLs. This data helps us improve our website and user experience.</p>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="border border-stone-300 bg-white p-8 sm:p-10 shadow-lg relative rounded-none">
              <span className="text-[9px] tracking-widest font-bold text-gold-600 uppercase block mb-3">
                03 / SYSTEM UTILIZATION
              </span>
              <h2 className="font-serif text-2xl font-light text-stone-900 mb-6">How We Use Your Information</h2>
              <ul className="space-y-4">
                {[
                  "To respond to your inquiries and provide information about our services",
                  "To send you updates about WeCare Counseling services (if you've requested contact)",
                  "To improve and optimize our website and services",
                  "To prevent fraudulent transactions and protect the security of our Site"
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-gold-600 font-serif text-lg leading-none mt-0.5">•</span>
                    <span className="text-stone-600 text-sm sm:text-base leading-relaxed">{text}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* HIPAA Compliance */}
            <section className="border border-stone-300 bg-white p-8 sm:p-10 shadow-lg relative rounded-none border-l-4 border-l-forest-700">
              <span className="text-[9px] tracking-widest font-bold text-gold-600 uppercase block mb-3">
                04 / FEDERAL HEALTH COMPLIANCE
              </span>
              <h2 className="font-serif text-2xl font-light text-stone-900 mb-6 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-forest-700" />
                HIPAA Compliance
              </h2>
              <p className="mb-4 text-stone-600 leading-relaxed">
                As a licensed clinical social worker providing therapy services, Gina Botshtein is required to comply with the Health Insurance Portability and Accountability Act (HIPAA). When you become a therapy client, all clinical information is protected under HIPAA regulations.
              </p>
              <p className="text-stone-600 leading-relaxed font-sans text-xs bg-stone-50 p-4 border border-stone-200">
                <strong className="text-stone-900">IMPORTANT NOTICE:</strong> This website and its general contact forms are not part of HIPAA-covered services. If you require HIPAA-protected communication, please call us directly at +1 (414) 617-2201 or email Gina@wccounseling.net to establish a confidential communication channel.
              </p>
            </section>

            {/* Third-Party Services */}
            <section className="border border-stone-300 bg-white p-8 sm:p-10 shadow-lg relative rounded-none">
              <span className="text-[9px] tracking-widest font-bold text-gold-600 uppercase block mb-3">
                05 / AUXILIARY CHANNELS
              </span>
              <h2 className="font-serif text-2xl font-light text-stone-900 mb-6">Third-Party Services</h2>
              <div className="space-y-6">
                <div className="border-l-2 border-gold-500 pl-4 py-1">
                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">Formspree</h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">We use Formspree to process contact form submissions. Formspree acts as a data processor and may store your information temporarily to deliver your message to us. Their privacy practices are governed by their own privacy policy.</p>
                </div>
                <div className="border-l-2 border-gold-500 pl-4 py-1">
                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">Hosting</h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">Our website is hosted on Namecheap&apos;s Stellar hosting. We may use analytics tools to understand how users interact with our Site. These are handled securely and in compliance with privacy regulations.</p>
                </div>
              </div>
            </section>

            {/* Your Privacy Rights */}
            <section className="border border-stone-300 bg-white p-8 sm:p-10 shadow-lg relative rounded-none">
              <span className="text-[9px] tracking-widest font-bold text-gold-600 uppercase block mb-3">
                06 / CLIENT ENTITLEMENTS
              </span>
              <h2 className="font-serif text-2xl font-light text-stone-900 mb-6">Your Privacy Rights</h2>
              <p className="mb-6 text-stone-600 leading-relaxed">
                You have the right to access, update, or delete the personal information we hold about you. If you would like to exercise any of these rights, please contact us at:
              </p>
              <div className="border-t border-b border-stone-200 py-6 my-4 grid sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] tracking-widest font-bold text-stone-400 uppercase block mb-1">CLINICAL PRACTICE</span>
                  <p className="font-serif text-lg font-bold text-stone-800">WeCare Counseling</p>
                  <p className="text-xs text-stone-500 font-sans mt-1">Gina Botshtein, LCSW</p>
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] tracking-widest font-bold text-stone-400 uppercase block">DIRECT ACCESS</span>
                  <a href="mailto:Gina@wccounseling.net" className="flex items-center gap-2 text-xs font-bold text-stone-700 hover:text-forest-700 transition-colors uppercase tracking-wider">
                    <Mail className="w-3.5 h-3.5 text-gold-600" /> Gina@wccounseling.net
                  </a>
                  <a href="tel:+14146172201" className="flex items-center gap-2 text-xs font-bold text-stone-700 hover:text-forest-700 transition-colors uppercase tracking-wider">
                    <Phone className="w-3.5 h-3.5 text-gold-600" /> +1 (414) 617-2201
                  </a>
                </div>
              </div>
            </section>

            {/* Security */}
            <section className="border border-stone-300 bg-white p-8 sm:p-10 shadow-lg relative rounded-none">
              <span className="text-[9px] tracking-widest font-bold text-gold-600 uppercase block mb-3">
                07 / CYBERNETIC INTEGRITY
              </span>
              <h2 className="font-serif text-2xl font-light text-stone-900 mb-6">Security of Your Information</h2>
              <p className="text-stone-600 leading-relaxed">
                We use administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security of your information.
              </p>
            </section>

            {/* Contact Us */}
            <section className="border border-stone-300 bg-forest-900 text-white p-8 sm:p-12 relative rounded-none">
              <span className="text-[9px] tracking-[0.2em] font-bold text-gold-400 uppercase block mb-3">
                08 / ESTABLISH CORRESPONDENCE
              </span>
              <h2 className="font-serif text-3xl font-light text-white mb-6">Contact Us</h2>
              <p className="mb-8 text-forest-200 text-sm sm:text-base leading-relaxed">
                If you have questions about this Privacy Policy or our privacy practices, please contact us directly:
              </p>
              <div className="grid sm:grid-cols-2 gap-6 border-t border-forest-800 pt-6">
                <div>
                  <span className="text-[9px] tracking-widest font-bold text-gold-400 uppercase block mb-2">SECURE PHONE</span>
                  <a href="tel:+14146172201" className="font-serif text-lg font-bold text-white hover:text-gold-400 transition-colors">
                    +1 (414) 617-2201
                  </a>
                </div>
                <div>
                  <span className="text-[9px] tracking-widest font-bold text-gold-400 uppercase block mb-2">CLINICAL EMAIL</span>
                  <a href="mailto:Gina@wccounseling.net" className="font-serif text-lg font-bold text-white hover:text-gold-400 transition-colors break-all">
                    Gina@wccounseling.net
                  </a>
                </div>
              </div>
            </section>

            {/* Updates */}
            <section className="text-center text-xs text-stone-500 pt-8 border-t border-stone-300">
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on the Site with an updated &ldquo;Last Updated&rdquo; date.
              </p>
            </section>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-forest-900 text-ivory-100 py-16 px-5 sm:px-8 border-t border-forest-800 relative z-10 mt-auto">
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

