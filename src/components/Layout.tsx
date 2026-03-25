import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';

type Tab = 'basic' | 'bmi' | 'age' | 'currency' | 'percentage' | 'loan';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const { theme, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] flex flex-row items-stretch relative overflow-hidden bg-[#020617] font-sans selection:bg-accent-purple/30">
      {/* Sidebar Integration */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Refined Mesh Background - More Subtle */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-accent-purple/10 rounded-full blur-[160px] animate-blob" />
        <div className="absolute top-[10%] right-[-20%] w-[50%] h-[50%] bg-accent-blue/10 rounded-full blur-[140px] animate-blob [animation-delay:2s]" />
        <div className="absolute bottom-[-20%] left-[10%] w-[50%] h-[50%] bg-accent-pink/5 rounded-full blur-[150px] animate-blob [animation-delay:4s]" />
      </div>

      {/* Main Content Area Wrapper */}
      <div className="flex-1 flex flex-col items-center relative z-10 min-h-screen overflow-y-auto custom-scrollbar">
        {/* Premium Navbar */}
        <header className="w-full max-w-4xl mt-6 px-6 py-4 flex items-center justify-between z-50 sticky top-0">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            {/* Hamburger menu only visible on mobile/tablet */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2.5 rounded-xl glass hover:bg-white/10 transition-all border border-white/5 group lg:hidden"
            >
              <Menu className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
            </button>
            <div className="lg:hidden">
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
                ProCalc <span className="text-[9px] bg-accent-purple/20 px-1.5 py-0.5 rounded-md uppercase tracking-wider font-semibold text-accent-purple">Elite</span>
              </h1>
            </div>
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2.5 rounded-xl glass hover:bg-white/10 transition-all border border-white/5 group"
          >
            {theme === 'dark' ? 
              <Sun className="w-4 h-4 text-white/50 group-hover:text-yellow-400 transition-colors" /> : 
              <Moon className="w-4 h-4 text-white/50 group-hover:text-accent-blue transition-colors" />
            }
          </motion.button>
        </header>

        {/* Content Area */}
        <main className="w-full max-w-4xl px-4 flex-1 flex flex-col justify-start pt-4 pb-12 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ 
                type: 'spring', 
                damping: 30, 
                stiffness: 300,
                duration: 0.3
              }}
              className="w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Layout;
