import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHistory } from '../context/HistoryContext';
import { Banknote, CreditCard, PieChart, Wallet, Calendar as CalendarIcon, Info, DollarSign } from 'lucide-react';

const LoanCalculator: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('');
  const [termType, setTermType] = useState<'months' | 'years'>('months');
  const [result, setResult] = useState<{ emi: string; totalInterest: string; totalPayment: string; yearlyEMI: string } | null>(null);
  const { addHistory } = useHistory();

  const calculateEMI = useCallback(() => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / (12 * 100);
    const n = termType === 'years' ? parseFloat(term) * 12 : parseFloat(term);

    if (p > 0 && r > 0 && n > 0) {
      const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = emi * n;
      const totalInterest = totalPayment - p;

      const formattedRes = {
        emi: emi.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        totalInterest: totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        totalPayment: totalPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        yearlyEMI: (emi * 12).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      };

      setResult(formattedRes);

      addHistory({
        type: 'loan',
        expression: `Loan: ${p}, Rate: ${rate}%, Term: ${n}m`,
        result: `EMI: ${formattedRes.emi}`,
      });
    }
  }, [amount, rate, term, termType, addHistory]);

  return (
    <div className="glass-card w-full p-8 flex flex-col gap-10 shadow-2xl relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent-blue/10 blur-3xl rounded-full" />
      
      <div className="flex items-center gap-5">
        <div className="relative">
          <div className="absolute inset-0 bg-accent-blue blur-md opacity-20" />
          <div className="relative p-3.5 bg-white/5 border border-white/10 rounded-[1.25rem]">
            <Banknote className="w-6 h-6 text-accent-blue" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Loan EMI</h2>
          <p className="opacity-30 text-xs font-medium uppercase tracking-widest">Financing Planner</p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="space-y-3">
          <label className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
            <Wallet className="w-3.5 h-3.5" /> Principal Amount
          </label>
          <div className="relative group">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full h-20 bg-white/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 rounded-[2rem] px-10 text-4xl font-light focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:bg-white/[0.06] transition-all placeholder:text-black/10 dark:placeholder:text-white/10"
              placeholder="0.00"
            />
            <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-10 font-medium text-2xl tracking-tighter">
              USD
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
              <PieChart className="w-3.5 h-3.5" /> Interest Rate (%)
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="premium-input"
              placeholder="0.0"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
              <CalendarIcon className="w-3.5 h-3.5" /> Loan Duration
            </label>
            <div className="relative">
              <input
                type="number"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="premium-input pr-28"
                placeholder="0"
              />
              <button
                onClick={() => setTermType(prev => prev === 'years' ? 'months' : 'years')}
                className="absolute right-2 top-2 bottom-2 px-4 bg-black/5 dark:bg-white/10 text-current opacity-70 rounded-xl text-[10px] font-bold uppercase hover:bg-black/10 dark:hover:bg-white/20 transition-all border border-black/5 dark:border-white/5"
              >
                {termType}
              </button>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={calculateEMI}
          className="w-full h-16 bg-accent-blue/10 hover:bg-accent-blue/20 text-accent-blue rounded-2xl text-lg font-semibold border border-accent-blue/20 transition-all shadow-xl"
        >
          Generate Repayment Plan
        </motion.button>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              <div className="p-10 bg-gradient-to-br from-accent-blue/10 to-transparent rounded-[3rem] border border-accent-blue/20 relative overflow-hidden group">
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="text-[10px] font-bold text-accent-blue uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                    <CreditCard className="w-3.5 h-3.5" />
                    Monthly Repayment
                  </div>
                  <div className="text-7xl font-bold tracking-tighter flex items-baseline gap-2">
                    <span className="text-2xl font-medium opacity-20 tracking-normal">$</span>
                    {result.emi}
                  </div>
                </div>
                {/* Decorative mesh */}
                <div className="absolute -left-10 -top-10 w-32 h-32 bg-accent-blue/5 rounded-full blur-3xl group-hover:bg-accent-blue/10 transition-colors" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-8 bg-black/[0.03] dark:bg-white/[0.03] rounded-[2.5rem] border border-black/5 dark:border-white/5 flex flex-col items-center text-center group hover:border-black/10 dark:hover:border-white/10 transition-colors">
                  <div className="text-2xl font-bold tracking-tight">${result.totalInterest}</div>
                  <div className="text-[9px] font-bold opacity-20 uppercase tracking-[0.2em] mt-2">Total Interest</div>
                </div>
                <div className="p-8 bg-black/[0.03] dark:bg-white/[0.03] rounded-[2.5rem] border border-black/5 dark:border-white/5 flex flex-col items-center text-center group hover:border-black/10 dark:hover:border-white/10 transition-colors">
                  <div className="text-2xl font-bold tracking-tight">${result.totalPayment}</div>
                  <div className="text-[9px] font-bold opacity-20 uppercase tracking-[0.2em] mt-2">Total Payable</div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3 opacity-20">
                <Info className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-[0.1em]">Figures are estimates based on standard EMI logic</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoanCalculator;
