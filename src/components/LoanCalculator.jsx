import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Info, TrendingUp, DollarSign, Calendar, Percent } from 'lucide-react';

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(10.5);
  const [tenure, setTenure] = useState(5); // in years
  
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    // EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
    const p = loanAmount;
    const r = interestRate / 12 / 100; // Monthly interest rate
    const n = tenure * 12; // Total months
    
    if (r === 0) {
      setEmi(p / n);
      setTotalInterest(0);
      setTotalPayment(p);
    } else {
      const calculatedEmi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const calculatedTotalPayment = calculatedEmi * n;
      const calculatedTotalInterest = calculatedTotalPayment - p;
      
      setEmi(calculatedEmi);
      setTotalPayment(calculatedTotalPayment);
      setTotalInterest(calculatedTotalInterest);
    }
  }, [loanAmount, interestRate, tenure]);

  return (
    <div className="w-full max-w-lg mx-auto animate-in fade-in zoom-in duration-500 pb-10">
      <div className="glass-card p-10 flex flex-col gap-10">
        {/* Header */}
        <div className="flex items-center gap-5">
          <div className="p-4 bg-accent-blue/10 border border-accent-blue/20 rounded-2xl">
            <CreditCard className="w-6 h-6 text-accent-blue" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white mb-1">Loan EMI</h2>
            <p className="text-xs text-white/30 uppercase tracking-[0.2em] font-bold">Financial Planner</p>
          </div>
        </div>

        {/* Sliders Area */}
        <div className="space-y-12">
          {/* Loan Amount */}
          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] flex items-center gap-2">
                <DollarSign className="w-3.5 h-3.5" /> Amount ($)
              </label>
              <span className="text-2xl font-bold text-white tracking-widest">{loanAmount.toLocaleString()}</span>
            </div>
            <input 
              type="range" min="1000" max="1000000" step="1000" value={loanAmount} 
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer accent-accent-blue"
            />
          </div>

          {/* Interest Rate */}
          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] flex items-center gap-2">
                <Percent className="w-3.5 h-3.5" /> Interest Rate (%)
              </label>
              <span className="text-2xl font-bold text-white tracking-widest">{interestRate}%</span>
            </div>
            <input 
              type="range" min="1" max="30" step="0.5" value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer accent-accent-purple"
            />
          </div>

          {/* Tenure */}
          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" /> Tenure (Years)
              </label>
              <span className="text-2xl font-bold text-white tracking-widest">{tenure} Yrs</span>
            </div>
            <input 
              type="range" min="1" max="30" value={tenure} 
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer accent-accent-pink"
            />
          </div>
        </div>

        {/* Results Info Grid */}
        <div className="grid grid-cols-1 gap-6 pt-6">
          <motion.div 
            layout
            className="p-10 bg-gradient-to-br from-accent-blue/[0.08] to-transparent border border-white/5 rounded-[3rem] text-center"
          >
            <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mb-4">Monthly EMI Payment</div>
            <div className="text-6xl font-bold tracking-tighter text-white mb-2">
              ${emi.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
            <p className="text-[11px] text-white/30">Based on monthly compounding</p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center">
              <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Total Interest</div>
              <div className="text-xl font-bold text-white/90 tracking-tight">${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center">
              <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Total Payable</div>
              <div className="text-xl font-bold text-white/90 tracking-tight">${totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            </div>
          </div>
        </div>

        {/* Advisory box */}
        <div className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl flex items-start gap-4">
          <Info className="w-5 h-5 text-white/20 mt-1 shrink-0" />
          <p className="text-[11px] text-white/30 leading-relaxed italic">
            EMI calculations are indicative and may vary based on financial institution policies, taxes, and other applicable fees.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
