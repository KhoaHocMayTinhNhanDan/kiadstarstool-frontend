// src/04-frameworks-and-drivers/devices/user/MockUserRepository.ts

import { type IUserDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/user/IUserDataSource';
import { type UserJSON } from '@/01-entities/users/User.entity';
import { mockDatabase } from '@/04-frameworks-and-drivers/database/LocalStorage';

export class MockUserDataSource implements IUserDataSource {
  constructor() {
    this.initialize();
  }

  private initialize() {
    const userStore = mockDatabase.getCollection<UserJSON>('users');
    if (userStore.length === 0) {
      this.seed();
    }
  }

  private seed() {
    const seedData: UserJSON[] = [
      {
        id: 'mock-id-admin@example.com',
        email: 'admin@example.com',
        role: 'admin',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        permissions: [],
        profile: {
          kind: 'admin',
          displayName: 'Quản trị viên',
          photoURL: 'https://i.pravatar.cc/150?u=admin@example.com',
          phoneNumbers: [],
          adminLevel: 1,
          managedBranches: []
        }
      },
      {
        id: 'mock-id-teacher@example.com',
        email: 'teacher@example.com',
        role: 'teacher',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        permissions: [],
        profile: {
          kind: 'staff', // Fallback profile cho teacher (hoặc tạo TeacherProfile riêng nếu cần)
          displayName: 'Giáo viên',
          photoURL: 'https://i.pravatar.cc/150?u=teacher@example.com',
          phoneNumbers: [],
          department: 'Academic'
        }
      }
    ];
    mockDatabase.setCollection('users', seedData);
  }

  async getById(id: string): Promise<UserJSON | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const users = mockDatabase.getCollection<UserJSON>('users');
    return users.find(u => u.id === id) || null;
  }

  async getByIds(ids: string[]): Promise<UserJSON[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const users = mockDatabase.getCollection<UserJSON>('users');
    const idSet = new Set(ids);
    return users.filter(u => idSet.has(u.id));
  }

  async save(user: UserJSON): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const users = mockDatabase.getCollection<UserJSON>('users');
    const index = users.findIndex(u => u.id === user.id);
    if (index >= 0) {
      users[index] = user;
    } else {
      users.push(user);
    }
    mockDatabase.persist();
  }

  async findAll(filters?: any): Promise<UserJSON[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    let users = mockDatabase.getCollection<UserJSON>('users');
    
    if (filters) {
      if (filters.role) {
        users = users.filter(u => u.role === filters.role);
      }
      if (filters.isActive !== undefined) {
        users = users.filter(u => u.isActive === filters.isActive);
      }
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        users = users.filter(u => 
          u.email.toLowerCase().includes(q) || 
          (u.profile as any).displayName?.toLowerCase().includes(q)
        );
      }
    }
    return users;
  }
}
