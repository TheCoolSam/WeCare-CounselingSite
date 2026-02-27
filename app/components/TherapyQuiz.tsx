'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';

interface QuizQuestion {
  id: string;
  question: string;
  options: {
    text: string;
    value: string;
    scores: {
      individual: number;
      couples: number;
      family: number;
      anxiety: number;
      depression: number;
      relationships: number;
      trauma: number;
      growth: number;
    };
  }[];
}

const questions: QuizQuestion[] = [
  {
    id: 'q1',
    question: "What brings you to therapy at this time?",
    options: [
      { 
        text: "Personal struggles (anxiety, depression, stress)", 
        value: "personal",
        scores: { individual: 3, couples: 0, family: 0, anxiety: 3, depression: 2, relationships: 0, trauma: 1, growth: 1 }
      },
      { 
        text: "Relationship challenges with partner", 
        value: "relationship",
        scores: { individual: 1, couples: 3, family: 0, anxiety: 1, depression: 0, relationships: 3, trauma: 0, growth: 1 }
      },
      { 
        text: "Family dynamics or parenting concerns", 
        value: "family",
        scores: { individual: 0, couples: 1, family: 3, anxiety: 1, depression: 0, relationships: 2, trauma: 0, growth: 1 }
      },
      { 
        text: "Self-discovery and personal growth", 
        value: "growth",
        scores: { individual: 2, couples: 0, family: 0, anxiety: 0, depression: 0, relationships: 0, trauma: 0, growth: 3 }
      }
    ]
  },
  {
    id: 'q2',
    question: "How would you describe your current emotional state?",
    options: [
      { 
        text: "Anxious, worried, constantly on edge", 
        value: "anxious",
        scores: { individual: 2, couples: 1, family: 1, anxiety: 3, depression: 1, relationships: 0, trauma: 1, growth: 0 }
      },
      { 
        text: "Sad, hopeless, lacking motivation", 
        value: "depressed",
        scores: { individual: 3, couples: 0, family: 0, anxiety: 1, depression: 3, relationships: 0, trauma: 1, growth: 0 }
      },
      { 
        text: "Frustrated, disconnected from loved ones", 
        value: "disconnected",
        scores: { individual: 1, couples: 2, family: 2, anxiety: 1, depression: 1, relationships: 3, trauma: 0, growth: 0 }
      },
      { 
        text: "Generally okay, just seeking improvement", 
        value: "stable",
        scores: { individual: 1, couples: 1, family: 1, anxiety: 0, depression: 0, relationships: 1, trauma: 0, growth: 3 }
      }
    ]
  },
  {
    id: 'q3',
    question: "Have you experienced therapy before?",
    options: [
      { 
        text: "No, this is my first time considering it", 
        value: "first",
        scores: { individual: 1, couples: 1, family: 1, anxiety: 1, depression: 1, relationships: 1, trauma: 0, growth: 1 }
      },
      { 
        text: "Yes, and it was helpful", 
        value: "helpful",
        scores: { individual: 2, couples: 1, family: 1, anxiety: 1, depression: 1, relationships: 1, trauma: 1, growth: 2 }
      },
      { 
        text: "Yes, but it didn't work for me", 
        value: "unhelpful",
        scores: { individual: 2, couples: 2, family: 1, anxiety: 2, depression: 2, relationships: 1, trauma: 1, growth: 1 }
      },
      { 
        text: "I'm currently in therapy elsewhere", 
        value: "current",
        scores: { individual: 1, couples: 1, family: 1, anxiety: 1, depression: 1, relationships: 1, trauma: 1, growth: 2 }
      }
    ]
  },
  {
    id: 'q4',
    question: "What's your primary goal for therapy?",
    options: [
      { 
        text: "Manage overwhelming emotions (anxiety/panic)", 
        value: "emotions",
        scores: { individual: 3, couples: 0, family: 0, anxiety: 3, depression: 1, relationships: 0, trauma: 1, growth: 1 }
      },
      { 
        text: "Heal from past trauma or difficult experiences", 
        value: "trauma",
        scores: { individual: 3, couples: 0, family: 0, anxiety: 1, depression: 2, relationships: 0, trauma: 3, growth: 1 }
      },
      { 
        text: "Improve communication and connection", 
        value: "communication",
        scores: { individual: 0, couples: 3, family: 2, anxiety: 0, depression: 0, relationships: 3, trauma: 0, growth: 1 }
      },
      { 
        text: "Become the best version of myself", 
        value: "best-self",
        scores: { individual: 2, couples: 1, family: 1, anxiety: 0, depression: 0, relationships: 1, trauma: 0, growth: 3 }
      }
    ]
  },
  {
    id: 'q5',
    question: "How quickly do you need support?",
    options: [
      { 
        text: "Urgently - I'm in crisis", 
        value: "urgent",
        scores: { individual: 3, couples: 0, family: 0, anxiety: 3, depression: 3, relationships: 0, trauma: 2, growth: 0 }
      },
      { 
        text: "Soon - things are getting harder", 
        value: "soon",
        scores: { individual: 2, couples: 2, family: 1, anxiety: 2, depression: 2, relationships: 2, trauma: 1, growth: 1 }
      },
      { 
        text: "No rush - exploring options", 
        value: "exploring",
        scores: { individual: 1, couples: 1, family: 1, anxiety: 0, depression: 0, relationships: 1, trauma: 0, growth: 2 }
      },
      { 
        text: "Flexible - whenever works", 
        value: "flexible",
        scores: { individual: 1, couples: 1, family: 2, anxiety: 0, depression: 0, relationships: 1, trauma: 0, growth: 2 }
      }
    ]
  },
  {
    id: 'q6',
    question: "Who would benefit from this therapy?",
    options: [
      { 
        text: "Just me - individual work", 
        value: "solo",
        scores: { individual: 3, couples: 0, family: 0, anxiety: 1, depression: 1, relationships: 0, trauma: 1, growth: 2 }
      },
      { 
        text: "My partner and I together", 
        value: "couple",
        scores: { individual: 0, couples: 3, family: 0, anxiety: 0, depression: 0, relationships: 3, trauma: 0, growth: 1 }
      },
      { 
        text: "My family or team", 
        value: "group",
        scores: { individual: 0, couples: 0, family: 3, anxiety: 0, depression: 0, relationships: 2, trauma: 0, growth: 1 }
      },
      { 
        text: "Not sure yet - need guidance", 
        value: "unsure",
        scores: { individual: 1, couples: 1, family: 1, anxiety: 1, depression: 1, relationships: 1, trauma: 1, growth: 1 }
      }
    ]
  },
  {
    id: 'q7',
    question: "What's your biggest concern right now?",
    options: [
      { 
        text: "I can't stop worrying about everything", 
        value: "worry",
        scores: { individual: 3, couples: 0, family: 0, anxiety: 3, depression: 1, relationships: 0, trauma: 0, growth: 0 }
      },
      { 
        text: "I feel empty, numb, or stuck", 
        value: "empty",
        scores: { individual: 3, couples: 0, family: 0, anxiety: 0, depression: 3, relationships: 0, trauma: 1, growth: 0 }
      },
      { 
        text: "My relationship is falling apart", 
        value: "relationship-crisis",
        scores: { individual: 1, couples: 3, family: 1, anxiety: 1, depression: 1, relationships: 3, trauma: 0, growth: 0 }
      },
      { 
        text: "I want to understand myself better", 
        value: "self-understanding",
        scores: { individual: 2, couples: 0, family: 0, anxiety: 0, depression: 0, relationships: 0, trauma: 0, growth: 3 }
      }
    ]
  },
  {
    id: 'q8',
    question: "What would success look like for you?",
    options: [
      { 
        text: "Feeling calm and in control again", 
        value: "calm",
        scores: { individual: 2, couples: 1, family: 1, anxiety: 3, depression: 1, relationships: 0, trauma: 1, growth: 1 }
      },
      { 
        text: "Rediscovering joy and purpose", 
        value: "joy",
        scores: { individual: 3, couples: 1, family: 1, anxiety: 0, depression: 3, relationships: 0, trauma: 1, growth: 2 }
      },
      { 
        text: "A stronger, healthier relationship", 
        value: "stronger",
        scores: { individual: 0, couples: 3, family: 2, anxiety: 0, depression: 0, relationships: 3, trauma: 0, growth: 1 }
      },
      { 
        text: "Living authentically and confidently", 
        value: "authentic",
        scores: { individual: 2, couples: 1, family: 1, anxiety: 0, depression: 1, relationships: 1, trauma: 1, growth: 3 }
      }
    ]
  }
];

export default function TherapyQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    if (currentStep < questions.length - 1) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 300);
    } else {
      setTimeout(() => {
        generatePDF();
        setShowResults(true);
      }, 300);
    }
  };

  const calculateResults = () => {
    const scores = {
      individual: 0,
      couples: 0,
      family: 0,
      anxiety: 0,
      depression: 0,
      relationships: 0,
      trauma: 0,
      growth: 0
    };

    Object.entries(answers).forEach(([questionId, value]) => {
      const question = questions.find(q => q.id === questionId);
      const option = question?.options.find(o => o.value === value);
      
      if (option) {
        Object.keys(scores).forEach(key => {
          scores[key as keyof typeof scores] += option.scores[key as keyof typeof option.scores];
        });
      }
    });

    // Determine primary therapy type
    let therapyType = 'Individual Therapy';
    let maxTherapyScore = scores.individual;
    
    if (scores.couples > maxTherapyScore) {
      therapyType = 'Couples Therapy';
      maxTherapyScore = scores.couples;
    }
    if (scores.family > maxTherapyScore) {
      therapyType = 'Family & Team Support';
    }

    // Determine primary concerns (top 2)
    const concernScores = [
      { name: 'Anxiety Management', score: scores.anxiety },
      { name: 'Depression Support', score: scores.depression },
      { name: 'Relationship Building', score: scores.relationships },
      { name: 'Trauma Healing', score: scores.trauma },
      { name: 'Personal Growth', score: scores.growth }
    ].sort((a, b) => b.score - a.score);

    const primaryConcerns = concernScores.slice(0, 2).map(c => c.name);

    return { therapyType, primaryConcerns, scores };
  };

  const generatePDF = () => {
    const results = calculateResults();
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header Background - Sage Green Banner
    doc.setFillColor(139, 184, 95);
    doc.rect(0, 0, pageWidth, 35, 'F');
    
    // Title - White text on sage background
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('Your Therapy Fit Assessment', pageWidth / 2, 15, { align: 'center' });
    
    // Subtitle
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Personalized Results from WeCare Counseling', pageWidth / 2, 24, { align: 'center' });
    
    // Client Info Box
    doc.setFillColor(245, 245, 240);
    doc.rect(15, 42, pageWidth - 30, 18, 'F');
    doc.setDrawColor(139, 184, 95);
    doc.setLineWidth(0.5);
    doc.rect(15, 42, pageWidth - 30, 18, 'S');
    
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.setFont('helvetica', 'normal');
    doc.text(`Date: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`, 20, 50);
    
    // Recommended Therapy Type - Featured Box
    doc.setFillColor(139, 184, 95);
    doc.roundedRect(15, 70, pageWidth - 30, 24, 3, 3, 'F');
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('RECOMMENDED THERAPY TYPE', pageWidth / 2, 78, { align: 'center' });
    
    doc.setFontSize(18);
    doc.text(results.therapyType, pageWidth / 2, 88, { align: 'center' });
    
    // Primary Focus Areas
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(139, 184, 95);
    doc.text('Your Primary Focus Areas', 20, 108);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 51, 51);
    results.primaryConcerns.forEach((concern, index) => {
      // Bullet point circle
      doc.setFillColor(139, 184, 95);
      doc.circle(22, 115 + (index * 10), 1.5, 'F');
      doc.text(concern, 28, 117 + (index * 10));
    });
    
    // Personalized Message Section
    const messageY = 115 + (results.primaryConcerns.length * 10) + 10;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(139, 184, 95);
    doc.text('What This Means for You', 20, messageY);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 51, 51);
    const message = getPersonalizedMessage(results.therapyType, results.primaryConcerns);
    const splitMessage = doc.splitTextToSize(message, pageWidth - 40);
    doc.text(splitMessage, 20, messageY + 8);
    
    // Next Steps Section
    const nextStepsY = messageY + 8 + (splitMessage.length * 5) + 12;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(139, 184, 95);
    doc.text('Your Next Steps', 20, nextStepsY);
    
    // Next steps with styled boxes
    const steps = [
      'Review your results and reflect on what resonates with you',
      'Contact Gina to schedule your first visit',
      'Discuss your goals and create a personalized therapy plan'
    ];
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 51, 51);
    
    steps.forEach((step, index) => {
      const stepY = nextStepsY + 10 + (index * 14);
      doc.setFillColor(250, 250, 248);
      doc.roundedRect(20, stepY - 5, pageWidth - 40, 12, 2, 2, 'F');
      doc.setDrawColor(220, 220, 220);
      doc.roundedRect(20, stepY - 5, pageWidth - 40, 12, 2, 2, 'S');
      
      doc.setFont('helvetica', 'bold');
      doc.text(`${index + 1}.`, 24, stepY + 2);
      doc.setFont('helvetica', 'normal');
      doc.text(step, 32, stepY + 2);
    });
    
    // Footer - Contact Information
    const footerY = 270;
    doc.setDrawColor(139, 184, 95);
    doc.setLineWidth(0.5);
    doc.line(20, footerY, pageWidth - 20, footerY);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(139, 184, 95);
    doc.text('WeCare Counseling', pageWidth / 2, footerY + 6, { align: 'center' });
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Gina Botshtein, LCSW', pageWidth / 2, footerY + 12, { align: 'center' });
    doc.text('Email: Gina@wccounseling.net | Phone: +1 (414) 617-2201', pageWidth / 2, footerY + 17, { align: 'center' });
    
    doc.save(`therapy-assessment-${results.therapyType.replace(/\s+/g, '-').toLowerCase()}.pdf`);
  };

  const getPersonalizedMessage = (therapyType: string, concerns: string[]) => {
    const messages: Record<string, string> = {
      'Individual Therapy': 'Based on your responses, one-on-one therapy would give you the personalized attention and space you need to work through your challenges. We\'ll create a safe, judgment-free environment where you can explore your thoughts, feelings, and goals at your own pace.',
      'Couples Therapy': 'Your answers suggest that relationship counseling could help you and your partner rebuild connection, improve communication, and navigate challenges together. Couples therapy provides a neutral space to understand each other better and strengthen your bond.',
      'Family & Team Support': 'It seems like working with your family or team would be most beneficial. This approach helps everyone understand each other\'s perspectives, improve communication patterns, and create healthier dynamics that benefit the whole group.'
    };
    
    return messages[therapyType] || messages['Individual Therapy'];
  };


  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <section id="quiz" className="py-16 px-4 sm:px-6 bg-gradient-to-br from-sage-50 via-white to-cream-50">
      <div className="max-w-3xl mx-auto">
        {!showResults && (
          <>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-sage-700">
                  Question {currentStep + 1} of {questions.length}
                </span>
                <span className="text-sm font-medium text-sage-700">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-2 bg-sage-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-sage-400 to-sage-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-sage-100"
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-charcoal-900 mb-8 leading-tight">
                  {currentQuestion.question}
                </h3>

                <div className="space-y-4">
                  {currentQuestion.options.map((option) => (
                    <motion.button
                      key={option.value}
                      onClick={() => handleAnswer(currentQuestion.id, option.value)}
                      className="w-full text-left p-5 rounded-xl border-2 border-sage-200 hover:border-sage-400 hover:bg-sage-50 transition-all group"
                      whileHover={{ scale: 1.02, x: 8 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full border-2 border-sage-300 group-hover:border-sage-500 mr-4 flex-shrink-0 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-sage-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-base sm:text-lg text-charcoal-800 group-hover:text-charcoal-900 font-medium">
                          {option.text}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="mt-6 text-sage-600 hover:text-sage-700 font-medium flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous Question
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        )}

        {/* Results Display */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-sage-100 text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-sage-400 to-sage-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="text-3xl font-bold text-charcoal-900 mb-4">
              Your Results Are Ready!
            </h3>
            
            <p className="text-lg text-charcoal-700 mb-6">
              Check your downloads folder for your personalized therapy assessment PDF.
            </p>

            <div className="bg-sage-50 rounded-2xl p-6 mb-8">
              <h4 className="font-bold text-charcoal-900 mb-3">Recommended Next Step:</h4>
              <p className="text-charcoal-700 mb-4">
                Schedule a free 15-minute consultation to discuss your results and create a personalized therapy plan.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#contact"
                className="px-8 py-4 bg-sage-500 hover:bg-sage-600 text-white font-bold rounded-lg shadow-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule First Visit
              </motion.a>
              
              <motion.button
                onClick={() => {
                  setCurrentStep(0);
                  setAnswers({});
                  setShowResults(false);
                }}
                className="px-8 py-4 bg-white hover:bg-sage-50 text-sage-600 font-bold rounded-lg border-2 border-sage-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Retake Quiz
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
