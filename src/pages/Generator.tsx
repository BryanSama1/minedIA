import React, { useState, useEffect } from 'react';
import TopicForm from '../components/Generator/TopicForm';
import ContentDisplay from '../components/Generator/ContentDisplay';

interface GeneratorProps {
  onNavigate: (page: 'landing' | 'dashboard' | 'generate' | 'student-dashboard' | 'student-guide') => void;
}

const GUION_ENDPOINT = '/api/minedaiagente/guion';
const PRESENTACION_ENDPOINT = '/api/minedaiagente/presentacion';
const ENLACES_ENDPOINT = '/api/enlaces';

const formatPrompt = (
  tema: string,
  materia: string,
  gradoAcademico: string,
  duracion: string,
  tipoClase: 'teorica' | 'practica'
) => {
  // Convertir el grado académico al formato esperado
  const nivelEducativo = gradoAcademico.replace('-', 'º de ');
  
  return `Tema: ${tema}
Nivel: ${nivelEducativo}
Tipo de clase: ${tipoClase === 'teorica' ? 'Teórica' : 'Práctica'}
Duración: ${duracion} minutos

Ejemplo: genera un guion de clase completo para una clase ${tipoClase === 'teorica' ? 'teórica' : 'práctica'} sobre ${tema}, adaptado al nivel de ${nivelEducativo}.

El guion debe incluir definiciones detalladas, contenidos desarrollados y explicaciones claras y adecuadas para ese nivel.

Además, debe contener la estructura completa de la clase, incluyendo objetivos, desarrollo de contenidos, ejemplos, actividades y cierre.

El contenido debe estar pensado para cubrir el tiempo de duración especificada (${duracion} minutos),

y las actividades deben ser empáticas al tipo de clase (${tipoClase === 'teorica' ? 'teórica' : 'práctica'}), con un enfoque pedagógico que facilite la comprensión del tema.`;
};

const Generator: React.FC<GeneratorProps> = ({ onNavigate }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentTopic, setCurrentTopic] = useState('');
  const [generatedContent, setGeneratedContent] = useState<{
    guion: string | null;
    presentacion: string | null;
    ejercicios: string | null;
  }>({
    guion: null,
    presentacion: null,
    ejercicios: null,
  });

  useEffect(() => {
    const handleExampleGeneration = (event: CustomEvent) => {
      const { tema, materia, gradoAcademico, duracion, tipoClase } = event.detail;
      handleGenerate(tema, materia, gradoAcademico, duracion, tipoClase);
    };

    document.addEventListener('generateExample', handleExampleGeneration as EventListener);

    return () => {
      document.removeEventListener('generateExample', handleExampleGeneration as EventListener);
    };
  }, []);

  const handleGenerate = async (
    tema: string,
    materia: string,
    gradoAcademico: string,
    duracion: string,
    tipoClase: 'teorica' | 'practica'
  ) => {
    setIsGenerating(true);
    setCurrentTopic(tema);
    setGeneratedContent({
      guion: null,
      presentacion: null,
      ejercicios: null,
    });

    try {
      const prompt = formatPrompt(tema, materia, gradoAcademico, duracion, tipoClase);
      
      // Fetch all content in parallel
      const [guionResponse, presentacionResponse, enlacesResponse] = await Promise.all([
        fetch(GUION_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt }),
        }),
        fetch(PRESENTACION_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt }),
        }),
        fetch(ENLACES_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ input: `Tema: ${tema}` }),
        })
      ]);

      if (!guionResponse.ok || !presentacionResponse.ok || !enlacesResponse.ok) {
        console.error('Guion Response Status:', guionResponse.status);
        console.error('Presentacion Response Status:', presentacionResponse.status);
        console.error('Enlaces Response Status:', enlacesResponse.status);
        
        try {
          const guionErrorData = await guionResponse.text();
          const presentacionErrorData = await presentacionResponse.text();
          const enlacesErrorData = await enlacesResponse.text();
          console.error('Guion Response Error:', guionErrorData);
          console.error('Presentacion Response Error:', presentacionErrorData);
          console.error('Enlaces Response Error:', enlacesErrorData);
        } catch (parseError) {
          console.error('Error parsing error responses:', parseError);
        }
        
        throw new Error(`Error en la respuesta del servidor: Guion (${guionResponse.status}), Presentación (${presentacionResponse.status}), Enlaces (${enlacesResponse.status})`);
      }

      const [guionData, presentacionData, enlacesData] = await Promise.all([
        guionResponse.json(),
        presentacionResponse.json(),
        enlacesResponse.json()
      ]);

      if (!guionData.response || !presentacionData.response || !enlacesData.response) {
        throw new Error('Respuesta del servidor incompleta o inválida');
      }
      
      setGeneratedContent({
        guion: guionData.response,
        presentacion: presentacionData.response,
        ejercicios: `RECURSOS EDUCATIVOS COMPLEMENTARIOS\n\nEnlaces recomendados para profundizar en el tema:\n\n${enlacesData.response}`,
      });
    } catch (error) {
      console.error('Error completo al generar contenido:', error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Error desconocido al generar el contenido';
        
      setGeneratedContent({
        guion: `Error: ${errorMessage}. Por favor, intente nuevamente.`,
        presentacion: null,
        ejercicios: null,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Crear Contenido</h1>
        
        <div className="mb-8">
          <TopicForm onGenerate={handleGenerate} isLoading={isGenerating} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ContentDisplay
            title="Guión de Clase"
            content={generatedContent.guion}
            type="guion"
            format="docx"
            isLoading={isGenerating}
          />
          
          <ContentDisplay
            title="Presentación"
            content={generatedContent.presentacion}
            type="presentacion"
            format="pptx"
            isLoading={isGenerating}
          />
          
          <ContentDisplay
            title="Material Complementario"
            content={generatedContent.ejercicios}
            type="ejercicios"
            format="pdf"
            isLoading={isGenerating}
          />
        </div>
      </div>
    </div>
  );
};

export default Generator;