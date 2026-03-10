import { Result } from '@/01-entities/shared/base/result';
import { ListStudentsByBranchInteractor } from '@/02-usecases/students/ListStudentsByBranch.interactor';
import { CreateStudentInteractor } from '@/02-usecases/students/CreateStudent.interactor';
import { GetStudentDetailsInteractor } from '@/02-usecases/students/GetStudentDetails.interactor';
import { TransferStudentInteractor } from '@/02-usecases/students/TransferStudent.interactor';
import { EnrollStudentInteractor } from '@/02-usecases/students/EnrollStudent.interactor';
import { UpdateStudentInfoInteractor } from '@/02-usecases/students/UpdateStudentInfo.interactor';
import { CountStudentsInteractor } from '@/02-usecases/students/CountStudents.interactor';
import { type ListStudentsByBranchInput } from '@/02-usecases/students/ports/input/ListStudentsByBranch.input';
import { type ListStudentsByBranchOutput } from '@/02-usecases/students/ports/output/ListStudentsByBranch.output';
import { type CreateStudentInput } from '@/02-usecases/students/ports/input/CreateStudent.input';
import { type CreateStudentOutput } from '@/02-usecases/students/ports/output/CreateStudent.output';
import { type GetStudentDetailsInput } from '@/02-usecases/students/ports/input/GetStudentDetails.input';
import { type GetStudentDetailsOutput } from '@/02-usecases/students/ports/output/GetStudentDetails.output';
import { type TransferStudentInput } from '@/02-usecases/students/ports/input/TransferStudent.input';
import { type EnrollStudentInput } from '@/02-usecases/students/ports/input/EnrollStudent.input';
import { type EnrollStudentOutput } from '@/02-usecases/students/ports/output/EnrollStudent.output';
import { type UpdateStudentInfoInput } from '@/02-usecases/students/ports/input/UpdateStudentInfo.input';

export class StudentsController {
  private readonly listStudentsInteractor: ListStudentsByBranchInteractor;
  private readonly createStudentInteractor: CreateStudentInteractor;
  private readonly getStudentDetailsInteractor: GetStudentDetailsInteractor;
  private readonly transferStudentInteractor: TransferStudentInteractor;
  private readonly enrollStudentInteractor: EnrollStudentInteractor;
  private readonly updateStudentInfoInteractor: UpdateStudentInfoInteractor;
  private readonly countStudentsInteractor: CountStudentsInteractor;

  constructor(
    listStudentsInteractor: ListStudentsByBranchInteractor,
    createStudentInteractor: CreateStudentInteractor,
    getStudentDetailsInteractor: GetStudentDetailsInteractor,
    transferStudentInteractor: TransferStudentInteractor,
    enrollStudentInteractor: EnrollStudentInteractor,
    updateStudentInfoInteractor: UpdateStudentInfoInteractor,
    countStudentsInteractor: CountStudentsInteractor
  ) {
    this.listStudentsInteractor = listStudentsInteractor;
    this.createStudentInteractor = createStudentInteractor;
    this.getStudentDetailsInteractor = getStudentDetailsInteractor;
    this.transferStudentInteractor = transferStudentInteractor;
    this.enrollStudentInteractor = enrollStudentInteractor;
    this.updateStudentInfoInteractor = updateStudentInfoInteractor;
    this.countStudentsInteractor = countStudentsInteractor;
  }

  async listStudentsByBranch(input: ListStudentsByBranchInput): Promise<Result<ListStudentsByBranchOutput>> {
    return this.listStudentsInteractor.execute(input);
  }

  async createStudent(input: CreateStudentInput): Promise<Result<CreateStudentOutput>> {
    return this.createStudentInteractor.execute(input);
  }

  async getStudentDetails(input: GetStudentDetailsInput): Promise<Result<GetStudentDetailsOutput>> {
    return this.getStudentDetailsInteractor.execute(input);
  }

  async transferStudent(input: TransferStudentInput): Promise<Result<void>> {
    return this.transferStudentInteractor.execute(input);
  }

  async enrollStudent(input: EnrollStudentInput): Promise<Result<EnrollStudentOutput>> {
    return this.enrollStudentInteractor.execute(input);
  }

  async updateStudentInfo(input: UpdateStudentInfoInput): Promise<Result<void>> {
    return this.updateStudentInfoInteractor.execute(input);
  }

  async countStudents(branchId?: string): Promise<Result<number>> {
    return this.countStudentsInteractor.execute(branchId);
  }
}