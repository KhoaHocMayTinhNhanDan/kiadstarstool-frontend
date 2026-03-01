import { Attendance } from '@/01-entities/attendance/Attendance.entity';

export interface IAttendanceDataSource {
  [x: string]: any;
  getByClassAndDate(classId: string, date: string): Promise<Attendance[]>;
  getByStudentAndDate(studentId: string, classId: string, date: string): Promise<Attendance | null>;
  save(attendance: Attendance): Promise<void>;
  deleteByClassId(classId: string): Promise<void>;
  getByStudentId(studentId: string): Promise<Attendance[]>;
}