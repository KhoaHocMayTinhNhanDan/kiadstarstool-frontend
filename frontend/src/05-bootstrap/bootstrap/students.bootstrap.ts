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
import { UpdateStudentInfoInteractor } from '@/02-usecases/students/UpdateStudentInfo.interactor';
import { CountStudentsInteractor } from '@/02-usecases/students/CountStudents.interactor';
import { StudentsController } from '@/03-interface-adapters/controllers/Students.controller';

export function bootstrapStudents(
  studentRepository: StudentRepository,
  attendanceRepository: AttendanceRepository,
  classRepository: ClassRepository,
  branchRepository: BranchRepository,
  userRepository: UserRepository
) {
  const listStudentsByBranchInteractor = new ListStudentsByBranchInteractor(studentRepository);
  const createStudentInteractor = new CreateStudentInteractor(studentRepository, branchRepository);
  const getStudentDetailsInteractor = new GetStudentDetailsInteractor(
    studentRepository,
    attendanceRepository,
    classRepository,
    branchRepository,
    userRepository
  );
  const transferStudentInteractor = new TransferStudentInteractor(studentRepository, classRepository, branchRepository);
  const enrollStudentInteractor = new EnrollStudentInteractor(studentRepository, classRepository, branchRepository);
  const updateStudentInfoInteractor = new UpdateStudentInfoInteractor(studentRepository);
  const countStudentsInteractor = new CountStudentsInteractor(studentRepository);
  const studentsController = new StudentsController(
    listStudentsByBranchInteractor,
    createStudentInteractor,
    getStudentDetailsInteractor,
    transferStudentInteractor,
    enrollStudentInteractor,
    updateStudentInfoInteractor,
    countStudentsInteractor
  );

  return {
    studentsController,
  };
}