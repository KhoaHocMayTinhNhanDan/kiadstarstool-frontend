export type PaymentScheme = 'course' | 'monthly' | 'session';

export interface EnrollStudentInput {
  studentId: string;
  classId: string;
  branchId?: string;
  paymentScheme?: PaymentScheme;
  quantity?: number;
  discountAmount?: number;
  joinedDate?: Date;
}