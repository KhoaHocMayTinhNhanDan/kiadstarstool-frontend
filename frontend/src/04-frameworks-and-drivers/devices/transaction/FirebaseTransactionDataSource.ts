import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
  orderBy
} from "firebase/firestore";
import type { ITransactionDataSource } from "@/03-interface-adapters/gateways/outbound/device_interfaces/finance/ITransactionDataSource";
import { mapFirestoreDocs, stripId } from "@/shared/utils/firestoreMapper";
import { type Firestore, type CollectionReference } from "firebase/firestore";

export class FirebaseTransactionDataSource implements ITransactionDataSource {
  private collectionRef: CollectionReference;

  private db: Firestore;
  constructor(db: Firestore) {
    this.db = db;
    this.collectionRef = collection(this.db, "transactions");
  }
  async save(transaction: any): Promise<void> {
    try {
      // Transaction entity toJSON or raw object
      // Assuming transaction has an id property
      const id = transaction.id?.toString() || transaction.id;
      const rawData = stripId(transaction);
      
      // FIX: Firestore không cho phép lưu giá trị `undefined`.
      // Dùng JSON.stringify để loại bỏ các trường có giá trị undefined trước khi lưu.
      const data = JSON.parse(JSON.stringify(rawData));
      
      // Ensure dates are strings if they aren't already
      if (data.transactionDate instanceof Date) data.transactionDate = data.transactionDate.toISOString();
      if (data.createdAt instanceof Date) data.createdAt = data.createdAt.toISOString();
      if (data.updatedAt instanceof Date) data.updatedAt = data.updatedAt.toISOString();

      const docRef = doc(this.collectionRef, id);
      await setDoc(docRef, data, { merge: true });
    } catch (error) {
      console.error("[FirebaseTransactionDataSource] save error:", error);
      throw new Error("transaction/save-failed");
    }
  }

  async getAll(): Promise<any[]> {
    try {
      // Order by transactionDate desc
      const q = query(this.collectionRef, orderBy("transactionDate", "desc"));
      const snapshot = await getDocs(q);
      return mapFirestoreDocs<any>(snapshot.docs);
    } catch (error) {
      // Index might be missing for orderBy
      console.warn("[FirebaseTransactionDataSource] getAll query failed (likely missing index), falling back to unordered fetch:", error);
      const snapshot = await getDocs(this.collectionRef);
      return mapFirestoreDocs<any>(snapshot.docs).sort((a, b) => 
        new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime()
      );
    }
  }

  async getByBranchId(branchId: string): Promise<any[]> {
    if (!branchId) return this.getAll();

    try {
      const q = query(
        this.collectionRef,
        where("branchId", "==", branchId),
        orderBy("transactionDate", "desc")
      );
      const snapshot = await getDocs(q);
      return mapFirestoreDocs<any>(snapshot.docs);
    } catch (error: any) {
      // Fallback: Nếu lỗi do thiếu Index, chuyển sang lọc client-side
      if (error.code === 'failed-precondition' || error.message?.includes('requires an index')) {
        console.warn("[FirebaseTransactionDataSource] ⚠️ Missing Index for getByBranchId. Falling back to client-side sorting.");
        const qFallback = query(this.collectionRef, where("branchId", "==", branchId));
        const snapshot = await getDocs(qFallback);
        return mapFirestoreDocs<any>(snapshot.docs).sort((a, b) => 
          new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime()
        );
      }
      console.error(`[FirebaseTransactionDataSource] getByBranchId(${branchId}) error:`, error);
      throw new Error("transaction/fetch-failed");
    }
  }
}