import { StudentRepository } from '@/03-interface-adapters/gateways/inbound/repositories/StudentRepository';
import { AttendanceRepository } from '@/03-interface-adapters/gateways/inbound/repositories/AttendanceRepository';
import { ClassRepository } from '@/03-interface-adapters/gateways/inbound/repositories/ClassRepository';
import { BranchRepository } from '@/03-interface-adapters/gateways/inbound/repositories/BranchRepository';
import { UserRepository } from '@/03-interface-adapters/gateways/inbound/repositories/UserRepository';
import { ListStudentsByBranchInteractor } from '@/02-usecases/students/ListStudentsByBranch.interactor';
import { CreateStudentInteractor } from '@/02-usecases/students/CreateStudent.interactor';
import { GetStudentDetailsInteractor } from '@/02-usecases/students/GetStudentDetails.interactor';
import { TransferStudentInteractor } from '@/02-usecases/students/TransferStudent.interactor';
import { EnrollStudentInteractor } from '@/02-usecases/students/EnrollStudent.interactor';
import { StudentsController } from '@/03-interface-adapters/controllers/Students.controller';

export function bootstrapStudents(
  studentRepository: StudentRepository,
  attendanceRepository: AttendanceRepository,
  classRepository: ClassRepository,
  branchRepository: BranchRepository,
  userRepository: UserRepository
) {
  const listStudentsByBranchInteractor = new ListStudentsByBranchInteractor(studentRepository);
  const createStudentInteractor = new CreateStudentInteractor(studentRepository);
  const getStudentDetailsInteractor = new GetStudentDetailsInteractor(
    studentRepository,
    attendanceRepository,
    classRepository,
    branchRepository,
    userRepository
  );
  const transferStudentInteractor = new TransferStudentInteractor(studentRepository, classRepository);
  const enrollStudentInteractor = new EnrollStudentInteractor(studentRepository, classRepository);
  const studentsController = new StudentsController(
    listStudentsByBranchInteractor,
    createStudentInteractor,
    getStudentDetailsInteractor,
    transferStudentInteractor,
    enrollStudentInteractor
  );

  return {
    studentsController,
  };
}