import { Result } from '@/01-entities/shared/base/result';
import { type IBranchRepository } from './ports/gateways_interface/IBranchRepository';
import { type ListBranchesInput } from './ports/input/ListBranches.input';
import { type ListBranchesOutput } from './ports/output/ListBranches.output';

export class ListBranchesInteractor {

    private readonly branchRepo: IBranchRepository;

  constructor(branchRepo: IBranchRepository) {
    this.branchRepo = branchRepo;
  }

  

  async execute(input: ListBranchesInput): Promise<Result<ListBranchesOutput>> {
    const branches = await this.branchRepo.findAll();

    // Map Entity sang DTO
    const output: ListBranchesOutput = branches.map(branch => ({
      id: branch.id.toString(),
      name: branch.name,
      code: branch.code,
      address: branch.address.fullAddress,
      isActive: branch.isActive,
      studentCount: branch.capacity.currentStudents,
    }));

    // TODO: Implement filtering logic here if needed (or in repository)

    return Result.ok(output);
  }
}