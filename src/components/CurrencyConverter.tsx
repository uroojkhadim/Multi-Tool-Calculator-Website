import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useHistory } from '../context/HistoryContext';
import { DollarSign, ArrowLeftRight } from 'lucide-react';

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState('1');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [rates, setRates] = useState<Record<string, number>>({});
  const [result, setResult] = useState<number | null>(null);
  const { addHistory } = useHistory();

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'INR', 'CNY', 'BRL'];

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const data = await res.json();
        setRates(data.rates);
      } catch (err) {
        console.error('Failed to fetch rates', err);
      }
    };
    fetchRates();
  }, [from]);

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

  const saveHistory = () => {
    if (result) {
      addHistory({
        type: 'currency',
        expression: `${amount} ${from} to ${to}`,
        result: `${result.toFixed(2)} ${to}`,
      });
    }
  };

  return (
    <div className="glass-card w-full p-8 flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-emerald-500/20 rounded-2xl">
          <DollarSign className="w-6 h-6 text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Currency</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400 ml-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full h-14 bg-gray-200/50 dark:bg-gray-800/50 rounded-2xl px-6 text-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-gray-900 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400 ml-1">From</label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full h-14 bg-gray-200/50 dark:bg-gray-800/50 rounded-2xl px-4 text-xl focus:outline-none text-gray-900 dark:text-white"
            >
              {currencies.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <button
            onClick={handleSwap}
            className="h-14 w-14 flex items-center justify-center bg-gray-200/50 dark:bg-gray-800/50 rounded-full hover:bg-emerald-500/20 transition-all"
          >
            <ArrowLeftRight className="w-6 h-6 text-emerald-500" />
          </button>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400 ml-1">To</label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full h-14 bg-gray-200/50 dark:bg-gray-800/50 rounded-2xl px-4 text-xl focus:outline-none text-gray-900 dark:text-white"
            >
              {currencies.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {result !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-3xl text-center space-y-2 border border-emerald-500/20"
          >
            <div className="text-sm font-medium text-emerald-500 uppercase tracking-widest">Result</div>
            <div className="text-4xl font-black text-emerald-500">{result.toLocaleString(undefined, { maximumFractionDigits: 2 })} {to}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">1 {from} = {rates[to]?.toFixed(4)} {to}</div>
          </motion.div>
        )}

        <button
          onClick={saveHistory}
          className="w-full h-14 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl text-xl font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
        >
          Save to History
        </button>
      </div>
    </div>
  );
};

export default CurrencyConverter;
