import React, { useState, Suspense, lazy } from 'react';
import Layout from './components/Layout';
import { ThemeProvider } from './context/ThemeContext';
import { HistoryProvider } from './context/HistoryContext';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load components for better performance
const BasicCalculator = lazy(() => import('./components/BasicCalculator'));
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
          <Suspense fallback={
            <div className="flex items-center justify-center h-64">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 border-4 border-accent-purple/30 border-t-accent-purple rounded-full"
              />
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
        </Layout>
      </HistoryProvider>
    </ThemeProvider>
  );
};

export default App;
