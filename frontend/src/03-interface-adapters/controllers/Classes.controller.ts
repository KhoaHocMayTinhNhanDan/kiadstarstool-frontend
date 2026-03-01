import { Result } from '@/01-entities/shared/base/result';
import { ListClassesByBranchInteractor } from '@/02-usecases/class/ListClassesByBranch.interactor';
import { CreateClassInteractor } from '@/02-usecases/class/CreateClass.interactor';
import { GetClassDetailsInteractor } from '@/02-usecases/class/GetClassDetails.interactor';
import { ListOngoingClassesInteractor } from '@/02-usecases/class/ListOngoingClasses.interactor';
import { ListClassesByDateInteractor } from '@/02-usecases/class/ListClassesByDate.interactor';
import { UpdateClassInfoInteractor } from '@/02-usecases/class/UpdateClassInfo.interactor';
import { DeleteClassInteractor } from '@/02-usecases/class/DeleteClass.interactor';

// Inputs & Outputs
import { type ListClassesByBranchOutput } from '@/02-usecases/class/ports/output/ListClassesByBranch.output';
import { type CreateClassInput } from '@/02-usecases/class/ports/input/CreateClass.input';
import { type CreateClassOutput } from '@/02-usecases/class/ports/output/CreateClass.output';
import { type GetClassDetailsOutput } from '@/02-usecases/class/ports/output/GetClassDetails.output';
import { type ListOngoingClassesOutput } from '@/02-usecases/class/ports/output/ListOngoingClasses.output';
import { type ListClassesByDateOutput } from '@/02-usecases/class/ports/output/ListClassesByDate.output';
import { type UpdateClassInfoInput } from '@/02-usecases/class/ports/input/UpdateClassInfo.input';
import { type UpdateClassInfoOutput } from '@/02-usecases/class/ports/output/UpdateClassInfo.output';
import { type DeleteClassOutput } from '@/02-usecases/class/ports/output/DeleteClass.output';

export class ClassesController {
  private readonly listClassesByBranchInteractor: ListClassesByBranchInteractor;
  private readonly createClassInteractor: CreateClassInteractor;
  private readonly getClassDetailsInteractor: GetClassDetailsInteractor;
  private readonly listOngoingClassesInteractor: ListOngoingClassesInteractor;
  private readonly listClassesByDateInteractor: ListClassesByDateInteractor;
  private readonly updateClassInfoInteractor: UpdateClassInfoInteractor;
  private readonly deleteClassInteractor: DeleteClassInteractor;
  constructor(
    listClassesByBranchInteractor: ListClassesByBranchInteractor,
    createClassInteractor: CreateClassInteractor,
    getClassDetailsInteractor: GetClassDetailsInteractor,
    listOngoingClassesInteractor: ListOngoingClassesInteractor,
    listClassesByDateInteractor: ListClassesByDateInteractor,
    updateClassInfoInteractor: UpdateClassInfoInteractor,
    deleteClassInteractor: DeleteClassInteractor
  ) {
    this.listClassesByBranchInteractor = listClassesByBranchInteractor;
    this.createClassInteractor = createClassInteractor;
    this.getClassDetailsInteractor = getClassDetailsInteractor;
    this.listOngoingClassesInteractor = listOngoingClassesInteractor;
    this.listClassesByDateInteractor = listClassesByDateInteractor;
    this.updateClassInfoInteractor = updateClassInfoInteractor;
    this.deleteClassInteractor = deleteClassInteractor;
  }

  async listClassesByBranch(branchId: string): Promise<Result<ListClassesByBranchOutput>> {
    return this.listClassesByBranchInteractor.execute({ branchId });
  }

  async listOngoingClasses(branchId?: string): Promise<Result<ListOngoingClassesOutput>> {
    return this.listOngoingClassesInteractor.execute({ branchId });
  }

  async createClass(input: CreateClassInput): Promise<Result<CreateClassOutput>> {
    return this.createClassInteractor.execute(input);
  }

  async getClassDetails(classId: string): Promise<Result<GetClassDetailsOutput>> {
    return this.getClassDetailsInteractor.execute({ classId });
  }

  async listClassesByDate(date: string, branchId?: string): Promise<Result<ListClassesByDateOutput>> {
    return this.listClassesByDateInteractor.execute({ date, branchId });
  }

  async updateClassInfo(input: UpdateClassInfoInput): Promise<Result<UpdateClassInfoOutput>> {
    return this.updateClassInfoInteractor.execute(input);
  }

  async deleteClass(classId: string): Promise<Result<DeleteClassOutput>> {
    return this.deleteClassInteractor.execute({ classId });
  }
}