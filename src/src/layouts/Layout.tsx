import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
  headerVariant?: 'default' | 'minimal';
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showFooter = true, 
  headerVariant = 'default' 
}) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header variant={headerVariant} />
      <main className="flex-1">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};