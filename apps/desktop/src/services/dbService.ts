import Database from '@tauri-apps/plugin-sql';
import type { GmDocument } from '../types/document';
import { isTauri } from '../utils/env';

let db: Database | null = null;

export const initDb = async () => {
  if (!isTauri()) return; // Browser fallback uses localStorage directly
  if (!db) {
    db = await Database.load('sqlite:goldmine.db');
    // Schema v2: stores the entire document as JSON blob.
    // Only metadata columns are indexed for listing performance.
    await db.execute(`
      CREATE TABLE IF NOT EXISTS documents (
        id          TEXT PRIMARY KEY,
        title       TEXT    NOT NULL DEFAULT '',
        description TEXT    NOT NULL DEFAULT '',
        updated_at  TEXT    NOT NULL,
        data        TEXT    NOT NULL
      )
    `);
  }
};

export const saveDocument = async (doc: GmDocument) => {
  if (!isTauri()) {
    const docs = JSON.parse(localStorage.getItem('gm_documents') || '{}');
    docs[doc.id] = doc;
    localStorage.setItem('gm_documents', JSON.stringify(docs));
    return;
  }
  
  if (!db) await initDb();
  await db!.execute(
    `INSERT INTO documents (id, title, description, updated_at, data)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT(id) DO UPDATE
       SET title = $2, description = $3, updated_at = $4, data = $5`,
    [doc.id, doc.title, doc.description ?? '', doc.updatedAt, JSON.stringify(doc)]
  );
};

const migrateDocument = (doc: GmDocument): GmDocument => {
  const removedTypes = ['section-label', 'highlight-text', 'sub-date'];
  
  const filterBlocks = (blocks: any[]): any[] => {
    return blocks
      .filter(b => !removedTypes.includes(b.type))
      .map(b => {
        if (b.children) b.children = filterBlocks(b.children);
        if (b.data && b.data.blocks) b.data.blocks = filterBlocks(b.data.blocks);
        return b;
      });
  };

  doc.headerBlocks = doc.headerBlocks || [];
  doc.footerBlocks = doc.footerBlocks || [];

  doc.pages.forEach(page => {
    page.blocks = filterBlocks(page.blocks);
    
    // Migrate legacy per-page headers/footers to document level
    // (We take the blocks from the first page that has them)
    if ((page as any).headerBlocks && (page as any).headerBlocks.length > 0) {
      if (doc.headerBlocks.length === 0) {
        doc.headerBlocks = filterBlocks((page as any).headerBlocks);
      }
      delete (page as any).headerBlocks;
    }
    
    if ((page as any).footerBlocks && (page as any).footerBlocks.length > 0) {
      if (doc.footerBlocks.length === 0) {
        doc.footerBlocks = filterBlocks((page as any).footerBlocks);
      }
      delete (page as any).footerBlocks;
    }
  });

  doc.headerBlocks = filterBlocks(doc.headerBlocks);
  doc.footerBlocks = filterBlocks(doc.footerBlocks);
  
  return doc;
};

export const loadDocument = async (id: string): Promise<GmDocument | null> => {
  if (!isTauri()) {
    const docs = JSON.parse(localStorage.getItem('gm_documents') || '{}');
    const doc = docs[id] || null;
    return doc ? migrateDocument(doc) : null;
  }

  if (!db) await initDb();
  const rows = await db!.select<{ data: string }[]>(
    'SELECT data FROM documents WHERE id = $1', [id]
  );
  if (rows.length === 0) return null;
  return migrateDocument(JSON.parse(rows[0].data) as GmDocument);
};

export const listDocuments = async (): Promise<{
  id: string;
  title: string;
  description: string;
  updatedAt: string;
}[]> => {
  if (!isTauri()) {
    const docs = JSON.parse(localStorage.getItem('gm_documents') || '{}');
    return Object.values(docs).map((d: any) => ({
      id: d.id,
      title: d.title,
      description: d.description || '',
      updatedAt: d.updatedAt
    })).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  if (!db) await initDb();
  const rows = await db!.select<{
    id: string;
    title: string;
    description: string;
    updated_at: string;
  }[]>('SELECT id, title, description, updated_at FROM documents ORDER BY updated_at DESC');
  
  return rows.map(r => ({
    id:          r.id,
    title:       r.title,
    description: r.description,
    updatedAt:   r.updated_at,
  }));
};

export const deleteDocument = async (id: string) => {
  if (!isTauri()) {
    const docs = JSON.parse(localStorage.getItem('gm_documents') || '{}');
    delete docs[id];
    localStorage.setItem('gm_documents', JSON.stringify(docs));
    return;
  }

  if (!db) await initDb();
  await db!.execute('DELETE FROM documents WHERE id = $1', [id]);
};
