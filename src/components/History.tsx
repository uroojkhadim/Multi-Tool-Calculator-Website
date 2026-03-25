import React from 'react';
import { useHistory } from '../context/HistoryContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, History as HistoryIcon, Clock, X } from 'lucide-react';

const History: React.FC = () => {
  const { history, clearHistory, deleteItem } = useHistory();

  return (
    <div className="glass-card w-full p-8 flex flex-col gap-6 h-[600px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gray-500/20 rounded-2xl">
            <HistoryIcon className="w-6 h-6 text-gray-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">History</h2>
        </div>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="p-3 text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
            title="Clear All"
          >
            <Trash2 className="w-6 h-6" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {history.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 gap-4 opacity-50">
            <HistoryIcon className="w-16 h-16" />
            <p className="text-xl font-medium">No history yet</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {history.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative p-5 bg-white/50 dark:bg-gray-800/50 rounded-3xl border border-white/20 dark:border-white/5 hover:border-orange-500/30 transition-all shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${
                    item.type === 'basic' ? 'bg-orange-500/20 text-orange-500' :
                    item.type === 'bmi' ? 'bg-blue-500/20 text-blue-500' :
                    item.type === 'age' ? 'bg-purple-500/20 text-purple-500' :
                    item.type === 'currency' ? 'bg-emerald-500/20 text-emerald-500' :
                    item.type === 'percentage' ? 'bg-rose-500/20 text-rose-500' :
                    'bg-indigo-500/20 text-indigo-500'
                  }`}>
                    {item.type}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                    <Clock className="w-3 h-3" />
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 truncate">
                  {item.expression}
                </div>
                <div className="text-2xl font-black text-gray-900 dark:text-white">
                  {item.result}
                </div>

                <button
                  onClick={() => deleteItem(item.id)}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default History;
