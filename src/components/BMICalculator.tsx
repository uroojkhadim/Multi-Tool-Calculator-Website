import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHistory } from '../context/HistoryContext';
import { Ruler, Info, User, ChevronRight } from 'lucide-react';

const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<{ bmi: number; category: string } | null>(null);
  const { addHistory } = useHistory();

  const calculateBMI = useCallback(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) {
      const bmi = w / (h * h);
      let category = '';
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';

      setResult({ bmi, category });
      addHistory({
        type: 'bmi',
        expression: `Weight: ${w}kg, Height: ${h * 100}cm`,
        result: `BMI: ${bmi.toFixed(1)} (${category})`,
      });
    }
  }, [weight, height, addHistory]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Underweight': return 'text-blue-500';
      case 'Normal': return 'text-emerald-500';
      case 'Overweight': return 'text-orange-500';
      case 'Obese': return 'text-rose-600';
      default: return 'text-current';
    }
  };

  return (
    <div className="glass-card w-full p-8 flex flex-col gap-10 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="absolute inset-0 bg-accent-purple blur-md opacity-20" />
            <div className="relative p-3.5 bg-white/5 border border-white/10 rounded-[1.25rem]">
              <Ruler className="w-6 h-6 text-accent-purple" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">BMI Index</h2>
            <p className="opacity-30 text-xs font-medium uppercase tracking-widest">Body Mass Index</p>
          </div>
        </div>
        <button className="p-2.5 hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-white/5">
          <Info className="w-5 h-5 opacity-20" />
        </button>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
              Weight (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="premium-input"
              placeholder="00.0"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
              Height (cm)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="premium-input"
              placeholder="000"
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={calculateBMI}
          className="w-full h-16 bg-accent-purple/10 hover:bg-accent-purple/20 text-accent-purple rounded-2xl text-lg font-semibold border border-accent-purple/20 transition-all shadow-xl"
        >
          Calculate Result
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="p-10 bg-gradient-to-b from-white/[0.05] to-transparent rounded-[2.5rem] border border-white/10 space-y-10 relative overflow-hidden"
          >
            <div className="text-center space-y-3">
              <div className="text-[10px] font-bold opacity-20 uppercase tracking-[0.3em]">Analysis Complete</div>
              <div className="text-8xl font-light tracking-tighter">
                {result.bmi.toFixed(1)}
              </div>
              <div className={`text-2xl font-medium tracking-tight ${getCategoryColor(result.category)}`}>
                {result.category}
              </div>
            </div>

            {/* Premium Gauge */}
            <div className="space-y-5">
              <div className="relative h-2 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden flex gap-1.5 p-0.5">
                <div className="h-full bg-blue-500/40 rounded-full" style={{ width: '18.5%' }} />
                <div className="h-full bg-emerald-500/40 rounded-full" style={{ width: '25%' }} />
                <div className="h-full bg-orange-500/40 rounded-full" style={{ width: '15%' }} />
                <div className="h-full bg-rose-500/40 rounded-full flex-1" />
                
                <motion.div 
                  className="absolute top-[-6px] bottom-[-6px] w-2 bg-white shadow-[0_0_20px_white] z-10 rounded-full border border-black/40"
                  initial={{ left: 0 }}
                  animate={{ left: `${Math.min(Math.max((result.bmi / 40) * 100, 2), 98)}%` }}
                  transition={{ type: 'spring', damping: 20, stiffness: 80 }}
                />
              </div>
              
              <div className="flex justify-between text-[9px] font-bold opacity-20 uppercase tracking-[0.2em] px-1">
                <span>Under</span>
                <span>Healthy</span>
                <span>Over</span>
                <span>Obese</span>
              </div>
            </div>

            <div className="pt-6 border-t border-black/5 dark:border-white/5 flex items-start gap-4">
              <div className="p-2 bg-black/5 dark:bg-white/5 rounded-lg">
                <Info className="w-4 h-4 opacity-30" />
              </div>
              <p className="opacity-30 text-[11px] leading-relaxed font-medium">
                A healthy BMI range is 18.5 - 24.9. Please consult a professional for a detailed health assessment.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const WeightIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 2 5 5-13 13L2 15Z"/><path d="M17.6 5.1 18.9 6.4"/><path d="m11.8 10.9 1.3 1.3"/><path d="m8.9 13.8 1.3 1.3"/><path d="m6 16.7 1.3 1.3"/></svg>
);

const HeightIconSmall = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 3v18"/><path d="M3 12h12"/><path d="m12 9 3 3-3 3"/></svg>
);

export default BMICalculator;
