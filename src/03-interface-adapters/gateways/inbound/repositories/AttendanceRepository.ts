import { type IAttendanceRepository } from '@/02-usecases/attendance/ports/gateways_interface/IAttendanceRepository';
import { type IAttendanceDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/attendance/IAttendanceDataSource';
import { type Attendance } from '@/01-entities/attendance/Attendance.entity';

export class AttendanceRepository implements IAttendanceRepository {
  private readonly dataSource: IAttendanceDataSource;

  constructor(dataSource: IAttendanceDataSource) {
    this.dataSource = dataSource;
  }

  async getByClassAndDate(classId: string, date: string): Promise<Attendance[]> {
    return this.dataSource.getByClassAndDate(classId, date);
  }

  async getByStudentAndDate(studentId: string, classId: string, date: string): Promise<Attendance | null> {
    return this.dataSource.getByStudentAndDate(studentId, classId, date);
  }

  async getByStudentId(studentId: string): Promise<Attendance[]> {
    return this.dataSource.getByStudentId(studentId);
  }

  async save(attendance: Attendance): Promise<void> {
    return this.dataSource.save(attendance);
  }

  async deleteByClassId(classId: string): Promise<void> {
    return this.dataSource.deleteByClassId(classId);
  }
}