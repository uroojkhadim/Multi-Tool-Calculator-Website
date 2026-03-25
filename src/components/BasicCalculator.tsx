import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHistory } from '../context/HistoryContext';
import { Delete, History as HistoryIcon } from 'lucide-react';

const BasicCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const { addHistory } = useHistory();

  const handleNumber = (num: string) => {
    setDisplay(prev => (prev === '0' ? num : prev + num));
  };

  const handleOperator = (op: string) => {
    setEquation(prev => prev + display + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const handleBackspace = () => {
    setDisplay(prev => (prev.length > 1 ? prev.slice(0, -1) : '0'));
  };

  const handleCalculate = () => {
    try {
      const fullEquation = equation + display;
      // Replace symbols for evaluation
      const evalStr = fullEquation.replace(/×/g, '*').replace(/÷/g, '/');
      // eslint-disable-next-line no-new-func
      const result = new Function(`return ${evalStr}`)();
      
      if (!isFinite(result)) throw new Error('Result not finite');
      
      const formattedResult = result.toString();
      addHistory({
        type: 'basic',
        expression: fullEquation,
        result: formattedResult,
      });
      
      setDisplay(formattedResult);
      setEquation('');
    } catch (error) {
      setDisplay('Error');
      setTimeout(() => setDisplay('0'), 1500);
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/[0-9]/.test(e.key)) handleNumber(e.key);
      if (['+', '-', '*', '/'].includes(e.key)) {
        const op = e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key;
        handleOperator(op);
      }
      if (e.key === 'Enter' || e.key === '=') handleCalculate();
      if (e.key === 'Escape') handleClear();
      if (e.key === 'Backspace') handleBackspace();
      if (e.key === '.') handleNumber('.');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [display, equation]);

  const buttons = [
    { label: 'AC', type: 'func', onClick: handleClear },
    { label: '±', type: 'func', onClick: () => setDisplay(prev => (prev.startsWith('-') ? prev.slice(1) : '-' + prev)) },
    { label: '%', type: 'func', onClick: () => setDisplay(prev => (parseFloat(prev) / 100).toString()) },
    { label: '÷', type: 'op', onClick: () => handleOperator('÷') },
    { label: '7', type: 'num', onClick: () => handleNumber('7') },
    { label: '8', type: 'num', onClick: () => handleNumber('8') },
    { label: '9', type: 'num', onClick: () => handleNumber('9') },
    { label: '×', type: 'op', onClick: () => handleOperator('×') },
    { label: '4', type: 'num', onClick: () => handleNumber('4') },
    { label: '5', type: 'num', onClick: () => handleNumber('5') },
    { label: '6', type: 'num', onClick: () => handleNumber('6') },
    { label: '-', type: 'op', onClick: () => handleOperator('-') },
    { label: '1', type: 'num', onClick: () => handleNumber('1') },
    { label: '2', type: 'num', onClick: () => handleNumber('2') },
    { label: '3', type: 'num', onClick: () => handleNumber('3') },
    { label: '+', type: 'op', onClick: () => handleOperator('+') },
    { label: '0', type: 'num', onClick: () => handleNumber('0'), className: 'col-span-2' },
    { label: '.', type: 'num', onClick: () => handleNumber('.') },
    { label: '=', type: 'op', onClick: handleCalculate },
  ];

  return (
    <div className="glass-card w-full p-6 flex flex-col gap-6">
      <div className="flex flex-col items-end gap-2 px-2 py-4 h-32 justify-end">
        <div className="text-gray-500 dark:text-gray-400 text-lg font-medium overflow-hidden whitespace-nowrap">
          {equation}
        </div>
        <motion.div 
          key={display}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-5xl font-bold tracking-tighter truncate w-full text-right"
        >
          {display}
        </motion.div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {buttons.map((btn, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.95 }}
            onClick={btn.onClick}
            className={`
              h-16 rounded-2xl flex items-center justify-center text-xl font-semibold transition-all duration-200
              ${btn.type === 'num' ? 'bg-gray-200/50 dark:bg-gray-800/50 hover:bg-gray-300/50 dark:hover:bg-gray-700/50 text-gray-900 dark:text-white' : ''}
              ${btn.type === 'op' ? 'bg-orange-500 hover:bg-orange-400 text-white shadow-lg shadow-orange-500/20' : ''}
              ${btn.type === 'func' ? 'bg-gray-400/50 dark:bg-gray-600/50 hover:bg-gray-500/50 dark:hover:bg-gray-500/50 text-black dark:text-white' : ''}
              ${btn.className || ''}
            `}
          >
            {btn.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default BasicCalculator;
