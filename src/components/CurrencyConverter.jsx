import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHistory } from '../context/HistoryContext';
import { ArrowLeftRight, TrendingUp, RefreshCcw, Coins, DollarSign } from 'lucide-react';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('1');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [rates, setRates] = useState({});
  const [result, setResult] = useState(null);
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
    <div className="w-full max-w-lg mx-auto animate-in fade-in zoom-in duration-500">
      <div className="glass-card p-10 flex flex-col gap-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
              <Coins className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-1">Currency</h2>
              <p className="text-xs text-white/30 uppercase tracking-[0.2em] font-bold">Live Exchange Rates</p>
            </div>
          </div>
          <button 
            onClick={fetchRates}
            className={`p-3 rounded-2xl glass-button ${loading ? 'animate-spin' : ''}`}
          >
            <RefreshCcw className="w-5 h-5 opacity-40" />
          </button>
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] ml-1">Amount to Convert</label>
            <div className="relative group">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full h-24 bg-white/[0.03] border border-white/5 rounded-[2rem] px-10 text-5xl font-light focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all placeholder:text-white/10"
                placeholder="0.00"
              />
              <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-10 font-medium text-2xl tracking-tighter">
                {from}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 w-full space-y-3">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] ml-1">From</label>
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full h-16 premium-input text-xl appearance-none cursor-pointer"
              >
                {currencies.map(c => <option key={c} value={c} className="bg-slate-900 text-white">{c}</option>)}
              </select>
            </div>

            <motion.button
              whileHover={{ rotate: 180, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSwap}
              className="h-14 w-14 items-center justify-center glass-button mt-6 group hidden md:flex"
            >
              <ArrowLeftRight className="w-5 h-5 text-emerald-500/70 group-hover:text-emerald-500 transition-colors" />
            </motion.button>

            <div className="flex-1 w-full space-y-3">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] ml-1">To</label>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full h-16 premium-input text-xl appearance-none cursor-pointer"
              >
                {currencies.map(c => <option key={c} value={c} className="bg-slate-900 text-white">{c}</option>)}
              </select>
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
                <div className="relative z-10 flex flex-col items-center text-center text-white">
                  <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Market Rate
                  </div>
                  <div className="text-7xl font-bold tracking-tighter mb-3 flex items-baseline gap-3">
                    {result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    <span className="text-2xl font-medium opacity-20 tracking-normal">{to}</span>
                  </div>
                  <div className="px-4 py-1.5 bg-white/5 rounded-full text-[11px] opacity-30 font-semibold tracking-wide border border-white/5">
                    1 {from} = {rates[to]?.toFixed(4)} {to}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="w-full h-16 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 rounded-2xl text-lg font-semibold border border-emerald-500/20 transition-all shadow-xl"
          >
            Save to History
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
