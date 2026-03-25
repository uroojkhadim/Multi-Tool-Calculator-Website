import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, Calculator, Ruler, Calendar, DollarSign, Percent, Banknote, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = 'basic' | 'bmi' | 'age' | 'currency' | 'percentage' | 'loan' | 'history';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'basic', label: 'Basic', icon: <Calculator className="w-5 h-5" /> },
    { id: 'bmi', label: 'BMI', icon: <Ruler className="w-5 h-5" /> },
    { id: 'age', label: 'Age', icon: <Calendar className="w-5 h-5" /> },
    { id: 'currency', label: 'Currency', icon: <DollarSign className="w-5 h-5" /> },
    { id: 'percentage', label: 'Percent', icon: <Percent className="w-5 h-5" /> },
    { id: 'loan', label: 'Loan', icon: <Banknote className="w-5 h-5" /> },
    { id: 'history', label: 'History', icon: <History className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8">
      {/* Header / Navbar */}
      <header className="w-full max-w-lg mb-8 glass px-6 py-4 flex items-center justify-between z-50">
        <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
          MultiCalc
        </h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-800/50 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-800/50 transition-colors"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-lg relative min-h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Sidebar/Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-64 glass rounded-none z-[60] p-6 shadow-2xl border-l border-white/20 dark:border-white/5"
          >
            <div className="flex flex-col gap-4 mt-12">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                    activeTab === tab.id 
                      ? 'bg-orange-500 text-white shadow-lg' 
                      : 'hover:bg-gray-200/50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-50"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
