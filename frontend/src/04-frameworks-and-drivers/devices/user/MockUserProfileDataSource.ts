// src/04-frameworks-and-drivers/devices/user/MockUserRepository.ts

import { type IUserDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/user/IUserDataSource';
import { type UserJSON } from '@/01-entities/users/User.entity';
import { mockDatabase } from '@/04-frameworks-and-drivers/database/LocalStorage';
import { ROLE_PRESETS } from '@/shared/constants/authorization/auth.policy';

export class MockUserProfileDataSource implements IUserDataSource {
  constructor() {
    this.initialize();
  }

  private initialize() {
    const userStore = mockDatabase.getCollection<UserJSON>('users');
    
    // Check for stale data (e.g. Teacher with Staff profile kind) or empty store
    const hasStaleData = userStore.some(u => 
      (u.role === 'teacher' && u.profile.kind !== 'teacher') ||
      (u.role === 'admin' && u.profile.kind !== 'admin')
    );

    if (userStore.length === 0 || hasStaleData) {
      console.log('[MockUserProfileDataSource] Detected empty or stale data. Seeding...');
      this.seed();
    }
  }

  private seed() {
    const seedData: UserJSON[] = [
      {
        id: 'mock-id-hoangdong@gmail.com',
        email: 'hoangdong@gmail.com',
        role: 'admin',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        permissions: [...ROLE_PRESETS.admin],
        profile: {
          kind: 'admin',
          displayName: 'Hoàng Đông',
          photoURL: 'https://i.pravatar.cc/150?u=hoangdong',
          phoneNumbers: [],
          adminLevel: 1,
          managedBranches: []
        }
      },
      {
        id: 'mock-id-admin@example.com', // LINK: Khớp với ID bên Auth System
        email: 'admin@example.com',      // DUPLICATE: Lưu lại để hỗ trợ tìm kiếm/lọc (Query Model) mà không cần gọi Auth
        role: 'admin',                   // DUPLICATE: Lưu lại để hiển thị trong danh sách quản trị
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        permissions: [...ROLE_PRESETS.admin], // SOURCE: Áp dụng Policy mặc định cho Admin
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
        id: 'mock-id-manager@example.com',
        email: 'manager@example.com',
        role: 'manager',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        permissions: [...ROLE_PRESETS.manager],
        profile: {
          kind: 'manager',
          displayName: 'Quản Lý Chi Nhánh',
          photoURL: 'https://i.pravatar.cc/150?u=manager',
          phoneNumbers: [],
          branchId: 'branch-01'
        }
      },
      {
        id: 'mock-id-teacher@example.com', // LINK: Khớp với ID bên Auth System
        email: 'teacher@example.com',      // DUPLICATE
        role: 'teacher',                   // DUPLICATE
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        permissions: [...ROLE_PRESETS.teacher], // SOURCE: Áp dụng Policy mặc định cho Teacher
        profile: {
          kind: 'teacher', // Sửa thành 'teacher' để khớp với role, tránh lỗi PROFILE_ROLE_MISMATCH
          displayName: 'Giáo viên',
          photoURL: 'https://i.pravatar.cc/150?u=teacher@example.com',
          phoneNumbers: [],
          department: 'Academic'
        }
      },
      {
        id: 'mock-id-staff@example.com',
        email: 'staff@example.com',
        role: 'staff',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        permissions: [...ROLE_PRESETS.staff],
        profile: {
          kind: 'staff',
          displayName: 'Nhân Viên Lễ Tân',
          photoURL: 'https://i.pravatar.cc/150?u=staff',
          phoneNumbers: [],
          department: 'Front Desk'
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
