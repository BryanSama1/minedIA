import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  currentPage: 'landing' | 'dashboard' | 'generate' | 'student-dashboard' | 'student-guide';
  onNavigate: (page: 'landing' | 'dashboard' | 'generate' | 'student-dashboard' | 'student-guide') => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, currentPage, onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header currentPage={currentPage} onNavigate={onNavigate} />
      <main className="flex-1 bg-gray-50">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;