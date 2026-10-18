import { jsPDF } from 'jspdf';
import { Guide, Order } from '../types';

interface PDFGenerationOptions {
  guide: Guide;
  order?: Order;
  customerName?: string;
}

export function generateGuidePDF(options: PDFGenerationOptions): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      const { guide, order, customerName } = options;
      const clientName = customerName || order?.customerName || 'Cliente Estimado';
      const orderRef = order?.reference || 'AMOSTRA-GRATUITA';

      // Create PDF document (A4 portrait)
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;

      // ==========================================
      // PAGE 1: LUXURY COVER PAGE
      // ==========================================
      // Dark Plum / Purple Background
      doc.setFillColor(59, 7, 100); // #3B0764
      doc.rect(0, 0, pageWidth, pageHeight, 'F');

      // Decorative Gold Border
      doc.setDrawColor(217, 119, 6); // Gold #D97706
      doc.setLineWidth(1.2);
      doc.rect(12, 12, pageWidth - 24, pageHeight - 24);

      doc.setDrawColor(245, 158, 11);
      doc.setLineWidth(0.4);
      doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

      // Header Brand
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(253, 230, 138); // Pale Gold
      doc.text('BELEZA CAPILAR ANGOLA', pageWidth / 2, 38, { align: 'center' });

      doc.setFontSize(8);
      doc.setTextColor(243, 232, 255);
      doc.text('COLEÇÃO OFICIAL DE EDUCAÇÃO CAPILAR', pageWidth / 2, 44, { align: 'center' });

      // Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(26);
      doc.setTextColor(255, 255, 255);
      
      const titleLines = doc.splitTextToSize(guide.title.toUpperCase(), contentWidth - 10);
      doc.text(titleLines, pageWidth / 2, 85, { align: 'center' });

      // Subtitle
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(13);
      doc.setTextColor(251, 207, 232); // Soft Rose
      const subLines = doc.splitTextToSize(guide.shortDescription, contentWidth - 20);
      doc.text(subLines, pageWidth / 2, 120, { align: 'center' });

      // Decorative central gold bar
      doc.setDrawColor(245, 158, 11);
      doc.setLineWidth(1);
      doc.line(pageWidth / 2 - 30, 145, pageWidth / 2 + 30, 145);

      // Slogan
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(11);
      doc.setTextColor(254, 243, 199);
      doc.text('“Aprende a cuidar do teu cabelo com conhecimento e simplicidade”', pageWidth / 2, 160, { align: 'center' });

      // Author & Licensing
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(255, 255, 255);
      doc.text('MANUEL MARCOLINO MIRANDA', pageWidth / 2, 215, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(216, 180, 254);
      doc.text('Autor & Fundador — Luanda, Angola', pageWidth / 2, 222, { align: 'center' });

      // Bottom License Box
      doc.setFillColor(74, 21, 75);
      doc.roundedRect(margin, 240, contentWidth, 30, 3, 3, 'F');

      doc.setFontSize(8);
      doc.setTextColor(254, 240, 138);
      doc.text(`CÓPIA LICENCIADA PARA: ${clientName.toUpperCase()}`, pageWidth / 2, 250, { align: 'center' });
      doc.setTextColor(243, 232, 255);
      doc.text(`REFERÊNCIA DA ENCOMENDA: ${orderRef}  •  EDIÇÃO DIGITAL OFICIAL 2026`, pageWidth / 2, 258, { align: 'center' });

      // ==========================================
      // PAGE 2: FICHA TÉCNICA E SUMÁRIO
      // ==========================================
      doc.addPage();
      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');

      // Top banner line
      doc.setFillColor(74, 21, 75);
      doc.rect(0, 0, pageWidth, 12, 'F');

      // Title Page 2
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(74, 21, 75);
      doc.text('Ficha Técnica & Direitos de Autor', margin, 32);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(75, 85, 99);

      const metadataBlock = [
        `Título: ${guide.title}`,
        `Autor e Criador: Manuel Marcolino Miranda`,
        `Propriedade Intelectual: Beleza Capilar Angola`,
        `Formato: ${guide.format} (Original)`,
        `Data de Emissão: ${new Date().toLocaleDateString('pt-PT')}`,
        `Licença de Uso: Pessoal e intransmissível para ${clientName} (Ref: ${orderRef})`,
        `País de Origem: Angola`,
      ];

      let metaY = 44;
      metadataBlock.forEach(line => {
        doc.text(line, margin, metaY);
        metaY += 7;
      });

      // Disclaimer Box (Aviso de Responsabilidade)
      metaY += 4;
      doc.setFillColor(254, 242, 242);
      doc.setDrawColor(248, 113, 113);
      doc.roundedRect(margin, metaY, contentWidth, 26, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(153, 27, 27);
      doc.text('AVISO DE RESPONSABILIDADE MÉDICA E CAPILAR', margin + 5, metaY + 7);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(185, 28, 28);
      const disclaimer = 'Este guia possui fins estritamente informativos e de boas práticas de manutenção capilar. Não prometemos crescimento milagroso nem cura de patologias do couro cabeludo. Em caso de queda aguda, dor, feridas ou comichão persistente, consulte sempre um dermatologista ou tricologista qualificado.';
      const disLines = doc.splitTextToSize(disclaimer, contentWidth - 10);
      doc.text(disLines, margin + 5, metaY + 13);

      // Table of Contents
      metaY += 38;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(74, 21, 75);
      doc.text('Índice Geral dos Capítulos', margin, metaY);

      metaY += 8;
      doc.setDrawColor(229, 231, 235);
      doc.line(margin, metaY, pageWidth - margin, metaY);

      metaY += 8;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(55, 65, 81);

      guide.tableOfContents.forEach((item, idx) => {
        doc.text(item, margin + 5, metaY);
        doc.text(`Pág. ${idx + 3}`, pageWidth - margin - 5, metaY, { align: 'right' });
        doc.setDrawColor(243, 244, 246);
        doc.line(margin + 5, metaY + 2, pageWidth - margin - 5, metaY + 2);
        metaY += 9;
      });

      // ==========================================
      // PAGE 3: INTRODUÇÃO E FUNDAMENTOS
      // ==========================================
      doc.addPage();
      renderPageHeader(doc, guide.title, 'Capítulo 1');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(74, 21, 75);
      doc.text(guide.sampleExcerpt.chapterTitle, margin, 35);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10.5);
      doc.setTextColor(55, 65, 81);

      const introText = `${guide.sampleExcerpt.text}\n\nPara nós em Angola, cuidar do cabelo crespo e natural não pode ser um processo penoso ou excessivamente caro. O segredo da saúde capilar está na consistência das rotinas e na compreensão das necessidades biológicas da fibra.`;
      const introLines = doc.splitTextToSize(introText, contentWidth);
      doc.text(introLines, margin, 46);

      // Key Points Callout
      const calloutY = 90;
      doc.setFillColor(250, 245, 255); // Purple tint
      doc.setDrawColor(192, 132, 252);
      doc.roundedRect(margin, calloutY, contentWidth, 58, 3, 3, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(88, 28, 135);
      doc.text('PONTOS-CHAVE DESTA LIÇÃO (Manuel Marcolino Miranda)', margin + 6, calloutY + 8);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(55, 65, 81);

      let keyY = calloutY + 16;
      guide.sampleExcerpt.keyPoints.forEach(kp => {
        const kpLines = doc.splitTextToSize(`• ${kp}`, contentWidth - 12);
        doc.text(kpLines, margin + 6, keyY);
        keyY += 12;
      });

      // Practical Step by Step
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(74, 21, 75);
      doc.text('Procedimento Prático Passo a Passo', margin, 160);

      const steps = [
        'Passo 1 (Preparação): Antes de lavar, desembarace suavemente com os dedos e aplique um óleo vegetal leve (azeite doce ou óleo de coco) durante 15 minutos (Pré-Poo).',
        'Passo 2 (Lavagem): Use água morna ou à temperatura ambiente. Foque o champô apenas no couro cabeludo com massagens circulares com as pontas dos dedos (nunca com as unhas).',
        'Passo 3 (Tratamento): Aplique a máscara mecha a mecha, enluvando no sentido do crescimento. Deixe agir pelo tempo indicado com uma touca plástica.',
        'Passo 4 (Selagem LOC): Com o cabelo ainda húmido, aplique o Líquido (leave-in com base de água), o Óleo vegetal (nutrição) e o Creme de pentear consistente ou Manteiga vegetal pura.'
      ];

      let stepY = 172;
      steps.forEach(step => {
        const lines = doc.splitTextToSize(step, contentWidth);
        doc.text(lines, margin, stepY);
        stepY += 18;
      });

      renderPageFooter(doc, 3, orderRef);

      // ==========================================
      // PAGE 4: ERROS COMUNS & CRONOGRAMA
      // ==========================================
      doc.addPage();
      renderPageHeader(doc, guide.title, 'Capítulo 2');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(74, 21, 75);
      doc.text('Erros Frequentes que Provocam a Quebra Invisível', margin, 35);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(55, 65, 81);

      const errors = [
        {
          title: '1. Dormir em fronha de algodão comum',
          desc: 'O algodão absorve toda a oleosidade e humidade natural dos fios durante a noite, gerando atrito e embaraço intenso. Solução: utilize sempre touca de cetim ou fronha de cetim/seda.'
        },
        {
          title: '2. Pentes de dentes finos e desembaraço a seco',
          desc: 'Passar qualquer pente em cabelo seco rompe a fibra capilar imediatamente. O desembaraço deve ser sempre feito em mechas com creme emoliente e pente de dentes largos.'
        },
        {
          title: '3. Excesso de tração em tranças e rabos-de-cavalo',
          desc: 'Puxar os fios com força excessiva provoca inflamação nos folículos (alopecia por tração). Sentir dor após trançar não é normal e deve ser evitado.'
        },
        {
          title: '4. Água muito quente na lavagem',
          desc: 'A água a ferver dilata as cutículas excessivamente e remove a proteção lipídica essencial do couro cabeludo, provocando ressecamento compensatório.'
        }
      ];

      let errY = 46;
      errors.forEach(err => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(190, 24, 93); // Pink dark
        doc.text(err.title, margin, errY);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor(55, 65, 81);
        const errLines = doc.splitTextToSize(err.desc, contentWidth);
        doc.text(errLines, margin, errY + 6);
        errY += 24;
      });

      // Special Message from Manuel Marcolino Miranda
      errY += 10;
      doc.setFillColor(254, 243, 199);
      doc.setDrawColor(217, 119, 6);
      doc.roundedRect(margin, errY, contentWidth, 42, 3, 3, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(146, 64, 14);
      doc.text('MENSAGEM DE MANUEL MARCOLINO MIRANDA', margin + 6, errY + 8);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(120, 53, 15);
      const msg = '“Cuidar do cabelo não é sobre cumprir padrões inalcançáveis, mas sobre cultivar o respeito e o amor pela nossa identidade ancestral. Se tiveres dúvidas ou precisares de orientação com o teu pedido, a nossa linha de WhatsApp está sempre à tua disposição em Angola. Desejo-te uma jornada de muita saúde capilar!”';
      const msgLines = doc.splitTextToSize(msg, contentWidth - 12);
      doc.text(msgLines, margin + 6, errY + 16);

      renderPageFooter(doc, 4, orderRef);

      // Return Blob
      const pdfBlob = doc.output('blob');
      resolve(pdfBlob);
    } catch (err) {
      reject(err);
    }
  });
}

function renderPageHeader(doc: jsPDF, title: string, chapter: string) {
  const pageWidth = doc.internal.pageSize.getWidth();
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(156, 163, 175);
  doc.text(`BELEZA CAPILAR ANGOLA  •  ${title.toUpperCase()}`, 20, 15);
  doc.text(chapter, pageWidth - 20, 15, { align: 'right' });
  doc.setDrawColor(243, 244, 246);
  doc.line(20, 18, pageWidth - 20, 18);
}

function renderPageFooter(doc: jsPDF, pageNum: number, orderRef: string) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setDrawColor(243, 244, 246);
  doc.line(20, pageHeight - 16, pageWidth - 20, pageHeight - 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(156, 163, 175);
  doc.text(`Licenciado para uso pessoal • Ref: ${orderRef}`, 20, pageHeight - 10);
  doc.text(`Página ${pageNum}`, pageWidth - 20, pageHeight - 10, { align: 'right' });
}

export async function downloadGuidePDF(guide: Guide, order?: Order, customerName?: string) {
  const blob = await generateGuidePDF({ guide, order, customerName });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const cleanTitle = guide.title.replace(/[^a-zA-Z0-9]/g, '_');
  a.download = `BelezaCapilar_${cleanTitle}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 3000);
}
