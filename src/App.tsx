import React, { useState } from 'react';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Generator from './pages/Generator';
import StudentDashboard from './pages/StudentDashboard';
import StudentGuide from './pages/StudentGuide';

type PageType = 'landing' | 'dashboard' | 'generate' | 'student-dashboard' | 'student-guide';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');

  // Simple routing mechanism
  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentPage} />;
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'generate':
        return <Generator onNavigate={setCurrentPage} />;
      case 'student-dashboard':
        return <StudentDashboard onNavigate={setCurrentPage} />;
      case 'student-guide':
        return <StudentGuide onNavigate={setCurrentPage} />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  // Show landing page without layout, others with layout
  if (currentPage === 'landing') {
    return renderPage();
  }

  return (
    <MainLayout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </MainLayout>
  );
}

export default App;