// src/02-usecases/authorization/GetUserPermissions.interactor.ts
import { type IUserProfileRepository } from '../users/ports/gateways_interface/IUserProfileRepository';
import { Result } from '../../01-entities/shared/base/result';
import { buildRolePermissions } from '../../shared/constants/authorization/auth.policy';

interface Input {
  userId: string;
}

interface Output {
  permissions: string[]; // Trả về danh sách các quyền người dùng có
}

export class GetUserPermissionsInteractor {
  private readonly userRepository: IUserProfileRepository;

  constructor(userRepository: IUserProfileRepository) {
    this.userRepository = userRepository;
  }

  async execute(input: Input): Promise<Result<Output>> {
    try {
      // 1. Tìm user theo userId
      const user = await this.userRepository.getById(input.userId);
      if (!user) {
        return Result.fail<Output>('User not found');
      }

      // ✅ Kiểm tra trạng thái của user
      if (user.isDisabled()) {
        return Result.fail<Output>('User is inactive');
      }

      // 2. Xử lý quyền mặc định từ role (Role Preset)
      const rolePermissions = buildRolePermissions(user.role.value);

      // 3. Kết hợp quyền của user (bao gồm cả quyền override)
      const allPermissions = user.getEffectivePermissions(rolePermissions);

      // 4. Trả về tất cả quyền người dùng có thể thực thi
      return Result.ok({
        permissions: allPermissions,
      });
    } catch (error) {
      return Result.fail<Output>('Internal server error');
    }
  }
}
