export interface PendingTuitionDTO {
  studentId: string;
  studentName: string;
  studentPhone?: string;
  branchId: string;
  classId: string;
  tuitionAmount: number;
  paidAmount: number;
  paymentStatus: 'unpaid' | 'partial';
}

export type ListPendingTuitionsOutput = PendingTuitionDTO[];