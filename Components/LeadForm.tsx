import React, { useState } from 'react';
import { UserInfo } from '../types';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  onSubmit: (info: UserInfo) => void;
  isSubmitting: boolean;
}

const LeadForm: React.FC<Props> = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState<UserInfo>({
    name: '',
    email: '',
    company: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.company) {
      onSubmit(formData);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto bg-white p-10 rounded-lg shadow-lg border border-gray-100"
    >
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-[#2E8B8B]/10 text-[#2E8B8B] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[#1A1A2E]">האבחון הושלם</h2>
        <p className="text-[#1A1A2E]/60 mt-3 text-sm leading-relaxed">
          הזינו פרטים לצפייה בתוצאות המלאות.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-[#1A1A2E] mb-2">שם מלא *</label>
          <motion.input
            whileFocus={{ scale: 1.01, borderColor: "#2E8B8B" }}
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:ring-2 focus:ring-[#2E8B8B]/20 outline-none transition-all bg-white text-[#1A1A2E]"
            placeholder="ישראל ישראלי"
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-semibold text-[#1A1A2E] mb-2">שם החברה *</label>
          <motion.input
             whileFocus={{ scale: 1.01, borderColor: "#2E8B8B" }}
            type="text"
            id="company"
            name="company"
            required
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:ring-2 focus:ring-[#2E8B8B]/20 outline-none transition-all bg-white text-[#1A1A2E]"
            placeholder="חברה בע״מ"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-[#1A1A2E] mb-2">כתובת אימייל *</label>
          <motion.input
             whileFocus={{ scale: 1.01, borderColor: "#2E8B8B" }}
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:ring-2 focus:ring-[#2E8B8B]/20 outline-none transition-all bg-white text-[#1A1A2E]"
            placeholder="you@company.com"
          />
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.02, backgroundColor: "#4AB0DB" }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 bg-[#5BC0EB] text-[#1A1A2E] rounded-sm font-bold text-lg transition-all shadow-sm hover:shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-[#5BC0EB] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mt-8"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 ml-2 animate-spin" />
              מעבד נתונים...
            </>
          ) : (
            'הצג תוצאות'
          )}
        </motion.button>
        
        <p className="text-xs text-center text-gray-400 mt-6">
          פרטיך שמורים עמנו ולא יועברו לצד ג׳.
        </p>
      </form>
    </motion.div>
  );
};

export default LeadForm;
