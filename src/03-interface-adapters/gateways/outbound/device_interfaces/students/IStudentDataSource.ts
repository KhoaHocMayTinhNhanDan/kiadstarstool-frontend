import { Student } from '@/01-entities/students/Student.entity';

export interface IStudentDataSource {
  getByBranchId(branchId: string): Promise<any[]>;
  save(student: Student): Promise<void>;
  getById(id: string): Promise<any | null>;
}