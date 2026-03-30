import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Gift, Info, RefreshCw } from 'lucide-react';
import { differenceInYears, differenceInMonths, differenceInDays, addYears, addMonths } from 'date-fns';

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState(null);

  const calculateAge = () => {
    if (!birthDate) return;
    
    const birth = new Date(birthDate);
    const now = new Date();
    
    if (isNaN(birth.getTime())) return;

    let years = differenceInYears(now, birth);
    let birthPlusYears = addYears(birth, years);
    
    let months = differenceInMonths(now, birthPlusYears);
    let birthPlusMonths = addMonths(birthPlusYears, months);
    
    let days = differenceInDays(now, birthPlusMonths);
    
    setAge({ years, months, days });
  };

  useEffect(() => {
    if (birthDate) calculateAge();
  }, [birthDate]);

  return (
    <div className="w-full max-w-lg mx-auto animate-in fade-in zoom-in duration-500">
      <div className="glass-card p-10 flex flex-col gap-10">
        {/* Header */}
        <div className="flex items-center gap-5">
          <div className="p-4 bg-accent-blue/10 border border-accent-blue/20 rounded-2xl">
            <Gift className="w-6 h-6 text-accent-blue" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white mb-1">Age Calculator</h2>
            <p className="text-xs text-white/30 uppercase tracking-[0.2em] font-bold">Life Milestones</p>
          </div>
        </div>

        {/* Input Area */}
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" /> Date of Birth
            </label>
            <input 
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full h-18 premium-input text-xl appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Results Area */}
        <AnimatePresence mode="wait">
          {age ? (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -15 }}
              className="grid grid-cols-3 gap-4 mt-6"
            >
              <div className="p-6 bg-white/5 border border-white/5 rounded-3xl flex flex-col items-center gap-2 group hover:bg-white/[0.08] transition-all">
                <span className="text-4xl font-bold tracking-tighter text-white/90">{age.years}</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/30">Years</span>
              </div>
              <div className="p-6 bg-white/5 border border-white/5 rounded-3xl flex flex-col items-center gap-2 group hover:bg-white/[0.08] transition-all">
                <span className="text-4xl font-bold tracking-tighter text-accent-purple/90">{age.months}</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-accent-purple/30">Months</span>
              </div>
              <div className="p-6 bg-white/5 border border-white/5 rounded-3xl flex flex-col items-center gap-2 group hover:bg-white/[0.08] transition-all">
                <span className="text-4xl font-bold tracking-tighter text-accent-blue/90">{age.days}</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-accent-blue/30">Days</span>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center p-16 opacity-10 gap-4">
              <Clock className="w-12 h-12" />
              <p className="font-bold uppercase tracking-widest text-[10px]">Awaiting Birthdate</p>
            </div>
          )}
        </AnimatePresence>

        {/* Stats box */}
        <div className="p-6 bg-accent-blue/5 border border-accent-blue/10 rounded-2xl flex items-start gap-4">
          <Info className="w-5 h-5 text-accent-blue opacity-40 mt-1 shrink-0" />
          <p className="text-[11px] text-white/30 leading-relaxed italic">
            This tool provides a precise breakdown of your age based on the Gregorian calendar, including leap years and month variability.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgeCalculator;
