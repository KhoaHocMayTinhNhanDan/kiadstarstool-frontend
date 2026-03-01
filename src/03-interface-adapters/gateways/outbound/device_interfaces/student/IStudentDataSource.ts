import { Student } from '@/01-entities/students/Student.entity';

// Định nghĩa DTO ngay tại Layer Interface Adapters để đảm bảo Dependency Rule
export interface StudentEnrollmentDTO {
  branchId: string;
  classId?: string;
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
  status: string;
  enrollments: StudentEnrollmentDTO[];
}

export interface IStudentDataSource {
  getById(id: string): Promise<StudentDTO | null>;
  getByBranchId(branchId: string): Promise<StudentDTO[]>;
  save(student: Student): Promise<void>;
}