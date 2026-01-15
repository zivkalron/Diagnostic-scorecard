import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import LeadForm from './components/LeadForm';
import ResultsScreen from './components/ResultsScreen';
import { QUESTIONS } from './data';
import { UserInfo, UserResults, Category } from './types';
import { AnimatePresence, motion } from 'framer-motion';

// Application Steps
enum Step {
  Welcome,
  Quiz,
  LeadCapture,
  Results
}

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.Welcome);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [results, setResults] = useState<UserResults | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Start the Quiz
  const handleStart = () => {
    setCurrentStep(Step.Quiz);
  };

  // Handle Answer Selection
  const handleAnswer = (score: number) => {
    const questionId = QUESTIONS[currentQuestionIndex].id;
    setAnswers(prev => ({ ...prev, [questionId]: score }));

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQuestionIndex(prev => prev + 1), 150); // Faster feedback
    } else {
      setCurrentStep(Step.LeadCapture);
    }
  };

  // Go Back
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Calculate Results
  const calculateResults = (): UserResults => {
    let totalRawScore = 0;
    const catScores: Record<Category, { total: number; count: number }> = {
      [Category.Execution]: { total: 0, count: 0 },
      [Category.Adoption]: { total: 0, count: 0 },
      [Category.Data]: { total: 0, count: 0 },
      [Category.Mindset]: { total: 0, count: 0 }
    };

    QUESTIONS.forEach(q => {
      const score = answers[q.id] || 0;
      totalRawScore += score;
      catScores[q.category].total += score;
      catScores[q.category].count += 1;
    });

    const finalPercent = Math.round(((totalRawScore - 12) / 36) * 100);

    const categoryAverages = {
      [Category.Execution]: catScores[Category.Execution].total / catScores[Category.Execution].count,
      [Category.Adoption]: catScores[Category.Adoption].total / catScores[Category.Adoption].count,
      [Category.Data]: catScores[Category.Data].total / catScores[Category.Data].count,
      [Category.Mindset]: catScores[Category.Mindset].total / catScores[Category.Mindset].count,
    };

    return {
      rawScore: totalRawScore,
      finalPercent: Math.max(0, Math.min(100, finalPercent)),
      categoryScores: categoryAverages
    };
  };

  // Submit Lead Form
  const handleLeadSubmit = async (info: UserInfo) => {
    setIsSubmitting(true);
    setUserInfo(info);
    
    // Calculate results immediately
    const calculatedResults = calculateResults();
    setResults(calculatedResults);

    // Short UX delay
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep(Step.Results);
    }, 800);
  };

  // Unified transition settings for smoother, less jittery feel
  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const pageTransition = {
    type: "tween",
    ease: "circOut",
    duration: 0.3
  };

  return (
    <div className="min-h-screen bg-[#E5E5E5] flex flex-col font-sans text-[#1A1A2E] overflow-x-hidden" dir="rtl">
      {/* Header / Logo Area */}
      <header className="bg-white py-6 sticky top-0 z-10 border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Text Logo Only */}
            <div className="text-4xl font-black text-[#1A1A2E] tracking-tighter cursor-pointer" onClick={() => setCurrentStep(Step.Welcome)}>
              kai
            </div>
          </div>
          {currentStep === Step.Quiz && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="text-sm text-[#1A1A2E] font-semibold bg-[#E5E5E5] px-4 py-1.5 rounded-md"
             >
               אבחון בתהליך...
             </motion.div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-center py-8 relative">
        <AnimatePresence mode="wait">
          {currentStep === Step.Welcome && (
            <motion.div
              key="welcome"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              className="w-full"
            >
              <WelcomeScreen onStart={handleStart} />
            </motion.div>
          )}

          {currentStep === Step.Quiz && (
            <motion.div
              key="quiz"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              className="w-full"
            >
              <QuizScreen 
                question={QUESTIONS[currentQuestionIndex]} 
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={QUESTIONS.length}
                onAnswer={handleAnswer}
                onBack={handleBack}
              />
            </motion.div>
          )}

          {currentStep === Step.LeadCapture && (
            <motion.div
              key="lead"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              className="w-full"
            >
              <LeadForm onSubmit={handleLeadSubmit} isSubmitting={isSubmitting} />
            </motion.div>
          )}

          {currentStep === Step.Results && results && (
            <motion.div
              key="results"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              className="w-full"
            >
              <ResultsScreen results={results} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-[#E5E5E5] py-10 mt-auto border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-[#1A1A2E] text-sm opacity-60 font-medium">
            &copy; {new Date().getFullYear()} Kai. All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;