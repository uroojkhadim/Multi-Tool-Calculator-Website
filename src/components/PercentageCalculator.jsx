import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Percent, TrendingUp, TrendingDown, Info, Equal } from 'lucide-react';

const PercentageCalculator = () => {
  const [activeMode, setActiveMode] = useState('value');

  const PercentageCard = ({ type, title, label1, label2, value1, setValue1, value2, setValue2, result, icon }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-card p-10 flex flex-col gap-10"
    >
      <div className="flex items-center gap-5">
        <div className={`p-4 bg-accent-pink/10 border border-accent-pink/20 rounded-2xl`}>
          {icon}
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white mb-1">{title}</h2>
          <p className="text-xs text-white/30 uppercase tracking-[0.2em] font-bold">Calculation Mode</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] ml-1">{label1}</label>
          <input
            type="number"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            className="w-full h-18 premium-input text-2xl"
          />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] ml-1">{label2}</label>
          <input
            type="number"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            className="w-full h-18 premium-input text-2xl"
          />
        </div>
      </div>

      <div className="p-8 bg-white/5 border border-white/5 rounded-[2rem] flex flex-col items-center gap-4 text-center mt-4">
        <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] mb-2">Calculation Result</div>
        <div className="text-6xl font-bold tracking-tighter text-white">
          {result}
        </div>
      </div>
    </motion.div>
  );

  const ModeValue = () => {
    const [percent, setPercent] = useState('10');
    const [amount, setAmount] = useState('100');
    const result = (parseFloat(percent) / 100) * parseFloat(amount);
    return (
      <PercentageCard
        title="Value of Percent"
        icon={<Percent className="w-6 h-6 text-accent-pink" />}
        label1="Percentage (%)"
        value1={percent}
        setValue1={setPercent}
        label2="Of Value"
        value2={amount}
        setValue2={setAmount}
        result={isNaN(result) ? '0' : result.toLocaleString()}
      />
    );
  };

  const ModeDifference = () => {
    const [val1, setVal1] = useState('50');
    const [val2, setVal2] = useState('100');
    const diff = ((parseFloat(val2) - parseFloat(val1)) / parseFloat(val1)) * 100;
    const isIncrease = diff >= 0;
    return (
      <PercentageCard
        title="Percent Increase / Decrease"
        icon={diff >= 0 ? <TrendingUp className="w-6 h-6 text-emerald-400" /> : <TrendingDown className="w-6 h-6 text-rose-400" />}
        label1="Initial Value"
        value1={val1}
        setValue1={setVal1}
        label2="Final Value"
        value2={val2}
        setValue2={setVal2}
        result={isNaN(diff) ? '0%' : `${diff > 0 ? '+' : ''}${diff.toFixed(2)}%`}
      />
    );
  };

  return (
    <div className="w-full max-w-lg mx-auto animate-in fade-in zoom-in duration-500 space-y-8 pb-10">
      {/* Mode Selector */}
      <div className="flex p-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl gap-2">
        {['value', 'diff'].map((mode) => (
          <button
            key={mode}
            onClick={() => setActiveMode(mode)}
            className={`flex-1 py-3 px-4 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all relative ${
              activeMode === mode ? 'text-white' : 'text-white/30 hover:text-white/60'
            }`}
          >
            {activeMode === mode && (
              <motion.div
                layoutId="percent-mode"
                className="absolute inset-0 bg-accent-pink/20 border border-accent-pink/30 rounded-2xl"
              />
            )}
            <span className="relative z-10">{mode === 'value' ? 'Percentage Value' : 'Increase / Decrease'}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeMode === 'value' ? <ModeValue key="value" /> : <ModeDifference key="diff" />}
      </AnimatePresence>

      <div className="flex gap-4 p-6 glass-card border-white/5 opacity-50">
        <Info className="w-5 h-5 text-white/40 mt-1 shrink-0" />
        <p className="text-[11px] text-white/40 leading-relaxed italic">
          Use these tools to calculate values based on percentages or determine the percentage difference between two numerical points.
        </p>
      </div>
    </div>
  );
};

export default PercentageCalculator;
