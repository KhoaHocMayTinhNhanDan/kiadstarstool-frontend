// tests/units/02-usecase/authorization/CheckPermission.interactor.test.ts
import { CheckPermissionInteractor } from '../../../../src/02-usecases/authorization/CheckPermission.interactor';
import { IUserRepository } from '../../../../src/02-usecases/ports/repositories/IUserRepository';
import { User } from '../../../../src/01-entities/users/User.entity';
import { UserRole } from '../../../../src/01-entities/users/base/UserRole.vo';
import { UserPermissions } from '../../../../src/01-entities/users/base/UserPermissions.vo';
import { StaffProfile } from '../../../../src/01-entities/users/archetypes/staff/StaffProfile.vo';

describe('CheckPermissionInteractor', () => {
  let interactor: CheckPermissionInteractor;
  let userRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    userRepository = {
      getById: jest.fn(),
      save: jest.fn(),
    };

    interactor = new CheckPermissionInteractor(userRepository);
  });

  const createUser = (permissions?: UserPermissions) =>
    User.create({
      role: UserRole.create('staff').getValue(),
      profile: new StaffProfile({ displayName: 'Staff' }),
      permissions: permissions ?? UserPermissions.empty(),
      isActive: true,
    });

  it('should allow when permission comes from role preset', async () => {
    const user = createUser();
    userRepository.getById.mockResolvedValue(user);

    const result = await interactor.execute({
      userId: 'user-1',
      permission: 'attendance_view',
    });

    expect(result.isSuccess).toBe(true);
    expect(result.getValue().allowed).toBe(true);
  });

  it('should allow when permission is granted explicitly', async () => {
    const permissions = UserPermissions.empty().grant('attendance_view');
    const user = createUser(permissions);
    userRepository.getById.mockResolvedValue(user);

    const result = await interactor.execute({
      userId: 'user-1',
      permission: 'attendance_view',
    });

    expect(result.isSuccess).toBe(true);
    expect(result.getValue().allowed).toBe(true);
  });

  it('should deny when permission not in role and not granted', async () => {
    const user = createUser();
    userRepository.getById.mockResolvedValue(user);

    const result = await interactor.execute({
      userId: 'user-1',
      permission: 'manage_users',
    });

    expect(result.isSuccess).toBe(true);
    expect(result.getValue().allowed).toBe(false);
  });

  it('should deny when user is disabled', async () => {
    const user = createUser().deactivate();
    userRepository.getById.mockResolvedValue(user);

    const result = await interactor.execute({
      userId: 'user-1',
      permission: 'attendance_view',
    });

    expect(result.isSuccess).toBe(true);
    expect(result.getValue().allowed).toBe(false);
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

  it('should fail when permission format is invalid', async () => {
    const result = await interactor.execute({
      userId: 'user-1',
      permission: '' as any,
    });

    expect(result.isFailure).toBe(true);
    expect(userRepository.getById).not.toHaveBeenCalled();
  });
});
