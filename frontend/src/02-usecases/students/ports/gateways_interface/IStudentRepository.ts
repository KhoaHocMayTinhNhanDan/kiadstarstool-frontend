// src/02-usecases/students/ports/gateways_interface/IStudentRepository.ts
import { Student } from '@/01-entities/students/Student.entity';

export interface IStudentRepository {
  getById(id: string): Promise<Student | null>;
  getByBranchId(branchId: string): Promise<Student[]>;
  save(student: Student): Promise<void>;
  saveInBatch(student: Student, batch: any): void;
}