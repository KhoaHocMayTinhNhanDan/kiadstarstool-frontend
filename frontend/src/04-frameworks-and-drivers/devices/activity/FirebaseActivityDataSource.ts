import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp, // Thêm import Timestamp để xử lý ngày tháng
  type Firestore,
  type CollectionReference
} from "firebase/firestore";

import type { ActivityJSON } from "@/01-entities/activity/Activity.entity";
import type { IActivityDataSource } from "@/03-interface-adapters/gateways/outbound/device_interfaces/activity/IActivityDataSource";

export class FirebaseActivityDataSource implements IActivityDataSource {
  private collectionRef: CollectionReference;
  private db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
    this.collectionRef = collection(this.db, "activities");
  }

  // Helper: Chuyển đổi dữ liệu Firestore sang JSON an toàn
  private mapDocToActivity(doc: any): ActivityJSON {
    const data = doc.data();
    return {
      id: doc.id,
      userId: data.userId,
      type: data.type,
      description: data.description,
      details: data.details,
      // FIX: Chuyển đổi Firestore Timestamp sang ISO String để tránh lỗi "Invalid Date"
      timestamp: data.timestamp instanceof Timestamp ? data.timestamp.toDate().toISOString() : (data.timestamp || new Date().toISOString())
    };
  }

  async save(activity: ActivityJSON): Promise<void> {
    if (!activity.userId) {
      throw new Error("activity/userId-required");
    }

    try {
      const { id, ...data } = activity;

      // FIX: Loại bỏ các trường undefined (như details) vì Firestore không hỗ trợ
      const sanitizedData = JSON.parse(JSON.stringify(data));

      // Tính toán ngày hết hạn (360 ngày kể từ hôm nay) để dùng cho Firestore TTL Policy
      const expireAt = new Date();
      expireAt.setDate(expireAt.getDate() + 360);

      await addDoc(this.collectionRef, {
        ...sanitizedData,
        timestamp: serverTimestamp(),
        expireAt: expireAt // Trường này sẽ được Firestore dùng để tự động xóa
      });
    } catch (error) {
      console.error("[FirebaseActivityDataSource] save error:", error);
      throw new Error("activity/save-failed");
    }
  }

  async findByUserId(userId: string): Promise<ActivityJSON[]> {
    if (!userId) {
      throw new Error("activity/userId-required");
    }

    try {
      // Thử truy vấn tối ưu (yêu cầu Index)
      const q = query(
        this.collectionRef,
        where("userId", "==", userId),
        orderBy("timestamp", "desc"),
        limit(20)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => this.mapDocToActivity(doc));
    } catch (error: any) {
      // Fallback: Nếu lỗi do thiếu Index, chuyển sang lọc client-side
      if (error.code === 'failed-precondition' || error.message?.includes('requires an index')) {
        console.warn("[FirebaseActivityDataSource] ⚠️ Missing Index. Falling back to client-side sorting. Please create the index using the link in console.");
        
        const qFallback = query(
          this.collectionRef,
          where("userId", "==", userId)
        );
        
        const snapshot = await getDocs(qFallback);
        const allDocs = snapshot.docs.map(doc => this.mapDocToActivity(doc));
        
        // Sắp xếp và giới hạn ở phía Client
        return allDocs
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .slice(0, 20);
      }

      console.error("[FirebaseActivityDataSource] findByUserId error:", error);
      throw new Error("activity/fetch-failed");
    }
  }
}