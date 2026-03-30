import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useHistory } from '../context/HistoryContext';
import { calculate, formatNumber } from '../utils/math';
import { Delete, Hash, Minus, Plus, X, Command, Percent } from 'lucide-react';

const BasicCalculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const { addHistory } = useHistory();

  const handleInput = (val) => {
    setExpression(prev => prev + val);
  };

  const handleClear = () => {
    setExpression('');
    setResult('');
  };

  const handleDelete = () => {
    setExpression(prev => prev.slice(0, -1));
  };

  const handleEquals = () => {
    if (!expression) return;
    const calcResult = calculate(expression);
    const formatted = formatNumber(calcResult, 8);
    setResult(formatted);
    addHistory({
      type: 'basic',
      expression,
      result: formatted,
    });
  };

  const buttons = [
    { label: 'AC', action: handleClear, type: 'utility' },
    { label: 'C', action: handleDelete, type: 'utility' },
    { label: '%', action: () => handleInput('%'), type: 'utility' },
    { label: '/', action: () => handleInput('/'), type: 'operator' },
    { label: '7', action: () => handleInput('7'), type: 'number' },
    { label: '8', action: () => handleInput('8'), type: 'number' },
    { label: '9', action: () => handleInput('9'), type: 'number' },
    { label: '*', action: () => handleInput('*'), type: 'operator' },
    { label: '4', action: () => handleInput('4'), type: 'number' },
    { label: '5', action: () => handleInput('5'), type: 'number' },
    { label: '6', action: () => handleInput('6'), type: 'number' },
    { label: '-', action: () => handleInput('-'), type: 'operator' },
    { label: '1', action: () => handleInput('1'), type: 'number' },
    { label: '2', action: () => handleInput('2'), type: 'number' },
    { label: '3', action: () => handleInput('3'), type: 'number' },
    { label: '+', action: () => handleInput('+'), type: 'operator' },
    { label: '0', action: () => handleInput('0'), type: 'number', span: 2 },
    { label: '.', action: () => handleInput('.'), type: 'number' },
    { label: '=', action: handleEquals, type: 'equals' },
  ];

  return (
    <div className="w-full max-w-sm mx-auto animate-in fade-in zoom-in duration-500">
      <div className="glass-card overflow-hidden">
        {/* Display */}
        <div className="p-10 flex flex-col items-end gap-3 min-h-[180px] justify-end bg-gradient-to-b from-white/[0.02] to-transparent">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white/40 text-lg font-medium tracking-tight h-8 truncate w-full text-right"
          >
            {expression || '0'}
          </motion.div>
          <motion.div 
            key={result}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-white text-6xl font-light tracking-tighter truncate w-full text-right"
          >
            {result || '0'}
          </motion.div>
        </div>

        {/* Keypad */}
        <div className="p-6 grid grid-cols-4 gap-3">
          {buttons.map((btn, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={btn.action}
              className={`
                h-16 flex items-center justify-center text-xl font-medium rounded-2xl transition-all
                ${btn.span === 2 ? 'col-span-2' : ''}
                ${btn.type === 'number' ? 'bg-white/5 hover:bg-white/10 text-white' : ''}
                ${btn.type === 'operator' ? 'bg-accent-purple/10 border border-accent-purple/20 text-accent-purple hover:bg-accent-purple/20' : ''}
                ${btn.type === 'utility' ? 'bg-white/10 text-white/60 hover:bg-white/20' : ''}
                ${btn.type === 'equals' ? 'bg-accent-purple text-white shadow-lg shadow-accent-purple/30' : ''}
              `}
            >
              {btn.label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BasicCalculator;
