import React from 'react';
import { Users, GraduationCap, BookOpen, FileText, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: 'landing' | 'dashboard' | 'generate' | 'student-dashboard' | 'student-guide') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const handleTeacherClick = () => {
    onNavigate('dashboard');
  };

  const handleStudentClick = () => {
    onNavigate('student-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Logo and Title */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full p-4 shadow-lg">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              EduAsistent
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Tu plataforma integral para crear contenido educativo de calidad
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Selecciona tu rol para acceder a las herramientas diseñadas específicamente para ti
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Teachers Card */}
          <div 
            onClick={handleTeacherClick}
            className="group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 border border-gray-100 hover:border-blue-200"
          >
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto mb-6 group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300 shadow-lg">
              <Users className="h-10 w-10 text-white" />
            </div>
            
            <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
              Docentes
            </h3>
            
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Crea guiones de clase, presentaciones y material complementario de forma automática
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center justify-center p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors duration-300">
                <FileText className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-700">Guiones</span>
              </div>
              <div className="flex items-center justify-center p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors duration-300">
                <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-700">Presentaciones</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300 shadow-md">
              Acceder como Docente
            </div>
          </div>
          
          {/* Students Card */}
          <div 
            onClick={handleStudentClick}
            className="group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 border border-gray-100 hover:border-purple-200"
          >
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mx-auto mb-6 group-hover:from-purple-600 group-hover:to-purple-700 transition-all duration-300 shadow-lg">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
            
            <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
              Estudiantes
            </h3>
            
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Genera guías de estudio personalizadas para mejorar tu aprendizaje y rendimiento académico
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center justify-center p-3 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors duration-300">
                <BookOpen className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-purple-700">Guías PDF</span>
              </div>
              <div className="flex items-center justify-center p-3 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors duration-300">
                <FileText className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-purple-700">Personalizadas</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold group-hover:from-purple-600 group-hover:to-purple-700 transition-all duration-300 shadow-md">
              Acceder como Estudiante
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Inteligencia Artificial</h4>
            <p className="text-gray-600 text-sm">Contenido generado automáticamente con IA avanzada</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Múltiples Formatos</h4>
            <p className="text-gray-600 text-sm">Exporta en PDF, DOCX y PPTX según tus necesidades</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Personalizado</h4>
            <p className="text-gray-600 text-sm">Adaptado a cada nivel educativo y tipo de contenido</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;