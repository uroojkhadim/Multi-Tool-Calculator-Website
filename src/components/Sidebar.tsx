import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
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
} from 'lucide-react';

type Tab = 'basic' | 'bmi' | 'age' | 'currency' | 'percentage' | 'loan' | 'history' | 'settings' | 'support';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeTab, setActiveTab }) => {
  const { theme } = useTheme();
  const menuItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'basic', label: 'Basic Calculator', icon: <Calculator className="w-5 h-5" /> },
    { id: 'bmi', label: 'BMI Calculator', icon: <Ruler className="w-5 h-5" /> },
    { id: 'age', label: 'Age Tracker', icon: <Calendar className="w-5 h-5" /> },
    { id: 'currency', label: 'Currency Exchange', icon: <DollarSign className="w-5 h-5" /> },
    { id: 'percentage', label: 'Percent Tools', icon: <Percent className="w-5 h-5" /> },
    { id: 'loan', label: 'Loan Planner', icon: <Banknote className="w-5 h-5" /> },
  ];

  const secondaryItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'history', label: 'History', icon: <History className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
    { id: 'support', label: 'Support', icon: <HelpCircle className="w-5 h-5" /> },
  ];

  const SidebarContent = (
    <div className="flex flex-col h-full p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center shadow-lg border border-white/10">
            <Calculator className="text-white w-5 h-5" />
          </div>
          <h2 className={`text-xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-black'}`}>ProCalc</h2>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors lg:hidden"
        >
          <X className={`w-5 h-5 ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`} />
        </button>
      </div>

      {/* Main Menu */}
      <div className="flex-1 space-y-2 overflow-y-auto custom-scrollbar">
        <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-4 ml-3 ${theme === 'dark' ? 'text-white/20' : 'text-slate-400'}`}>Calculators</p>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              if (window.innerWidth < 1024) onClose();
            }}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
              activeTab === item.id 
                ? 'bg-accent-purple/20 text-current border border-accent-purple/20 shadow-[0_0_20px_rgba(139,92,246,0.1)]' 
                : `${theme === 'dark' ? 'text-white/40' : 'text-slate-600'} hover:bg-black/5 dark:hover:bg-white/5 hover:text-current`
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
          <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-4 ml-3 ${theme === 'dark' ? 'text-white/20' : 'text-slate-400'}`}>App</p>
          {secondaryItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 1024) onClose();
              }}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                activeTab === item.id 
                  ? 'bg-accent-purple/20 text-current border border-accent-purple/20 shadow-[0_0_20px_rgba(139,92,246,0.1)]' 
                  : `${theme === 'dark' ? 'text-white/40' : 'text-slate-600'} hover:bg-black/5 dark:hover:bg-white/5 hover:text-current`
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
                  layoutId="sidebarActiveIndicatorSecondary"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-purple shadow-[0_0_8px_rgba(139,92,246,0.8)]"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-black/5 dark:border-white/5">
        <div className={`p-4 rounded-2xl border border-black/5 dark:border-white/5 ${
          theme === 'dark' ? 'bg-white/5' : 'bg-black/5'
        }`}>
          <p className={`text-[10px] font-medium mb-1 ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>PRO PLAN</p>
          <p className={`text-xs font-semibold mb-3 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Unlimited Calculations</p>
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
              className={`fixed top-0 left-0 bottom-0 w-[280px] backdrop-blur-3xl border-r border-black/5 dark:border-white/5 z-[70] flex flex-col lg:hidden shadow-2xl ${
                theme === 'dark' ? 'bg-[#020617]/95' : 'bg-white/95'
              }`}
            >
              {SidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Persistent Sidebar */}
      <aside className={`hidden lg:flex flex-col w-[280px] backdrop-blur-3xl border-r border-black/5 dark:border-white/5 z-50 sticky top-0 h-screen ${
        theme === 'dark' ? 'bg-white/5' : 'bg-white/60'
      }`}>
        {SidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;
