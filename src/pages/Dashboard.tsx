import React from 'react';
import HistoryCard from '../components/Dashboard/HistoryCard';
import StatisticsCard from '../components/Dashboard/StatisticsCard';
import { BookOpen, FileText, Plus } from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: 'landing' | 'dashboard' | 'generate' | 'student-dashboard' | 'student-guide') => void;
}

const EXAMPLE_CLASSES = [
  {
    id: '1',
    topic: 'Proceso de Fotosíntesis',
    subject: 'Ciencias Naturales',
    gradeLevel: '2º de Secundaria',
    date: '2025-04-01T10:30:00Z',
  },
  {
    id: '2',
    topic: 'Segunda Guerra Mundial: Causas y Efectos',
    subject: 'Historia',
    gradeLevel: '3º de Bachillerato',
    date: '2025-03-28T14:15:00Z',
  },
  {
    id: '3',
    topic: 'Introducción a las Fracciones',
    subject: 'Matemáticas',
    gradeLevel: '4º de Primaria',
    date: '2025-03-25T09:00:00Z',
  },
];

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const handleSelectItem = (id: string) => {
    const selectedClass = EXAMPLE_CLASSES.find(item => item.id === id);
    if (selectedClass) {
      onNavigate('generate');
      // Simulate clicking the generate button with the example class data
      setTimeout(() => {
        const event = new CustomEvent('generateExample', {
          detail: {
            tema: selectedClass.topic,
            materia: selectedClass.subject.toLowerCase().replace(' ', '-'),
            gradoAcademico: selectedClass.gradeLevel.toLowerCase().replace('º de ', '-'),
            duracion: '60',
            tipoClase: 'teorica'
          }
        });
        document.dispatchEvent(event);
      }, 100);
    }
  };
  
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Panel de Docentes
              </h1>
              <p className="text-lg text-gray-600">
                Gestiona y crea contenido educativo de calidad
              </p>
            </div>
            <button 
              onClick={() => onNavigate('generate')}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="mr-2 h-5 w-5" />
              Crear Nuevo Contenido
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div 
            onClick={() => onNavigate('generate')}
            className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 rounded-full p-3">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="ml-3 text-xl font-bold text-blue-900">Generar Guión de Clase</h3>
            </div>
            <p className="text-blue-700">
              Crea guiones detallados con objetivos, desarrollo y actividades
            </p>
          </div>
          
          <div 
            onClick={() => onNavigate('generate')}
            className="bg-gradient-to-br from-purple-50 to-pink-100 border-2 border-purple-200 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center mb-4">
              <div className="bg-purple-600 rounded-full p-3">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="ml-3 text-xl font-bold text-purple-900">Crear Presentación</h3>
            </div>
            <p className="text-purple-700">
              Genera presentaciones estructuradas y material complementario
            </p>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <HistoryCard items={EXAMPLE_CLASSES} onSelectItem={handleSelectItem} />
          </div>
          
          <div>
            <StatisticsCard totalClasses={12} totalPresentations={8} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;