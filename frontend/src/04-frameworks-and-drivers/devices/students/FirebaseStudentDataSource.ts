import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query, // Giữ nguyên
  where, // Giữ nguyên
  WriteBatch // Thêm import này
} from "firebase/firestore";;
import type { IStudentDataSource, StudentDTO } from "@/03-interface-adapters/gateways/outbound/device_interfaces/students/IStudentDataSource";
import { mapFirestoreDocs, stripId } from "@/shared/utils/firestoreMapper";
import { Student } from "@/01-entities/students/Student.entity";
import { type Firestore, type CollectionReference } from "firebase/firestore";

export class FirebaseStudentDataSource implements IStudentDataSource {
  private collectionRef: CollectionReference;

  private db: Firestore;
  constructor(db: Firestore) {
    this.db = db;
    this.collectionRef = collection(this.db, "students");
  }
  async getByBranchId(branchId: string): Promise<StudentDTO[]> {
    try {
      if (!branchId) {
        // Nếu không có branchId, trả về mảng rỗng để tránh query toàn bộ collection,
        // vốn không hiệu quả và thường bị chặn bởi security rules.
        return [];
      }

      // Tối ưu: Sử dụng query với 'array-contains' trên trường 'branchIds' đã được denormalize.
      // Điều này hiệu quả hơn và tương thích với các quy tắc bảo mật của Firestore, giải quyết lỗi "Missing or insufficient permissions".
      const q = query(this.collectionRef, where("branchIds", "array-contains", branchId));
      const snapshot = await getDocs(q);
      return mapFirestoreDocs<StudentDTO>(snapshot.docs);
    } catch (error) {
      console.error("[FirebaseStudentDataSource] getByBranchId error:", error);
      throw new Error("student/fetch-failed");
    }
  }

  async getById(id: string): Promise<StudentDTO | null> {
    try {
      const docRef = doc(this.collectionRef, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as StudentDTO;
      }
      return null;
    } catch (error) {
      console.error("[FirebaseStudentDataSource] getById error:", error);
      throw new Error("student/fetch-failed");
    }
  }

  async save(student: Student): Promise<void> {
    try {
      const dataToSave = stripId(student.toJSON());
      const branchIds = [...new Set(student.enrollments.map(e => e.branchId))];

      const docRef = doc(this.collectionRef, student.id.toString());
      await setDoc(docRef, { ...dataToSave, branchIds }, { merge: true });
    } catch (error) {
      console.error("[FirebaseStudentDataSource] save error:", error);
      throw new Error("student/save-failed");
    }
  }

  saveInBatch(student: Student, batch: WriteBatch): void {
    const dataToSave = stripId(student.toJSON());
    const branchIds = [...new Set(student.enrollments.map(e => e.branchId))];

    const docRef = doc(this.collectionRef, student.id.toString());
    batch.set(docRef, { ...dataToSave, branchIds }, { merge: true });
  }
}