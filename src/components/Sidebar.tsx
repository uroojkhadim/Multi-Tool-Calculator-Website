import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  Ruler, 
  Calendar, 
  DollarSign, 
  Percent, 
  Banknote, 
  X,
  History,
  Settings,
  HelpCircle,
  Share2
} from 'lucide-react';

type Tab = 'basic' | 'bmi' | 'age' | 'currency' | 'percentage' | 'loan';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeTab, setActiveTab }) => {
  const menuItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'basic', label: 'Basic Calculator', icon: <Calculator className="w-5 h-5" /> },
    { id: 'bmi', label: 'BMI Calculator', icon: <Ruler className="w-5 h-5" /> },
    { id: 'age', label: 'Age Tracker', icon: <Calendar className="w-5 h-5" /> },
    { id: 'currency', label: 'Currency Exchange', icon: <DollarSign className="w-5 h-5" /> },
    { id: 'percentage', label: 'Percent Tools', icon: <Percent className="w-5 h-5" /> },
    { id: 'loan', label: 'Loan Planner', icon: <Banknote className="w-5 h-5" /> },
  ];

  const secondaryItems = [
    { label: 'History', icon: <History className="w-5 h-5" /> },
    { label: 'Settings', icon: <Settings className="w-5 h-5" /> },
    { label: 'Support', icon: <HelpCircle className="w-5 h-5" /> },
    { label: 'Share', icon: <Share2 className="w-5 h-5" /> },
  ];

  const SidebarContent = (
    <div className="flex flex-col h-full p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center shadow-lg border border-white/10">
            <Calculator className="text-white w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">ProCalc</h2>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-white/5 rounded-xl transition-colors lg:hidden"
        >
          <X className="w-5 h-5 text-white/30" />
        </button>
      </div>

      {/* Main Menu */}
      <div className="flex-1 space-y-2 overflow-y-auto custom-scrollbar">
        <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-4 ml-3">Calculators</p>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              if (window.innerWidth < 1024) onClose();
            }}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
              activeTab === item.id 
                ? 'bg-accent-purple/20 text-white border border-accent-purple/20 shadow-[0_0_20px_rgba(139,92,246,0.1)]' 
                : 'text-white/40 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className={`transition-transform duration-300 group-hover:scale-110 ${
              activeTab === item.id ? 'text-accent-purple' : ''
            }`}>
              {item.icon}
            </div>
            <span className="text-sm font-medium tracking-wide">{item.label}</span>
            {activeTab === item.id && (
              <motion.div 
                layoutId="sidebarActiveIndicator"
                className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-purple shadow-[0_0_8px_rgba(139,92,246,0.8)]"
              />
            )}
          </button>
        ))}

        <div className="pt-8 space-y-2">
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-4 ml-3">App</p>
          {secondaryItems.map((item, idx) => (
            <button
              key={idx}
              className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-white/40 hover:bg-white/5 hover:text-white transition-all group"
            >
              <div className="group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <span className="text-sm font-medium tracking-wide">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-[10px] text-white/30 font-medium mb-1">PRO PLAN</p>
          <p className="text-xs text-white/60 font-semibold mb-3">Unlimited Calculations</p>
          <button className="w-full py-2 bg-accent-purple/20 hover:bg-accent-purple/30 text-accent-purple text-[11px] font-bold rounded-xl border border-accent-purple/20 transition-all uppercase tracking-widest">
            Manage Sub
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            />

            {/* Sidebar Panel */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-[#020617]/95 backdrop-blur-3xl border-r border-white/5 z-[70] flex flex-col lg:hidden shadow-2xl"
            >
              {SidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex flex-col w-[280px] bg-[#020617]/40 backdrop-blur-3xl border-r border-white/5 z-50 sticky top-0 h-screen">
        {SidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;
