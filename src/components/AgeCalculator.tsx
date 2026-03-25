import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useHistory } from '../context/HistoryContext';
import { Calendar } from 'lucide-react';
import { differenceInYears, differenceInMonths, differenceInDays, addYears, addMonths } from 'date-fns';

const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);
  const { addHistory } = useHistory();

  const calculateAge = () => {
    if (!birthDate) return;
    const start = new Date(birthDate);
    const end = new Date();
    
    if (start > end) {
      alert("Birth date cannot be in the future!");
      return;
    }

    const years = differenceInYears(end, start);
    const dateAfterYears = addYears(start, years);
    const months = differenceInMonths(end, dateAfterYears);
    const dateAfterMonths = addMonths(dateAfterYears, months);
    const days = differenceInDays(end, dateAfterMonths);

    setAge({ years, months, days });
    addHistory({
      type: 'age',
      expression: `Birth Date: ${birthDate}`,
      result: `${years}y ${months}m ${days}d`,
    });
  };

  return (
    <div className="glass-card w-full p-8 flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-purple-500/20 rounded-2xl">
          <Calendar className="w-6 h-6 text-purple-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Age Calculator</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400 ml-1">Date of Birth</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full h-14 bg-gray-200/50 dark:bg-gray-800/50 rounded-2xl px-6 text-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-gray-900 dark:text-white"
          />
        </div>

        <button
          onClick={calculateAge}
          className="w-full h-14 bg-purple-500 hover:bg-purple-400 text-white rounded-2xl text-xl font-bold shadow-lg shadow-purple-500/20 transition-all active:scale-95"
        >
          Calculate Age
        </button>
      </div>

      {age && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-4"
        >
          {[
            { label: 'Years', value: age.years },
            { label: 'Months', value: age.months },
            { label: 'Days', value: age.days },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-gray-100/50 dark:bg-gray-900/50 rounded-2xl text-center border border-white/20">
              <div className="text-3xl font-black text-purple-500">{item.value}</div>
              <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">{item.label}</div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AgeCalculator;
