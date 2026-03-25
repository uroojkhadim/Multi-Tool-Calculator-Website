import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHistory } from '../context/HistoryContext';
import { DollarSign, ArrowLeftRight, TrendingUp, RefreshCcw, Coins } from 'lucide-react';

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState('1');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [rates, setRates] = useState<Record<string, number>>({});
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const { addHistory } = useHistory();

  const currencies = [
    'USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'INR', 'CNY', 'BRL', 'AED', 'CHF', 'HKD', 'SGD', 'KRW', 'MXN'
  ];

  const fetchRates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
      const data = await res.json();
      setRates(data.rates);
    } catch (err) {
      console.error('Failed to fetch rates', err);
    } finally {
      setLoading(false);
    }
  }, [from]);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  useEffect(() => {
    if (rates[to]) {
      const converted = parseFloat(amount) * rates[to];
      setResult(converted);
    }
  }, [amount, to, rates]);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSave = () => {
    if (result) {
      addHistory({
        type: 'currency',
        expression: `${amount} ${from} to ${to}`,
        result: `${result.toFixed(2)} ${to}`,
      });
    }
  };

  return (
    <div className="glass-card w-full p-8 flex flex-col gap-10 shadow-2xl relative overflow-hidden border-white/10">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 blur-3xl rounded-full" />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500 blur-md opacity-20" />
            <div className="relative p-3.5 bg-white/5 border border-white/10 rounded-[1.25rem]">
              <Coins className="w-6 h-6 text-emerald-500" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white tracking-tight">Currency</h2>
            <p className="text-white/30 text-xs font-medium uppercase tracking-widest">Live Exchange Rates</p>
          </div>
        </div>
        <button 
          onClick={fetchRates}
          className={`p-2.5 hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-white/5 ${loading ? 'animate-spin' : ''}`}
        >
          <RefreshCcw className="w-5 h-5 text-white/20" />
        </button>
      </div>

      <div className="space-y-8">
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">Amount to Convert</label>
          <div className="relative group">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full h-24 bg-white/[0.03] border border-white/5 rounded-[2rem] px-10 text-5xl font-light text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:bg-white/[0.06] transition-all placeholder:text-white/10"
              placeholder="0.00"
            />
            <div className="absolute right-10 top-1/2 -translate-y-1/2 text-white/10 font-medium text-2xl tracking-tighter">
              {from}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 w-full space-y-3">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">From</label>
            <div className="relative">
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full h-16 bg-white/[0.03] border border-white/5 rounded-2xl px-6 text-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all appearance-none cursor-pointer"
              >
                {currencies.map(c => <option key={c} value={c} className="bg-[#0f172a] text-white">{c}</option>)}
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                <ArrowLeftRight className="w-4 h-4 rotate-90 md:rotate-0" />
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ rotate: 180, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSwap}
            className="hidden md:flex h-14 w-14 items-center justify-center bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/10 group mt-6"
          >
            <ArrowLeftRight className="w-5 h-5 text-emerald-500/70 group-hover:text-emerald-500 transition-colors" />
          </motion.button>

          <div className="flex-1 w-full space-y-3">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">To</label>
            <div className="relative">
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full h-16 bg-white/[0.03] border border-white/5 rounded-2xl px-6 text-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all appearance-none cursor-pointer"
              >
                {currencies.map(c => <option key={c} value={c} className="bg-[#0f172a] text-white">{c}</option>)}
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                <ArrowLeftRight className="w-4 h-4 rotate-90 md:rotate-0" />
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {result !== null && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-10 bg-gradient-to-br from-emerald-500/[0.08] to-transparent rounded-[3rem] border border-emerald-500/20 relative overflow-hidden group"
            >
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Market Rate
                </div>
                <div className="text-7xl font-bold text-white tracking-tighter mb-3 flex items-baseline gap-3">
                  {result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  <span className="text-2xl font-medium text-white/20 tracking-normal">{to}</span>
                </div>
                <div className="px-4 py-1.5 bg-white/5 rounded-full text-[11px] text-white/30 font-semibold tracking-wide border border-white/5">
                  1 {from} = {rates[to]?.toFixed(4)} {to}
                </div>
              </div>
              {/* Decorative mesh */}
              <div className="absolute -left-10 -top-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          className="w-full h-16 bg-white/5 hover:bg-white/10 text-white rounded-2xl text-lg font-semibold border border-white/10 transition-all shadow-xl"
        >
          Save to History
        </motion.button>
      </div>
    </div>
  );
};

export default CurrencyConverter;
