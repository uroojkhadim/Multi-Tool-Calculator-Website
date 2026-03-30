import React, { useState } from 'react';
import Layout from './components/Layout.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { HistoryProvider } from './context/HistoryContext.jsx';

// Static import for the primary calculator
import BasicCalculator from './components/BasicCalculator.jsx';

const App = () => {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <ThemeProvider>
      <HistoryProvider>
        <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
          <div className="w-full flex flex-col items-center gap-8">
            <div className="p-6 bg-emerald-500/20 border border-emerald-500/40 rounded-3xl backdrop-blur-md text-center">
              <h1 className="text-2xl font-bold text-white mb-2">App Loaded Successfully!</h1>
              <p className="text-emerald-400 text-sm font-medium uppercase tracking-widest">Debug Mode: Only Basic Calculator Active</p>
            </div>
            
            <div className="w-full max-w-sm">
              <BasicCalculator />
            </div>
          </div>
        </Layout>
      </HistoryProvider>
    </ThemeProvider>
  );
};

export default App;
