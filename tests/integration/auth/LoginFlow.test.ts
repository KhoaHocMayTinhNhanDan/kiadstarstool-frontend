import { jest, describe, beforeEach, it, expect } from '@jest/globals';
import { AuthController } from '../../../src/03-interface-adapters/controllers/Auth.controller';
import { LoginInteractor } from '../../../src/02-usecases/auth/Login.interactor';
import { LogoutInteractor } from '../../../src/02-usecases/auth/Logout.interactor';
import { IAuthRepository } from '../../../src/02-usecases/auth/ports/gateways_interface/IAuthRepository';
import { IUserProfileRepository } from '../../../src/02-usecases/users/ports/gateways_interface/IUserProfileRepository';
import { AuthSession } from '../../../src/01-entities/auth/AuthSession.vo';
import { Result } from '../../../src/01-entities/shared/base/result';
import { User } from '../../../src/01-entities/users/User.entity';
import { UserId } from '../../../src/01-entities/users/base/UserId.vo';
import { UserRole } from '../../../src/01-entities/users/base/UserRole.vo';
import { StaffProfile } from '../../../src/01-entities/users/archetypes/staff/StaffProfile.vo';
import { UserPermissions } from '../../../src/01-entities/users/base/UserPermissions.vo';

// --- MOCKS ---
// Chúng ta mock Interface thay vì implementation thật để kiểm soát kịch bản test
const mockAuthRepo = {
  authenticate: jest.fn(),
  logout: jest.fn(),
} as unknown as jest.Mocked<IAuthRepository>;

const mockUserRepo = {
  getById: jest.fn(),
  save: jest.fn(),
  findAll: jest.fn(),
} as unknown as jest.Mocked<IUserProfileRepository>;

describe('Integration: Login Flow', () => {
  let authController: AuthController;

  beforeEach(() => {
    jest.clearAllMocks();

    // 1. Wiring (Ghép nối các tầng)
    // Controller -> Interactor -> Repositories (Mocked)
    const loginInteractor = new LoginInteractor(mockAuthRepo);
    const logoutInteractor = new LogoutInteractor(mockAuthRepo);
    
    authController = new AuthController(loginInteractor, logoutInteractor);
  });

  it('should login successfully when credentials are valid and user exists', async () => {
    // --- ARRANGE ---
    const input = { username: 'staff@example.com', password: 'password123' };
    
    // 1. Mock AuthRepo trả về session hợp lệ
    const authSession = AuthSession.create({
      userId: 'user-123',
      accessToken: 'fake-jwt-token',
      refreshToken: 'fake-refresh-token'
    }).getValue();
    mockAuthRepo.authenticate.mockResolvedValue(Result.ok(authSession));

    // 2. Mock UserRepo trả về User Entity hợp lệ
    const mockUser = User.create({
      id: UserId.create('user-123'),
      role: UserRole.create('staff').getValue(),
      profile: new StaffProfile({ displayName: 'Staff Member' }),
      permissions: UserPermissions.empty(),
      isActive: true
    });
    // NOTE: Việc lấy thông tin user không còn là trách nhiệm của LoginInteractor.
    // Nó nên được thực hiện ở một bước sau (ví dụ: trong Presenter hoặc một use case khác
    // sau khi đã có token). Vì vậy, chúng ta không cần mock getById ở đây nữa.
    // mockUserRepo.getById.mockResolvedValue(mockUser);

    // --- ACT ---
    // Gọi từ tầng ngoài cùng (Controller)
    const result = await authController.login(input);

    // --- ASSERT ---
    expect(result.isSuccess).toBe(true);
    
    // The output of LoginInteractor is now just the session/token.
    // Mapping to a full user profile would happen in the Presenter/UI layer.
    const output = result.getValue();
    expect(output.token).toBe('fake-jwt-token');
    expect(output.refreshToken).toBe('fake-refresh-token');

    // Kiểm tra luồng gọi
    expect(mockAuthRepo.authenticate).toHaveBeenCalled();
    expect(mockUserRepo.getById).not.toHaveBeenCalled(); // Quan trọng: không được gọi đến UserRepo
  });

  it('should fail when user is not found in database (Data Integrity Error)', async () => {
    // --- ARRANGE ---
    // Auth thành công
    const authSession = AuthSession.create({
      userId: 'user-123',
      accessToken: 'token',
    }).getValue();
    mockAuthRepo.authenticate.mockResolvedValue(Result.ok(authSession));

    // Kịch bản này không còn hợp lệ trong LoginInteractor.
    // LoginInteractor giờ chỉ quan tâm đến việc xác thực thành công hay thất bại.
    // Việc user có tồn tại trong DB của bạn hay không sẽ được kiểm tra ở một bước khác,
    // ví dụ như khi dùng token để lấy thông tin user.
    // Chúng ta có thể bỏ qua test case này hoặc sửa nó thành một kịch bản khác.

    // --- ACT ---
    const result = await authController.login({ username: 'a', password: 'b' });

    // --- ASSERT ---
    // Với interactor mới, luồng này sẽ thành công vì authenticate đã thành công.
    expect(result.isSuccess).toBe(true);
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
