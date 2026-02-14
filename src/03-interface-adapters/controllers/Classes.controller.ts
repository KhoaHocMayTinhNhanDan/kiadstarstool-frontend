import { Result } from '@/01-entities/shared/base/result';
import { ListClassesByBranchInteractor } from '@/02-usecases/class/ListClassesByBranch.interactor';
import { CreateClassInteractor } from '@/02-usecases/class/CreateClass.interactor';
import { GetClassDetailsInteractor } from '@/02-usecases/class/GetClassDetails.interactor';
import { UpdateClassInfoInteractor } from '@/02-usecases/class/UpdateClassInfo.interactor';
import { DeleteClassInteractor } from '@/02-usecases/class/DeleteClass.interactor';
import { type UpdateClassInfoInput } from '@/02-usecases/class/ports/input/UpdateClassInfo.input';

export class ClassesController {
  private readonly listClassesByBranchInteractor: ListClassesByBranchInteractor;
  private readonly createClassInteractor: CreateClassInteractor;
  private readonly getClassDetailsInteractor: GetClassDetailsInteractor;
  private readonly updateClassInfoInteractor: UpdateClassInfoInteractor;
  private readonly deleteClassInteractor: DeleteClassInteractor;

  constructor(
    listClassesByBranchInteractor: ListClassesByBranchInteractor,
    createClassInteractor: CreateClassInteractor,
    getClassDetailsInteractor: GetClassDetailsInteractor,
    updateClassInfoInteractor: UpdateClassInfoInteractor,
    deleteClassInteractor: DeleteClassInteractor
  ) {
    this.listClassesByBranchInteractor = listClassesByBranchInteractor;
    this.createClassInteractor = createClassInteractor;
    this.getClassDetailsInteractor = getClassDetailsInteractor;
    this.updateClassInfoInteractor = updateClassInfoInteractor;
    this.deleteClassInteractor = deleteClassInteractor;
  }
  /**
   * Lấy danh sách lớp học theo chi nhánh
   * @param branchId ID của chi nhánh (có thể rỗng để lấy tất cả)
   */
  async listClassesByBranch(branchId: string): Promise<Result<any>> {
    // Map tham số từ Controller sang Input Port của Interactor
    return this.listClassesByBranchInteractor.execute({ branchId });
  }

  async createClass(input: any): Promise<Result<any>> {
    return this.createClassInteractor.execute(input);
  }

  async getClassDetails(classId: string): Promise<Result<any>> {
    return this.getClassDetailsInteractor.execute({ classId });
  }

  async updateClass(input: UpdateClassInfoInput): Promise<Result<void>> {
    return this.updateClassInfoInteractor.execute(input);
  }

  async deleteClass(classId: string): Promise<Result<void>> {
    return this.deleteClassInteractor.execute({ classId });
  }
}