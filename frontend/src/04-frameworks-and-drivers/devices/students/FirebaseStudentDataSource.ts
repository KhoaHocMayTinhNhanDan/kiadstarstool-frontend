import {
  collection,
  doc,
  getDocs,
  setDoc,
  query, // Giữ nguyên
  where, // Giữ nguyên
  WriteBatch, // Thêm import này
  limit, // Thêm limit để giới hạn khi query all
  orderBy,
  startAfter,
  getDoc,
  getCountFromServer
} from "firebase/firestore";
import type { IStudentDataSource, StudentDTO } from "@/03-interface-adapters/gateways/outbound/device_interfaces/students/IStudentDataSource";
import { mapFirestoreDocs, stripId } from "@/shared/utils/firestoreMapper";
import { Student } from "@/01-entities/students/Student.entity";
import { type Firestore, type CollectionReference } from "firebase/firestore";
import type { IPendingTuitionDataSource } from "@/03-interface-adapters/gateways/outbound/device_interfaces/finance/IPendingTuitionDataSource";

export class FirebaseStudentDataSource implements IStudentDataSource, IPendingTuitionDataSource {
  private collectionRef: CollectionReference;

  private db: Firestore;
  constructor(db: Firestore) {
    this.db = db;
    this.collectionRef = collection(this.db, "students");
  }
  // Cập nhật signature để hỗ trợ pagination
  async getByBranchId(branchId: string, limitCount: number = 20, lastId?: string, keyword?: string): Promise<StudentDTO[]> {
    try {
      const constraints: any[] = [];

      if (keyword && keyword.trim() !== '') {
        // FIX: Sử dụng array-contains để tìm kiếm "contains" thay vì prefix search
        // Yêu cầu dữ liệu phải có trường searchKeywords
        // Chuyển keyword sang chữ thường để tìm kiếm không phân biệt hoa/thường
        constraints.push(where("searchKeywords", "array-contains", keyword.toLowerCase()));
        // Khi dùng array-contains, không thể kết hợp orderBy với trường khác.
        // Ta sẽ sắp xếp theo ID mặc định.
        constraints.push(orderBy("__name__"));
        
        // LƯU Ý QUAN TRỌNG: Firestore không hỗ trợ 2 mệnh đề 'array-contains' trong cùng 1 query.
        // Nếu có keyword, ta ưu tiên lọc theo keyword (searchKeywords).
        // Việc lọc theo branchId sẽ được thực hiện ở client-side sau khi fetch xong.
      } else {
        // Nếu KHÔNG tìm kiếm, ta mới lọc theo branchId tại server
        if (branchId) constraints.push(where("branchIds", "array-contains", branchId));
        
        constraints.push(orderBy("__name__"));
      }

      if (lastId) {
        // Nếu đang search theo tên thì không dùng startAfter ID được (vì sort order khác)
        // Tạm thời reset pagination khi search để đơn giản hóa
        if (!keyword) {
          constraints.push(startAfter(lastId));
        }
      }

      constraints.push(limit(limitCount));

      const q = query(this.collectionRef, ...constraints);
      const snapshot = await getDocs(q);
      let results = mapFirestoreDocs<StudentDTO>(snapshot.docs);

      // Client-side filtering cho branchId khi đang search keyword
      if (keyword && branchId) {
        results = results.filter(s => 
          s.enrollments && s.enrollments.some(e => e.branchId === branchId)
        );
      }

      return results;
    } catch (error) {
      console.error("[FirebaseStudentDataSource] getByBranchId error:", error);
      throw new Error("student/fetch-failed");
    }
  }

  // Helper: Tạo mảng từ khóa để tìm kiếm
  private generateSearchKeywords(student: Student): string[] {
    const name = student.name.toLowerCase();
    const email = student.email.toLowerCase();
    const phone = student.phone || '';

    const nameParts = name.split(' ');
    const emailUser = email.split('@')[0];

    const keywords = new Set([
      ...nameParts,
      email,
      emailUser,
      phone,
    ]);
    return Array.from(keywords).filter(k => k.length > 0);
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
      // FIX: Loại bỏ các trường undefined (như dateOfBirth, phone) vì Firestore không hỗ trợ
      const sanitizedData = JSON.parse(JSON.stringify(student.toJSON()));
      const dataToSave = stripId(sanitizedData);
      const branchIds = [...new Set(student.enrollments.map(e => e.branchId))];
      const searchKeywords = this.generateSearchKeywords(student);
      
      // OPTIMIZATION: Tính toán cờ hasPendingTuition để tối ưu query
      const hasPendingTuition = student.enrollments.some(e => 
        (e.paymentStatus === 'unpaid' || e.paymentStatus === 'partial') && (e.tuitionAmount || 0) > 0 && e.status === 'active'
      );

      // --- DEBUG LOG: Kiểm tra dữ liệu trước khi gửi ---
      console.log('[FirebaseStudentDataSource] Saving student:', {
        id: student.id.toString(),
        branchIds: branchIds,
        data: dataToSave
      });

      if (branchIds.length === 0) {
        console.warn('[FirebaseStudentDataSource] ⚠️ WARNING: branchIds is empty! This will likely cause a Permission Error.');
      }
      // ------------------------------------------------

      const docRef = doc(this.collectionRef, student.id.toString());
      await setDoc(docRef, { ...dataToSave, branchIds, searchKeywords, hasPendingTuition }, { merge: true });
    } catch (error) {
      console.error("[FirebaseStudentDataSource] save error details:", error);
      throw new Error("student/save-failed");
    }
  }

  saveInBatch(student: Student, batch: WriteBatch): void {
    // FIX: Loại bỏ các trường undefined
    const sanitizedData = JSON.parse(JSON.stringify(student.toJSON()));
    const dataToSave = stripId(sanitizedData);
    const branchIds = [...new Set(student.enrollments.map(e => e.branchId))];
    const searchKeywords = this.generateSearchKeywords(student);
    
    // OPTIMIZATION
    const hasPendingTuition = student.enrollments.some(e => 
      (e.paymentStatus === 'unpaid' || e.paymentStatus === 'partial') && (e.tuitionAmount || 0) > 0 && e.status === 'active'
    );

    const docRef = doc(this.collectionRef, student.id.toString());
    batch.set(docRef, { ...dataToSave, branchIds, searchKeywords, hasPendingTuition }, { merge: true });
  }

  async getPendingTuitions(branchId?: string): Promise<any[]> {
    try {
      const constraints: any[] = [
        where("hasPendingTuition", "==", true)
      ];

      if (branchId) {
        constraints.push(where("branchIds", "array-contains", branchId));
      }

      const q = query(this.collectionRef, ...constraints);
      const snapshot = await getDocs(q);
      return mapFirestoreDocs<any>(snapshot.docs);
    } catch (error) {
      console.error("[FirebaseStudentDataSource] getPendingTuitions error:", error);
      return [];
    }
  }

  async countByBranchId(branchId?: string): Promise<number> {
    try {
      // Chỉ đếm học viên đang hoạt động (Active)
      const constraints: any[] = [where("status", "==", "active")];
      
      if (branchId) {
        constraints.push(where("branchIds", "array-contains", branchId));
      }

      const q = query(this.collectionRef, ...constraints);
      const snapshot = await getCountFromServer(q);
      return snapshot.data().count;
    } catch (error) {
      console.error("[FirebaseStudentDataSource] countByBranchId error:", error);
      return 0;
    }
  }
}