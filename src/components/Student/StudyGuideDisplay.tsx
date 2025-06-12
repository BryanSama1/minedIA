import React, { useState } from 'react';
import { Download, Copy, CheckCircle2, BookOpen, FileText, Eye, EyeOff } from 'lucide-react';
import { generateStudyGuidePdf } from '../../utils/studyGuideGenerator';

interface StudyGuideDisplayProps {
  title: string;
  content: string | null;
  isLoading: boolean;
}

const StudyGuideDisplay: React.FC<StudyGuideDisplayProps> = ({ title, content, isLoading }) => {
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  const handleCopy = () => {
    if (content) {
      navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = async () => {
    if (!content) return;
    
    const filename = title.toLowerCase().replace(/\s+/g, '-').replace('guía-de-estudio:', '').trim();
    
    try {
      await generateStudyGuidePdf(content, filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generando el PDF. Por favor, intenta nuevamente.');
    }
  };

  const parseStudyGuide = () => {
    if (!content) return null;

    const sections = content.split(/(?=\d+\.\s+[A-ZÁÉÍÓÚÑ\s]+)/g).filter(section => section.trim());
    
    return sections.map((section, index) => {
      const lines = section.split('\n').filter(line => line.trim());
      if (lines.length === 0) return null;

      const titleLine = lines[0];
      const contentLines = lines.slice(1);
      
      // Determine section type based on title
      let sectionType = 'default';
      let bgColor = 'bg-gray-50';
      let borderColor = 'border-gray-200';
      let iconColor = 'text-gray-600';
      
      if (titleLine.toLowerCase().includes('resumen') || titleLine.toLowerCase().includes('conceptos clave')) {
        sectionType = 'summary';
        bgColor = 'bg-blue-50';
        borderColor = 'border-blue-200';
        iconColor = 'text-blue-600';
      } else if (titleLine.toLowerCase().includes('contenido') || titleLine.toLowerCase().includes('teórico')) {
        sectionType = 'theory';
        bgColor = 'bg-green-50';
        borderColor = 'border-green-200';
        iconColor = 'text-green-600';
      } else if (titleLine.toLowerCase().includes('técnicas') || titleLine.toLowerCase().includes('estudio')) {
        sectionType = 'techniques';
        bgColor = 'bg-purple-50';
        borderColor = 'border-purple-200';
        iconColor = 'text-purple-600';
      } else if (titleLine.toLowerCase().includes('ejercicios') || titleLine.toLowerCase().includes('práctica')) {
        sectionType = 'exercises';
        bgColor = 'bg-amber-50';
        borderColor = 'border-amber-200';
        iconColor = 'text-amber-600';
      } else if (titleLine.toLowerCase().includes('recursos') || titleLine.toLowerCase().includes('adicionales')) {
        sectionType = 'resources';
        bgColor = 'bg-indigo-50';
        borderColor = 'border-indigo-200';
        iconColor = 'text-indigo-600';
      } else if (titleLine.toLowerCase().includes('plan') || titleLine.toLowerCase().includes('cronograma')) {
        sectionType = 'plan';
        bgColor = 'bg-rose-50';
        borderColor = 'border-rose-200';
        iconColor = 'text-rose-600';
      }

      return (
        <div key={index} className={`rounded-xl border-2 ${borderColor} ${bgColor} p-6 shadow-sm hover:shadow-md transition-all duration-200`}>
          <div className="flex items-center mb-4">
            <div className={`rounded-full p-2 bg-white shadow-sm`}>
              <BookOpen className={`h-5 w-5 ${iconColor}`} />
            </div>
            <h3 className="ml-3 text-lg font-bold text-gray-800">
              {titleLine.replace(/^\d+\.\s*/, '')}
            </h3>
          </div>
          
          <div className="space-y-3">
            {contentLines.map((line, lineIndex) => {
              const cleanLine = line.trim();
              if (!cleanLine) return null;
              
              // Handle different types of content
              if (cleanLine.startsWith('- ') || cleanLine.startsWith('• ')) {
                return (
                  <div key={lineIndex} className="flex items-start">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-700 leading-relaxed">
                      {cleanLine.replace(/^[-•]\s*/, '')}
                    </p>
                  </div>
                );
              } else if (cleanLine.match(/^\d+\./)) {
                return (
                  <div key={lineIndex} className="flex items-start">
                    <span className="text-sm font-semibold text-gray-500 mr-3 mt-0.5">
                      {cleanLine.match(/^\d+\./)?.[0]}
                    </span>
                    <p className="text-gray-700 leading-relaxed">
                      {cleanLine.replace(/^\d+\.\s*/, '')}
                    </p>
                  </div>
                );
              } else if (cleanLine.includes(':') && cleanLine.length < 100) {
                const [label, ...rest] = cleanLine.split(':');
                return (
                  <div key={lineIndex} className="bg-white rounded-lg p-3 border border-gray-200">
                    <span className="font-semibold text-gray-800">{label}:</span>
                    <span className="text-gray-700 ml-1">{rest.join(':')}</span>
                  </div>
                );
              } else {
                return (
                  <p key={lineIndex} className="text-gray-700 leading-relaxed">
                    {cleanLine}
                  </p>
                );
              }
            })}
          </div>
        </div>
      );
    }).filter(Boolean);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="rounded-full bg-white/20 p-2">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <h2 className="ml-3 text-xl font-bold text-white">{title}</h2>
          </div>
          {content && (
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center px-3 py-2 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-colors duration-200"
            >
              {showPreview ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
              {showPreview ? 'Ocultar Vista Previa' : 'Mostrar Vista Previa'}
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              <BookOpen className="absolute inset-0 m-auto h-6 w-6 text-indigo-600" />
            </div>
            <p className="mt-4 text-gray-600 font-medium">Generando tu guía de estudio personalizada...</p>
            <p className="mt-2 text-sm text-gray-500">Esto puede tomar unos momentos</p>
          </div>
        ) : content ? (
          <>
            {showPreview ? (
              <div className="space-y-6 mb-6">
                {parseStudyGuide()}
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 max-h-96 overflow-auto">
                <pre className="whitespace-pre-line text-sm text-gray-700 font-mono">
                  {content}
                </pre>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
              <button 
                onClick={handleCopy} 
                className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 font-medium"
              >
                {copied ? <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" /> : <Copy className="mr-2 h-4 w-4" />}
                {copied ? '¡Copiado!' : 'Copiar Texto'}
              </button>
              
              <button 
                onClick={handleDownload} 
                className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg"
              >
                <Download className="mr-2 h-4 w-4" />
                Descargar PDF
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Tu guía de estudio aparecerá aquí</h3>
            <p className="text-gray-500">Completa el formulario y genera tu material de estudio personalizado</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyGuideDisplay;