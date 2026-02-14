import { Attendance } from '@/01-entities/attendance/Attendance.entity';

export interface IAttendanceRepository {
  getByClassAndDate(classId: string, date: string): Promise<Attendance[]>;
  getByStudentAndDate(studentId: string, classId: string, date: string): Promise<Attendance | null>;
  getByStudentId(studentId: string): Promise<Attendance[]>;
  save(attendance: Attendance): Promise<void>;
  deleteByClassId(classId: string): Promise<void>;
}