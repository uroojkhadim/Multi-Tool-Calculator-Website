import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHistory } from '../context/HistoryContext';
import { Percent, TrendingUp, TrendingDown, Target, Zap } from 'lucide-react';

const PercentageCalculator: React.FC = () => {
  const [value, setValue] = useState('');
  const [percent, setPercent] = useState('');
  const [result, setResult] = useState<{ value: string; type: string } | null>(null);
  const { addHistory } = useHistory();

  const calculatePercentage = useCallback((type: 'of' | 'increase' | 'decrease') => {
    const v = parseFloat(value);
    const p = parseFloat(percent);
    if (isNaN(v) || isNaN(p)) return;

    let res = 0;
    let label = '';
    if (type === 'of') {
      res = (p / 100) * v;
      label = `${p}% of ${v}`;
    } else if (type === 'increase') {
      res = v + (v * (p / 100));
      label = `${v} + ${p}%`;
    } else if (type === 'decrease') {
      res = v - (v * (p / 100));
      label = `${v} - ${p}%`;
    }

    const formattedRes = Number(res.toFixed(2)).toString();
    setResult({ value: formattedRes, type: label });
    addHistory({
      type: 'percentage',
      expression: label,
      result: formattedRes,
    });
  }, [value, percent, addHistory]);

  return (
    <div className="glass-card w-full p-8 flex flex-col gap-10 shadow-2xl relative overflow-hidden border-white/10">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent-pink/10 blur-3xl rounded-full" />
      
      <div className="flex items-center gap-5">
        <div className="relative">
          <div className="absolute inset-0 bg-accent-pink blur-md opacity-20" />
          <div className="relative p-3.5 bg-white/5 border border-white/10 rounded-[1.25rem]">
            <Percent className="w-6 h-6 text-accent-pink" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-white tracking-tight">Percentage</h2>
          <p className="text-white/30 text-xs font-medium uppercase tracking-widest">Rapid Calculation</p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">Base Number</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="premium-input"
              placeholder="000"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">Percent (%)</label>
            <input
              type="number"
              value={percent}
              onChange={(e) => setPercent(e.target.value)}
              className="premium-input"
              placeholder="00"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { id: 'of', label: 'Of', icon: Target, color: 'text-white/40' },
            { id: 'increase', label: 'Add', icon: TrendingUp, color: 'text-emerald-400/60' },
            { id: 'decrease', label: 'Sub', icon: TrendingDown, color: 'text-rose-400/60' },
          ].map((btn) => (
            <motion.button
              key={btn.id}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => calculatePercentage(btn.id as any)}
              className="flex flex-col items-center justify-center gap-3 h-28 bg-white/[0.03] border border-white/5 rounded-[2rem] text-white transition-all hover:border-white/20 group"
            >
              <btn.icon className={`w-6 h-6 ${btn.color} group-hover:text-white transition-colors`} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{btn.label}</span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-10 bg-gradient-to-br from-white/[0.05] to-transparent rounded-[3rem] border border-white/10 relative overflow-hidden group"
            >
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-accent-pink" />
                  Calculation Result
                </div>
                <div className="text-7xl font-bold text-white tracking-tighter mb-2">
                  {result.value}
                </div>
                <div className="text-xs font-medium text-white/30 tracking-wide">
                  {result.type}
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-accent-pink/5 rounded-full blur-3xl" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PercentageCalculator;
