import { type IUserProfileDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/user/IUserProfileDataSource';
import { type UserJSON } from '@/01-entities/users/User.entity';
import { doc, getDoc, setDoc, collection, getDocs, query, where, documentId, type Firestore, type CollectionReference } from 'firebase/firestore';

export class FirebaseUserProfileDataSource implements IUserProfileDataSource {
  private readonly collectionName = 'users';
  private collectionRef: CollectionReference;
  private db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
    this.collectionRef = collection(this.db, this.collectionName);
  }

  async getById(id: string): Promise<UserJSON | null> {
    try {
      const docRef = doc(this.db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as UserJSON;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user from Firestore:', error);
      throw error;
    }
  }

  async getByIds(ids: string[]): Promise<UserJSON[]> {
    if (ids.length === 0) return [];
    try {
      // Firestore 'in' query giới hạn 10 phần tử, trong thực tế cần chia nhỏ mảng ids nếu lớn hơn 10
      const q = query(this.collectionRef, where(documentId(), 'in', ids));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data() as UserJSON);
    } catch (error) {
      console.error('Error fetching users by IDs:', error);
      throw error;
    }
  }

  async save(user: UserJSON): Promise<void> {
    try {
      const docRef = doc(this.db, this.collectionName, user.id);
      await setDoc(docRef, user, { merge: true });
    } catch (error) {
      console.error('Error saving user to Firestore:', error);
      throw error;
    }
  }

  async findAll(filters?: any): Promise<UserJSON[]> {
    let users: UserJSON[] = [];

    if (filters?.branchId) {
      // Để hiển thị cả Admin và người dùng được gán, chúng ta cần 2 truy vấn song song
      // 1. Lấy người dùng được gán cho chi nhánh này
      const branchUsersQuery = query(this.collectionRef, where('profile.managedBranches', 'array-contains', filters.branchId));
      
      // 2. Lấy tất cả người dùng có vai trò 'admin'
      const adminUsersQuery = query(this.collectionRef, where('role', '==', 'admin'));

      // Chạy cả 2 truy vấn
      const [branchUsersSnapshot, adminUsersSnapshot] = await Promise.all([
        getDocs(branchUsersQuery),
        getDocs(adminUsersQuery)
      ]);

      const userMap = new Map<string, UserJSON>();

      // Thêm người dùng của chi nhánh vào map
      branchUsersSnapshot.forEach(doc => {
        const userData = doc.data() as UserJSON;
        userMap.set(userData.id, userData);
      });

      // Thêm admin vào map (Map sẽ tự động xử lý trùng lặp)
      adminUsersSnapshot.forEach(doc => {
        const userData = doc.data() as UserJSON;
        userMap.set(userData.id, userData);
      });

      users = Array.from(userMap.values());
    } else {
      // Logic cũ nếu không có bộ lọc branchId
      let q = query(this.collectionRef);
      if (filters?.role) {
        q = query(q, where('role', '==', filters.role));
      }
      const querySnapshot = await getDocs(q);
      users = querySnapshot.docs.map(doc => doc.data() as UserJSON);
    }

    if (filters?.searchQuery) {
      const search = filters.searchQuery.toLowerCase();
      users = users.filter(u => 
        u.email.toLowerCase().includes(search) || 
        (u.profile as any).displayName?.toLowerCase().includes(search)
      );
    }

    if (filters?.isActive !== undefined) {
      users = users.filter(u => u.isActive === filters.isActive);
    }

    return users;
  }
}