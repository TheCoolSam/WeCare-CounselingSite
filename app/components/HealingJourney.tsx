'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useSpring } from 'framer-motion';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';

interface JourneyStage {
  number: number;
  title: string;
  description: string;
  approaches: string[];
  milestone: string;
}

const stages: JourneyStage[] = [
  {
    number: 1,
    title: "Exploration",
    description: "We start by creating a safe, comfortable space where you can share what's on your mind. This is about getting to know you — what brought you here, what you're hoping for, and how we can work together.",
    approaches: [
      "Getting to know your story",
      "Building trust together",
      "Understanding patterns",
      "Setting goals for therapy"
    ],
    milestone: "Feeling heard and understood, with a clear sense of direction."
  },
  {
    number: 2,
    title: "Connection",
    description: "As we get more comfortable together, we'll dig into the deeper stuff. You'll start to see how past experiences shape the way you think and feel today, and you'll pick up real tools to help you cope.",
    approaches: [
      "Exploring root causes",
      "Learning coping tools",
      "Working through difficult emotions",
      "Challenging unhelpful thought patterns"
    ],
    milestone: "New awareness of how your past shapes your present, with practical tools to cope."
  },
  {
    number: 3,
    title: "Growth",
    description: "This is where things start clicking. You're practicing new skills in your everyday life, trying things that used to feel hard, and noticing real change. It won't always be linear, and that's okay.",
    approaches: [
      "Practicing new skills daily",
      "Expanding your comfort zone",
      "Setting healthy boundaries",
      "Applying insights to real life"
    ],
    milestone: "Real improvements in your daily emotional well-being and relationships."
  },
  {
    number: 4,
    title: "Transformation",
    description: "The work you've done is becoming part of who you are. You're handling things differently now — not because you have to think about it, but because it comes naturally. We'll start preparing for your next chapter.",
    approaches: [
      "Recognizing your growth",
      "Preparing for future challenges",
      "Celebrating how far you've come",
      "Transitioning to independence"
    ],
    milestone: "Confidence and self-compassion to navigate life on your own terms."
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
            <span className="text-xs font-bold text-forest-700 block mb-2">What to expect</span>
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
            Therapy isn't a straight line — it's a process of discovery, growth, and real change. Here's what working together looks like.
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
            Ready to Start?
          </h3>
          <p className="text-base sm:text-lg text-stone-500 mb-8 max-w-xl mx-auto leading-relaxed font-sans font-normal">
            Every journey begins with a single step. I'd love to walk that path with you.
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
