import { jsPDF } from 'jspdf';
import type { ChecklistState } from '../../data/types';
import { getBagEmoji, getBagName } from '../../data/engine';
import { Button } from '../ui/Button';

interface ExportMenuProps {
  state: ChecklistState;
}

function buildShareText(state: ChecklistState): string {
  const lines: string[] = [
    '🏥 Hospital Bag Checklist — babyhospitalbag.com',
    '',
  ];

  for (const bag of state.bags) {
    const bagItems = [...state.items, ...state.customItems].filter(
      (item) => item.assignedBag === bag.id,
    );
    if (bagItems.length === 0) continue;

    lines.push(`${bag.emoji} ${bag.name}`);
    lines.push('─'.repeat(24));

    for (const item of bagItems) {
      const check = item.checked ? '✅' : '⬜';
      lines.push(`${check} ${item.name}${item.quantity ? ` (${item.quantity})` : ''}`);
    }
    lines.push('');
  }

  const checked = [...state.items, ...state.customItems].filter((i) => i.checked).length;
  const total = state.items.length + state.customItems.length;
  lines.push(`Progress: ${checked}/${total} items packed`);

  return lines.join('\n');
}

function exportPDF(state: ChecklistState) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  doc.setFontSize(18);
  doc.text('Hospital Bag Checklist', pageWidth / 2, y, { align: 'center' });
  y += 8;
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text('babyhospitalbag.com', pageWidth / 2, y, { align: 'center' });
  y += 12;
  doc.setTextColor(0);

  for (const bag of state.bags) {
    const bagItems = [...state.items, ...state.customItems].filter(
      (item) => item.assignedBag === bag.id,
    );
    if (bagItems.length === 0) continue;

    if (y > 260) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text(`${getBagEmoji(bag.id)} ${getBagName(bag.id)}`, 14, y);
    y += 7;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);

    for (const item of bagItems) {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      const check = item.checked ? '[x]' : '[ ]';
      const qty = item.quantity ? ` — ${item.quantity}` : '';
      doc.text(`${check} ${item.name}${qty}`, 18, y);
      y += 5;
    }
    y += 6;
  }

  doc.save('hospital-bag-checklist.pdf');
}

export function ExportMenu({ state }: ExportMenuProps) {
  const handleShare = async () => {
    const text = buildShareText(state);

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Hospital Bag Checklist',
          text,
          url: window.location.href,
        });
        return;
      } catch {
        // User cancelled or share failed — fall through to clipboard
      }
    }

    await navigator.clipboard.writeText(text);
    alert('Checklist copied to clipboard! Share it with your partner via WhatsApp or SMS.');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-wrap gap-2 no-print">
      <Button variant="secondary" onClick={() => exportPDF(state)}>
        Download PDF
      </Button>
      <Button variant="secondary" onClick={handlePrint}>
        Print
      </Button>
      <Button onClick={handleShare}>
        Share with Partner
      </Button>
    </div>
  );
}

export { buildShareText };
