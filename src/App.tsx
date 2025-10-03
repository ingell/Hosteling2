import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './src/shared/contexts/AppContext';
import { LanguageProvider } from './src/shared/contexts/LanguageContext';
import { AdminProvider } from './src/contexts/AdminContext';
import { AppRouter } from './src/router/AppRouter';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AdminProvider>
          <AppProvider>
            <AppRouter />
            <Toaster />
          </AppProvider>
        </AdminProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}