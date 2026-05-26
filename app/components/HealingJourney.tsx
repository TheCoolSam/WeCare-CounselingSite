'use client';

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useSpring } from 'framer-motion';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';

interface JourneyStage {
  number: number;
  title: string;
  subtitle: string;
  description: string;
  approaches: string[];
  milestone: string;
}

const stages: JourneyStage[] = [
  {
    number: 1,
    title: "Exploration",
    subtitle: "Planting the Seed",
    description: "We begin by creating a secure, validating space where you can share your story. This initial phase is about understanding where you are, what brought you here, and establishing a trusted clinical alliance.",
    approaches: [
      "Initial clinical assessment",
      "Building trust and secure rapport",
      "Identifying behavioral patterns",
      "Co-designing therapeutic goals"
    ],
    milestone: "A felt sense of being deeply heard and understood, with clear objectives for your healing journey."
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
    milestone: "Tangible shifts in how you relate to stress, trigger points, and your inner dialogue."
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
    milestone: "Measurable improvements in daily emotional stability, confidence, and interpersonal connections."
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
    milestone: "Full emotional independence, feeling deeply equipped to navigate life with profound self-compassion and wisdom."
  }
];

function TimelineItem({ stage, index }: { stage: JourneyStage; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative md:grid md:grid-cols-12 md:gap-12 mb-20 md:mb-28 last:mb-0">
      
      {/* Central Circle Node (Animated Node) */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 md:-translate-x-1/2 z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, borderColor: '#e5e7eb' }}
          animate={isInView ? { scale: 1, borderColor: '#2b3c32' } : { scale: 0, borderColor: '#e5e7eb' }}
          transition={{ duration: 0.5, delay: 0.1, type: 'spring' }}
          className="w-10 h-10 border-2 bg-white text-stone-900 flex items-center justify-center rounded-full font-sans text-xs font-bold shadow-md flex-shrink-0"
        >
          0{stage.number}
        </motion.div>
      </div>

      {/* Content Column */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -30 : 30 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`pl-16 md:pl-0 md:col-span-5 ${isEven ? 'md:col-start-1 text-left md:text-right' : 'md:col-start-8'}`}
      >
        <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-stone-955 mb-4">
          {stage.title}
        </h3>
        <p className="text-sm sm:text-base text-stone-500 leading-relaxed font-sans font-normal max-w-lg md:ml-auto md:mr-0 group-even:md:mr-auto">
          {stage.description}
        </p>
      </motion.div>

      {/* Detail Column (Approaches & Milestones) */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 30 : -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 30 : -30 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`pl-16 md:pl-0 md:col-span-5 ${isEven ? 'md:col-start-8' : 'md:col-start-1'}`}
      >
        <div className="bg-white border border-stone-200/65 p-6 sm:p-8 rounded-2xl flex flex-col justify-between h-full relative">
          <div>
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-4 text-left">Focus Core Approaches</h4>
            <ul className="space-y-3 mb-6">
              {stage.approaches.map((approach, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-600 text-left">
                  <Check className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />
                  <span className="font-sans font-medium text-stone-650">{approach}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-stone-100 pt-5 mt-auto text-left">
            <span className="text-xs font-bold text-forest-750 uppercase tracking-wider block mb-2">Milestone Accomplished</span>
            <p className="text-xs sm:text-sm text-forest-800 leading-relaxed font-sans font-medium">
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="journey" className="py-24 sm:py-32 px-5 sm:px-8 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative" ref={containerRef}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 max-w-2xl mx-auto"
        >
          <span className="text-xs font-bold tracking-widest text-forest-600 uppercase mb-4 block">
            The Therapeutic Process
          </span>
          <h2 className="font-sans font-extrabold text-4xl sm:text-5xl text-stone-950 tracking-tight mb-4">
            Your Healing Journey
          </h2>
          <p className="text-base sm:text-lg text-stone-500 leading-relaxed font-sans font-normal">
            Therapy is not a straight diagnostic line — it is a continuous spiral of self-realization and healing. Here is the structured pathway we navigate together toward clinical restoration.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Background Hairline Track Line */}
          <div className="absolute left-11 md:left-1/2 top-4 bottom-4 w-[2px] bg-stone-100 md:-translate-x-1/2 pointer-events-none rounded-full" />

          {/* Active Growing Vine/Progress Line (Scroll-Linked) */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-11 md:left-1/2 top-4 bottom-4 w-[2px] bg-forest-600 md:-translate-x-1/2 origin-top pointer-events-none rounded-full"
          />

          {/* Staggered Alternating Timeline Items */}
          <div className="space-y-16 md:space-y-0">
            {stages.map((stage, index) => (
              <TimelineItem key={stage.number} stage={stage} index={index} />
            ))}
          </div>
        </div>

        {/* Minimalist Catalog CTA Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-24 border border-stone-200 bg-stone-50 p-8 sm:p-12 rounded-3xl text-center relative shadow-sm"
        >
          <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-stone-950 mb-4">
            Ready to Begin Restoration?
          </h3>
          <p className="text-sm text-stone-500 mb-8 max-w-xl mx-auto leading-relaxed font-sans">
            Every transformative journey starts with a singular step of courage. Let's walk that pathway together in an environment of complete clinical excellence and safety.
          </p>
          <div className="flex justify-center">
            <Link href="/contact">
              <motion.span
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-forest-600 hover:bg-forest-700 text-white font-bold rounded-full text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-forest-600/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Schedule Consultation
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
