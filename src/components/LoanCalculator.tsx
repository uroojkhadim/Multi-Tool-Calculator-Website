import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useHistory } from '../context/HistoryContext';
import { Banknote } from 'lucide-react';

const LoanCalculator: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('');
  const [result, setResult] = useState<{ emi: string; totalInterest: string; totalPayment: string } | null>(null);
  const { addHistory } = useHistory();

  const calculateEMI = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / (12 * 100); // monthly interest rate
    const n = parseFloat(term); // months

    if (p > 0 && r > 0 && n > 0) {
      const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = emi * n;
      const totalInterest = totalPayment - p;

      setResult({
        emi: emi.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
      });

      addHistory({
        type: 'loan',
        expression: `Loan: ${p}, Rate: ${rate}%, Term: ${n}m`,
        result: `EMI: ${emi.toFixed(2)}`,
      });
    }
  };

  return (
    <div className="glass-card w-full p-8 flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-indigo-500/20 rounded-2xl">
          <Banknote className="w-6 h-6 text-indigo-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Loan EMI</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400 ml-1">Loan Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full h-14 bg-gray-200/50 dark:bg-gray-800/50 rounded-2xl px-6 text-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-gray-900 dark:text-white"
            placeholder="10000"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400 ml-1">Interest Rate (%)</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full h-14 bg-gray-200/50 dark:bg-gray-800/50 rounded-2xl px-6 text-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-gray-900 dark:text-white"
              placeholder="10"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400 ml-1">Term (Months)</label>
            <input
              type="number"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="w-full h-14 bg-gray-200/50 dark:bg-gray-800/50 rounded-2xl px-6 text-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-gray-900 dark:text-white"
              placeholder="12"
            />
          </div>
        </div>

        <button
          onClick={calculateEMI}
          className="w-full h-14 bg-indigo-500 hover:bg-indigo-400 text-white rounded-2xl text-xl font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
        >
          Calculate EMI
        </button>

        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <div className="p-6 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-3xl text-center border border-indigo-500/20">
              <div className="text-sm font-medium text-indigo-500 uppercase tracking-widest">Monthly EMI</div>
              <div className="text-4xl font-black text-indigo-500">${result.emi}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-100/50 dark:bg-gray-900/50 rounded-2xl text-center border border-white/20">
                <div className="text-xl font-bold text-gray-900 dark:text-white">${result.totalInterest}</div>
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Total Interest</div>
              </div>
              <div className="p-4 bg-gray-100/50 dark:bg-gray-900/50 rounded-2xl text-center border border-white/20">
                <div className="text-xl font-bold text-gray-900 dark:text-white">${result.totalPayment}</div>
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Total Payment</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LoanCalculator;
