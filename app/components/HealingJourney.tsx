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
    description: "We begin by creating a safe, judgment-free space where you can share your story. This is about understanding where you are, what brought you here, and what you hope to achieve.",
    approaches: [
      "Initial assessment and goal-setting",
      "Building trust and rapport",
      "Identifying patterns and triggers",
      "Establishing therapeutic alliance"
    ],
    milestone: "You'll leave feeling heard and understood, with clarity on your therapeutic path.",
    emoji: "🌱",
  },
  {
    number: 2,
    title: "Connection",
    subtitle: "Taking Root",
    description: "As trust deepens, we dive into the heart of your challenges. You'll gain insight into how past experiences shape present behaviors and learn tools to manage difficult emotions.",
    approaches: [
      "Exploring underlying causes",
      "Developing coping strategies",
      "Challenging limiting beliefs",
      "Processing difficult emotions safely"
    ],
    milestone: "You'll notice shifts in how you respond to stress and relate to yourself.",
    emoji: "🌿",
  },
  {
    number: 3,
    title: "Growth",
    subtitle: "Reaching Upward",
    description: "This is where real change happens. You're actively practicing new skills, testing boundaries, and building the life you want. Progress may feel nonlinear—that's normal and part of the process.",
    approaches: [
      "Implementing new behaviors",
      "Building resilience and confidence",
      "Strengthening relationships",
      "Expanding comfort zones gradually"
    ],
    milestone: "You'll see tangible improvements in daily life and relationships.",
    emoji: "🌳",
  },
  {
    number: 4,
    title: "Transformation",
    subtitle: "Bearing Fruit",
    description: "You've become your own therapist. The insights, tools, and self-awareness you've gained are now part of who you are. Therapy transitions from necessity to maintenance, and eventually, completion.",
    approaches: [
      "Consolidating gains and insights",
      "Planning for future challenges",
      "Celebrating growth and change",
      "Preparing for life after therapy"
    ],
    milestone: "You'll feel equipped to navigate life's challenges with confidence and wisdom.",
    emoji: "🍃",
  }
];

function StageCard({ stage, index }: { stage: JourneyStage; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const gradients = [
    'from-forest-50 to-forest-100',
    'from-forest-100 to-forest-200',
    'from-forest-200 to-forest-300',
    'from-forest-300 to-forest-400',
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/60 hover:border-forest-200 hover:shadow-xl transition-all duration-300">
        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${gradients[index]} rounded-xl flex items-center justify-center text-forest-800 font-serif font-bold text-xl flex-shrink-0 shadow-sm`}>
            {stage.number}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">{stage.title}</h3>
              <span className="text-2xl">{stage.emoji}</span>
            </div>
            <p className="text-sm font-medium text-forest-600 italic">{stage.subtitle}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-stone-700 leading-relaxed mb-6 text-sm sm:text-base">
          {stage.description}
        </p>

        {/* Approaches */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-forest-700 uppercase tracking-wider mb-3">What We'll Focus On</h4>
          <ul className="space-y-2">
            {stage.approaches.map((approach, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.4, delay: 0.3 + (i * 0.08) }}
                className="flex items-start gap-2.5 text-sm text-stone-700"
              >
                <svg className="w-4 h-4 text-forest-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{approach}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Milestone */}
        <div className={`bg-gradient-to-br ${gradients[index]} rounded-xl p-4`}>
          <p className="text-sm font-medium text-forest-800">
            <span className="font-bold">Milestone:</span>{' '}
            {stage.milestone}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function HealingJourney() {
  return (
    <section id="journey" className="py-16 sm:py-24 px-5 sm:px-8 bg-ivory-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-forest-200/15 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-20 w-48 h-48 bg-gold-200/15 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-forest-600 uppercase tracking-widest mb-3 block">The Process</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
            Your Healing Journey
          </h2>
          <p className="text-base sm:text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Therapy isn't a straight line — it's a journey of growth. Here's what to expect as we work together toward lasting change.
          </p>
        </motion.div>

        {/* Stages Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {stages.map((stage, index) => (
            <StageCard key={stage.number} stage={stage} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-center bg-white rounded-2xl p-8 sm:p-10 border border-stone-200/60 shadow-lg"
        >
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
            Ready to Begin Your Journey?
          </h3>
          <p className="text-base sm:text-lg text-stone-600 mb-6 max-w-2xl mx-auto">
            Every journey starts with a single step. Let's take that step together.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/quiz">
              <motion.span
                className="inline-block px-7 py-3.5 bg-white hover:bg-forest-50 text-forest-700 font-semibold rounded-full border-2 border-forest-200 transition-colors cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Take the Therapy Fit Quiz
              </motion.span>
            </Link>
            <Link href="/contact">
              <motion.span
                className="inline-block px-7 py-3.5 bg-forest-600 hover:bg-forest-700 text-white font-semibold rounded-full transition-colors cursor-pointer shadow-lg shadow-forest-200/30"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Schedule First Visit
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
