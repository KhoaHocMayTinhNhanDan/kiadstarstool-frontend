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

export interface StudentAttendanceHistoryItem {
  classId: string;
  className: string;
  date: string;
  status: string;
  markedBy?: string; // Tên người thực hiện
  markedByAvatarUrl?: string;
  score?: number;
}

export interface GetStudentDetailsOutput {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: string;
  joinedDate: string;
  branchName?: string;
  enrollments: StudentEnrollmentDetail[];
  attendanceHistory: StudentAttendanceHistoryItem[];
}