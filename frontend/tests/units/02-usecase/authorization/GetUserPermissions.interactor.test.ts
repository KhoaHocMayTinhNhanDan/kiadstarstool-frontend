import { jest, describe, it, expect } from '@jest/globals';
import { GetUserPermissionsInteractor } from '../../../../src/02-usecases/authorization/GetUserPermissions.interactor';
import { IUserRepository } from '../../../../src/02-usecases/ports/repositories/IUserRepository';
import { User } from '../../../../src/01-entities/users/User.entity';
import { UserId } from '../../../../src/01-entities/users/base/UserId.vo';
import { UserRole } from '../../../../src/01-entities/users/base/UserRole.vo';
import { UserPermissions } from '../../../../src/01-entities/users/base/UserPermissions.vo';
import { StaffProfile } from '../../../../src/01-entities/users/archetypes/staff/StaffProfile.vo';
import { PERMISSIONS } from '../../../../src/shared/constants/authorization/auth.domain';

describe('GetUserPermissions Interactor', () => {
  // Helper function to create mock user
  const createUser = (userId: string, roleValue: string, permissions: UserPermissions) => {
    const role = UserRole.create(roleValue).getValue();
    const profile = new StaffProfile({ displayName: 'Test Staff' });
    
    return User.create({
      id: UserId.create(userId),
      role,
      profile,
      permissions,
      isActive: true,
    });
  };

  it('should return all effective permissions of the user', async () => {
    // Arrange
    const permissions = UserPermissions.empty().grant(PERMISSIONS.USER_MANAGE);
    const user = createUser('123', 'staff', permissions);

    const userRepositoryMock = {
      getById: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<IUserRepository>;

    userRepositoryMock.getById.mockResolvedValue(user);

    const interactor = new GetUserPermissionsInteractor(userRepositoryMock);
    
    // Act
    const result = await interactor.execute({ userId: '123' });

    // Assert
    expect(result.isSuccess).toBe(true);
    const perms = result.getValue().permissions;
    
    // Staff mặc định có STUDENT_VIEW (theo auth.policy.ts)
    expect(perms).toContain(PERMISSIONS.STUDENT_VIEW);
    // Quyền được cấp thêm
    expect(perms).toContain(PERMISSIONS.USER_MANAGE);
  });

  it('should return failure if user is not found', async () => {
    const userRepositoryMock = {
      getById: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<IUserRepository>;

    userRepositoryMock.getById.mockResolvedValue(null);

    const interactor = new GetUserPermissionsInteractor(userRepositoryMock);
    const result = await interactor.execute({ userId: '123' });

    expect(result.isFailure).toBe(true);
    expect(result.getErrorValue()).toBe('User not found');
  });

  it('should return failure if user is inactive', async () => {
    // Arrange
    const permissions = UserPermissions.empty().grant(PERMISSIONS.USER_MANAGE);
    // FIX: User là immutable, cần lấy instance mới trả về từ deactivate()
    const user = createUser('123', 'staff', permissions).deactivate();

    const userRepositoryMock = {
      getById: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<IUserRepository>;

    userRepositoryMock.getById.mockResolvedValue(user);

    const interactor = new GetUserPermissionsInteractor(userRepositoryMock);
    
    // Act
    const result = await interactor.execute({ userId: '123' });

    // Assert
    expect(result.isFailure).toBe(true);
    expect(result.getErrorValue()).toBe('User is inactive');
  });

  it('should handle internal server errors gracefully', async () => {
    const userRepositoryMock = {
      getById: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<IUserRepository>;

    userRepositoryMock.getById.mockRejectedValue(new Error('Database error'));

    const interactor = new GetUserPermissionsInteractor(userRepositoryMock);
    const result = await interactor.execute({ userId: '123' });

    expect(result.isFailure).toBe(true);
    expect(result.getErrorValue()).toBe('Internal server error');
  });
});
