import React from 'react';
import { useHistory } from '../context/HistoryContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, History as HistoryIcon, Clock, X, Info } from 'lucide-react';

const History: React.FC = () => {
  const { history, clearHistory, deleteItem } = useHistory();

  return (
    <div className="glass-card w-full p-8 flex flex-col gap-10 shadow-2xl relative overflow-hidden border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="absolute inset-0 bg-accent-purple blur-md opacity-20" />
            <div className="relative p-3.5 bg-white/5 border border-white/10 rounded-[1.25rem]">
              <HistoryIcon className="w-6 h-6 text-accent-purple" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white tracking-tight">Activity</h2>
            <p className="text-white/30 text-xs font-medium uppercase tracking-widest">Recent Calculations</p>
          </div>
        </div>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="p-3 text-rose-500/60 hover:text-rose-500 hover:bg-rose-500/10 rounded-2xl transition-all border border-transparent hover:border-rose-500/20"
            title="Clear All"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar min-h-[400px]">
        {history.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-white/20 gap-6 opacity-50 py-20">
            <div className="p-6 bg-white/5 rounded-full border border-white/5">
              <HistoryIcon className="w-12 h-12" />
            </div>
            <p className="text-lg font-medium tracking-wide">No history items found</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {history.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative p-6 bg-white/[0.03] hover:bg-white/[0.06] rounded-[2rem] border border-white/5 hover:border-white/10 transition-all shadow-xl"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border ${
                    item.type === 'basic' ? 'bg-accent-purple/10 text-accent-purple border-accent-purple/20' :
                    item.type === 'bmi' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                    item.type === 'age' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    item.type === 'currency' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    item.type === 'percentage' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                    'bg-white/10 text-white/60 border-white/20'
                  }`}>
                    {item.type}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-white/20">
                    <Clock className="w-3 h-3" />
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-medium text-white/30 truncate pr-8">
                    {item.expression}
                  </div>
                  <div className="text-3xl font-light tracking-tighter text-white">
                    {item.result}
                  </div>
                </div>

                <button
                  onClick={() => deleteItem(item.id)}
                  className="absolute top-6 right-6 p-2 text-white/10 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      <div className="pt-6 border-t border-white/5 flex items-center justify-center gap-3 text-white/20">
        <Info className="w-3.5 h-3.5" />
        <span className="text-[10px] font-bold uppercase tracking-[0.1em]">History is stored locally on your device</span>
      </div>
    </div>
  );
};

export default History;
