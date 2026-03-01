import { type User } from '../../../../01-entities/users/User.entity';
import { type ListUsersInput } from '../input/IListUsersInput';

export interface IUserRepository {
  /**
   * Retrieves a user by their unique ID.
   */
  getById(userId: string): Promise<User | null>;

  /**
   * Retrieves multiple users by IDs.
   */
  getByIds(ids: string[]): Promise<User[]>;

  save(user: User): Promise<void>;

  findAll(filters?: ListUsersInput['filters']): Promise<User[]>;
}