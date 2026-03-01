import { AuthRepository } from '../../../../../src/03-interface-adapters/gateways/repositories/AuthRepository';
import { type IAuthDriver } from '../../../../../src/03-interface-adapters/gateways/device-interfaces/auth/IAuthDriver';
import { Credentials } from '../../../../../src/01-entities/auth/Credentials.vo';
import { AuthIdentity } from '../../../../../src/01-entities/auth/AuthIdentity.entity';

// ===== TYPE-SAFE MOCK =====
const mockSignIn = jest.fn<
  Promise<AuthIdentity>,
  [string, string]
>();

const mockSignOut = jest.fn<Promise<void>, []>();
const mockGetIdToken = jest.fn<Promise<string | null>, []>();

const mockAuthDriver = {
  signInWithEmailAndPassword: mockSignIn,
  signOut: mockSignOut,
  getIdToken: mockGetIdToken,
} as unknown as IAuthDriver;


describe('AuthRepository', () => {
  let repository: AuthRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new AuthRepository(mockAuthDriver);
  });

  describe('authenticate', () => {
    const validCredentials = Credentials.create(
      'test@example.com',
      'password123'
    ).getValue();

    it('should return success AuthSession when authentication succeeds', async () => {
      // Arrange
      const identity = new AuthIdentity({
        email: 'test@example.com',
        customClaims: { uid: 'user-123' }
      });

      mockSignIn.mockResolvedValue(identity);
      mockGetIdToken.mockResolvedValue('access-token-123');

      // Act
      const result = await repository.authenticate(validCredentials);

      // Assert
      expect(mockSignIn).toHaveBeenCalledWith(
        'test@example.com',
        'password123'
      );
      expect(mockGetIdToken).toHaveBeenCalledTimes(1);

      expect(result.isSuccess).toBe(true);

      const session = result.getValue();
      expect(session).toEqual({
        userId: 'user-123',
        accessToken: 'access-token-123',
        refreshToken: expect.any(String),
      });
    });

    it('should return failure when driver throws error', async () => {
      mockSignIn.mockRejectedValue(
        new Error('Invalid credentials')
      );

      const result = await repository.authenticate(validCredentials);

      expect(result.isFailure).toBe(true);
      expect(result.getErrorValue()).toBe('Invalid credentials');
      expect(mockGetIdToken).not.toHaveBeenCalled();
    });

    it('should return failure when access token retrieval fails', async () => {
      const identity = new AuthIdentity({
        email: 'test@example.com',
        customClaims: { uid: 'user-123' }
      });

      mockSignIn.mockResolvedValue(identity);
      mockGetIdToken.mockResolvedValue(null);

      const result = await repository.authenticate(validCredentials);

      expect(result.isFailure).toBe(true);
      expect(result.getErrorValue()).toBe('Failed to retrieve access token');
    });

  });

  describe('logout', () => {
    it('should delegate logout to auth driver', async () => {
      await repository.logout();
      expect(mockSignOut).toHaveBeenCalledTimes(1);
    });
  });
});

