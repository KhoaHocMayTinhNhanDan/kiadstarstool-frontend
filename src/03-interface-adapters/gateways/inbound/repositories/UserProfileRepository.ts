import { type IUserProfileRepository } from '../../../../02-usecases/users/ports/gateways_interface/IUserProfileRepository';
import { User } from '../../../../01-entities/users/User.entity';
import { UserId } from '../../../../01-entities/users/base/UserId.vo';
import { UserRole } from '../../../../01-entities/users/base/UserRole.vo';
import { StaffProfile } from '../../../../01-entities/users/archetypes/staff/StaffProfile.vo';
import { UserPermissions } from '../../../../01-entities/users/base/UserPermissions.vo';

export class UserProfileRepository implements IUserProfileRepository {
  async getById(userId: string): Promise<User | null> {
    // LOGIC CHUẨN:
    // Thử tìm user trong DB thật (Firestore/API).
    // Nếu không thấy, trả về null để tầng trên biết user này chưa có profile.
    return null;
  }

  async save(user: User): Promise<void> {
    // TODO: persist user
    // Ví dụ:
    // await this.db.users.update(user.id.value, serialize(user));
  }

  async findAll(filters?: any): Promise<User[]> {
    // This is a mock implementation for demonstration.
    // In a real application, you would query your database based on the filters.
    console.log('[UserProfileRepository] Mock findAll with filters:', filters);
    const mockUser = User.create({
      id: UserId.create('mock-user-1'),
      role: UserRole.create('staff').getValue(),
      profile: new StaffProfile({ displayName: 'Mock Staff User' }),
      permissions: UserPermissions.empty(),
      isActive: true
    });
    return mockUser ? [mockUser] : [];
  }
}
