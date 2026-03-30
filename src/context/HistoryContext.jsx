import React, { createContext, useContext, useState, useEffect } from 'react';

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('calc_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const addHistory = (item) => {
    const newHistory = [{ ...item, id: Date.now() }, ...history].slice(0, 50);
    setHistory(newHistory);
    localStorage.setItem('calc_history', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('calc_history');
  };

  return (
    <HistoryContext.Provider value={{ history, addHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => useContext(HistoryContext);
