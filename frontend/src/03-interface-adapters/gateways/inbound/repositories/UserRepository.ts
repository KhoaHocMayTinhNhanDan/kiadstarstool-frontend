// src/03-interface-adapters/gateways/inbound/repositories/UserRepository.ts

import { type IUserRepository } from '@/02-usecases/users/ports/gateways_interface/IUserRepository';
import { type IUserProfileDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/user/IUserProfileDataSource';
import { User } from '@/01-entities/users/User.entity';
import { UserMapper } from '@/01-entities/users/UserMapper';
import { type ListUsersInput } from '@/02-usecases/users/ports/input/IListUsersInput';

export class UserRepository implements IUserRepository {
  private readonly dataSource: IUserProfileDataSource;

  constructor(dataSource: IUserProfileDataSource) {
    this.dataSource = dataSource;
  }

  async getById(userId: string): Promise<User | null> {
    const json = await this.dataSource.getById(userId);
    if (!json) return null;
    return UserMapper.toDomain(json);
  }

  async getByIds(ids: string[]): Promise<User[]> {
    const jsons = await this.dataSource.getByIds(ids);
    return jsons.map(json => UserMapper.toDomain(json));
  }

  async save(user: User): Promise<void> {
    const json = UserMapper.toPersistence(user);
    await this.dataSource.save(json);
  }

  async findAll(filters?: ListUsersInput['filters']): Promise<User[]> {
    const jsons = await this.dataSource.findAll(filters);
    return jsons.map(json => UserMapper.toDomain(json));
  }
}
