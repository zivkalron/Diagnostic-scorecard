import React from 'react';
import { Category, UserResults } from '../types';
import { RESULTS_CONTENT } from '../data';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Calendar, TrendingUp } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

interface Props {
  results: UserResults;
}

const ResultsScreen: React.FC<Props> = ({ results }) => {
  const { finalPercent, categoryScores } = results;

  const mainFeedback = RESULTS_CONTENT.ranges.find(r => finalPercent <= r.max) || RESULTS_CONTENT.ranges[RESULTS_CONTENT.ranges.length - 1];

  const benchmark = 75;
  const gap = benchmark - finalPercent;

  const data = [
    { name: 'Score', value: finalPercent },
    { name: 'Remaining', value: 100 - finalPercent },
  ];
  
  // Brand Colors
  let scoreColor = '#2E8B8B'; // Teal
  if (finalPercent < 40) scoreColor = '#EF4444'; // Red for critical low
  if (finalPercent >= 40 && finalPercent < 75) scoreColor = '#5BC0EB'; // Cyan for mid

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Faster stagger
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 70, 
        damping: 15,
        mass: 0.8 
      } 
    }
  };

  const renderCategoryCard = (category: Category, score: number) => {
    const isEngine = score >= 3;
    const content = RESULTS_CONTENT.categoryFeedback[category];
    const categoryHebrew = {
      [Category.Execution]: 'יכולות ביצוע',
      [Category.Adoption]: 'אימוץ ושינוי',
      [Category.Data]: 'מוכנות דאטה',
      [Category.Mindset]: 'תפיסת עולם'
    }[category];

    return (
      <motion.div 
        variants={itemVariants}
        whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        key={category} 
        className={`p-8 rounded-lg bg-white border-t-4 shadow-sm transition-all ${isEngine ? 'border-[#2E8B8B]' : 'border-[#1A1A2E]'}`}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-[#1A1A2E]">{categoryHebrew}</h3>
          <span className={`px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider ${isEngine ? 'bg-teal-50 text-[#2E8B8B]' : 'bg-gray-100 text-[#1A1A2E]'}`}>
            {isEngine ? 'מנוע צמיחה' : 'חסם'}
          </span>
        </div>
        <p className="text-[#1A1A2E]/70 text-sm leading-relaxed">
          {isEngine ? content.engine : content.barrier}
        </p>
      </motion.div>
    );
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto px-4 py-8 space-y-8"
    >
      
      {/* Header Section */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg p-8 md:p-12 shadow-sm border border-gray-100">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-1 flex flex-col items-center justify-center relative">
             <div className="w-56 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={75}
                      outerRadius={90}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                      stroke="none"
                      animationDuration={1000}
                    >
                      <Cell key="score" fill={scoreColor} />
                      <Cell key="remaining" fill="#E5E5E5" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
             </div>
             <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.3, type: "spring" }}
               className="absolute inset-0 flex flex-col items-center justify-center text-center"
             >
                  <span className="text-5xl font-black text-[#1A1A2E] tracking-tighter">{finalPercent}%</span>
                  <span className="text-[11px] leading-tight text-[#1A1A2E]/60 font-bold mt-1 max-w-[120px]">מוכנות למינוף אפקטיבי של AI</span>
             </motion.div>
          </div>
          
          <div className="md:col-span-2 space-y-6">
             <h2 className="text-3xl font-bold text-[#1A1A2E] mb-2">איך נראה היום-יום שלכם</h2>
             <div className="w-20 h-1.5 bg-[#2E8B8B] mb-6"></div>
             <p className="text-[#1A1A2E] text-lg leading-relaxed font-normal">
               {mainFeedback.text}
             </p>
          </div>
        </div>
      </motion.div>

      {/* The Gap Section - Navy Background */}
      {gap > 0 && (
        <motion.div variants={itemVariants} className="bg-[#1A1A2E] text-white rounded-lg p-10 shadow-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4 flex items-center text-white">
                <AlertTriangle className="ml-3 text-[#5BC0EB]" />
                איפה אתם עומדים ואיפה אתם רוצים להיות
              </h3>
              <p className="text-gray-300 text-sm mb-8 leading-relaxed max-w-xl">
               מתחת ל-75%, המשאבים שתשקיעו בטכנולוגיה עלולים להתבזבז על בעיות תשתיתיות ותהליכיות במקום להביא ערך.
              </p>
              
              {/* Custom Progress Bar Chart */}
              <div className="space-y-6">
                 <div className="relative">
                    <div className="flex mb-2 items-center justify-between text-xs font-bold tracking-wider uppercase">
                       <span className="text-gray-400">הציון שלכם</span>
                       <span className="text-white tabular-nums">{finalPercent}%</span>
                    </div>
                    <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-sm bg-[#1A1A2E] border border-gray-700">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${finalPercent}%` }}
                         transition={{ duration: 0.8, delay: 0.2 }}
                         className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#EF4444]"
                       ></motion.div>
                    </div>
                 </div>

                 <div className="relative">
                    <div className="flex mb-2 items-center justify-between text-xs font-bold tracking-wider uppercase">
                       <span className="text-[#5BC0EB]">סף היעילות</span>
                       <span className="text-[#5BC0EB] tabular-nums">75%</span>
                    </div>
                    <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-sm bg-[#1A1A2E] border border-gray-700">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `75%` }}
                         transition={{ duration: 0.8, delay: 0.3 }}
                         className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#5BC0EB]"
                       ></motion.div>
                    </div>
                 </div>
              </div>

            </div>
            
            <div className="bg-white/5 p-8 rounded-sm text-center min-w-[200px] border border-white/10 flex items-center justify-center">
              <span className="block text-5xl font-black text-[#5BC0EB] tabular-nums">{gap}%-</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Strengths & Weaknesses Grid */}
      <motion.div variants={itemVariants}>
        <h3 className="text-2xl font-bold text-[#1A1A2E] mb-8 flex items-center">
          <TrendingUp className="ml-3 text-[#2E8B8B]" />
          ניתוח עומק
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.values(Category).map(cat => renderCategoryCard(cat, categoryScores[cat]))}
        </div>
      </motion.div>

      {/* CTA Section - Kai Style */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 flex flex-col md:flex-row">
        <div className="p-10 md:w-2/3">
           <h3 className="text-2xl font-bold text-[#1A1A2E] mb-4">האבחון מראה שיש לכם פוטנציאל עצום, בואו נממש אותו יחד</h3>
           <div className="text-[#1A1A2E]/80 mb-8 leading-relaxed space-y-4">
             <p className="font-semibold text-[#1A1A2E]">
               חשוב לי לומר: לא כל חברה בשלה לעשות את השינוי הזה כרגע.לכן, לפני שמתקדמים חשוב לי שנוודא התאמה.
             </p>
             <p>
               בפגישה קצרה נוכל להבין יחד:
             </p>
           </div>
           <ul className="space-y-4 mb-8">
             <li className="flex items-center">
               <div className="w-1.5 h-1.5 bg-[#2E8B8B] ml-4 rotate-45 flex-shrink-0"></div>
               <span className="text-[#1A1A2E] text-sm font-medium">איזה חסם ספציפי הכי נכון לסגור כדי לא לשרוף תקציב.</span>
             </li>
             <li className="flex items-center">
               <div className="w-1.5 h-1.5 bg-[#2E8B8B] ml-4 rotate-45 flex-shrink-0"></div>
               <span className="text-[#1A1A2E] text-sm font-medium">האם ניתן להפוך את המודל הזה למציאות שלכם.</span>
             </li>
             <li className="flex items-center">
               <div className="w-1.5 h-1.5 bg-[#2E8B8B] ml-4 rotate-45 flex-shrink-0"></div>
               <span className="text-[#1A1A2E] text-sm font-medium">מהם הצעדים הקונקרטיים הבאים.</span>
             </li>
           </ul>
        </div>
        
        <div className="bg-[#F8FAFC] p-10 md:w-1/3 flex flex-col justify-center items-center text-center border-r border-gray-100">
           <p className="text-[#1A1A2E] font-bold mb-8 text-lg">בואו נבדוק התאמה</p>
           {/* Cyan CTA */}
           <motion.button 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             onClick={() => window.open('mailto:your-email@example.com?subject=תיאום פגישת היכרות - AI Scorecard', '_blank')}
             className="w-full py-4 text-[#1A1A2E] bg-[#5BC0EB] hover:bg-[#4AB0DB] rounded-sm font-bold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
           >
             <Calendar className="w-5 h-5" />
             תיאום פגישת היכרות
           </motion.button>
        </div>
      </motion.div>

    </motion.div>
  );
};

export default ResultsScreen;