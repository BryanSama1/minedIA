import React from 'react';
import { Sparkles, Menu, X, HelpCircle, GraduationCap, Users, Home } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';

interface HeaderProps {
  currentPage: 'landing' | 'dashboard' | 'generate' | 'student-dashboard' | 'student-guide';
  onNavigate: (page: 'landing' | 'dashboard' | 'generate' | 'student-dashboard' | 'student-guide') => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { isMenuOpen, toggleMenu } = useNavigation();
  const [showHelpMenu, setShowHelpMenu] = React.useState(false);

  const helpItems = [
    { title: 'Guía de Creación', description: 'Aprende a crear contenido efectivo' },
    { title: 'Preguntas Frecuentes', description: 'Resolvemos tus dudas comunes' },
    { title: 'Contacto', description: 'Escríbenos a support@eduasistent.com' }
  ];

  const handleLogoClick = () => {
    onNavigate('landing');
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('landing');
  };

  const handleTeacherClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('dashboard');
  };

  const handleStudentClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('student-dashboard');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={handleLogoClick}
          >
            <Sparkles className="h-8 w-8 text-[#1a365d]" />
            <span className="ml-2 text-xl font-semibold text-[#1a365d]">EduAsistent</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a 
              href="#" 
              onClick={handleHomeClick}
              className={`px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center ${
                currentPage === 'landing' 
                  ? 'text-[#1a365d] border-b-2 border-[#1a365d]' 
                  : 'text-gray-700 hover:text-[#1a365d]'
              }`}
            >
              <Home className="mr-1 h-4 w-4" />
              Inicio
            </a>
            <a 
              href="#" 
              onClick={handleTeacherClick}
              className={`px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center ${
                currentPage === 'dashboard' || currentPage === 'generate'
                  ? 'text-[#1a365d] border-b-2 border-[#1a365d]' 
                  : 'text-gray-700 hover:text-[#1a365d]'
              }`}
            >
              <Users className="mr-1 h-4 w-4" />
              Docentes
            </a>
            <a 
              href="#" 
              onClick={handleStudentClick}
              className={`px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center ${
                currentPage === 'student-dashboard' || currentPage === 'student-guide'
                  ? 'text-[#1a365d] border-b-2 border-[#1a365d]' 
                  : 'text-gray-700 hover:text-[#1a365d]'
              }`}
            >
              <GraduationCap className="mr-1 h-4 w-4" />
              Estudiantes
            </a>
            <div className="relative">
              <button
                onClick={() => setShowHelpMenu(!showHelpMenu)}
                className="text-gray-700 hover:text-[#1a365d] px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center"
              >
                Ayuda <HelpCircle className="ml-1 h-4 w-4" />
              </button>
              
              {showHelpMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg py-2 z-50">
                  {helpItems.map((item, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="font-medium text-gray-900">{item.title}</div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>
          
          <button 
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a 
              href="#" 
              onClick={handleHomeClick}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-[#1a365d]/10 hover:text-[#1a365d] transition-colors duration-200 flex items-center"
            >
              <Home className="mr-2 h-4 w-4" />
              Inicio
            </a>
            <a 
              href="#" 
              onClick={handleTeacherClick}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-[#1a365d]/10 hover:text-[#1a365d] transition-colors duration-200 flex items-center"
            >
              <Users className="mr-2 h-4 w-4" />
              Docentes
            </a>
            <a 
              href="#" 
              onClick={handleStudentClick}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-[#1a365d]/10 hover:text-[#1a365d] transition-colors duration-200 flex items-center"
            >
              <GraduationCap className="mr-2 h-4 w-4" />
              Estudiantes
            </a>
            {helpItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="block px-3 py-2 rounded-md"
              >
                <div className="text-base font-medium text-gray-900">{item.title}</div>
                <div className="text-sm text-gray-500">{item.description}</div>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;