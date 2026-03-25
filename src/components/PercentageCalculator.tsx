import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useHistory } from '../context/HistoryContext';
import { Percent } from 'lucide-react';

const PercentageCalculator: React.FC = () => {
  const [value, setValue] = useState('');
  const [percent, setPercent] = useState('');
  const [result, setResult] = useState<{ value: string; type: string } | null>(null);
  const { addHistory } = useHistory();

  const calculatePercentage = (type: 'of' | 'increase' | 'decrease') => {
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

    setResult({ value: res.toFixed(2), type: label });
    addHistory({
      type: 'percentage',
      expression: label,
      result: res.toFixed(2),
    });
  };

  return (
    <div className="glass-card w-full p-8 flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-rose-500/20 rounded-2xl">
          <Percent className="w-6 h-6 text-rose-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Percentage</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400 ml-1">Number</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full h-14 bg-gray-200/50 dark:bg-gray-800/50 rounded-2xl px-6 text-xl focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all text-gray-900 dark:text-white"
            placeholder="500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400 ml-1">Percentage (%)</label>
          <input
            type="number"
            value={percent}
            onChange={(e) => setPercent(e.target.value)}
            className="w-full h-14 bg-gray-200/50 dark:bg-gray-800/50 rounded-2xl px-6 text-xl focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all text-gray-900 dark:text-white"
            placeholder="20"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => calculatePercentage('of')}
            className="h-14 bg-rose-500 hover:bg-rose-400 text-white rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-rose-500/20"
          >
            Find %
          </button>
          <button
            onClick={() => calculatePercentage('increase')}
            className="h-14 bg-rose-500 hover:bg-rose-400 text-white rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-rose-500/20"
          >
            Increase
          </button>
          <button
            onClick={() => calculatePercentage('decrease')}
            className="h-14 bg-rose-500 hover:bg-rose-400 text-white rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-rose-500/20"
          >
            Decrease
          </button>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 bg-rose-500/10 dark:bg-rose-500/5 rounded-3xl text-center space-y-2 border border-rose-500/20"
          >
            <div className="text-sm font-medium text-rose-500 uppercase tracking-widest">{result.type}</div>
            <div className="text-4xl font-black text-rose-500">{result.value}</div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PercentageCalculator;
