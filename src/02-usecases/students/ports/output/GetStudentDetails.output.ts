interface AttendanceHistoryItem {
  classId: string;
  className: string;
  date: string;
  status: string;
  score?: number;
}

export interface GetStudentDetailsOutput {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: string;
  joinedDate: Date;
  branchName: string;
  attendanceHistory: AttendanceHistoryItem[];
}