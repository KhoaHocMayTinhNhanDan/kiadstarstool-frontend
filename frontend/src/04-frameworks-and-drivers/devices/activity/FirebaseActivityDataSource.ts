import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  serverTimestamp,
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

  async save(activity: ActivityJSON): Promise<void> {
    if (!activity.userId) {
      throw new Error("activity/userId-required");
    }

    try {
      const { id, ...data } = activity;

      await addDoc(this.collectionRef, {
        ...data,
        timestamp: serverTimestamp()
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
      const q = query(
        this.collectionRef,
        where("userId", "==", userId),
        orderBy("timestamp", "desc"),
        limit(20)
      );

      const snapshot = await getDocs(q);

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<ActivityJSON, "id">)
      }));
    } catch (error) {
      console.error("[FirebaseActivityDataSource] findByUserId error:", error);
      throw new Error("activity/fetch-failed");
    }
  }
}