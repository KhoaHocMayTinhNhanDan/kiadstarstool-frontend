// src/02-usecases/authorization/CheckPermission.interactor.test.ts
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { CheckPermissionInteractor } from '../../../../src/02-usecases/authorization/CheckPermission.interactor';
import { IUserRepository } from '../../../../src/02-usecases/ports/repositories/IUserRepository';
import { Permission } from '../../../../src/01-entities/users/base/Permission.vo';
import { User } from '../../../../src/01-entities/users/User.entity';
import { UserId } from '../../../../src/01-entities/users/base/UserId.vo';
import { UserRole } from '../../../../src/01-entities/users/base/UserRole.vo';
import { StaffProfile } from '../../../../src/01-entities/users/archetypes/staff/StaffProfile.vo';

describe('CheckPermissionInteractor', () => {
  let interactor: CheckPermissionInteractor;
  let mockUserRepo: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    mockUserRepo = {
      getById: jest.fn(),
    } as unknown as jest.Mocked<IUserRepository>;

    interactor = new CheckPermissionInteractor(mockUserRepo);
  });

  // Helper: Tạo User thật thay vì Mock
  // Đảm bảo test tuân thủ đúng Domain Rules (Role khớp Profile, Permission hợp lệ...)
  const createRealUser = (permissions: string[]) => {
    const role = UserRole.create('staff').getValue();
    const profile = new StaffProfile({ displayName: 'Test Staff' });
    const permissionVOs = permissions.map(p => Permission.create(p).getValue());

    return User.create({
      id: UserId.create('user-123'),
      role,
      profile,
      defaultPermissions: permissionVOs,
      isActive: true
    });
  };

  it('should return allowed=true when user has permission', async () => {
    // Arrange: User thật có quyền 'branch:view'
    const user = createRealUser(['branch:view']);
    mockUserRepo.getById.mockResolvedValue(user);

    const result = await interactor.execute({
      userId: 'user-123',
      permission: 'branch:view'
    });

    expect(result.isSuccess).toBe(true);
    expect(result.getValue().allowed).toBe(true);
    expect(mockUserRepo.getById).toHaveBeenCalledWith('user-123');
  });

  it('should return allowed=false when user does NOT have permission', async () => {
    // Arrange: User chỉ có 'branch:view', không có 'branch:delete'
    const user = createRealUser(['branch:view']);
    mockUserRepo.getById.mockResolvedValue(user);

    const result = await interactor.execute({
      userId: 'user-123',
      permission: 'branch:delete'
    });

    expect(result.isSuccess).toBe(true);
    expect(result.getValue().allowed).toBe(false);
  });

  it('should fail when user is not found', async () => {
    mockUserRepo.getById.mockResolvedValue(null);

    const result = await interactor.execute({
      userId: 'ghost-user',
      permission: 'branch:view'
    });

    expect(result.isFailure).toBe(true);
    expect(result.getErrorValue()).toBe('User not found');
  });

  it('should fail when permission format is invalid', async () => {
    const result = await interactor.execute({
      userId: 'user-123',
      permission: ''
    });

    expect(result.isFailure).toBe(true);
    expect(result.getErrorValue()).toContain('Invalid permission format');
    expect(mockUserRepo.getById).not.toHaveBeenCalled();
  });

  it('should fail when there is an internal error in repository', async () => {
    mockUserRepo.getById.mockRejectedValue(new Error('Database error'));

    const result = await interactor.execute({
      userId: 'user-123',
      permission: 'branch:view'
    });

    expect(result.isFailure).toBe(true);
    expect(result.getErrorValue()).toBe('Internal server error');
    expect(mockUserRepo.getById).toHaveBeenCalledWith('user-123');
  });
});
