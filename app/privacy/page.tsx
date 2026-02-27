'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-cream-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-sage-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-charcoal-900 hover:text-sage-600 transition-colors">
            WeCare Counseling
          </Link>
          <Link href="/" className="text-sm font-medium text-charcoal-900 hover:text-sage-600 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-charcoal-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-charcoal-700">
              Last updated: January 2026
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8 text-charcoal-800 leading-relaxed"
          >
            {/* Introduction */}
            <section className="bg-white rounded-2xl p-8 border border-sage-100 shadow-sm">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Introduction</h2>
              <p>
                WeCare Counseling ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the "Site").
              </p>
            </section>

            {/* Information We Collect */}
            <section className="bg-white rounded-2xl p-8 border border-sage-100 shadow-sm">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-2">Contact Form Information</h3>
                  <p>When you use our contact form, we collect your name, email address, phone number, and message. This information is processed through Formspree, a third-party service provider, and is used solely to respond to your inquiry.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-2">Therapy Quiz</h3>
                  <p>The therapy fit quiz does not collect personal information. Your responses are processed locally in your browser to generate personalized recommendations. No data is stored on our servers.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-2">Automatic Information</h3>
                  <p>We may automatically collect certain information about your device, including browser type, operating system, and referring URLs. This data helps us improve our website and user experience.</p>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="bg-white rounded-2xl p-8 border border-sage-100 shadow-sm">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">How We Use Your Information</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-sage-500 font-bold">•</span>
                  <span>To respond to your inquiries and provide information about our services</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sage-500 font-bold">•</span>
                  <span>To send you updates about WeCare Counseling services (if you've requested contact)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sage-500 font-bold">•</span>
                  <span>To improve and optimize our website and services</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sage-500 font-bold">•</span>
                  <span>To prevent fraudulent transactions and protect the security of our Site</span>
                </li>
              </ul>
            </section>

            {/* HIPAA Compliance */}
            <section className="bg-white rounded-2xl p-8 border border-sage-100 shadow-sm">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">HIPAA Compliance</h2>
              <p className="mb-4">
                As a licensed clinical social worker providing therapy services, Gina Botshtein is required to comply with the Health Insurance Portability and Accountability Act (HIPAA). When you become a therapy client, all clinical information is protected under HIPAA regulations.
              </p>
              <p>
                This website and its general contact forms are not part of HIPAA-covered services. If you require HIPAA-protected communication, please call us directly at +1 (414) 617-2201 or email Gina@wccounseling.net to establish a confidential communication channel.
              </p>
            </section>

            {/* Third-Party Services */}
            <section className="bg-white rounded-2xl p-8 border border-sage-100 shadow-sm">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Third-Party Services</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-2">Formspree</h3>
                  <p>We use Formspree to process contact form submissions. Formspree acts as a data processor and may store your information temporarily to deliver your message to us. Their privacy practices are governed by their own privacy policy.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-2">Next.js & Vercel</h3>
                  <p>Our website is hosted on Namecheap's Stellar hosting. We may use analytics tools to understand how users interact with our Site. These are handled securely and in compliance with privacy regulations.</p>
                </div>
              </div>
            </section>

            {/* Your Privacy Rights */}
            <section className="bg-white rounded-2xl p-8 border border-sage-100 shadow-sm">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Your Privacy Rights</h2>
              <p className="mb-4">
                You have the right to access, update, or delete the personal information we hold about you. If you would like to exercise any of these rights, please contact us at:
              </p>
              <div className="bg-sage-50 p-4 rounded-lg">
                <p className="font-semibold text-charcoal-900 mb-2">WeCare Counseling</p>
                <p>Email: Gina@wccounseling.net</p>
                <p>Phone: +1 (414) 617-2201</p>
              </div>
            </section>

            {/* Security */}
            <section className="bg-white rounded-2xl p-8 border border-sage-100 shadow-sm">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Security of Your Information</h2>
              <p>
                We use administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security of your information.
              </p>
            </section>

            {/* Contact Us */}
            <section className="bg-gradient-to-br from-sage-50 to-cream-50 rounded-2xl p-8 border border-sage-200 shadow-sm">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Contact Us</h2>
              <p className="mb-6">
                If you have questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="space-y-3">
                <p>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:Gina@wccounseling.net" className="text-sage-600 hover:text-sage-700">
                    Gina@wccounseling.net
                  </a>
                </p>
                <p>
                  <strong>Phone:</strong>{' '}
                  <a href="tel:+14146172201" className="text-sage-600 hover:text-sage-700">
                    +1 (414) 617-2201
                  </a>
                </p>
              </div>
            </section>

            {/* Updates */}
            <section className="text-center text-sm text-charcoal-600 pt-8">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on the Site with an updated "Last Updated" date.
              </p>
            </section>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-charcoal-900 text-cream-100 py-8 px-6 border-t border-charcoal-800">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-xl font-bold mb-2">WeCare Counseling</h3>
          <p className="text-cream-300 mb-4 text-sm">Gina Botshtein, LCSW</p>
          <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
            <a href="mailto:Gina@wccounseling.net" className="hover:text-sage-300 transition-colors">
              Gina@wccounseling.net
            </a>
            <span className="text-cream-400">|</span>
            <a href="tel:+14146172201" className="hover:text-sage-300 transition-colors">
              +1 (414) 617-2201
            </a>
          </div>
          <p className="text-xs text-cream-400">
            © {new Date().getFullYear()} WeCare Counseling. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
