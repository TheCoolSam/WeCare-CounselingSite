'use client';

import React, { useRef, useState, useEffect } from 'react';
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

function TimelineItem({ 
  stage, 
  index, 
  nodeRef 
}: { 
  stage: JourneyStage; 
  index: number;
  nodeRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative md:grid md:grid-cols-12 md:gap-12 mb-16 md:mb-24 last:mb-0">
      
      {/* Central Circle Node (Unified mobile gutter centering) */}
      <div className="absolute left-5 w-9 md:left-1/2 top-0 bottom-0 md:-translate-x-1/2 z-10 flex justify-center">
        <motion.div
          ref={nodeRef}
          initial={{ scale: 0, borderColor: '#e5e3df' }}
          animate={isInView ? { scale: 1, borderColor: '#2b3c32' } : { scale: 0, borderColor: '#e5e3df' }}
          transition={{ duration: 0.5, delay: 0.1, type: 'spring' }}
          className="w-9 h-9 border-2 bg-white text-stone-900 flex items-center justify-center rounded-full font-sans text-xs font-bold shadow-sm"
        >
          0{stage.number}
        </motion.div>
      </div>

      {/* Content Column */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -25 : 25 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -25 : 25 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`pl-20 md:pl-0 md:col-span-5 ${isEven ? 'md:col-start-1 text-left md:text-right' : 'md:col-start-8'} mb-6 md:mb-0`}
      >
        <span className="font-serif italic text-forest-700 text-sm sm:text-base block mb-1">
          {stage.subtitle}
        </span>
        <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-stone-900 mb-4 tracking-tight">
          {stage.title}
        </h3>
        <p className="text-sm sm:text-base text-stone-500 leading-relaxed font-sans font-normal max-w-lg md:ml-auto md:mr-0 group-even:md:mr-auto">
          {stage.description}
        </p>
      </motion.div>

      {/* Detail Column (Approaches & Milestones) */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 25 : -25 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 25 : -25 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`pl-20 md:pl-0 md:col-span-5 ${isEven ? 'md:col-start-8' : 'md:col-start-1'}`}
      >
        <div className="flex flex-col justify-between h-full relative text-left">
          <div>
            <h4 className="text-sm font-semibold text-stone-900 mb-3 text-left">Key approaches</h4>
            <ul className="space-y-3 mb-6">
              {stage.approaches.map((approach, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-600 text-left">
                  <span className="text-forest-600 font-medium select-none mt-0.5">•</span>
                  <span className="font-sans font-medium text-stone-600">{approach}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-stone-200/60 pt-5 mt-auto text-left">
            <span className="text-xs font-bold text-forest-700 block mb-2">Clinical milestone</span>
            <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-sans font-normal">
              {stage.milestone}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function HealingJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lastNodeRef = useRef<HTMLDivElement>(null);
  
  const [lineHeight, setLineHeight] = useState<number | string>('100%');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const updateLineHeight = () => {
      if (timelineRef.current && lastNodeRef.current) {
        const timelineRect = timelineRef.current.getBoundingClientRect();
        const nodeRect = lastNodeRef.current.getBoundingClientRect();
        // Distance from top of timeline block to center of last node circle
        const relativeTop = nodeRect.top - timelineRect.top + nodeRect.height / 2;
        setLineHeight(relativeTop);
      }
    };

    updateLineHeight();
    const rafId = requestAnimationFrame(updateLineHeight);

    window.addEventListener('resize', updateLineHeight);
    return () => {
      window.removeEventListener('resize', updateLineHeight);
      cancelAnimationFrame(rafId);
    };
  }, []);

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
          <h2 className="font-sans font-extrabold text-4xl sm:text-5xl text-stone-900 tracking-tight mb-4">
            Your Healing Journey
          </h2>
          <p className="text-base sm:text-lg text-stone-500 leading-relaxed font-sans font-normal">
            Therapy is not a straight diagnostic line — it is a continuous spiral of self-realization and healing. Here is the structured pathway we navigate together toward clinical restoration.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative" ref={timelineRef}>
          {/* Background Hairline Track Line (Unified flex alignment) */}
          <div 
            style={{ height: lineHeight }}
            className="absolute left-5 w-9 md:left-1/2 top-4 flex justify-center md:-translate-x-1/2 pointer-events-none" 
          >
            <div className="w-[2px] bg-stone-100 h-full rounded-full" />
          </div>

          {/* Active Growing Vine/Progress Line (Scroll-Linked flex alignment) */}
          <motion.div
            style={{ scaleY, height: lineHeight }}
            className="absolute left-5 w-9 md:left-1/2 top-4 flex justify-center md:-translate-x-1/2 origin-top pointer-events-none"
          >
            <div className="w-[2px] bg-forest-600 h-full rounded-full" />
          </motion.div>

          {/* Staggered Alternating Timeline Items */}
          <div className="space-y-0">
            {stages.map((stage, index) => (
              <TimelineItem 
                key={stage.number} 
                stage={stage} 
                index={index} 
                nodeRef={index === stages.length - 1 ? lastNodeRef : undefined}
              />
            ))}
          </div>
        </div>

        {/* Minimalist Catalog CTA Section (Flat, Borderless, Apple-Grade) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-28 text-center max-w-2xl mx-auto"
        >
          <h3 className="font-sans font-extrabold text-3xl sm:text-4xl text-stone-900 mb-4 tracking-tight">
            Ready to Begin Restoration?
          </h3>
          <p className="text-base sm:text-lg text-stone-500 mb-8 max-w-xl mx-auto leading-relaxed font-sans font-normal">
            Every transformative journey starts with a singular step of courage. Let's walk that pathway together in an environment of complete clinical excellence and safety.
          </p>
          <div className="flex justify-center">
            <Link href="/contact">
              <motion.span
                className="inline-flex items-center gap-2 px-6 py-3 bg-forest-600 hover:bg-forest-700 text-white font-semibold rounded-full text-xs uppercase tracking-widest transition-all cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Schedule a consultation
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
