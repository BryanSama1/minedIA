import React, { useState, useEffect } from 'react';
import StudentForm from '../components/Student/StudentForm';
import StudyGuideDisplay from '../components/Student/StudyGuideDisplay';

interface StudentGuideProps {
  onNavigate: (page: 'landing' | 'dashboard' | 'generate' | 'student-dashboard' | 'student-guide') => void;
}

const STUDENT_GUIDE_ENDPOINT = '/api/minedaiagente/guion';

const formatStudentPrompt = (
  tema: string,
  materia: string,
  gradoAcademico: string,
  duracion: string,
  tipoEstudio: 'repaso' | 'examen' | 'comprension'
) => {
  const nivelEducativo = gradoAcademico.replace('-', 'º de ');
  
  return `Tema: ${tema}
Nivel: ${nivelEducativo}
Tipo de estudio: ${tipoEstudio === 'repaso' ? 'Repaso general' : tipoEstudio === 'examen' ? 'Preparación para examen' : 'Comprensión profunda'}
Tiempo de estudio: ${duracion} minutos

Genera una guía de estudio completa y estructurada para un estudiante de ${nivelEducativo} sobre el tema "${tema}".

La guía debe incluir:

1. RESUMEN EJECUTIVO
- Conceptos clave del tema
- Objetivos de aprendizaje
- Tiempo estimado de estudio

2. CONTENIDO TEÓRICO
- Definiciones importantes
- Explicaciones claras y detalladas
- Ejemplos prácticos
- Diagramas conceptuales (descritos en texto)

3. TÉCNICAS DE ESTUDIO RECOMENDADAS
- Métodos de memorización
- Estrategias de comprensión
- Técnicas de repaso

4. EJERCICIOS PRÁCTICOS
- Preguntas de autoevaluación
- Problemas resueltos paso a paso
- Ejercicios para practicar

5. RECURSOS ADICIONALES
- Sugerencias de material complementario
- Tips para el estudio efectivo

6. PLAN DE ESTUDIO
- Cronograma sugerido para ${duracion} minutos
- Distribución del tiempo por sección

La guía debe estar adaptada al nivel académico especificado y ser apropiada para el tipo de estudio solicitado (${tipoEstudio}).`;
};

const StudentGuide: React.FC<StudentGuideProps> = ({ onNavigate }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentTopic, setCurrentTopic] = useState('');
  const [generatedGuide, setGeneratedGuide] = useState<string | null>(null);

  useEffect(() => {
    const handleExampleGeneration = (event: CustomEvent) => {
      const { tema, materia, gradoAcademico, duracion, tipoEstudio } = event.detail;
      handleGenerate(tema, materia, gradoAcademico, duracion, tipoEstudio);
    };

    document.addEventListener('generateStudentExample', handleExampleGeneration as EventListener);

    return () => {
      document.removeEventListener('generateStudentExample', handleExampleGeneration as EventListener);
    };
  }, []);

  const handleGenerate = async (
    tema: string,
    materia: string,
    gradoAcademico: string,
    duracion: string,
    tipoEstudio: 'repaso' | 'examen' | 'comprension'
  ) => {
    setIsGenerating(true);
    setCurrentTopic(tema);
    setGeneratedGuide(null);

    try {
      const prompt = formatStudentPrompt(tema, materia, gradoAcademico, duracion, tipoEstudio);
      
      const response = await fetch(STUDENT_GUIDE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        console.error('Student Guide Response Status:', response.status);
        
        try {
          const errorData = await response.text();
          console.error('Student Guide Response Error:', errorData);
        } catch (parseError) {
          console.error('Error parsing error response:', parseError);
        }
        
        throw new Error(`Error en la respuesta del servidor: ${response.status}`);
      }

      const data = await response.json();

      if (!data.response) {
        throw new Error('Respuesta del servidor incompleta o inválida');
      }
      
      setGeneratedGuide(data.response);
    } catch (error) {
      console.error('Error completo al generar guía de estudio:', error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Error desconocido al generar la guía de estudio';
        
      setGeneratedGuide(`Error: ${errorMessage}. Por favor, intente nuevamente.`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Guías de Estudio Personalizadas</h1>
          <p className="text-lg text-gray-600">Genera material de estudio adaptado a tu nivel y necesidades</p>
        </div>
        
        <div className="mb-8">
          <StudentForm onGenerate={handleGenerate} isLoading={isGenerating} />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <StudyGuideDisplay
            title={currentTopic ? `Guía de Estudio: ${currentTopic}` : 'Guía de Estudio'}
            content={generatedGuide}
            isLoading={isGenerating}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentGuide;