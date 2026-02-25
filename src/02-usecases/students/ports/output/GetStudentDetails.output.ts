interface AttendanceHistoryItem {
  classId: string;
  className: string;
  date: string;
  status: string;
  score?: number;
}

export interface StudentEnrollmentDetail {
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

export interface GetStudentDetailsOutput {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: string;
  joinedDate: Date;
  branchName: string;
  enrollments: StudentEnrollmentDetail[];
  attendanceHistory: AttendanceHistoryItem[];
}