import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  User, 
  Calendar, 
  ArrowLeftRight, 
  Percent, 
  CreditCard,
  History,
  Settings,
  HelpCircle,
  X 
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'basic', label: 'Basic Calc', icon: <Calculator className="w-5 h-5" /> },
    { id: 'bmi', label: 'BMI Calc', icon: <User className="w-5 h-5" /> },
    { id: 'age', label: 'Age Calc', icon: <Calendar className="w-5 h-5" /> },
    { id: 'currency', label: 'Currency', icon: <ArrowLeftRight className="w-5 h-5" /> },
    { id: 'percentage', label: 'Percentage', icon: <Percent className="w-5 h-5" /> },
    { id: 'loan', label: 'Loan EMI', icon: <CreditCard className="w-5 h-5" /> },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={`fixed inset-y-0 left-0 w-80 bg-slate-950/30 backdrop-blur-3xl border-r border-white/5 z-[101] lg:relative lg:translate-x-0 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full p-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-xl font-bold tracking-tight text-white/90">Navigation</h2>
            <button onClick={onClose} className="lg:hidden p-2 hover:bg-white/5 rounded-xl transition-colors">
              <X className="w-5 h-5 opacity-40 hover:opacity-100" />
            </button>
          </div>

          <nav className="flex-1 space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); onClose(); }}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] transition-all relative group ${
                  activeTab === item.id 
                    ? 'bg-white/10 text-white shadow-lg' 
                    : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                }`}
              >
                {activeTab === item.id && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-accent-purple/20 border border-accent-purple/30 rounded-[1.5rem]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${activeTab === item.id ? 'text-accent-purple' : 'group-hover:scale-110 transition-transform'}`}>
                  {item.icon}
                </span>
                <span className="relative z-10 font-medium tracking-tight truncate">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-8 border-t border-white/5 space-y-4">
            <div className="p-6 glass-card border-accent-purple/10">
              <h4 className="text-xs font-bold uppercase tracking-widest text-accent-purple/60 mb-2">ProCalc Cloud</h4>
              <p className="text-[11px] text-white/20 leading-relaxed mb-4">Sync your calculation history across all devices with ProCalc Cloud.</p>
              <button className="w-full py-3 bg-accent-purple/10 hover:bg-accent-purple/20 text-accent-purple text-xs font-bold rounded-xl transition-all">SIGN UP FREE</button>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
