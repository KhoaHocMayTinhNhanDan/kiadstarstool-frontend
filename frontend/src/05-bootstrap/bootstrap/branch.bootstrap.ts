import { BranchRepository } from '@/03-interface-adapters/gateways/inbound/repositories/BranchRepository';
import { StudentRepository } from '@/03-interface-adapters/gateways/inbound/repositories/StudentRepository';
import { CreateBranchInteractor } from '@/02-usecases/branch/CreateBranch.interactor';
import { UpdateBranchInfoInteractor } from '@/02-usecases/branch/UpdateBranchInfo.interactor';
import { GetBranchDetailsInteractor } from '@/02-usecases/branch/GetBranchDetails.interactor';
import { ListBranchesInteractor } from '@/02-usecases/branch/ListBranches.interactor';
import { DeleteBranchInteractor } from '@/02-usecases/branch/DeleteBranch.interactor';
import { BranchController } from '@/03-interface-adapters/controllers/Branch.controller';

export function bootstrapBranch(
  branchRepository: BranchRepository,
  studentRepository: StudentRepository
) {
  const createBranchInteractor = new CreateBranchInteractor(branchRepository);
  const updateBranchInfoInteractor = new UpdateBranchInfoInteractor(branchRepository);
  const getBranchDetailsInteractor = new GetBranchDetailsInteractor(branchRepository);
  const listBranchesInteractor = new ListBranchesInteractor(branchRepository, studentRepository);
  const deleteBranchInteractor = new DeleteBranchInteractor(branchRepository);

  const branchController = new BranchController(
    createBranchInteractor,
    updateBranchInfoInteractor,
    getBranchDetailsInteractor,
    listBranchesInteractor,
    deleteBranchInteractor
  );

  return {
    branchController,
  };
}