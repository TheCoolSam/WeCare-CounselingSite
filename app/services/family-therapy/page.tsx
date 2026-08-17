import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import InnerNav from '../../components/InnerNav';
import SiteFooter from '../../components/SiteFooter';
import { PRACTICE_LOCATION } from '../../lib/constants';

export const metadata = {
  title: {
    absolute: 'Family Therapy in Milwaukee & Mequon | Children, Teens & Families',
  },
  description:
    'Family counseling with Gina Botshtein, LCSW for children ages 8+, teens, parents, and caregivers in Milwaukee, Mequon, and nearby communities.',
  alternates: {
    canonical: 'https://wccounseling.net/services/family-therapy/',
  },
};

export default function FamilyTherapyPage() {
  return (
    <div className="min-h-screen bg-stone-50 relative flex flex-col justify-between">
      <InnerNav />
      <main className="pt-32 pb-24 px-5 sm:px-8 relative z-10 flex-grow">
        <article className="max-w-3xl mx-auto">
          <p className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase mb-4">
            Family Therapy
          </p>
          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl text-stone-900 tracking-tight mb-6 text-balance">
            Family support across Milwaukee, Mequon, and nearby
          </h1>
          <div className="space-y-6 text-base text-stone-600 leading-relaxed">
            <p>
              Families get stuck in patterns that no one chose on purpose. Parenting stress, a child who is struggling, a teen pulling away, or the weight of caregiving can make the whole household feel tense. Family therapy looks at those patterns together and builds communication that is easier to live with.
            </p>
            <p>
              Gina sees individuals from age 8 through older adulthood, and she works with couples and families using family-systems and solution-focused approaches. Caregivers and single parents are welcome. Sessions can include the people who need to be in the room, or start with one person and widen from there.
            </p>
            <p>
              {PRACTICE_LOCATION.serviceAreaSentence}
            </p>
          </div>
          <ul className="mt-10 space-y-3 text-sm text-stone-700 font-sans">
            <li>Children (8+), teens, adults, and elders</li>
            <li>Parenting support and family dynamics</li>
            <li>Caregiver stress and life transitions</li>
            <li>In-person and telehealth options</li>
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
