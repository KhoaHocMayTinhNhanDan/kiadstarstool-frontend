import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  query, // Giữ nguyên
  where, // Giữ nguyên
  limit, // Giữ nguyên
  WriteBatch // Thêm import này
} from "firebase/firestore";
import type { IBranchDataSource } from "@/03-interface-adapters/gateways/outbound/device_interfaces/branch/IBranchDataSource";
import { Branch } from "@/01-entities/branch/Branch.entity";
import { BranchId } from "@/01-entities/branch/value-objects/BranchId.vo";
import { BranchAddress } from "@/01-entities/branch/value-objects/BranchAddress.vo";
import { BranchCapacity } from "@/01-entities/branch/value-objects/BranchCapacity.vo";
import { BranchFinancial } from "@/01-entities/branch/value-objects/BranchFinancial.vo";
import { BranchOperatingHours } from "@/01-entities/branch/value-objects/BranchOperatingHours.vo";
import { mapFirestoreDocs, stripId } from "@/shared/utils/firestoreMapper";
import { type Firestore, type CollectionReference } from "firebase/firestore";

export class FirebaseBranchDataSource implements IBranchDataSource {
  private collectionRef: CollectionReference;
  private db: Firestore;
  constructor(db: Firestore) {
    this.db = db;
    this.collectionRef = collection(this.db, "branches");
  }

  // Helper để hydrate entity từ JSON
  private hydrate(data: any): Branch {
    return Branch.create({
      id: BranchId.create(data.id),
      name: data.name,
      code: data.code,
      address: BranchAddress.create(data.address),
      capacity: BranchCapacity.create(data.capacity),
      financial: BranchFinancial.create(data.financial),
      operatingHours: BranchOperatingHours.create(data.operatingHours),
      isActive: data.isActive,
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : (data.createdAt ? new Date(data.createdAt) : undefined),
      updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : (data.updatedAt ? new Date(data.updatedAt) : undefined),
    }).getValue();
  }

  async save(branch: Branch): Promise<void> {
    try {
      // Chuyển đổi Branch entity sang JSON object phẳng để lưu
      const dataToSave = {
        name: branch.name,
        code: branch.code,
        address: branch.address.props,
        capacity: branch.capacity.props,
        financial: branch.financial.props,
        operatingHours: branch.operatingHours.props,
        isActive: branch.isActive,
        createdAt: branch.createdAt.toISOString(),
        updatedAt: branch.updatedAt.toISOString(),
      };

      const docRef = doc(this.collectionRef, branch.id.toString());
      await setDoc(docRef, dataToSave, { merge: true });
    } catch (error) {
      console.error("[FirebaseBranchDataSource] save error:", error);
      throw new Error("branch/save-failed");
    }
  }

  saveInBatch(branch: Branch, batch: WriteBatch): void {
    const dataToSave = {
      name: branch.name,
      code: branch.code,
      address: branch.address.props,
      capacity: branch.capacity.props,
      financial: branch.financial.props,
      operatingHours: branch.operatingHours.props,
      isActive: branch.isActive,
      createdAt: branch.createdAt.toISOString(),
      updatedAt: branch.updatedAt.toISOString(),
    };

    const docRef = doc(this.collectionRef, branch.id.toString());
    batch.set(docRef, dataToSave, { merge: true });
  }

  async getById(id: string): Promise<Branch | null> {
    const docRef = doc(this.collectionRef, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? this.hydrate({ id: docSnap.id, ...docSnap.data() }) : null;
  }

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(this.collectionRef, id));
  }

  async findAll(): Promise<Branch[]> {
    const snapshot = await getDocs(this.collectionRef);
    const docs = mapFirestoreDocs<any>(snapshot.docs);
    return docs.map(d => {
      try {
        return this.hydrate(d);
      } catch (error) {
        console.warn(`[FirebaseBranchDataSource] Skipping invalid branch ${d.id}:`, error);
        return null;
      }
    }).filter((b): b is Branch => b !== null);
  }

  async exists(code: string): Promise<boolean> {
    const q = query(this.collectionRef, where("code", "==", code), limit(1));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  }
}