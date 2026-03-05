import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where
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
      // Lưu ý: Firestore không hỗ trợ query mảng object (enrollments) trực tiếp một cách hiệu quả
      // trừ khi cấu trúc dữ liệu được tối ưu hóa (ví dụ: thêm trường branchIds: string[]).
      // Ở đây ta tạm thời fetch all và filter client-side để đảm bảo logic đúng với Mock.
      // TODO: Tối ưu hóa bằng cách thêm trường 'branchIds' vào document student.
      
      const snapshot = await getDocs(this.collectionRef);
      const students = mapFirestoreDocs<StudentDTO>(snapshot.docs);

      if (!branchId) return students;

      return students.filter(s => 
        s.enrollments && s.enrollments.some(e => e.branchId === branchId)
      );
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
      const data = stripId(student.toJSON());
      const docRef = doc(this.collectionRef, student.id.toString());
      await setDoc(docRef, data, { merge: true });
    } catch (error) {
      console.error("[FirebaseStudentDataSource] save error:", error);
      throw new Error("student/save-failed");
    }
  }
}