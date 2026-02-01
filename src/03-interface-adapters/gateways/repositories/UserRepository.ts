import { IUserRepository } from '@/02-usecases/ports/repositories/IUserRepository';
import { User } from '@/01-entities/users/User.entity';
import { type IUserProfile } from '@/01-entities/users/base/IUserProfile.vo';
import { UserId } from '@/01-entities/users/base/UserId.vo';
import { UserRole } from '@/01-entities/users/base/UserRole.vo';
import { Permission } from '@/01-entities/users/base/Permission.vo';
import { AdminProfile } from '@/01-entities/users/archetypes/admin/AdminProfile.vo';
import { StaffProfile } from '@/01-entities/users/archetypes/staff/StaffProfile.vo';
import { ROLES } from '@/shared/constants/authorization/auth.domain';

/**
 * Implementation của IUserRepository.
 * Trong thực tế, class này sẽ gọi Firestore/Database để lấy dữ liệu.
 */
export class UserRepository implements IUserRepository {
  // Có thể inject Database Driver vào đây
  constructor() {}

  async getById(userId: string): Promise<User | null> {
    // 1. Giả lập việc fetch data từ Database (Firestore)
    // const doc = await firestore.collection('users').doc(userId).get();
    // const data = doc.data();
    
    // Mock data để test luồng
    const mockData = this.getMockUserData(userId);
    
    if (!mockData) return null;

    // 2. Mapping Data -> Domain Entity
    try {
      const roleResult = UserRole.create(mockData.role);
      if (roleResult.isFailure) return null;
      const role = roleResult.getValue();

      // Factory cho Profile dựa trên Role (Polymorphism)
      let profile: IUserProfile;
      if (role.isAdmin()) {
        profile = new AdminProfile({
          displayName: mockData.displayName,
          photoURL: mockData.photoURL,
          adminLevel: 1,
          managedBranches: ['BRANCH_01']
        });
      } else {
        // Mặc định là Staff cho ví dụ này
        profile = new StaffProfile({
          displayName: mockData.displayName,
          photoURL: mockData.photoURL,
          department: 'General'
        });
      }

      // 3. Reconstitute User Entity
      return User.create({
        id: UserId.create(userId),
        role: role,
        profile: profile,
        defaultPermissions: [], // Permissions sẽ được tính toán hoặc load thêm
        isActive: mockData.isActive
      });

    } catch (error) {
      console.error('Error mapping user data:', error);
      return null;
    }
  }

  // --- PRIVATE MOCK HELPER ---
  private getMockUserData(id: string) {
    // Giả lập 1 user Admin và 1 user Staff
    const db: Record<string, any> = {
      'admin-uid': {
        id: 'admin-uid',
        role: ROLES.ADMIN,
        displayName: 'System Admin',
        photoURL: 'https://ui-avatars.com/api/?name=Admin',
        isActive: true
      },
      'staff-uid': {
        id: 'staff-uid',
        role: ROLES.STAFF,
        displayName: 'Nguyen Van A',
        photoURL: 'https://ui-avatars.com/api/?name=Staff',
        isActive: true
      }
    };

    // Nếu không tìm thấy trong mock cứng, trả về data giả định dựa trên ID
    // để test với Firebase Auth thật (vì ID sinh ngẫu nhiên)
    return db[id] || {
      id: id, role: ROLES.STAFF, displayName: 'New User', isActive: true
    };
  }
}