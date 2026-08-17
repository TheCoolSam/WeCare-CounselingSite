import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import InnerNav from '../../components/InnerNav';
import SiteFooter from '../../components/SiteFooter';
import { PRACTICE_LOCATION } from '../../lib/constants';

export const metadata = {
  title: {
    absolute: 'Individual Therapy in Milwaukee & Mequon | Anxiety, Depression, Grief',
  },
  description:
    'One-on-one therapy with Gina Botshtein, LCSW for anxiety, depression, grief, and life transitions. In person and telehealth for Milwaukee, Mequon, and nearby communities.',
  alternates: {
    canonical: 'https://wccounseling.net/services/individual-therapy/',
  },
};

export default function IndividualTherapyPage() {
  return (
    <div className="min-h-screen bg-stone-50 relative flex flex-col justify-between">
      <InnerNav />
      <main className="pt-32 pb-24 px-5 sm:px-8 relative z-10 flex-grow">
        <article className="max-w-3xl mx-auto">
          <p className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase mb-4">
            Individual Therapy
          </p>
          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl text-stone-900 tracking-tight mb-6 text-balance">
            One-on-one therapy in Milwaukee, Mequon, and nearby
          </h1>
          <div className="space-y-6 text-base text-stone-600 leading-relaxed">
            <p>
              Individual therapy is a private space to slow down, make sense of what you are carrying, and build tools that actually fit your life. Gina works with adults and older teens around anxiety, depression, grief, caregiver stress, and the quieter strain of a life transition.
            </p>
            <p>
              Sessions are strength-based and collaborative. That can mean cognitive and body-based methods, trauma-informed care when it is needed, and a pace that does not rush you past what still hurts. You do not need to be in crisis to start.
            </p>
            <p>
              {PRACTICE_LOCATION.serviceAreaSentence} Many people choose a mix of in-person and video sessions depending on the week.
            </p>
          </div>
          <ul className="mt-10 space-y-3 text-sm text-stone-700 font-sans">
            <li>Personalized treatment plans</li>
            <li>Evidence-based techniques, including CBT and trauma-informed work</li>
            <li>Flexible in-person or online scheduling</li>
            <li>Sessions available in English and Russian</li>
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
