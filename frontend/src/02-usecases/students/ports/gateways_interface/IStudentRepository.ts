import { type Student } from '@/01-entities/students/Student.entity';

export interface IStudentRepository {
  getById(id: string): Promise<Student | null>;
  getByBranchId(branchId: string, limit?: number, lastId?: string, keyword?: string): Promise<Student[]>;
  save(student: Student): Promise<void>;
  saveInBatch(student: Student, batch: any): void;
  getStudentsWithPendingTuition(branchId?: string): Promise<Student[]>;
}