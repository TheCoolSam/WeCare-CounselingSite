import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import InnerNav from '../components/InnerNav';
import SiteFooter from '../components/SiteFooter';
import { INSURANCE_PLANS, PRACTICE_LOCATION } from '../lib/constants';

export const metadata = {
  title: {
    absolute: 'Therapist in Milwaukee & Mequon, WI | Gina Botshtein, LCSW',
  },
  description:
    'Gina Botshtein, LCSW provides therapy in Milwaukee, Mequon, and nearby communities. Individual, couples, and family counseling in person and by telehealth.',
  alternates: {
    canonical: 'https://wccounseling.net/mequon-therapist/',
  },
};

export default function LocationPage() {
  return (
    <div className="min-h-screen bg-stone-50 relative flex flex-col justify-between">
      <InnerNav />
      <main className="pt-32 pb-24 px-5 sm:px-8 relative z-10 flex-grow">
        <article className="max-w-3xl mx-auto">
          <p className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase mb-4">
            WeCare Counseling LLC
          </p>
          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl text-stone-900 tracking-tight mb-6 text-balance">
            A therapist for Milwaukee, Mequon, and all around
          </h1>
          <p className="text-lg text-stone-600 leading-relaxed font-light mb-8">
            {PRACTICE_LOCATION.serviceAreaSentence}
          </p>
          <div className="space-y-6 text-base text-stone-600 leading-relaxed">
            <p>
              People nearby search for a therapist they can actually reach — someone close enough for in-person work, or available by video when the week is already full. Gina Botshtein, LCSW has spent more than 30 years supporting individuals, couples, and families through anxiety, depression, grief, caregiver stress, and the transitions that quietly wear people down.
            </p>
            <p>
              The practice is listed in Mequon, WI {PRACTICE_LOCATION.postalCode}, and Gina works with clients throughout Milwaukee and the North Shore. Sessions are available in person and through a HIPAA-compliant telehealth platform. She also offers therapy in Russian.
            </p>
            <p>
              If you are looking for a counselor in Milwaukee, Mequon, Thiensville, Cedarburg, Grafton, Whitefish Bay, Shorewood, Fox Point, Bayside, Glendale, or a neighboring community, you are in the right place. Reach out for a free consultation and we will see whether it is a good fit.
            </p>
          </div>

          <section className="mt-14 pt-10 border-t border-stone-200">
            <h2 className="font-sans font-extrabold text-2xl text-stone-900 tracking-tight mb-4">
              Insurance and scheduling
            </h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              In-network plans currently include {INSURANCE_PLANS.join(', ')}. For other carriers, a monthly statement can be provided for out-of-network reimbursement. Hours are by appointment, Monday through Friday, 9 AM to 6 PM CST.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm font-sans">
              <li>
                <Link href="/services/individual-therapy" className="text-forest-700 hover:text-forest-800 font-semibold">
                  Individual therapy
                </Link>
              </li>
              <li>
                <Link href="/services/couples-therapy" className="text-forest-700 hover:text-forest-800 font-semibold">
                  Couples therapy
                </Link>
              </li>
              <li>
                <Link href="/services/family-therapy" className="text-forest-700 hover:text-forest-800 font-semibold">
                  Family therapy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-forest-700 hover:text-forest-800 font-semibold">
                  Fees and FAQ
                </Link>
              </li>
            </ul>
          </section>

          <div className="mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-forest-600 hover:bg-forest-700 text-white font-bold text-xs uppercase tracking-widest rounded-full transition-colors"
            >
              Get in Touch
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
