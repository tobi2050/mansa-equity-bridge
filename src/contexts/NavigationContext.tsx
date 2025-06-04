
import React, { createContext, useContext, useState } from 'react';

interface NavigationContextType {
  navigationHistory: string[];
  currentPage: string;
  navigateTo: (page: string) => void;
  goBack: () => void;
  canGoBack: boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [navigationHistory, setNavigationHistory] = useState<string[]>(['dashboard']);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const navigateTo = (page: string) => {
    setNavigationHistory(prev => [...prev, page]);
    setCurrentPage(page);
  };

  const goBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop();
      const previousPage = newHistory[newHistory.length - 1];
      
      setNavigationHistory(newHistory);
      setCurrentPage(previousPage);
    }
  };

  const canGoBack = navigationHistory.length > 1;

  return (
    <NavigationContext.Provider value={{
      navigationHistory,
      currentPage,
      navigateTo,
      goBack,
      canGoBack
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
