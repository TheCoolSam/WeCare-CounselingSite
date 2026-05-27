'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useSpring } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface JourneyStage {
  number: number;
  description: string;
}

const stages: JourneyStage[] = [
  {
    number: 1,
    description: "We start by creating a safe, comfortable space where you can share what's on your mind. This is about getting to know you — what brought you here, what you're hoping for, and how we can work together."
  },
  {
    number: 2,
    description: "As we get more comfortable together, we'll dig into the deeper stuff. You'll start to see how past experiences shape the way you think and feel today, and you'll pick up real tools to help you cope."
  },
  {
    number: 3,
    description: "This is where things start clicking. You're practicing new skills in your everyday life, trying things that used to feel hard, and noticing real change. It won't always be linear, and that's okay."
  },
  {
    number: 4,
    description: "The work you've done is becoming part of who you are. You're handling things differently now — not because you have to think about it, but because it comes naturally. We'll start preparing for your next chapter."
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
      <div className="absolute left-5 top-0 w-9 h-9 z-10 flex items-center justify-center md:left-1/2 md:-translate-x-1/2">
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
        className={`pl-20 md:pl-0 md:col-span-5 ${isEven ? 'md:col-start-1 text-left md:text-right md:pr-12 md:ml-auto md:mr-0' : 'md:col-start-8 text-left md:pl-12 md:mr-auto md:ml-0'} mb-0`}
      >
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans font-light max-w-lg">
          {stage.description}
        </p>
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

  const adjustedHeight = typeof lineHeight === 'number' ? lineHeight - 18 : `calc(${lineHeight} - 18px)`;

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
          {/* Background Hairline Track Line (Unified absolute coordinate alignment) */}
          <div 
            style={{ height: adjustedHeight }}
            className="absolute left-[38px] top-[18px] w-[2px] -translate-x-1/2 md:left-1/2 pointer-events-none bg-stone-100 rounded-full" 
          />

          {/* Active Growing Vine/Progress Line (Scroll-Linked absolute coordinate alignment) */}
          <motion.div
            style={{ scaleY, height: adjustedHeight }}
            className="absolute left-[38px] top-[18px] w-[2px] -translate-x-1/2 md:left-1/2 origin-top pointer-events-none bg-forest-600 rounded-full"
          />

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
            <Link href="/contact" className="inline-block">
              <motion.div
                className="inline-flex items-center gap-2 px-6 py-3 bg-forest-600 hover:bg-forest-700 text-white font-semibold rounded-full text-xs uppercase tracking-widest transition-all cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Schedule a consultation
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

