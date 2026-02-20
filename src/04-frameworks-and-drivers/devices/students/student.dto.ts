import { type PaymentStatus } from '@/01-entities/students/value-objects/Enrollment.vo';

// --- DTO Definitions (Schema for Database/LocalStorage) ---
export interface EnrollmentDTO {
  branchId: string;
  classId?: string;
  status: 'active' | 'inactive' | 'completed' | 'dropped' | 'transferred';
  joinedDate: string; // ISO String
  endDate?: string;   // ISO String
  tuitionAmount?: number;
  paymentStatus?: PaymentStatus;
  prepaidSessions?: number;
  usedSessions?: number;
}

export interface StudentDTO {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'active' | 'banned' | 'archived';
  enrollments: EnrollmentDTO[];
}