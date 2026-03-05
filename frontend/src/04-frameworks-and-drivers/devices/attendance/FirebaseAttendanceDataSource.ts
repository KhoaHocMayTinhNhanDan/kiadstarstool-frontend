import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
  writeBatch
} from "firebase/firestore";;
import type { IAttendanceDataSource } from "@/03-interface-adapters/gateways/outbound/device_interfaces/attendance/IAttendanceDataSource";
import { Attendance, type AttendanceJSON } from "@/01-entities/attendance/Attendance.entity";
import { mapFirestoreDocs, stripId } from "@/shared/utils/firestoreMapper";
import { type Firestore, type CollectionReference } from "firebase/firestore";

export class FirebaseAttendanceDataSource implements IAttendanceDataSource {
  private collectionRef: CollectionReference;
  private db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
    this.collectionRef = collection(this.db, "attendances");
  }
  async getByClassId(classId: string): Promise<Attendance[]> {
    try {
      const q = query(this.collectionRef, where("courseId", "==", classId));
      const snapshot = await getDocs(q);
      const docs = mapFirestoreDocs<AttendanceJSON>(snapshot.docs);
      return docs.map(json => Attendance.createFromJSON(json));
    } catch (error) {
      console.error("[FirebaseAttendanceDataSource] getByClassId error:", error);
      throw new Error("attendance/fetch-failed");
    }
  }

  async getByClassAndDate(classId: string, date: string): Promise<Attendance[]> {
    try {
      // Lưu ý: date string format phải khớp chính xác (YYYY-MM-DD)
      const queryDate = date.split('T')[0];
      const q = query(
        this.collectionRef, 
        where("courseId", "==", classId),
        where("date", "==", queryDate)
      );
      const snapshot = await getDocs(q);
      const docs = mapFirestoreDocs<AttendanceJSON>(snapshot.docs);
      return docs.map(json => Attendance.createFromJSON(json));
    } catch (error) {
      console.error("[FirebaseAttendanceDataSource] getByClassAndDate error:", error);
      throw new Error("attendance/fetch-failed");
    }
  }

  async getByStudentAndDate(studentId: string, classId: string, date: string): Promise<Attendance | null> {
    try {
      const queryDate = date.split('T')[0];
      const q = query(
        this.collectionRef,
        where("studentId", "==", studentId),
        where("courseId", "==", classId),
        where("date", "==", queryDate)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) return null;
      
      const json = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as AttendanceJSON;
      return Attendance.createFromJSON(json);
    } catch (error) {
      console.error("[FirebaseAttendanceDataSource] getByStudentAndDate error:", error);
      throw new Error("attendance/fetch-failed");
    }
  }

  async getByStudentId(studentId: string): Promise<Attendance[]> {
    try {
      const q = query(this.collectionRef, where("studentId", "==", studentId));
      const snapshot = await getDocs(q);
      const docs = mapFirestoreDocs<AttendanceJSON>(snapshot.docs);
      return docs.map(json => Attendance.createFromJSON(json));
    } catch (error) {
      console.error("[FirebaseAttendanceDataSource] getByStudentId error:", error);
      throw new Error("attendance/fetch-failed");
    }
  }

  async save(attendance: Attendance): Promise<void> {
    try {
      const json = attendance.toJSON();
      const data = stripId(json);
      const docRef = doc(this.collectionRef, json.id);
      await setDoc(docRef, data, { merge: true });
    } catch (error) {
      console.error("[FirebaseAttendanceDataSource] save error:", error);
      throw new Error("attendance/save-failed");
    }
  }

  async deleteByClassId(classId: string): Promise<void> {
    try {
      const q = query(this.collectionRef, where("courseId", "==", classId));
      const snapshot = await getDocs(q);
      
      const batch = writeBatch(this.db);
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
    } catch (error) {
      console.error("[FirebaseAttendanceDataSource] deleteByClassId error:", error);
      throw new Error("attendance/delete-failed");
    }
  }
}