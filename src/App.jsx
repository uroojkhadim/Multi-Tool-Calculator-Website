import React, { useState, Suspense, lazy } from 'react';
import Layout from './components/Layout';
import { ThemeProvider } from './context/ThemeContext';
import { HistoryProvider } from './context/HistoryContext';
import { motion, AnimatePresence } from 'framer-motion';

// Static import for the primary calculator to avoid initial blank screen
import BasicCalculator from './components/BasicCalculator';

// Lazy load other components for performance
const BMICalculator = lazy(() => import('./components/BMICalculator'));
const AgeCalculator = lazy(() => import('./components/AgeCalculator'));
const CurrencyConverter = lazy(() => import('./components/CurrencyConverter'));
const PercentageCalculator = lazy(() => import('./components/PercentageCalculator'));
const LoanCalculator = lazy(() => import('./components/LoanCalculator'));

const App = () => {
  const [activeTab, setActiveTab] = useState('basic');

  const renderContent = () => {
    switch (activeTab) {
      case 'basic': return <BasicCalculator />;
      case 'bmi': return <BMICalculator />;
      case 'age': return <AgeCalculator />;
      case 'currency': return <CurrencyConverter />;
      case 'percentage': return <PercentageCalculator />;
      case 'loan': return <LoanCalculator />;
      default: return <BasicCalculator />;
    }
  };

  return (
    <ThemeProvider>
      <HistoryProvider>
        <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
          {/* Debug indicator to confirm app load */}
          <div className="fixed top-2 right-1/2 translate-x-1/2 z-[100] px-4 py-1.5 bg-emerald-500/20 border border-emerald-500/40 rounded-full backdrop-blur-md">
            <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-[0.2em]">Application Loaded Successfully</p>
          </div>
          
          {/* Ensure the primary tab works without Suspense to debug blank screen */}
          {activeTab === 'basic' ? (
            <div className="w-full flex justify-center">
              <BasicCalculator />
            </div>
          ) : (
            <Suspense fallback={
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 border-4 border-accent-purple/30 border-t-accent-purple rounded-full"
                />
                <p className="text-sm font-bold text-white uppercase tracking-widest opacity-20">Loading Tool...</p>
              </div>
            }>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="w-full flex justify-center"
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </Suspense>
          )}
        </Layout>
      </HistoryProvider>
    </ThemeProvider>
  );
};

export default App;
