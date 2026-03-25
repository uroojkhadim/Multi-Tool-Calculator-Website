import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHistory } from '../context/HistoryContext';
import { Calendar, Cake, Sparkles, Clock, MapPin } from 'lucide-react';
import { differenceInYears, differenceInMonths, differenceInDays, addYears, addMonths, format } from 'date-fns';
import { useTheme } from '../context/ThemeContext';

const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState<{ years: number; months: number; days: number; nextBirthday: number } | null>(null);
  const { theme } = useTheme();
  const { addHistory } = useHistory();

  const calculateAge = useCallback(() => {
    if (!birthDate) return;
    const start = new Date(birthDate);
    const end = new Date();
    
    if (start > end) return;

    const years = differenceInYears(end, start);
    const dateAfterYears = addYears(start, years);
    const months = differenceInMonths(end, dateAfterYears);
    const dateAfterMonths = addMonths(dateAfterYears, months);
    const days = differenceInDays(end, dateAfterMonths);

    let nextBday = new Date(end.getFullYear(), start.getMonth(), start.getDate());
    if (nextBday < end) {
      nextBday.setFullYear(end.getFullYear() + 1);
    }
    const daysUntilNext = differenceInDays(nextBday, end);

    setAge({ years, months, days, nextBirthday: daysUntilNext });
    addHistory({
      type: 'age',
      expression: `DOB: ${format(start, 'PPP')}`,
      result: `${years}y ${months}m ${days}d`,
    });
  }, [birthDate, addHistory]);

  return (
    <div className="glass-card w-full p-8 flex flex-col gap-10 shadow-2xl relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent-blue/10 blur-3xl rounded-full" />
      
      <div className="flex items-center gap-5">
        <div className="relative">
          <div className="absolute inset-0 bg-accent-blue blur-md opacity-20" />
          <div className="relative p-3.5 bg-white/5 border border-white/10 rounded-[1.25rem]">
            <Calendar className="w-6 h-6 text-accent-blue" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Age Tracker</h2>
          <p className="opacity-30 text-xs font-medium uppercase tracking-widest">Chronological Age</p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="space-y-3">
          <label className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
            <Clock className="w-3 h-3" /> Date of Birth
          </label>
          <div className="relative group">
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className={`premium-input ${theme === 'dark' ? '[color-scheme:dark]' : '[color-scheme:light]'}`}
            />
            <Calendar className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 opacity-10 group-focus-within:text-accent-blue transition-colors pointer-events-none" />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={calculateAge}
          className="w-full h-16 bg-accent-blue/10 hover:bg-accent-blue/20 text-accent-blue rounded-2xl text-lg font-semibold border border-accent-blue/20 transition-all flex items-center justify-center gap-3 shadow-xl"
        >
          <Sparkles className="w-5 h-5" />
          Calculate Age
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {age && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Years', value: age.years },
                { label: 'Months', value: age.months },
                { label: 'Days', value: age.days },
              ].map((item, i) => (
                <div key={i} className="p-8 bg-black/[0.03] dark:bg-white/[0.03] rounded-[2.5rem] text-center border border-black/5 dark:border-white/5 relative overflow-hidden group hover:border-black/10 dark:hover:border-white/10 transition-colors">
                  <div className="absolute inset-0 bg-accent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="text-5xl font-light tracking-tighter mb-1.5">{item.value}</div>
                  <div className="text-[9px] font-bold opacity-20 uppercase tracking-[0.2em]">{item.label}</div>
                </div>
              ))}
            </div>

            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-10 bg-gradient-to-br from-accent-blue/10 to-transparent rounded-[3rem] border border-accent-blue/20 flex items-center justify-between relative overflow-hidden group"
            >
              <div className="relative z-10">
                <div className="text-[10px] font-bold text-accent-blue uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                  <MapPin className="w-3 h-3" /> Next Birthday
                </div>
                <div className="text-5xl font-bold tracking-tight flex items-baseline gap-2">
                  {age.nextBirthday} <span className="text-lg font-medium opacity-30 tracking-normal">Days Left</span>
                </div>
              </div>
              <div className="p-5 bg-accent-blue/20 rounded-[1.5rem] relative z-10 group-hover:scale-110 transition-transform duration-500">
                <Cake className="w-8 h-8 text-accent-blue" />
              </div>
              {/* Decorative Mesh */}
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-accent-blue/10 rounded-full blur-3xl group-hover:bg-accent-blue/20 transition-colors" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AgeCalculator;
