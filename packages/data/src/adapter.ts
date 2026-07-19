import Database from '@tauri-apps/plugin-sql';
import type { GmDocument } from '@goldmine/types';
import { migrateDocument } from '@goldmine/sdk';

export interface DocumentAdapter {
  saveDocument: (doc: GmDocument) => Promise<void>;
  loadDocument: (id: string) => Promise<GmDocument | null>;
  listDocuments: () => Promise<{ id: string; title: string; description: string; updatedAt: string }[]>;
  deleteDocument: (id: string) => Promise<void>;
}

// Minimal isTauri check, just looks for window.__TAURI__
const isTauri = () => typeof window !== 'undefined' && (window as any).__TAURI__ !== undefined;

let db: Database | null = null;

export const createTauriAdapter = (): DocumentAdapter => {

  const initDb = async () => {
    if (!isTauri()) return;
    if (!db) {
      db = await Database.load('sqlite:goldmine.db');
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

  return {
    saveDocument: async (doc: GmDocument) => {
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
    },

    loadDocument: async (id: string): Promise<GmDocument | null> => {
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
    },

    listDocuments: async () => {
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
    },

    deleteDocument: async (id: string) => {
      if (!isTauri()) {
        const docs = JSON.parse(localStorage.getItem('gm_documents') || '{}');
        delete docs[id];
        localStorage.setItem('gm_documents', JSON.stringify(docs));
        return;
      }

      if (!db) await initDb();
      await db!.execute('DELETE FROM documents WHERE id = $1', [id]);
    }
  };
};
