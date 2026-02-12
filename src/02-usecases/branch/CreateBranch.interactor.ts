import { Result } from '@/01-entities/shared/base/result';
import { Branch } from '@/01-entities/branch/Branch.entity';
import { BranchAddress } from '@/01-entities/branch/value-objects/BranchAddress.vo';
import { BranchCapacity } from '@/01-entities/branch/value-objects/BranchCapacity.vo';
import { BranchFinancial } from '@/01-entities/branch/value-objects/BranchFinancial.vo';
import { BranchOperatingHours } from '@/01-entities/branch/value-objects/BranchOperatingHours.vo';
import { type IBranchRepository } from './ports/gateways_interface/IBranchRepository';
import { type CreateBranchInput } from './ports/input/CreateBranch.input';

export class CreateBranchInteractor {
  private readonly branchRepo: IBranchRepository;

  constructor(branchRepo: IBranchRepository) {
    this.branchRepo = branchRepo;
  }

  async execute(input: CreateBranchInput): Promise<Result<void>> {
    // 1. Validate input cơ bản (nếu cần thiết ngoài entity)
    
    // 2. Kiểm tra trùng lặp (Business Rule: Mã chi nhánh là duy nhất)
    const exists = await this.branchRepo.exists(input.code);
    if (exists) {
      return Result.fail('Branch code already exists');
    }

    // 3. Khởi tạo các Value Objects
    // Lưu ý: Trong thực tế, các VO này cũng có thể trả về Result, cần handle failure
    const address = BranchAddress.create(input.address);
    const capacity = BranchCapacity.create({ 
      maxStudents: input.maxStudents ?? 100, 
      currentStudents: 0 
    });
    const financial = BranchFinancial.create(); // Mặc định
    const operatingHours = BranchOperatingHours.create(); // Mặc định

    // 4. Tạo Entity
    const branchOrError = Branch.create({
      name: input.name,
      code: input.code,
      address,
      capacity,
      financial,
      operatingHours,
    });

    if (branchOrError.isFailure) {
      return Result.fail(branchOrError.getErrorValue());
    }

    // 5. Lưu vào Repository
    await this.branchRepo.save(branchOrError.getValue());

    return Result.ok();
  }
}