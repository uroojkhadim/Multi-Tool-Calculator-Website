import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';

const Layout = ({ children, activeTab, setActiveTab }) => {
  const { theme, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={`min-h-screen flex text-slate-100 selection:bg-accent-purple/30`}>
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[70%] h-[70%] bg-accent-purple/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[65%] h-[65%] bg-accent-blue/10 rounded-full blur-[130px]" />
      </div>

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 flex flex-col items-center relative z-10 min-h-screen overflow-y-auto custom-scrollbar">
        {/* Navbar */}
        <header className="w-full max-w-5xl mt-6 px-6 py-4 flex items-center justify-between z-50 sticky top-0 backdrop-blur-md bg-transparent">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-3 rounded-2xl glass-button lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold tracking-tight premium-gradient-text hidden sm:block">
              ProCalc <span className="text-[10px] bg-accent-purple/20 px-2 py-0.5 rounded-full uppercase tracking-widest text-accent-purple border border-accent-purple/30">Premium</span>
            </h1>
          </div>
          
          <button 
            onClick={toggleTheme}
            className="p-3 rounded-2xl glass-button group"
          >
            {theme === 'dark' ? 
              <Sun className="w-5 h-5 text-white/50 group-hover:text-yellow-400 transition-colors" /> : 
              <Moon className="w-5 h-5 text-white/50 group-hover:text-accent-blue transition-colors" />
            }
          </button>
        </header>

        <main className="w-full max-w-5xl px-4 py-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
