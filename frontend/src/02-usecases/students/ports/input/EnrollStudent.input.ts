export interface EnrollStudentInput {
  studentId: string;
  classId: string;
  // Optional: details about the payment for this enrollment
  tuitionDetails?: {
    amount: number;
    paymentStatus: 'paid' | 'unpaid' | 'partial';
    paidAmount?: number;
  };
}