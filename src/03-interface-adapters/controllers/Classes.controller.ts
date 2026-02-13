import { Result } from '@/01-entities/shared/base/result';
import { ListClassesByBranchInteractor } from '@/02-usecases/class/ListClassesByBranch.interactor';
import { CreateClassInteractor } from '@/02-usecases/class/CreateClass.interactor';
import { type ListClassesByBranchInput } from '@/02-usecases/class/ports/input/ListClassesByBranch.input';
import { type ListClassesByBranchOutput } from '@/02-usecases/class/ports/output/ListClassesByBranch.output';
import { type CreateClassInput } from '@/02-usecases/class/ports/input/CreateClass.input';

export class ClassesController {
  private readonly listClassesInteractor: ListClassesByBranchInteractor;
  private readonly createClassInteractor: CreateClassInteractor;

  constructor(
    listClassesInteractor: ListClassesByBranchInteractor,
    createClassInteractor: CreateClassInteractor
  ) {
    this.listClassesInteractor = listClassesInteractor;
    this.createClassInteractor = createClassInteractor;
  }

  async listClassesByBranch(input: ListClassesByBranchInput): Promise<Result<ListClassesByBranchOutput>> {
    return this.listClassesInteractor.execute(input);
  }

  async createClass(input: CreateClassInput): Promise<Result<void>> {
    return this.createClassInteractor.execute(input);
  }
}