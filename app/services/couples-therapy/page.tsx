import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import InnerNav from '../../components/InnerNav';
import SiteFooter from '../../components/SiteFooter';
import { PRACTICE_LOCATION } from '../../lib/constants';

export const metadata = {
  title: {
    absolute: 'Couples Therapy in Milwaukee & Mequon | WeCare Counseling',
  },
  description:
    'Couples counseling with Gina Botshtein, LCSW to rebuild communication, trust, and intimacy. Serving Milwaukee, Mequon, and nearby communities in person and online.',
  alternates: {
    canonical: 'https://wccounseling.net/services/couples-therapy/',
  },
};

export default function CouplesTherapyPage() {
  return (
    <div className="min-h-screen bg-stone-50 relative flex flex-col justify-between">
      <InnerNav />
      <main className="pt-32 pb-24 px-5 sm:px-8 relative z-10 flex-grow">
        <article className="max-w-3xl mx-auto">
          <p className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase mb-4">
            Couples Therapy
          </p>
          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl text-stone-900 tracking-tight mb-6 text-balance">
            Couples counseling for Milwaukee and Mequon
          </h1>
          <div className="space-y-6 text-base text-stone-600 leading-relaxed">
            <p>
              Recurring arguments, distance, or a hard season in a partnership can leave two people talking past each other. Couples therapy offers a structured, respectful place to hear what is actually going on and to practice new ways of staying connected.
            </p>
            <p>
              Gina helps couples improve communication, interrupt conflict cycles, rebuild trust, and navigate transitions such as parenting, caregiving, or a shift in the relationship itself. The work is practical. You leave with language and habits you can use at home, not just insight from the hour.
            </p>
            <p>
              {PRACTICE_LOCATION.serviceAreaSentence} Partners can join in person or by secure video when schedules do not line up.
            </p>
          </div>
          <ul className="mt-10 space-y-3 text-sm text-stone-700 font-sans">
            <li>Communication skills that hold up outside the session</li>
            <li>Help with recurring conflict and rebuilding intimacy</li>
            <li>Support through life transitions as a pair</li>
            <li>A calm, non-judgmental space for both people</li>
          </ul>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-forest-600 hover:bg-forest-700 text-white font-bold text-xs uppercase tracking-widest rounded-full transition-colors"
            >
              Schedule a consultation
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/mequon-therapist" className="inline-flex items-center text-sm font-semibold text-forest-700 hover:text-forest-800">
              Where Gina practices
            </Link>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
