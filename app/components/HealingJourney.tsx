'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
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

function SproutingLeaf({ x, y, rotate, delay, animate }: { x: number; y: number; rotate: number; delay: number; animate: boolean }) {
  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={animate ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 14, delay }}
      style={{ originX: `${x}px`, originY: `${y}px` }}
    >
      {/* Organic leaf body with natural curves and asymmetry */}
      <path
        d={`M ${x} ${y} c 6 -18, 28 -14, 26 0 c 2 8, 8 16, 2 22 c -8 8, -20 6, -26 -4 c -4 -8, -6 -16, -2 -18`}
        fill="#3c5144"
        className="opacity-85"
        transform={`rotate(${rotate}, ${x}, ${y})`}
      />
      {/* Center vein with slight curve */}
      <path
        d={`M ${x} ${y} q 6 8, 4 20`}
        stroke="#2b3c32"
        strokeWidth="0.8"
        fill="none"
        className="opacity-60"
        transform={`rotate(${rotate}, ${x}, ${y})`}
      />
      {/* Secondary vein branch */}
      <path
        d={`M ${x + 8} ${y + 6} q 4 6, 2 14`}
        stroke="#2b3c32"
        strokeWidth="0.5"
        fill="none"
        className="opacity-40"
        transform={`rotate(${rotate}, ${x}, ${y})`}
      />
    </motion.g>
  );
}

function TimelineItem({ 
  stage, 
  index, 
  nodeRef,
  animate
}: { 
  stage: JourneyStage; 
  index: number;
  nodeRef?: (node: HTMLDivElement | null) => void;
  animate: boolean;
}) {
  const isEven = index % 2 === 0;
  const baseDelay = index * 0.4;

  return (
    <div className="relative md:grid md:grid-cols-12 md:gap-12 mb-16 md:mb-24 last:mb-0">
      
      {/* Central Circle Node container with callback ref */}
      <div
        ref={nodeRef}
        className="absolute left-6 top-0 w-9 h-9 z-10 flex items-center justify-center md:left-1/2 md:-translate-x-1/2"
      >
        <motion.div
          initial={{ scale: 0, borderColor: '#e5e3df' }}
          animate={animate ? { scale: 1, borderColor: '#2b3c32' } : { scale: 0, borderColor: '#e5e3df' }}
          transition={{ duration: 0.5, delay: baseDelay, type: 'spring' }}
          className="w-9 h-9 border-2 bg-white text-stone-900 flex items-center justify-center rounded-full font-sans text-xs font-bold shadow-sm"
        >
          0{stage.number}
        </motion.div>
      </div>

      {/* Content Column (Fades in dynamically when the vine has grown to this point) */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -15 : 15 }}
        animate={animate ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -15 : 15 }}
        transition={{ duration: 0.6, delay: baseDelay + 0.15, ease: [0.22, 1, 0.36, 1] }}
        className={`pl-24 md:pl-0 md:col-span-5 ${isEven ? 'md:col-start-1 text-left md:text-right md:pr-12 md:ml-auto md:mr-0' : 'md:col-start-8 text-left md:pl-12 md:mr-auto md:ml-0'} mb-0`}
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
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const [nodeYPositions, setNodeYPositions] = useState<number[]>([]);
  const [containerWidth, setContainerWidth] = useState(1024);

  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-120px" });

  useEffect(() => {
    const updateDimensions = () => {
      if (timelineRef.current) {
        setContainerWidth(timelineRef.current.clientWidth);
        
        const timelineRect = timelineRef.current.getBoundingClientRect();
        const positions = stages.map((_, index) => {
          const node = nodeRefs.current[index];
          if (node) {
            const rect = node.getBoundingClientRect();
            return rect.top - timelineRect.top + rect.height / 2;
          }
          return 18 + index * 180; // fallback calculation
        });
        setNodeYPositions(positions);
      }
    };

    updateDimensions();
    const rafId = requestAnimationFrame(updateDimensions);

    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const isDesktop = containerWidth >= 768;
  const centerX = isDesktop ? containerWidth / 2 : 48;

  // Generate the S-curved winding SVG vine path dynamically in pixels
  let pathD = '';
  const leaves: { x: number; y: number; rotate: number; delay: number }[] = [];

  if (nodeYPositions.length > 0) {
    pathD = `M ${centerX} ${nodeYPositions[0]}`;

    for (let i = 0; i < nodeYPositions.length - 1; i++) {
      const y0 = nodeYPositions[i];
      const y1 = nodeYPositions[i + 1];
      const h = y1 - y0;
      const dir = isDesktop ? (i % 2 === 0 ? -1 : 1) : 1;
      const offset = isDesktop ? 64 : 24;

      const cp1x = centerX + dir * offset;
      const cp1y = y0 + h * 0.35;
      const cp2x = centerX + dir * offset;
      const cp2y = y0 + h * 0.65;

      pathD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${centerX} ${y1}`;

      // Calculate curve peak for leaf placement
      const midY = (y0 + y1) / 2;
      const midX = centerX + dir * offset;

      // Sprout leaf clusters matching drawing speed
      leaves.push({
        x: midX,
        y: midY,
        rotate: dir === 1 ? 35 : -145,
        delay: i * 0.4 + 0.2
      });
      leaves.push({
        x: midX,
        y: midY,
        rotate: dir === 1 ? -15 : -195,
        delay: i * 0.4 + 0.3
      });
    }
  }

  return (
    <section id="journey" className="py-24 sm:py-32 px-5 sm:px-8 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative" ref={containerRef}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
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
          
          {/* Organic Winding SVG Vine */}
          {nodeYPositions.length > 0 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              {/* Background Hairline Winding Vine */}
              <path
                d={pathD}
                fill="none"
                stroke="#e5e3df" // stone-200 theme grey
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Active Growing Winding Vine - duration drawing */}
              <motion.path
                d={pathD}
                fill="none"
                stroke="#3c5144" // forest-600 theme sage green
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isTimelineInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
              />

              {/* Sprouting Organic Leaves */}
              {leaves.map((leaf, index) => (
                <SproutingLeaf
                  key={index}
                  x={leaf.x}
                  y={leaf.y}
                  rotate={leaf.rotate}
                  delay={leaf.delay}
                  animate={isTimelineInView}
                />
              ))}
            </svg>
          )}

          {/* Staggered Alternating Timeline Items */}
          <div className="space-y-0 relative z-10">
            {stages.map((stage, index) => (
              <TimelineItem 
                key={stage.number} 
                stage={stage} 
                index={index} 
                animate={isTimelineInView}
                nodeRef={(el) => {
                  nodeRefs.current[index] = el;
                }}
              />
            ))}
          </div>
        </div>

        {/* Minimalist Catalog CTA Section (Flat, Borderless, Apple-Grade) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mt-28 text-center max-w-2xl mx-auto relative"
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
