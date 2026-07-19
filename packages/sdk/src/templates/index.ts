import type { GmDocument } from '@goldmine/types';
import { createBlankDocument, createGoldmineTemplate } from '../factories/document-factory';

export interface GmTemplateDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  create: () => GmDocument;
}

export const TEMPLATES: GmTemplateDefinition[] = [
  {
    id: 'blank',
    name: 'Blank Document',
    description: 'Start from scratch with a single white page.',
    icon: 'pi pi-file',
    create: () => createBlankDocument()
  },
  {
    id: 'goldmine-starter',
    name: 'Goldmine Starter',
    description: 'Standard report with a dark cover and back cover.',
    icon: 'pi pi-sparkles',
    create: () => createGoldmineTemplate()
  },
  {
    id: 'earnings-report',
    name: 'Earnings Report',
    description: 'Quarterly earnings report with data tables and financial charts.',
    icon: 'pi pi-chart-bar',
    create: () => {
      const doc = createGoldmineTemplate();
      doc.title = 'Q3 Earnings Report';
      doc.description = 'Quarterly Financial Results';
      if (doc.pages[1]) {
        doc.pages[1].blocks = [
          {
            id: crypto.randomUUID(),
            type: 'heading',
            data: { text: 'Q3 Financial Highlights' },
            style: { fontSize: '2rem', margin: '0 0 1rem 0' }
          },
          {
            id: crypto.randomUUID(),
            type: 'content-grid',
            data: {
              cols: 2,
              gap: '2rem',
              blocks: [
                { id: crypto.randomUUID(), type: 'market-card', data: { symbol: 'REVENUE', price: '$4.2B', change: '+12%', isPositive: true, sparkline: [10,20,15,30,45] } },
                { id: crypto.randomUUID(), type: 'market-card', data: { symbol: 'EBITDA', price: '$850M', change: '+5%', isPositive: true, sparkline: [20,15,25,35,40] } }
              ]
            }
          }
        ];
      }
      return doc;
    }
  },
  {
    id: 'market-analysis',
    name: 'Market Analysis',
    description: 'Weekly market commentary and macroeconomic indicators.',
    icon: 'pi pi-globe',
    create: () => {
      const doc = createBlankDocument();
      doc.title = 'Global Market Analysis';
      doc.description = 'Weekly Macro Update';
      doc.pages[0].blocks = [
        {
          id: crypto.randomUUID(),
          type: 'heading',
          data: { text: 'Global Market Commentary' },
          style: { fontSize: '2.5rem', margin: '0 0 1rem 0', color: 'var(--color-gm-primary)' }
        },
        {
          id: crypto.randomUUID(),
          type: 'paragraph',
          data: { html: '<p>The global markets experienced significant volatility this week...</p>' }
        },
        {
          id: crypto.randomUUID(),
          type: 'trend-badge',
          data: { label: 'MARKET SENTIMENT', value: 'BULLISH', isPositive: true }
        }
      ];
      return doc;
    }
  },
  {
    id: 'stock-pitch',
    name: 'Stock Pitch',
    description: 'Detailed investment thesis for a specific equity.',
    icon: 'pi pi-chart-line',
    create: () => {
      const doc = createGoldmineTemplate();
      doc.title = 'Investment Thesis: AAPL';
      doc.description = 'Long-term buy recommendation';
      if (doc.pages[1]) {
        doc.pages[1].blocks = [
          {
            id: crypto.randomUUID(),
            type: 'stock-pick',
            data: {
              ticker: 'AAPL',
              companyName: 'Apple Inc.',
              action: 'BUY',
              currentPrice: 175.50,
              targetPrice: 220.00,
              timeframe: '12-18 Months',
              conviction: 'High'
            }
          },
          {
            id: crypto.randomUUID(),
            type: 'paragraph',
            data: { html: '<p>Our high conviction buy rating on Apple is driven by Services growth...</p>' }
          }
        ];
      }
      return doc;
    }
  }
];
