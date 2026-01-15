import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  onStart: () => void;
}

const WelcomeScreen: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="max-w-5xl mx-auto text-center py-8 px-6">
      
      {/* Hero Section */}
      <div className="mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A2E] mb-8 leading-tight tracking-tight"
        >
          האם הארגון שלכם באמת מסוגל<br/>
          <span className="text-[#2E8B8B]">להפיק ערך מ־AI?</span>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-[#1A1A2E]/80 mb-10 leading-relaxed max-w-3xl mx-auto font-normal space-y-6"
        >
           <p>
             זהו את החוזקות שלכם ואת החסמים שמונעים מכם להפוך את ה-AI למנוע צמיחה רווחי.
           </p>
           <p className="font-bold text-[#1A1A2E]">
             ענו על 12 שאלות קצרות שיחשפו לכם בדיוק איפה אתם עומדים
           </p>
           <p className="text-base text-[#1A1A2E]/70">
             התנאי היחיד - תענו בכנות כמו שהמצב היום (ולא כפי שהייתם רוצים שהוא יהיה)
           </p>
        </motion.div>

        {/* Cyan CTA Button (#5BC0EB) */}
        <motion.button
          onClick={onStart}
          whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(91, 192, 235, 0.3)" }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-[#1A1A2E] transition-colors duration-200 bg-[#5BC0EB] rounded-sm hover:bg-[#4AB0DB] shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5BC0EB]"
        >
          בואו נתחיל
          <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        </motion.button>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-6 text-sm text-[#1A1A2E]/50 font-medium tracking-wide"
        >
           3 דקות בלבד, ויש לכם תוצאות
        </motion.p>
      </div>

    </div>
  );
};

export default WelcomeScreen;