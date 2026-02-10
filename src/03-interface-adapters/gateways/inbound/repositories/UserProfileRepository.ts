import { type IUserProfileRepository } from '../../../02-usecases/auth/ports/output/repositories/IUserRepository';
import { User } from '../../../../01-entities/users/User.entity';
import { UserId } from '../../../../01-entities/users/base/UserId.vo';
import { UserRole } from '../../../../01-entities/users/base/UserRole.vo';
import { StaffProfile } from '../../../../01-entities/users/archetypes/staff/StaffProfile.vo';
import { UserPermissions } from '../../../../01-entities/users/base/UserPermissions.vo';

export class UserProfileRepository implements IUserProfileRepository {
  async getById(userId: string): Promise<User | null> {
    // LOGIC CHUẨN:
    // 1. Thử tìm user trong DB thật (Firestore/API).
    // 2. Nếu không thấy (người dùng mới từ Firebase), đừng trả về null.
    // 3. Hãy trả về một "User mặc định" để quy trình đăng nhập hoàn tất.
    
    return User.create({
      id: UserId.create(userId),
      role: UserRole.create('staff').getValue(), // Mặc định role là staff cho user mới
      profile: new StaffProfile({ displayName: 'New User' }), // Tên tạm
      permissions: UserPermissions.empty(),
      isActive: true
    });
  }

  async save(user: User): Promise<void> {
    // TODO: persist user
    // Ví dụ:
    // await this.db.users.update(user.id.value, serialize(user));
  }
}
