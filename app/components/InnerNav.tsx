import Link from 'next/link';

export default function InnerNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-100 py-4">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex justify-between items-center">
        <Link href="/" className="font-sans font-extrabold text-lg sm:text-xl tracking-tight text-stone-900">
          WeCare <span className="text-forest-600 font-light">Counseling</span>
        </Link>
        <div className="flex items-center gap-4 sm:gap-6 text-[10px] sm:text-xs uppercase tracking-widest font-bold text-stone-600">
          <Link href="/" className="hover:text-forest-600 transition-colors">Home</Link>
          <Link href="/mequon-therapist" className="hidden md:inline hover:text-forest-600 transition-colors">Location</Link>
          <Link href="/faq" className="hover:text-forest-600 transition-colors">FAQ</Link>
          <Link href="/contact" className="text-forest-600 hover:text-forest-700 transition-colors">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
