import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';

type Tab = 'basic' | 'bmi' | 'age' | 'currency' | 'percentage' | 'loan' | 'history' | 'settings' | 'support';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const { theme, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={`min-h-[100dvh] flex flex-row items-stretch relative overflow-hidden font-sans selection:bg-accent-purple/30 ${
      theme === 'dark' ? 'bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Sidebar Integration */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Refined Mesh Background - Enhanced with Vibrant Colors */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[-10%] left-[-5%] w-[70%] h-[70%] bg-gradient-to-br from-accent-purple/30 to-transparent rounded-full blur-[120px] opacity-60" 
        />
        <motion.div 
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -40, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-[15%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-accent-blue/30 to-transparent rounded-full blur-[110px] opacity-50" 
        />
        <motion.div 
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute bottom-[-15%] left-[5%] w-[65%] h-[65%] bg-gradient-to-br from-accent-pink/20 to-transparent rounded-full blur-[130px] opacity-40" 
        />
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-accent-purple/10 rounded-full blur-[100px]" 
        />
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
