import { type Student } from '@/01-entities/students/Student.entity';

export interface StudentEnrollmentDTO {
  branchId: string;
  classId: string;
  status: string;
  joinedDate: string;
  endDate?: string;
  tuitionAmount?: number;
  paidAmount?: number;
  paymentStatus?: string;
  prepaidSessions?: number;
  usedSessions?: number;
}

export interface StudentDTO {
  id: string;
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: string; // YYYY-MM-DD
  status: string;
  enrollments: StudentEnrollmentDTO[];
}

export interface IStudentDataSource {
  getByBranchId(branchId: string, limitCount?: number, lastId?: string, keyword?: string): Promise<StudentDTO[]>;
  getById(id: string): Promise<StudentDTO | null>;
  save(student: Student): Promise<void>;
  saveInBatch(student: Student, batch: any): void;
}