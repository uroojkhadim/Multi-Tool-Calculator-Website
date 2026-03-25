import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useHistory } from '../context/HistoryContext';
import { Ruler } from 'lucide-react';

const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<{ bmi: number; category: string } | null>(null);
  const { addHistory } = useHistory();

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // cm to m
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
  };

  return (
    <div className="glass-card w-full p-8 flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-500/20 rounded-2xl">
          <Ruler className="w-6 h-6 text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold">BMI Calculator</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400 ml-1">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full h-14 bg-gray-200/50 dark:bg-gray-800/50 rounded-2xl px-6 text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400 ml-1">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full h-14 bg-gray-200/50 dark:bg-gray-800/50 rounded-2xl px-6 text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="0"
          />
        </div>

        <button
          onClick={calculateBMI}
          className="w-full h-14 bg-blue-500 hover:bg-blue-400 text-white rounded-2xl text-xl font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95"
        >
          Calculate BMI
        </button>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 bg-gray-100/50 dark:bg-gray-900/50 rounded-3xl text-center space-y-6 border border-white/20"
        >
          <div className="space-y-1">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest">Your BMI</div>
            <div className="text-5xl font-black text-blue-500">{result.bmi.toFixed(1)}</div>
            <div className={`text-xl font-bold ${
              result.category === 'Normal' ? 'text-green-500' : 
              result.category === 'Underweight' ? 'text-blue-400' : 'text-orange-500'
            }`}>
              {result.category}
            </div>
          </div>

          {/* BMI Gauge */}
          <div className="relative h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
            <div className="h-full bg-blue-400" style={{ width: '18.5%' }} />
            <div className="h-full bg-green-500" style={{ width: '6.5%' }} />
            <div className="h-full bg-yellow-500" style={{ width: '5%' }} />
            <div className="h-full bg-orange-500" style={{ width: '10%' }} />
            <div className="h-full bg-red-500" style={{ width: '60%' }} />
            
            {/* Pointer */}
            <motion.div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
              initial={{ left: 0 }}
              animate={{ left: `${Math.min(Math.max((result.bmi / 40) * 100, 0), 100)}%` }}
              transition={{ type: 'spring', damping: 15 }}
            />
          </div>
          
          <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
            <span>Underweight</span>
            <span>Normal</span>
            <span>Overweight</span>
            <span>Obese</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BMICalculator;
