'use client';

import React from 'react';
import Link from 'next/link';
import TherapyQuiz from '../components/TherapyQuiz';

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-cream-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-sage-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-charcoal-900 hover:text-sage-600 transition-colors">
            WeCare Counseling
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/#about" className="hidden md:inline text-sm font-medium text-charcoal-900 hover:text-sage-600 transition-colors">
              About
            </Link>
            <Link href="/#services" className="hidden md:inline text-sm font-medium text-charcoal-900 hover:text-sage-600 transition-colors">
              Services
            </Link>
            <Link href="/contact" className="text-sm font-medium text-sage-600 hover:text-sage-700 transition-colors border-b-2 border-transparent hover:border-sage-600 pb-1">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        <TherapyQuiz />
      </main>

      {/* Footer */}
      <footer className="bg-charcoal-900 text-cream-100 py-8 px-6 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-xl font-bold mb-2">WeCare Counseling</h3>
          <p className="text-cream-300 mb-4 text-sm">Gina Botshtein, LCSW</p>
          <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
            <a href="tel:+14146172201" className="hover:text-sage-300 transition-colors">
              +1 (414) 617-2201
            </a>
            <span className="text-cream-400">|</span>
            <a href="mailto:Gina@wccounseling.net" className="hover:text-sage-300 transition-colors">
              Gina@wccounseling.net
            </a>
          </div>
          <p className="text-sm text-cream-400">
            © {new Date().getFullYear()} WeCare Counseling. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
