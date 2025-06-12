import React from 'react';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';

interface StudentHistoryItem {
  id: string;
  topic: string;
  subject: string;
  gradeLevel: string;
  studyType: string;
  date: string;
}

interface StudentHistoryCardProps {
  items: StudentHistoryItem[];
  onSelectItem: (id: string) => void;
}

const StudentHistoryCard: React.FC<StudentHistoryCardProps> = ({ items, onSelectItem }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const getStudyTypeColor = (type: string) => {
    switch (type) {
      case 'repaso':
        return 'text-blue-600 bg-blue-100';
      case 'examen':
        return 'text-red-600 bg-red-100';
      case 'comprension':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStudyTypeLabel = (type: string) => {
    switch (type) {
      case 'repaso':
        return 'Repaso';
      case 'examen':
        return 'Examen';
      case 'comprension':
        return 'Comprensión';
      default:
        return type;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Guías de Estudio Recientes</h2>
        <BookOpen className="h-5 w-5 text-gray-400" />
      </div>
      
      {items.length > 0 ? (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              onClick={() => onSelectItem(item.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-indigo-600">{item.topic}</h3>
                  <p className="text-sm text-gray-600">
                    {item.subject} • {item.gradeLevel}
                  </p>
                </div>
                <span className="text-xs text-gray-500">{formatDate(item.date)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStudyTypeColor(item.studyType)}`}>
                  {getStudyTypeLabel(item.studyType)}
                </span>
                <button className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center transition-colors duration-200">
                  Ver Guía <ArrowRight className="ml-1 h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          <BookOpen className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p>No hay guías de estudio disponibles.</p>
          <p className="text-sm mt-1">¡Crea tu primera guía para verla aquí!</p>
        </div>
      )}
    </div>
  );
};

export default StudentHistoryCard;