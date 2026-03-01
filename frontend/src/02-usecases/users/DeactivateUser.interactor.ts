import { Result } from '@/01-entities/shared/base/result';
import { type IUserRepository } from './ports/gateways_interface/IUserRepository';

export class DeactivateUserInteractor {
  private readonly userRepo: IUserRepository;

  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo;
  }

  async execute(userId: string): Promise<Result<void>> {
    const user = await this.userRepo.getById(userId);
    if (!user) {
      return Result.fail('User not found');
    }

    // Giả định User Entity có phương thức deactivate hoặc setter cho isActive
    // Nếu Entity chưa có, bạn cần thêm: public deactivate() { this.props.isActive = false; }
    // Ở đây ta giả định logic nghiệp vụ là set trạng thái
    user.deactivate();

    await this.userRepo.save(user);
    return Result.ok();
  }
}