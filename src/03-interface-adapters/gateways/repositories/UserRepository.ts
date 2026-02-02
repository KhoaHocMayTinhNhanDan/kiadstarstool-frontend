import { type IUserRepository } from '../../../02-usecases/ports/repositories/IUserRepository';
import { User } from '../../../01-entities/users/User.entity';

export class UserRepository implements IUserRepository {
  async getById(userId: string): Promise<User | null> {
    // existing implementation
    return null;
  }

  async save(user: User): Promise<void> {
    // TODO: persist user
    // Ví dụ:
    // await this.db.users.update(user.id.value, serialize(user));
  }
}
