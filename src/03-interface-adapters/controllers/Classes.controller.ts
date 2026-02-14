import { Result } from '@/01-entities/shared/base/result';
import { ListClassesByBranchInteractor } from '@/02-usecases/class/ListClassesByBranch.interactor';
import { CreateClassInteractor } from '@/02-usecases/class/CreateClass.interactor';
import { GetClassDetailsInteractor } from '@/02-usecases/class/GetClassDetails.interactor';
import { UpdateClassInfoInteractor } from '@/02-usecases/class/UpdateClassInfo.interactor';
import { DeleteClassInteractor } from '@/02-usecases/class/DeleteClass.interactor';
import { type CreateClassInput } from '@/02-usecases/class/ports/input/CreateClass.input';
import { type UpdateClassInfoInput } from '@/02-usecases/class/ports/input/UpdateClassInfo.input';
import { type GetClassDetailsOutput } from '@/02-usecases/class/ports/output/GetClassDetails.output';
import { type ListClassesByBranchOutput } from '@/02-usecases/class/ports/output/ListClassesByBranch.output';

export class ClassesController {
  private readonly listClassesInteractor: ListClassesByBranchInteractor;
  private readonly createClassInteractor: CreateClassInteractor;
  private readonly getClassDetailsInteractor: GetClassDetailsInteractor;
  private readonly updateClassInfoInteractor: UpdateClassInfoInteractor;
  private readonly deleteClassInteractor: DeleteClassInteractor;
  constructor(
    listClassesInteractor: ListClassesByBranchInteractor,
    createClassInteractor: CreateClassInteractor,
    getClassDetailsInteractor: GetClassDetailsInteractor,
    updateClassInfoInteractor: UpdateClassInfoInteractor,
    deleteClassInteractor: DeleteClassInteractor
  ) {
    this.listClassesInteractor = listClassesInteractor;
    this.createClassInteractor = createClassInteractor;
    this.getClassDetailsInteractor = getClassDetailsInteractor;
    this.updateClassInfoInteractor = updateClassInfoInteractor;
    this.deleteClassInteractor = deleteClassInteractor;
  }

  async listClassesByBranch(branchId: string): Promise<Result<ListClassesByBranchOutput>> {
    return this.listClassesInteractor.execute(branchId);
  }

  async createClass(input: CreateClassInput): Promise<Result<void>> {
    return this.createClassInteractor.execute(input);
  }

  async getClassDetails(id: string): Promise<Result<GetClassDetailsOutput>> {
    return this.getClassDetailsInteractor.execute(id);
  }

  async updateClass(input: UpdateClassInfoInput): Promise<Result<void>> {
    return this.updateClassInfoInteractor.execute(input);
  }

  async deleteClass(id: string): Promise<Result<void>> {
    return this.deleteClassInteractor.execute({ classId: id });
  }
}