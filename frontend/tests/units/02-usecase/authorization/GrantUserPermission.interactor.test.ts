// tests/units/02-usecase/authorization/GrantUserPermission.interactor.test.ts
import { GrantUserPermissionInteractor } from '../../../../src/02-usecases/authorization/GrantUserPermission.interactor';
import { IUserRepository } from '../../../../src/02-usecases/ports/repositories/IUserRepository';
import { User } from '../../../../src/01-entities/users/User.entity';
import { UserRole } from '../../../../src/01-entities/users/base/UserRole.vo';
import { UserPermissions } from '../../../../src/01-entities/users/base/UserPermissions.vo';
import { StaffProfile } from '../../../../src/01-entities/users/archetypes/staff/StaffProfile.vo';

describe('GrantUserPermissionInteractor', () => {
  let interactor: GrantUserPermissionInteractor;
  let userRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    userRepository = {
      getById: jest.fn(),
      save: jest.fn(),
    };

    interactor = new GrantUserPermissionInteractor(userRepository);
  });

  const createUser = (permissions?: UserPermissions) =>
    User.create({
      role: UserRole.create('staff').getValue(),
      profile: new StaffProfile({ displayName: 'Staff' }),
      permissions: permissions ?? UserPermissions.empty(),
      isActive: true,
    });

  it('should grant permission successfully', async () => {
    const user = createUser(UserPermissions.empty());
    userRepository.getById.mockResolvedValue(user);

    const result = await interactor.execute({
      userId: 'user-1',
      permission: 'attendance_view',
    });

    expect(result.isSuccess).toBe(true);
    expect(userRepository.save).toHaveBeenCalledTimes(1);

    const savedUser = userRepository.save.mock.calls[0][0];
    expect(savedUser.permissions.has('attendance_view')).toBe(true);
  });

  it('should be idempotent when permission already exists', async () => {
    const permissions = UserPermissions.empty().grant('attendance_view');
    const user = createUser(permissions);
    userRepository.getById.mockResolvedValue(user);

    const result = await interactor.execute({
      userId: 'user-1',
      permission: 'attendance_view',
    });

    expect(result.isSuccess).toBe(true);
    expect(userRepository.save).not.toHaveBeenCalled();
  });

  it('should fail when user is disabled', async () => {
    const user = createUser().deactivate();
    userRepository.getById.mockResolvedValue(user);

    const result = await interactor.execute({
      userId: 'user-1',
      permission: 'attendance_view',
    });

    expect(result.isFailure).toBe(true);
    expect(result.getErrorValue()).toBe('User is disabled');
  });

  it('should fail when user not found', async () => {
    userRepository.getById.mockResolvedValue(null);

    const result = await interactor.execute({
      userId: 'ghost',
      permission: 'attendance_view',
    });

    expect(result.isFailure).toBe(true);
    expect(result.getErrorValue()).toBe('User not found');
  });
});
