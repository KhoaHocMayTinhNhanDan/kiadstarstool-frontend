import { type User } from '../../../../01-entities/users/User.entity';
import { type ListUsersInput } from '../input/IListUsersInput';

/**
 * Port: Defines communication with the user data storage.
 */
export interface IUserProfileRepository {
  /**
   * Retrieves a user by their unique ID.
   * @param userId The user's ID.
   * @returns A User entity or null if not found.
   */
  getById(userId: string): Promise<User | null>;

  /**
   * Persists a User entity.
   * @param user The user entity to save.
   */
  save(user: User): Promise<void>;

  /**
   * Retrieves a list of users based on filters.
   * @param filters Optional filters for querying users.
   * @returns An array of User entities.
   */
  findAll(filters?: ListUsersInput['filters']): Promise<User[]>;
}