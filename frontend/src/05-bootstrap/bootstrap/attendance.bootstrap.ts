import { AttendanceRepository } from '@/03-interface-adapters/gateways/inbound/repositories/AttendanceRepository';
import { StudentRepository } from '@/03-interface-adapters/gateways/inbound/repositories/StudentRepository';
import { ClassRepository } from '@/03-interface-adapters/gateways/inbound/repositories/ClassRepository';
import { ListAttendanceByClassInteractor } from '@/02-usecases/attendance/ListAttendanceByClass.interactor';
import { MarkAttendanceInteractor } from '@/02-usecases/attendance/MarkAttendance.interactor';
import { MarkBatchAttendanceInteractor } from '@/02-usecases/attendance/MarkBatchAttendance.interactor';
import { AutoMarkAbsentInteractor } from '@/02-usecases/attendance/AutoMarkAbsent.interactor';
import { AttendanceController } from '@/03-interface-adapters/controllers/Attendance.controller';

export function bootstrapAttendance(
  attendanceRepository: AttendanceRepository,
  studentRepository: StudentRepository,
  classRepository: ClassRepository
) {
  const listAttendanceInteractor = new ListAttendanceByClassInteractor(attendanceRepository, studentRepository, classRepository);
  const markAttendanceInteractor = new MarkAttendanceInteractor(attendanceRepository, classRepository, studentRepository);
  const markBatchAttendanceInteractor = new MarkBatchAttendanceInteractor(attendanceRepository, classRepository, studentRepository);
  const autoMarkAbsentInteractor = new AutoMarkAbsentInteractor(attendanceRepository, classRepository, studentRepository);
  const attendanceController = new AttendanceController(listAttendanceInteractor, markAttendanceInteractor, markBatchAttendanceInteractor, autoMarkAbsentInteractor);

  return {
    attendanceController,
  };
}