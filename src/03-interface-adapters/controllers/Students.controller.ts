import { Result } from '@/01-entities/shared/base/result';
import { ListStudentsByBranchInteractor } from '@/02-usecases/students/ListStudentsByBranch.interactor';
import { CreateStudentInteractor } from '@/02-usecases/students/CreateStudent.interactor';
import { GetStudentDetailsInteractor } from '@/02-usecases/students/GetStudentDetails.interactor';
import { TransferStudentInteractor } from '@/02-usecases/students/TransferStudent.interactor';
import { type ListStudentsByBranchInput } from '@/02-usecases/students/ports/input/ListStudentsByBranch.input';
import { type ListStudentsByBranchOutput } from '@/02-usecases/students/ports/output/ListStudentsByBranch.output';
import { type CreateStudentInput } from '@/02-usecases/students/ports/input/CreateStudent.input';
import { type GetStudentDetailsInput } from '@/02-usecases/students/ports/input/GetStudentDetails.input';
import { type GetStudentDetailsOutput } from '@/02-usecases/students/ports/output/GetStudentDetails.output';
import { type TransferStudentInput } from '@/02-usecases/students/ports/input/TransferStudent.input';

export class StudentsController {
  private readonly listStudentsInteractor: ListStudentsByBranchInteractor;
  private readonly createStudentInteractor: CreateStudentInteractor;
  private readonly getStudentDetailsInteractor: GetStudentDetailsInteractor;
  private readonly transferStudentInteractor: TransferStudentInteractor;

  constructor(
    listStudentsInteractor: ListStudentsByBranchInteractor,
    createStudentInteractor: CreateStudentInteractor,
    getStudentDetailsInteractor: GetStudentDetailsInteractor,
    transferStudentInteractor: TransferStudentInteractor
  ) {
    this.listStudentsInteractor = listStudentsInteractor;
    this.createStudentInteractor = createStudentInteractor;
    this.getStudentDetailsInteractor = getStudentDetailsInteractor;
    this.transferStudentInteractor = transferStudentInteractor;
  }

  async listStudentsByBranch(input: ListStudentsByBranchInput): Promise<Result<ListStudentsByBranchOutput>> {
    return this.listStudentsInteractor.execute(input);
  }

  async createStudent(input: CreateStudentInput): Promise<Result<void>> {
    return this.createStudentInteractor.execute(input);
  }

  async getStudentDetails(input: GetStudentDetailsInput): Promise<Result<GetStudentDetailsOutput>> {
    return this.getStudentDetailsInteractor.execute(input);
  }

  async transferStudent(input: TransferStudentInput): Promise<Result<void>> {
    return this.transferStudentInteractor.execute(input);
  }
}