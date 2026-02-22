export interface StudentEnrollmentItem {
  branchId: string;
  classId: string;
  status: string;
  joinedDate: string;
  endDate?: string;
  tuitionAmount?: number;
  paymentStatus?: string;
  prepaidSessions?: number;
  usedSessions?: number;
}

export interface StudentListItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: string;
  joinedDate: Date;
  enrollments: StudentEnrollmentItem[];
}

export type ListStudentsByBranchOutput = StudentListItem[];