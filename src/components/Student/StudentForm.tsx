import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Target, Brain } from 'lucide-react';

interface ContenidoEstudio {
  tema: string;
  materia: string;
  gradoAcademico: string;
  duracion: string;
  tipoEstudio: 'repaso' | 'examen' | 'comprension';
}

interface StudentFormProps {
  onGenerate: (
    tema: string,
    materia: string,
    gradoAcademico: string,
    duracion: string,
    tipoEstudio: 'repaso' | 'examen' | 'comprension'
  ) => void;
  isLoading: boolean;
}

const StudentForm: React.FC<StudentFormProps> = ({ onGenerate, isLoading }) => {
  const [contenido, setContenido] = useState<ContenidoEstudio>({
    tema: '',
    materia: 'matematicas',
    gradoAcademico: '4-primaria',
    duracion: '60',
    tipoEstudio: 'comprension'
  });

  useEffect(() => {
    const handleExampleData = (event: CustomEvent) => {
      const { tema, materia, gradoAcademico, duracion, tipoEstudio } = event.detail;
      setContenido({
        tema,
        materia,
        gradoAcademico,
        duracion,
        tipoEstudio
      });
      onGenerate(tema, materia, gradoAcademico, duracion, tipoEstudio);
    };

    document.addEventListener('generateStudentExample', handleExampleData as EventListener);

    return () => {
      document.removeEventListener('generateStudentExample', handleExampleData as EventListener);
    };
  }, [onGenerate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contenido.tema.trim()) {
      onGenerate(
        contenido.tema,
        contenido.materia,
        contenido.gradoAcademico,
        contenido.duracion,
        contenido.tipoEstudio
      );
    }
  };

  const handleInputChange = (
    field: keyof ContenidoEstudio,
    value: string
  ) => {
    setContenido(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getStudyTypeIcon = (type: string) => {
    switch (type) {
      case 'repaso':
        return <Clock className="h-5 w-5" />;
      case 'examen':
        return <Target className="h-5 w-5" />;
      case 'comprension':
        return <Brain className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  const getStudyTypeColor = (type: string) => {
    switch (type) {
      case 'repaso':
        return 'border-blue-200 bg-blue-50 text-blue-700';
      case 'examen':
        return 'border-red-200 bg-red-50 text-red-700';
      case 'comprension':
        return 'border-green-200 bg-green-50 text-green-700';
      default:
        return 'border-gray-200 bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-4">
          <BookOpen className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Crear Tu Guía de Estudio</h2>
        <p className="text-gray-600">Personaliza tu material de estudio según tus necesidades</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="tema" className="block text-sm font-semibold text-gray-700 mb-2">
            ¿Qué tema quieres estudiar?
          </label>
          <input
            type="text"
            id="tema"
            value={contenido.tema}
            onChange={(e) => handleInputChange('tema', e.target.value)}
            placeholder="ej: Ecuaciones cuadráticas, Sistema digestivo, Revolución Francesa..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-lg"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="materia" className="block text-sm font-semibold text-gray-700 mb-2">
              Materia
            </label>
            <select
              id="materia"
              value={contenido.materia}
              onChange={(e) => handleInputChange('materia', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            >
              <option value="matematicas">Matemáticas</option>
              <option value="ciencias">Ciencias Naturales</option>
              <option value="lenguaje">Lengua y Literatura</option>
              <option value="historia">Historia</option>
              <option value="geografia">Geografía</option>
              <option value="fisica">Física</option>
              <option value="quimica">Química</option>
              <option value="biologia">Biología</option>
              <option value="arte">Arte</option>
              <option value="musica">Música</option>
              <option value="educacion-fisica">Educación Física</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="gradoAcademico" className="block text-sm font-semibold text-gray-700 mb-2">
              Tu Nivel Académico
            </label>
            <select
              id="gradoAcademico"
              value={contenido.gradoAcademico}
              onChange={(e) => handleInputChange('gradoAcademico', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            >
              <optgroup label="Primaria">
                <option value="1-primaria">1º de Primaria</option>
                <option value="2-primaria">2º de Primaria</option>
                <option value="3-primaria">3º de Primaria</option>
                <option value="4-primaria">4º de Primaria</option>
                <option value="5-primaria">5º de Primaria</option>
                <option value="6-primaria">6º de Primaria</option>
              </optgroup>
              <optgroup label="Secundaria">
                <option value="1-secundaria">1º de Secundaria</option>
                <option value="2-secundaria">2º de Secundaria</option>
                <option value="3-secundaria">3º de Secundaria</option>
              </optgroup>
              <optgroup label="Bachillerato">
                <option value="1-bachillerato">1º de Bachillerato</option>
                <option value="2-bachillerato">2º de Bachillerato</option>
                <option value="3-bachillerato">3º de Bachillerato</option>
              </optgroup>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            ¿Cuánto tiempo tienes para estudiar?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { value: '30', label: '30 min' },
              { value: '60', label: '1 hora' },
              { value: '90', label: '1.5 horas' },
              { value: '120', label: '2 horas' }
            ].map((option) => (
              <label key={option.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="duracion"
                  value={option.value}
                  checked={contenido.duracion === option.value}
                  onChange={(e) => handleInputChange('duracion', e.target.value)}
                  className="sr-only"
                />
                <div className={`p-3 rounded-lg border-2 text-center transition-all duration-200 ${
                  contenido.duracion === option.value
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-indigo-300'
                }`}>
                  <Clock className="h-5 w-5 mx-auto mb-1" />
                  <span className="text-sm font-medium">{option.label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            ¿Qué tipo de estudio necesitas?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { 
                value: 'comprension', 
                label: 'Comprensión Profunda', 
                description: 'Entender conceptos desde cero'
              },
              { 
                value: 'repaso', 
                label: 'Repaso General', 
                description: 'Refrescar conocimientos'
              },
              { 
                value: 'examen', 
                label: 'Preparación para Examen', 
                description: 'Enfoque en evaluación'
              }
            ].map((option) => (
              <label key={option.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="tipoEstudio"
                  value={option.value}
                  checked={contenido.tipoEstudio === option.value}
                  onChange={(e) => handleInputChange('tipoEstudio', e.target.value as 'repaso' | 'examen' | 'comprension')}
                  className="sr-only"
                />
                <div className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  contenido.tipoEstudio === option.value
                    ? getStudyTypeColor(option.value)
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}>
                  <div className="flex items-center mb-2">
                    {getStudyTypeIcon(option.value)}
                    <span className="ml-2 font-semibold">{option.label}</span>
                  </div>
                  <p className="text-sm opacity-80">{option.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !contenido.tema.trim()}
          className={`w-full flex justify-center items-center px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 ${
            isLoading || !contenido.tema.trim() 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 shadow-lg hover:shadow-xl'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creando tu guía personalizada...
            </>
          ) : (
            <>
              <BookOpen className="mr-3 h-6 w-6" />
              Generar Mi Guía de Estudio
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;