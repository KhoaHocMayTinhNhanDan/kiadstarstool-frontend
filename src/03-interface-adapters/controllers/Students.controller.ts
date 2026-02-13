import { Result } from '@/01-entities/shared/base/result';
import { ListStudentsByBranchInteractor } from '@/02-usecases/students/ListStudentsByBranch.interactor';
import { type ListStudentsByBranchInput } from '@/02-usecases/students/ports/input/ListStudentsByBranch.input';
import { type ListStudentsByBranchOutput } from '@/02-usecases/students/ports/output/ListStudentsByBranch.output';

export class StudentsController {
  private readonly listStudentsInteractor: ListStudentsByBranchInteractor;

  constructor(listStudentsInteractor: ListStudentsByBranchInteractor) {
    this.listStudentsInteractor = listStudentsInteractor;
  }

  async listStudentsByBranch(input: ListStudentsByBranchInput): Promise<Result<ListStudentsByBranchOutput>> {
    return this.listStudentsInteractor.execute(input);
  }
}