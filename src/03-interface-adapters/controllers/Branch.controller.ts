import { Result } from '@/01-entities/shared/base/result';
import { CreateBranchInteractor } from '@/02-usecases/branch/CreateBranch.interactor';
import { GetBranchDetailsInteractor } from '@/02-usecases/branch/GetBranchDetails.interactor';
import { UpdateBranchInfoInteractor } from '@/02-usecases/branch/UpdateBranchInfo.interactor';
import { ListBranchesInteractor } from '@/02-usecases/branch/ListBranches.interactor';
import { DeleteBranchInteractor } from '@/02-usecases/branch/DeleteBranch.interactor';
import { type CreateBranchInput } from '@/02-usecases/branch/ports/input/CreateBranch.input';
import { type GetBranchDetailsInput } from '@/02-usecases/branch/ports/input/GetBranchDetails.input';
import { type UpdateBranchInfoInput } from '@/02-usecases/branch/ports/input/UpdateBranchInfo.input';
import { type ListBranchesInput } from '@/02-usecases/branch/ports/input/ListBranches.input';
import { type DeleteBranchInput } from '@/02-usecases/branch/ports/input/DeleteBranch.input';
import { type GetBranchDetailsOutput } from '@/02-usecases/branch/ports/output/GetBranchDetails.output';
import { type ListBranchesOutput } from '@/02-usecases/branch/ports/output/ListBranches.output';

export class BranchController {
  private readonly createBranchInteractor: CreateBranchInteractor;
  private readonly updateBranchInfoInteractor: UpdateBranchInfoInteractor;
  private readonly getBranchDetailsInteractor: GetBranchDetailsInteractor;
  private readonly listBranchesInteractor: ListBranchesInteractor;
  private readonly deleteBranchInteractor: DeleteBranchInteractor;

  constructor(
    createBranchInteractor: CreateBranchInteractor,
    updateBranchInfoInteractor: UpdateBranchInfoInteractor,
    getBranchDetailsInteractor: GetBranchDetailsInteractor,
    listBranchesInteractor: ListBranchesInteractor,
    deleteBranchInteractor: DeleteBranchInteractor
  ) {
    this.createBranchInteractor = createBranchInteractor;
    this.updateBranchInfoInteractor = updateBranchInfoInteractor;
    this.getBranchDetailsInteractor = getBranchDetailsInteractor;
    this.listBranchesInteractor = listBranchesInteractor;
    this.deleteBranchInteractor = deleteBranchInteractor;
  }

  async createBranch(input: CreateBranchInput): Promise<Result<void>> {
    try {
      return await this.createBranchInteractor.execute(input);
    } catch (error: any) {
      console.error('[BranchController] CreateBranch unexpected error:', error);
      return Result.fail('An unexpected error occurred');
    }
  }

  async updateBranchInfo(input: UpdateBranchInfoInput): Promise<Result<void>> {
    return await this.updateBranchInfoInteractor.execute(input);
  }

  async getBranchDetails(input: GetBranchDetailsInput): Promise<Result<GetBranchDetailsOutput>> {
    try {
      return await this.getBranchDetailsInteractor.execute(input);
    } catch (error: any) {
      return Result.fail('An unexpected error occurred');
    }
  }

  async listBranches(input: ListBranchesInput = {}): Promise<Result<ListBranchesOutput>> {
    try {
      return await this.listBranchesInteractor.execute(input);
    } catch (error: any) {
      console.error('[BranchController] ListBranches unexpected error:', error);
      return Result.fail('An unexpected error occurred');
    }
  }

  async deleteBranch(input: DeleteBranchInput): Promise<Result<void>> {
    try {
      return await this.deleteBranchInteractor.execute(input);
    } catch (error: any) {
      return Result.fail('An unexpected error occurred');
    }
  }
}