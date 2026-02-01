import { jest, describe, beforeEach, it, expect } from '@jest/globals';
import { AuthController } from '../../../src/03-interface-adapters/controllers/Auth.controller';
import { LoginInteractor } from '../../../src/02-usecases/auth/login/Login.interactor';
import { LogoutInteractor } from '../../../src/02-usecases/auth/logout/Logout.interactor';
import { IAuthRepository, type AuthSession } from '../../../src/02-usecases/ports/repositories/IAuthRepository';
import { IUserRepository } from '../../../src/02-usecases/ports/repositories/IUserRepository';
import { Result } from '../../../src/01-entities/shared/base/result';
import { User } from '../../../src/01-entities/users/User.entity';
import { UserId } from '../../../src/01-entities/users/base/UserId.vo';
import { UserRole } from '../../../src/01-entities/users/base/UserRole.vo';
import { StaffProfile } from '../../../src/01-entities/users/archetypes/staff/StaffProfile.vo';

// --- MOCKS ---
// Chúng ta mock Interface thay vì implementation thật để kiểm soát kịch bản test
const mockAuthRepo = {
  authenticate: jest.fn(),
  logout: jest.fn(),
} as unknown as jest.Mocked<IAuthRepository>;

const mockUserRepo = {
  getById: jest.fn(),
} as unknown as jest.Mocked<IUserRepository>;

describe('Integration: Login Flow', () => {
  let authController: AuthController;

  beforeEach(() => {
    jest.clearAllMocks();

    // 1. Wiring (Ghép nối các tầng)
    // Controller -> Interactor -> Repositories (Mocked)
    const loginInteractor = new LoginInteractor(mockAuthRepo, mockUserRepo);
    const logoutInteractor = new LogoutInteractor(mockAuthRepo);
    
    authController = new AuthController(loginInteractor, logoutInteractor);
  });

  it('should login successfully when credentials are valid and user exists', async () => {
    // --- ARRANGE ---
    const input = { username: 'staff@example.com', password: 'password123' };
    
    // 1. Mock AuthRepo trả về session hợp lệ
    mockAuthRepo.authenticate.mockResolvedValue(Result.ok({
      userId: 'user-123',
      accessToken: 'fake-jwt-token',
      refreshToken: 'fake-refresh-token'
    }));

    // 2. Mock UserRepo trả về User Entity hợp lệ
    const mockUser = User.create({
      id: UserId.create('user-123'),
      role: UserRole.create('staff').getValue(),
      profile: new StaffProfile({ displayName: 'Staff Member' }),
      defaultPermissions: [],
      isActive: true
    });
    mockUserRepo.getById.mockResolvedValue(mockUser);

    // --- ACT ---
    // Gọi từ tầng ngoài cùng (Controller)
    const result = await authController.login(input);

    // --- ASSERT ---
    expect(result.isSuccess).toBe(true);
    
    const output = result.getValue();
    expect(output.userId).toBe('user-123');
    expect(output.displayName).toBe('Staff Member');
    expect(output.role).toBe('staff');
    expect(output.accessToken).toBe('fake-jwt-token');

    // Kiểm tra luồng gọi
    expect(mockAuthRepo.authenticate).toHaveBeenCalled();
    expect(mockUserRepo.getById).toHaveBeenCalledWith('user-123');
  });

  it('should fail when user is not found in database (Data Integrity Error)', async () => {
    // --- ARRANGE ---
    // Auth thành công
    mockAuthRepo.authenticate.mockResolvedValue(Result.ok({
      userId: 'user-123',
      accessToken: 'token',
    }));

    // Nhưng User không tìm thấy (trả về null)
    mockUserRepo.getById.mockResolvedValue(null);

    // --- ACT ---
    const result = await authController.login({ username: 'a', password: 'b' });

    // --- ASSERT ---
    expect(result.isFailure).toBe(true);
    expect(result.getErrorValue()).toContain('User not found');
  });

  it('should fail when password is wrong', async () => {
    // --- ARRANGE ---
    mockAuthRepo.authenticate.mockResolvedValue(Result.fail<AuthSession>('Invalid credentials'));

    // --- ACT ---
    const result = await authController.login({ username: 'a', password: 'wrong' });

    // --- ASSERT ---
    expect(result.isFailure).toBe(true);
    expect(mockUserRepo.getById).not.toHaveBeenCalled(); // Không được gọi DB nếu Auth fail
  });
});
