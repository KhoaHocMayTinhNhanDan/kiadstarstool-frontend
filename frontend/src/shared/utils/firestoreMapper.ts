import type { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

/**
 * Map Firestore document -> Domain JSON
 * Adds doc.id into object safely
 */
export function mapFirestoreDoc<T extends DocumentData>(
  doc: QueryDocumentSnapshot<DocumentData>
): T & { id: string } {
  return {
    ...(doc.data() as T),
    id: doc.id
  };
}

/**
 * Map Firestore snapshot -> array
 */
export function mapFirestoreDocs<T extends DocumentData>(
  docs: QueryDocumentSnapshot<DocumentData>[]
): (T & { id: string })[] {
  return docs.map((doc) => mapFirestoreDoc<T>(doc));
}

/**
 * Remove id before saving to Firestore
 */
export function stripId<T extends { id?: string }>(data: T): Omit<T, "id"> {
  const { id, ...rest } = data;
  return rest;
}