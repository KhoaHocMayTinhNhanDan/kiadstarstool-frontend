// src/02-usecases/ports/repositories/IUserRepository.ts
import { User } from '../../../01-entities/users/User.entity';

export interface IUserRepository {
  getById(userId: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
