import React from 'react';
import StudentHistoryCard from '../components/Dashboard/StudentHistoryCard';
import StatisticsCard from '../components/Dashboard/StatisticsCard';

interface StudentDashboardProps {
  onNavigate: (page: 'landing' | 'dashboard' | 'generate' | 'student-dashboard' | 'student-guide') => void;
}

const EXAMPLE_STUDENT_GUIDES = [
  {
    id: '1',
    topic: 'Ecuaciones Cuadráticas',
    subject: 'Matemáticas',
    gradeLevel: '2º de Bachillerato',
    studyType: 'examen',
    date: '2025-04-01T10:30:00Z',
  },
  {
    id: '2',
    topic: 'Sistema Digestivo Humano',
    subject: 'Biología',
    gradeLevel: '1º de Secundaria',
    studyType: 'comprension',
    date: '2025-03-28T14:15:00Z',
  },
  {
    id: '3',
    topic: 'Revolución Francesa',
    subject: 'Historia',
    gradeLevel: '3º de Secundaria',
    studyType: 'repaso',
    date: '2025-03-25T09:00:00Z',
  },
];

const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigate }) => {
  const handleSelectItem = (id: string) => {
    const selectedGuide = EXAMPLE_STUDENT_GUIDES.find(item => item.id === id);
    if (selectedGuide) {
      onNavigate('student-guide');
      // Simulate clicking the generate button with the example guide data
      setTimeout(() => {
        const event = new CustomEvent('generateStudentExample', {
          detail: {
            tema: selectedGuide.topic,
            materia: selectedGuide.subject.toLowerCase().replace(' ', '-'),
            gradoAcademico: selectedGuide.gradeLevel.toLowerCase().replace('º de ', '-'),
            duracion: '60',
            tipoEstudio: selectedGuide.studyType
          }
        });
        document.dispatchEvent(event);
      }, 100);
    }
  };
  
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Estudiante</h1>
          <p className="text-lg text-gray-600">Gestiona tus guías de estudio y progreso académico</p>
        </div>
        
        <div className="flex justify-center mb-8">
          <button 
            onClick={() => onNavigate('student-guide')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg transition-all duration-200 flex items-center font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Crear Nueva Guía de Estudio
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <StudentHistoryCard items={EXAMPLE_STUDENT_GUIDES} onSelectItem={handleSelectItem} />
          </div>
          
          <div>
            <StatisticsCard totalClasses={15} totalPresentations={12} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;