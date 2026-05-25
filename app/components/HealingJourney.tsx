'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

interface JourneyStage {
  number: number;
  title: string;
  subtitle: string;
  description: string;
  approaches: string[];
  milestone: string;
  emoji: string;
}

const stages: JourneyStage[] = [
  {
    number: 1,
    title: "Exploration",
    subtitle: "Planting the Seed",
    description: "We begin by creating a secure, judgment-free space where you can share your story. This initial phase is about understanding where you are, what brought you here, and establishing a trusted clinical alliance.",
    approaches: [
      "Initial clinical assessment",
      "Building trust and secure rapport",
      "Identifying behavioral patterns",
      "Co-designing therapeutic goals"
    ],
    milestone: "A felt sense of being deeply heard and understood, with clear objectives for your healing journey.",
    emoji: "🌱",
  },
  {
    number: 2,
    title: "Connection",
    subtitle: "Taking Root",
    description: "As trust deepens, we venture into the core of your challenges. You'll cultivate deep self-awareness around how past narratives influence your present behaviors and learn active somatic/cognitive tools.",
    approaches: [
      "Exploring core formative causes",
      "Somatic coping strategies",
      "Challenging rigid belief cycles",
      "Processing difficult emotions safely"
    ],
    milestone: "Tangible shifts in how you relate to stress, trigger points, and your inner dialogue.",
    emoji: "🌿",
  },
  {
    number: 3,
    title: "Growth",
    subtitle: "Reaching Upward",
    description: "This is the active phase of integration. You are daily practicing new skills, expanding comfort zones, and establishing healthy relationship structures. Growth during this stage feels nonlinear and dynamic.",
    approaches: [
      "Implementing new behavioral choices",
      "Building emotional resilience",
      "Strengthening relational boundaries",
      "Integrating insights in real time"
    ],
    milestone: "Measurable improvements in daily emotional stability, confidence, and interpersonal connections.",
    emoji: "🌳",
  },
  {
    number: 4,
    title: "Transformation",
    subtitle: "Bearing Fruit",
    description: "You have integrated the therapeutic process into your identity. The self-awareness and clinical tools you have gained are now second-nature, transitioning our relationship toward completion.",
    approaches: [
      "Consolidating personal growth gains",
      "Planning for future vulnerabilities",
      "Celebrating narrative transformation",
      "Transitioning to clinical maintenance"
    ],
    milestone: "Full emotional independence, feeling deeply equipped to navigate life with profound self-compassion and wisdom.",
    emoji: "🍃",
  }
];

function TimelineItem({ stage, index }: { stage: JourneyStage; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative md:grid md:grid-cols-12 md:gap-12 mb-16 md:mb-24 last:mb-0">
      
      {/* Central Connector Circle & Stem */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 md:-translate-x-1/2 z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
          className="w-10 h-10 border-2 border-gold-400 bg-ivory-50 text-gold-600 flex items-center justify-center rounded-full font-serif text-sm font-bold shadow-md flex-shrink-0"
        >
          0{stage.number}
        </motion.div>
      </div>

      {/* Content Panel (Asymmetric Placement) */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -40 : 40 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className={`pl-16 md:pl-0 md:col-span-5 ${isEven ? 'md:col-start-1 text-left md:text-right' : 'md:col-start-8'}`}
      >
        <span className="text-[10px] tracking-[0.25em] font-bold text-gold-600 uppercase mb-2 block">
          STAGE {stage.number} / {stage.subtitle}
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-4 flex items-center gap-3 justify-start md:justify-end md:group-even:justify-start">
          {!isEven && <span className="text-2xl">{stage.emoji}</span>}
          {stage.title}
          {isEven && <span className="text-2xl">{stage.emoji}</span>}
        </h3>
        <p className="text-stone-500 leading-relaxed text-sm sm:text-base font-sans mb-6">
          {stage.description}
        </p>
      </motion.div>

      {/* Approaches & Milestones Panel (Alternating Column) */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 40 : -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 40 : -40 }}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className={`pl-16 md:pl-0 md:col-span-5 ${isEven ? 'md:col-start-8' : 'md:col-start-1'}`}
      >
        <div className="border border-stone-200 bg-white p-6 sm:p-8 flex flex-col justify-between h-full relative">
          {/* Faded background number for print catalog aesthetic */}
          <span className="font-serif text-8xl font-light text-forest-50/70 absolute bottom-2 right-4 pointer-events-none select-none">
            0{stage.number}
          </span>

          <div className="relative z-10">
            <h4 className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-4">Focus Core Approaches</h4>
            <ul className="space-y-3 mb-6">
              {stage.approaches.map((approach, i) => (
                <li key={i} className="flex items-start gap-3 text-xs text-stone-600">
                  <span className="w-3.5 h-3.5 text-gold-500 mt-0.5 flex-shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="font-sans font-medium text-left">{approach}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-stone-100 pt-5 mt-auto relative z-10">
            <span className="text-[9px] font-bold text-forest-700 uppercase tracking-widest block mb-2">Milestone Accomplished</span>
            <p className="text-xs text-forest-800 leading-relaxed font-sans font-medium text-left">
              {stage.milestone}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function HealingJourney() {
  const containerRef = useRef(null);

  return (
    <section id="journey" className="py-24 px-5 sm:px-8 bg-ivory-50 relative overflow-hidden border-b border-stone-200/60">
      {/* Subtle fine print-catalog grid lines */}
      <div className="absolute inset-0 editorial-grid opacity-25 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative" ref={containerRef}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <span className="text-[10px] tracking-[0.3em] font-bold text-gold-600 uppercase mb-3 block">
            THE METHODOLOGY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-stone-900 mb-6">
            Your Healing <span className="italic text-forest-700 font-normal">Journey</span>
          </h2>
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed font-sans">
            Therapy is not a straight diagnostic line — it is a continuous spiral of self-realization and healing. Here is the structured pathway we navigate together toward clinical restoration.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Center Hairline Stem */}
          <div className="absolute left-11 md:left-1/2 top-4 bottom-4 w-[1px] bg-stone-300 md:-translate-x-1/2 pointer-events-none" />

          {/* Staggered Alternating Timeline Items */}
          <div className="space-y-16 md:space-y-0">
            {stages.map((stage, index) => (
              <TimelineItem key={stage.number} stage={stage} index={index} />
            ))}
          </div>
        </div>

        {/* Minimalist Catalog Footer Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-24 border border-stone-300 bg-white p-8 sm:p-12 text-center relative"
        >
          <h3 className="font-serif text-2xl sm:text-3xl font-light text-stone-900 mb-4">
            Ready to Begin <span className="italic text-forest-700 font-normal">Restoration?</span>
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 mb-8 max-w-2xl mx-auto leading-relaxed font-sans">
            Every transformative journey starts with a singular step of courage. Let's walk that pathway together in an environment of complete clinical excellence and safety.
          </p>
          <div className="flex justify-center">
            <Link href="/contact">
              <motion.span
                className="inline-block px-8 py-4 border border-forest-600 bg-forest-700 hover:bg-forest-600 text-white font-bold uppercase tracking-widest text-xs transition-colors duration-300 cursor-pointer shadow-lg shadow-forest-900/10"
                whileTap={{ scale: 0.98 }}
              >
                Schedule Consultation
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
