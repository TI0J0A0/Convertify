
import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/contexts/ThemeContext';
import HomePage from '@/pages/HomePage';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="convertify-theme">
      <HomePage />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
