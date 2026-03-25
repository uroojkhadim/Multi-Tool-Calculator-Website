import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHistory } from '../context/HistoryContext';

const BasicCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isNewNumber, setIsNewNumber] = useState(true);
  const { addHistory } = useHistory();
  const displayRef = useRef<HTMLDivElement>(null);

  const handleNumber = useCallback((num: string) => {
    setDisplay(prev => {
      if (isNewNumber) {
        setIsNewNumber(false);
        return num === '.' ? '0.' : num;
      }
      if (num === '.' && prev.includes('.')) return prev;
      if (prev === '0' && num !== '.') return num;
      if (prev.length >= 9) return prev; // iPhone limit-ish
      return prev + num;
    });
  }, [isNewNumber]);

  const handleOperator = useCallback((op: string) => {
    setEquation(display + ' ' + op + ' ');
    setIsNewNumber(true);
  }, [display]);

  const handleClear = useCallback(() => {
    setDisplay('0');
    setEquation('');
    setIsNewNumber(true);
  }, []);

  const handleCalculate = useCallback(() => {
    if (!equation) return;
    try {
      const fullEquation = equation + display;
      const evalStr = fullEquation.replace(/×/g, '*').replace(/÷/g, '/');
      // eslint-disable-next-line no-new-func
      const result = new Function(`return ${evalStr}`)();
      
      if (!isFinite(result)) throw new Error('Result not finite');
      
      let formattedResult = Number(result.toFixed(8)).toString();
      if (formattedResult.length > 9) {
        formattedResult = result.toExponential(4);
      }
      
      addHistory({
        type: 'basic',
        expression: fullEquation,
        result: formattedResult,
      });
      
      setDisplay(formattedResult);
      setEquation('');
      setIsNewNumber(true);
    } catch (error) {
      setDisplay('Error');
      setTimeout(() => setDisplay('0'), 1500);
    }
  }, [display, equation, addHistory]);

  const handlePercent = useCallback(() => {
    setDisplay(prev => (parseFloat(prev) / 100).toString());
  }, []);

  const handleToggleSign = useCallback(() => {
    setDisplay(prev => (prev.startsWith('-') ? prev.slice(1) : '-' + prev));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/[0-9]/.test(e.key)) handleNumber(e.key);
      if (['+', '-', '*', '/'].includes(e.key)) {
        const ops: Record<string, string> = { '*': '×', '/': '÷', '+': '+', '-': '-' };
        handleOperator(ops[e.key]);
      }
      if (e.key === 'Enter' || e.key === '=') handleCalculate();
      if (e.key === 'Escape') handleClear();
      if (e.key === '.') handleNumber('.');
      if (e.key === '%') handlePercent();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNumber, handleOperator, handleCalculate, handleClear, handlePercent]);

  const buttons = [
    { label: display === '0' && !equation ? 'AC' : 'C', type: 'func', onClick: handleClear },
    { label: '±', type: 'func', onClick: handleToggleSign },
    { label: '%', type: 'func', onClick: handlePercent },
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
    { label: '0', type: 'num', onClick: () => handleNumber('0'), className: 'col-span-2 !aspect-auto !rounded-[2.5rem] px-8 justify-start' },
    { label: '.', type: 'num', onClick: () => handleNumber('.') },
    { label: '=', type: 'op', onClick: handleCalculate },
  ];

  // Dynamically scale text based on length
  const getFontSize = (text: string) => {
    if (text.length <= 6) return 'text-8xl';
    if (text.length <= 7) return 'text-7xl';
    if (text.length <= 8) return 'text-6xl';
    return 'text-5xl';
  };

  return (
    <div className="glass-card w-full max-w-[380px] mx-auto p-5 flex flex-col gap-4 shadow-2xl border-white/10">
      {/* Display */}
      <div className="flex flex-col items-end justify-end px-4 pt-16 pb-4 h-56 rounded-[2rem] mb-2">
        <div className="text-white/30 text-xl font-light mb-1 h-8 overflow-hidden tracking-wide">
          {equation}
        </div>
        <div 
          ref={displayRef}
          className={`font-light tracking-tighter text-white transition-all duration-200 w-full text-right ${getFontSize(display)}`}
        >
          {display}
        </div>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-4 gap-3.5">
        {buttons.map((btn, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.92 }}
            onClick={btn.onClick}
            className={`
              calc-btn text-3xl font-light
              ${btn.type === 'num' ? 'calc-btn-number' : ''}
              ${btn.type === 'op' ? 'calc-btn-op' : ''}
              ${btn.type === 'func' ? 'calc-btn-func !bg-white/20' : ''}
              ${btn.className || ''}
            `}
          >
            <span className="relative z-10">{btn.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default BasicCalculator;
