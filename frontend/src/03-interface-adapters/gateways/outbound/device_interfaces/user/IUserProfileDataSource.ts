// src/03-interface-adapters/gateways/outbound/device_interfaces/user/IUserDataSource.ts

import { type UserJSON } from '@/01-entities/users/User.entity';
import { type StudentDTO } from '@/03-interface-adapters/gateways/outbound/device_interfaces/students/IStudentDataSource';
import { type Student } from '@/01-entities/students/Student.entity';

/**
 * Interface cho User Data Source (làm việc với JSON/DTO)
 */
export interface IUserProfileDataSource {
  getById(id: string): Promise<UserJSON | null>;
  getByIds(ids: string[]): Promise<UserJSON[]>;
  save(user: UserJSON): Promise<void>;
  findAll(filters?: any): Promise<UserJSON[]>;
}

/**
 * Interface cho Student Data Source
 * (Giữ lại để đảm bảo tương thích với MockStudentDataSource hiện tại)
 */
export interface IStudentDataSource {
  getById(id: string): Promise<StudentDTO | null>;
  getByBranchId(branchId: string): Promise<StudentDTO[]>;
  save(student: Student): Promise<void>;
}
