import { Document, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, Packer, HeadingLevel, ExternalHyperlink } from 'docx';
import { saveAs } from 'file-saver';
import pptxgen from 'pptxgenjs';

const parseContent = (content: string) => {
  const sections = content.split('\n\n');
  const elements: any[] = [];

  sections.forEach(section => {
    const lines = section.split('\n');
    const title = lines[0];
    const content = lines.slice(1);

    elements.push({
      type: 'heading',
      content: title
    });

    content.forEach(line => {
      const cleanLine = line.replace(/^[-•] /, '').trim();
      if (cleanLine) {
        elements.push({
          type: 'paragraph',
          content: cleanLine
        });
      }
    });
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

const parseResourceLinks = (content: string) => {
  const lines = content.split('\n');
  const links: { text: string; url: string }[] = [];

  lines.forEach(line => {
    if (line.startsWith('*')) {
      const linkMatch = line.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        const [, text, url] = linkMatch;
        links.push({ text, url });
      }
    }
  });

  return links;
};

export const generateDocx = async (content: string, filename: string) => {
  const elements = parseContent(content);
  const children = elements.map(element => {
    if (element.type === 'heading') {
      return new Paragraph({
        text: element.content,
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 240, after: 120 },
        thematicBreak: true
      });
    } else {
      return new Paragraph({
        children: createFormattedText(element.content),
        spacing: { before: 120, after: 120 }
      });
    }
  });

  const doc = new Document({
    sections: [{
      properties: {},
      children
    }]
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${filename}.docx`);
};

export const generatePptx = async (content: string, filename: string) => {
  const pres = new pptxgen();
  
  pres.layout = 'LAYOUT_WIDE';
  pres.defineLayout({ 
    name: 'LAYOUT_WIDE',
    width: 13.33,
    height: 7.5
  });

  const colors = {
    primary: '1B2A4A',
    secondary: '2C3E67',
    accent1: '364B7F',
    accent2: '1F3355',
    accent3: '253C62',
    text: 'FFFFFF'
  };

  const slides = content.split('\n\n').filter(slide => slide.trim());
  
  slides.forEach((slideContent, index) => {
    const slide = pres.addSlide();
    const [title, ...content] = slideContent.split('\n');

    const bgColor = index % 3 === 0 ? colors.primary : 
                   index % 3 === 1 ? colors.secondary : colors.accent1;

    slide.background = { 
      color: bgColor,
      gradient: {
        type: 'linear',
        stops: [
          { color: bgColor, position: 0 },
          { color: colors.accent2, position: 100 }
        ],
        angle: 45
      }
    };
    
    slide.addText(title.replace('Diapositiva ', ''), {
      x: 0.5,
      y: 0.5,
      w: '95%',
      h: 1.5,
      fontSize: 44,
      bold: true,
      color: colors.text,
      fontFace: 'Century Gothic',
      align: 'center',
      glow: { size: 3, opacity: 0.3, color: colors.accent3 }
    });

    const contentLines = content
      .map(line => line.trim())
      .filter(line => line);

    let currentY = 2.3;
    let isSubtitle = true;
    const availableHeight = 7.5 - currentY - 1.0;
    const contentHeight = contentLines.length * 0.8;
    const scaleFactor = Math.min(1, availableHeight / contentHeight);

    contentLines.forEach(line => {
      const isListItem = line.startsWith('- ');
      const textContent = isListItem ? line.substring(2) : line;
      
      const baseSize = isSubtitle ? 26 : 20;
      const textLength = textContent.length;
      const dynamicSize = Math.min(
        baseSize,
        textLength > 100 ? baseSize * 0.8 :
        textLength > 80 ? baseSize * 0.9 : baseSize
      );

      slide.addText(textContent, {
        x: 0.5,
        y: currentY,
        w: '95%',
        h: isSubtitle ? 0.9 : 0.7,
        fontSize: Math.round(dynamicSize * scaleFactor),
        color: colors.text,
        fontFace: 'Century Gothic',
        align: isSubtitle ? 'center' : 'left',
        bullet: isListItem ? { type: 'bullet' } : false,
        bold: isSubtitle,
        glow: isSubtitle ? { size: 2, opacity: 0.2, color: colors.accent3 } : undefined,
        fit: 'shrink'
      });

      currentY += (isSubtitle ? 1.1 : 0.8) * scaleFactor;
      isSubtitle = false;
    });

    slide.addShape(pres.ShapeType.rect, {
      x: 0,
      y: 6.8,
      w: '100%',
      h: 0.7,
      fill: { 
        color: colors.accent3,
        transparency: 30
      },
      line: { color: colors.accent3 }
    });

    slide.addShape(pres.ShapeType.rect, {
      x: 0,
      y: 0,
      w: '100%',
      h: 0.2,
      fill: { 
        color: colors.accent2,
        transparency: 30
      },
      line: { color: colors.accent2 }
    });

    slide.addShape(pres.ShapeType.rect, {
      x: 12.5,
      y: 0,
      w: 0.8,
      h: 0.8,
      fill: { 
        color: colors.accent1,
        transparency: 40
      },
      line: { color: colors.accent1 },
      rotate: 45
    });
  });

  await pres.writeFile(`${filename}.pptx`);
};

export const generatePdf = async (content: string, filename: string) => {
  const links = parseResourceLinks(content);
  
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          text: "Recursos Educativos Complementarios",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 240, after: 120 }
        }),
        new Paragraph({
          text: "Enlaces recomendados para profundizar en el tema:",
          spacing: { before: 120, after: 240 }
        }),
        ...links.map(link => new Paragraph({
          children: [
            new ExternalHyperlink({
              children: [
                new TextRun({
                  text: link.text,
                  style: "Hyperlink",
                  size: 24
                })
              ],
              link: link.url
            })
          ],
          spacing: { before: 120, after: 120 }
        }))
      ]
    }]
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${filename}.pdf`);
};