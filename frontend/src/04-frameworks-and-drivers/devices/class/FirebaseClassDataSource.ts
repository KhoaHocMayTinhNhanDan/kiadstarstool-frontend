import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  WriteBatch // Thêm import này
} from "firebase/firestore";
import type { IClassDataSource } from "@/03-interface-adapters/gateways/outbound/device_interfaces/class/IClassDataSource";
import { Class, type ClassProps } from "@/01-entities/classes/Class.entity";
import { mapFirestoreDocs, stripId } from "@/shared/utils/firestoreMapper";
import { ClassId } from '@/01-entities/classes/value-objects/ClassId.vo';
import { BranchId } from '@/01-entities/branch/value-objects/BranchId.vo';
import { type Firestore, type CollectionReference } from "firebase/firestore";

export class FirebaseClassDataSource implements IClassDataSource {
  private collectionRef: CollectionReference;
  private db: Firestore;
  constructor(db: Firestore) {
    this.db = db;
    this.collectionRef = collection(this.db, "classes");
  }

  private hydrate(data: any): Class {
    const props: ClassProps = {
      id: ClassId.create(data.id),
      branchId: BranchId.create(data.branchId),
      name: data.name,
      code: data.code,
      status: data.status,
      maxStudents: data.maxStudents,
      currentStudents: data.currentStudents || 0,
      startDate: data.startDate?.toDate ? data.startDate.toDate() : new Date(data.startDate),
      endDate: data.endDate?.toDate ? data.endDate.toDate() : (data.endDate ? new Date(data.endDate) : undefined),
      sessions: data.sessions || [],
      teacherName: data.teacherName,
      tuition: data.tuition
    };
    const result = Class.create(props);
    if (result.isFailure) {
      console.error(`[FirebaseClassDataSource] Failed to hydrate class ${data.id}: ${result.getErrorValue()}`);
      throw new Error(`Failed to hydrate class ${data.id}: ${result.getErrorValue()}`);
    }
    return result.getValue();
  }

  async getByBranchId(branchId: string): Promise<Class[]> {
    try {
      let q = query(this.collectionRef);
      
      if (branchId) {
        q = query(this.collectionRef, where("branchId", "==", branchId));
      }

      const snapshot = await getDocs(q);
      const docs = mapFirestoreDocs<any>(snapshot.docs);
      
      return docs.map(d => this.hydrate(d));
    } catch (error) {
      console.error("[FirebaseClassDataSource] getByBranchId error:", error);
      throw new Error("class/fetch-failed");
    }
  }

  async save(classEntity: Class): Promise<void> {
    try {
      // Class entity toJSON might include id, strip it for firestore data
      // FIX: Remove undefined fields (like endDate)
      const json = JSON.parse(JSON.stringify(classEntity.toJSON()));
      const data = stripId(json);

      const docRef = doc(this.collectionRef, classEntity.id.toString());
      await setDoc(docRef, data, { merge: true });
    } catch (error) {
      console.error("[FirebaseClassDataSource] save error:", error);
      throw new Error("class/save-failed");
    }
  }

  async getById(id: string): Promise<Class | null> {
    try {
      const docRef = doc(this.collectionRef, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = { id: docSnap.id, ...docSnap.data() };
        return this.hydrate(data);
      }
      return null;
    } catch (error) {
      console.error("[FirebaseClassDataSource] getById error:", error);
      throw new Error("class/fetch-failed");
    }
  }

  async getAll(): Promise<Class[]> {
    return this.getByBranchId("");
  }

  async update(classEntity: Class): Promise<void> {
    return this.save(classEntity);
  }

  saveInBatch(classEntity: Class, batch: WriteBatch): void {
    // FIX: Remove undefined fields
    const json = JSON.parse(JSON.stringify(classEntity.toJSON()));
    const data = stripId(json);

    const docRef = doc(this.collectionRef, classEntity.id.toString());
    batch.set(docRef, data, { merge: true });
  }


  async delete(id: string): Promise<void> {
    try {
      await deleteDoc(doc(this.collectionRef, id));
    } catch (error) {
      console.error("[FirebaseClassDataSource] delete error:", error);
      throw new Error("class/delete-failed");
    }
  }
}