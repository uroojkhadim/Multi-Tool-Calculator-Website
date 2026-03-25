import React, { useState } from 'react';
import Layout from './components/Layout';
import BasicCalculator from './components/BasicCalculator';
import BMICalculator from './components/BMICalculator';
import AgeCalculator from './components/AgeCalculator';
import CurrencyConverter from './components/CurrencyConverter';
import PercentageCalculator from './components/PercentageCalculator';
import LoanCalculator from './components/LoanCalculator';
import History from './components/History';
import { ThemeProvider } from './context/ThemeContext';
import { HistoryProvider } from './context/HistoryContext';

type Tab = 'basic' | 'bmi' | 'age' | 'currency' | 'percentage' | 'loan';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('basic');

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
          {renderContent()}
        </Layout>
      </HistoryProvider>
    </ThemeProvider>
  );
};

export default App;
