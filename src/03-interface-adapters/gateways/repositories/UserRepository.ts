import { IUserRepository } from '@/02-usecases/ports/repositories/IUserRepository';
import { User } from '@/01-entities/users/User.entity';

/**
 * Implementation của IUserRepository.
 * Trong thực tế, class này sẽ gọi Firestore/Database để lấy dữ liệu.
 */
export class UserRepository implements IUserRepository {
  // Có thể inject Database Driver vào đây
  constructor() {}

  async getById(userId: string): Promise<User | null> {
    // TODO: Implement Firestore/Database fetching here
    return null;
  }
}