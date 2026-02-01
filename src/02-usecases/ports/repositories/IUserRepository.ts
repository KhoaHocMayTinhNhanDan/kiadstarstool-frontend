// src/02-usecases/ports/repositories/IUserRepository.ts
import { User } from '../../../01-entities/users/User.entity';

export abstract class IUserRepository {
  abstract getById(userId: string): Promise<User | null>;
}
