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

  private createAcronym(name: string): string {
    if (!name) return 'XX';
    // Chuẩn hóa, bỏ dấu, và lấy chữ cái đầu của mỗi từ
    const normalized = name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d").replace(/Đ/g, "D");
      
    const acronym = normalized
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
      
    return acronym.substring(0, 3); // Giới hạn 3 ký tự cho nhất quán
  }

  private async generateBranchCode(province: string): Promise<string> {
    const acronym = this.createAcronym(province);
    const prefix = `BR-${acronym}-`;

    const lastSequence = await this.branchRepo.findLastSequenceForPrefix(prefix);
    const nextSequence = lastSequence + 1;
    
    // Định dạng số với 2 chữ số (e.g., 1 -> 01, 10 -> 10)
    const formattedSequence = nextSequence.toString().padStart(2, '0');

    return `${prefix}${formattedSequence}`;
  }

  async execute(input: CreateBranchInput): Promise<Result<void>> {
    // 1. Tự động sinh mã dựa trên tỉnh/thành phố
    const code = await this.generateBranchCode(input.address.province);

    // 2. Kiểm tra trùng lặp (an toàn, mặc dù logic sinh mã đã cố gắng đảm bảo)
    const exists = await this.branchRepo.exists(code);
    if (exists) {
      return Result.fail('Branch code already exists');
    }

    // 3. Khởi tạo các Value Objects
    // Lưu ý: Trong thực tế, các VO này cũng có thể trả về Result, cần handle failure
    const address = BranchAddress.create(input.address);
    const capacity = BranchCapacity.create({ 
      maxStudents: input.maxStudents ?? 100, 
      currentStudents: 0,
      totalRooms: input.totalRooms ?? 0
    });
    const financial = BranchFinancial.create(input.financial);
    const operatingHours = BranchOperatingHours.create(input.operatingHours);

    // 4. Tạo Entity
    const branchOrError = Branch.create({
      name: input.name,
      code: code,
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