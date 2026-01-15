import React from 'react';
import { Question } from '../types';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  onAnswer: (score: number) => void;
  onBack: () => void;
}

const QuizScreen: React.FC<Props> = ({ question, currentQuestionIndex, totalQuestions, onAnswer, onBack }) => {
  const progress = ((currentQuestionIndex) / totalQuestions) * 100;

  const categoryMap: Record<string, string> = {
    Execution: 'Execution Capability',
    Adoption: 'Adoption & Change',
    Data: 'Data Readiness',
    Mindset: 'Strategic Mindset'
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-6 py-8 flex flex-col min-h-[600px]">
      
      {/* Header Info */}
      <div className="flex items-end justify-between mb-6">
         <motion.span 
           key={question.category}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="text-[#2E8B8B] font-bold text-xs tracking-widest uppercase"
         >
            {categoryMap[question.category]}
         </motion.span>
         <span className="text-[#1A1A2E]/50 text-sm font-semibold tabular-nums">
            {currentQuestionIndex + 1} / {totalQuestions}
         </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-12 w-full bg-[#D4D4D4] rounded-sm h-1.5 overflow-hidden">
        <motion.div 
          className="bg-[#2E8B8B] h-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        ></motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex-grow"
        >
          {/* Question Text */}
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-12 leading-tight tracking-tight">
            {question.text}
          </h2>

          {/* Options */}
          <div className="space-y-4">
            {question.options.map((option, idx) => (
              <motion.button
                key={`${question.id}-${idx}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                whileHover={{ 
                  scale: 1.02, 
                  borderColor: '#2E8B8B',
                  boxShadow: "0px 4px 15px rgba(0,0,0,0.05)"
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onAnswer(option.score)}
                className="w-full text-right p-6 rounded-md bg-white border border-gray-200 transition-colors duration-200 group flex items-start"
              >
                <div className="flex-shrink-0 ml-6 mt-1">
                  <div className="w-5 h-5 rounded-full border border-gray-300 group-hover:border-[#2E8B8B] flex items-center justify-center transition-colors">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#2E8B8B] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <span className="text-lg text-[#1A1A2E] group-hover:text-black font-normal leading-relaxed">
                    {option.text}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Help - Pushed to bottom via margin-top auto if needed, or fixed position relative to content */}
      <div className="mt-12 pt-4">
        <button 
          onClick={onBack}
          disabled={currentQuestionIndex === 0}
          className={`flex items-center text-[#1A1A2E]/40 hover:text-[#2E8B8B] transition-colors text-sm font-semibold tracking-wide ${currentQuestionIndex === 0 ? 'opacity-0 cursor-default' : ''}`}
        >
          <ArrowRight className="ml-2 w-4 h-4" />
          לשאלה הקודמת
        </button>
      </div>
    </div>
  );
};

export default QuizScreen;