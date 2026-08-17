import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';
import { CONTACT_INFO, PRACTICE_LOCATION } from '../lib/constants';

export default function SiteFooter() {
  return (
    <footer className="bg-forest-900 text-stone-200 py-16 px-5 sm:px-8 border-t border-forest-800 relative z-10 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-sans font-extrabold text-lg text-white mb-2 tracking-tight">
              WECARE COUNSELING
            </h3>
            <p className="text-xs tracking-widest text-gold-400 font-bold uppercase mb-4">
              Gina Botshtein, LCSW
            </p>
            <p className="text-xs text-forest-200/80 leading-relaxed font-sans max-w-sm font-normal">
              Therapy for individuals, couples, and families in {PRACTICE_LOCATION.shortLine}.
            </p>
            <p className="text-xs text-forest-200/70 leading-relaxed font-sans mt-3">
              {PRACTICE_LOCATION.locality}, {PRACTICE_LOCATION.region} {PRACTICE_LOCATION.postalCode}
            </p>
          </div>
          <div>
            <h4 className="text-xs tracking-widest font-bold text-white uppercase mb-5">Pages</h4>
            <div className="space-y-3 font-sans text-xs">
              <Link href="/" className="block text-forest-200 hover:text-gold-400 transition-colors font-semibold uppercase tracking-wider">Home</Link>
              <Link href="/faq" className="block text-forest-200 hover:text-gold-400 transition-colors font-semibold uppercase tracking-wider">FAQ</Link>
              <Link href="/contact" className="block text-forest-200 hover:text-gold-400 transition-colors font-semibold uppercase tracking-wider">Contact</Link>
              <Link href="/mequon-therapist" className="block text-forest-200 hover:text-gold-400 transition-colors font-semibold uppercase tracking-wider">Milwaukee &amp; Mequon</Link>
              <Link href="/privacy" className="block text-forest-200 hover:text-gold-400 transition-colors font-semibold uppercase tracking-wider">Privacy Policy</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs tracking-widest font-bold text-white uppercase mb-5">Services</h4>
            <div className="space-y-3 font-sans text-xs">
              <Link href="/services/individual-therapy" className="block text-forest-200 hover:text-gold-400 transition-colors font-semibold uppercase tracking-wider">Individual Therapy</Link>
              <Link href="/services/couples-therapy" className="block text-forest-200 hover:text-gold-400 transition-colors font-semibold uppercase tracking-wider">Couples Therapy</Link>
              <Link href="/services/family-therapy" className="block text-forest-200 hover:text-gold-400 transition-colors font-semibold uppercase tracking-wider">Family Therapy</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs tracking-widest font-bold text-white uppercase mb-5">Direct Contact</h4>
            <div className="space-y-3 font-sans text-xs">
              <a href={CONTACT_INFO.phoneHref} className="flex items-center gap-2.5 text-forest-200 hover:text-gold-400 transition-colors font-semibold tracking-wide">
                <Phone className="w-3.5 h-3.5 text-gold-400" /> {CONTACT_INFO.phone}
              </a>
              <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-2.5 text-forest-200 hover:text-gold-400 transition-colors font-semibold tracking-wide break-all">
                <Mail className="w-3.5 h-3.5 text-gold-400" /> {CONTACT_INFO.email}
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-forest-800 pt-8 text-center flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] tracking-wider font-bold text-forest-300 uppercase">
          <p>© {new Date().getFullYear()} WeCare Counseling. All rights reserved.</p>
          <Link href="/privacy" className="text-[9px] text-forest-400 hover:text-gold-400 transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
