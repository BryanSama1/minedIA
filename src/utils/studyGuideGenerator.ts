import { Document, Paragraph, TextRun, HeadingLevel, Packer, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';

const parseStudyGuideContent = (content: string) => {
  const sections = content.split(/(?=\d+\.\s+[A-ZÁÉÍÓÚÑ\s]+)/g).filter(section => section.trim());
  const elements: any[] = [];

  // Add title
  elements.push({
    type: 'title',
    content: 'GUÍA DE ESTUDIO PERSONALIZADA'
  });

  sections.forEach(section => {
    const lines = section.split('\n').filter(line => line.trim());
    if (lines.length === 0) return;

    const titleLine = lines[0];
    const contentLines = lines.slice(1);

    // Add section title
    elements.push({
      type: 'heading',
      content: titleLine.replace(/^\d+\.\s*/, ''),
      level: 1
    });

    // Process content lines
    let currentList: string[] = [];
    
    contentLines.forEach(line => {
      const cleanLine = line.trim();
      if (!cleanLine) return;

      if (cleanLine.startsWith('- ') || cleanLine.startsWith('• ')) {
        currentList.push(cleanLine.replace(/^[-•]\s*/, ''));
      } else {
        // If we have accumulated list items, add them first
        if (currentList.length > 0) {
          elements.push({
            type: 'list',
            items: [...currentList]
          });
          currentList = [];
        }

        // Add regular paragraph
        if (cleanLine.includes(':') && cleanLine.length < 100) {
          elements.push({
            type: 'definition',
            content: cleanLine
          });
        } else {
          elements.push({
            type: 'paragraph',
            content: cleanLine
          });
        }
      }
    });

    // Add any remaining list items
    if (currentList.length > 0) {
      elements.push({
        type: 'list',
        items: currentList
      });
    }
  });

  return elements;
};

const createFormattedText = (text: string): TextRun[] => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map(part => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return new TextRun({
        text: part.slice(2, -2),
        bold: true,
        size: 24
      });
    }
    return new TextRun({
      text: part,
      size: 24
    });
  });
};

export const generateStudyGuidePdf = async (content: string, filename: string) => {
  const elements = parseStudyGuideContent(content);
  const children: Paragraph[] = [];

  elements.forEach(element => {
    switch (element.type) {
      case 'title':
        children.push(new Paragraph({
          children: [
            new TextRun({
              text: element.content,
              bold: true,
              size: 32,
              color: '1a365d'
            })
          ],
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 480 }
        }));
        break;

      case 'heading':
        children.push(new Paragraph({
          children: [
            new TextRun({
              text: element.content,
              bold: true,
              size: 28,
              color: '2d3748'
            })
          ],
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 360, after: 240 },
          thematicBreak: true
        }));
        break;

      case 'paragraph':
        children.push(new Paragraph({
          children: createFormattedText(element.content),
          spacing: { before: 120, after: 120 },
          alignment: AlignmentType.JUSTIFIED
        }));
        break;

      case 'definition':
        const [term, ...definition] = element.content.split(':');
        children.push(new Paragraph({
          children: [
            new TextRun({
              text: term + ': ',
              bold: true,
              size: 24,
              color: '4a5568'
            }),
            new TextRun({
              text: definition.join(':'),
              size: 24
            })
          ],
          spacing: { before: 120, after: 120 },
          indent: { left: 360 }
        }));
        break;

      case 'list':
        element.items.forEach((item: string, index: number) => {
          children.push(new Paragraph({
            children: [
              new TextRun({
                text: `• ${item}`,
                size: 24
              })
            ],
            spacing: { before: 60, after: 60 },
            indent: { left: 720 }
          }));
        });
        break;
    }
  });

  // Add footer with generation info
  children.push(new Paragraph({
    text: '',
    spacing: { before: 480 }
  }));

  children.push(new Paragraph({
    children: [
      new TextRun({
        text: `Generado por EduAsistent - ${new Date().toLocaleDateString('es-ES')}`,
        size: 20,
        italics: true,
        color: '718096'
      })
    ],
    alignment: AlignmentType.CENTER,
    spacing: { before: 240 }
  }));

  const doc = new Document({
    sections: [{
      properties: {
        page: {
          margin: {
            top: 1440,
            right: 1440,
            bottom: 1440,
            left: 1440
          }
        }
      },
      children
    }]
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `guia-estudio-${filename}.docx`);
};