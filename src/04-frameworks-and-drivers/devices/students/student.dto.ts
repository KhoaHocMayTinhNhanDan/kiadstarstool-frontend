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