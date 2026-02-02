import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { AuthorizationController } from '../../../../src/03-interface-adapters/controllers/Authorization.controller';
import { CheckPermissionInteractor } from '../../../../src/02-usecases/authorization/CheckPermission.interactor';
import { GetUserPermissionsInteractor } from '../../../../src/02-usecases/authorization/GetUserPermissions.interactor';
import { GrantUserPermissionInteractor } from '../../../../src/02-usecases/authorization/GrantUserPermission.interactor';
import { RevokeUserPermissionInteractor } from '../../../../src/02-usecases/authorization/RevokeUserPermission.interactor';
import { Result } from '../../../../src/01-entities/shared/base/result';
import { PERMISSIONS } from '../../../../src/shared/constants/authorization/auth.domain';

// --- MOCKS ---
// Đảm bảo bạn khai báo kiểu cho các mock functions
const mockCheckPermission = jest.fn() as jest.MockedFunction<CheckPermissionInteractor['execute']>;
const mockGetUserPermissions = jest.fn() as jest.MockedFunction<GetUserPermissionsInteractor['execute']>;
const mockGrantPermission = jest.fn() as jest.MockedFunction<GrantUserPermissionInteractor['execute']>;
const mockRevokePermission = jest.fn() as jest.MockedFunction<RevokeUserPermissionInteractor['execute']>;

describe('AuthorizationController', () => {
  let controller: AuthorizationController;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new AuthorizationController(
      { execute: mockCheckPermission } as unknown as CheckPermissionInteractor,
      { execute: mockGetUserPermissions } as unknown as GetUserPermissionsInteractor,
      { execute: mockGrantPermission } as unknown as GrantUserPermissionInteractor,
      { execute: mockRevokePermission } as unknown as RevokeUserPermissionInteractor,
    );
  });

  describe('checkPermission', () => {
    it('should call CheckPermissionInteractor and return its value on success', async () => {
      const input = { userId: 'u1', permission: PERMISSIONS.STUDENT_VIEW };
      mockCheckPermission.mockResolvedValue(Result.ok<{ allowed: boolean }>({ allowed: true }));

      const result = await controller.checkPermission(input);

      expect(mockCheckPermission).toHaveBeenCalledWith(input);
      expect(result).toEqual({ allowed: true });
    });

    it('should throw an error on failure', async () => {
      const input = { userId: 'u1', permission: PERMISSIONS.STUDENT_VIEW };
      mockCheckPermission.mockResolvedValue(Result.fail<{ allowed: boolean }>('Some error'));

      await expect(controller.checkPermission(input)).rejects.toThrow('Some error');
    });

    // Test thêm: Kiểm tra khi interactor trả về null hoặc undefined
    it('should throw error if CheckPermissionInteractor returns null or undefined', async () => {
      const input = { userId: 'u1', permission: PERMISSIONS.STUDENT_VIEW };

      mockCheckPermission.mockResolvedValue(Result.ok<any>(undefined));

      await expect(controller.checkPermission(input)).rejects.toThrow("Cannot get the value of an error result.");
    });

    // Test thêm: Kiểm tra khi interactor ném lỗi bất ngờ
    it('should throw an error when interactor throws an exception', async () => {
      const input = { userId: 'u1', permission: PERMISSIONS.STUDENT_VIEW };

      mockCheckPermission.mockRejectedValue(new Error('Unexpected error'));

      await expect(controller.checkPermission(input)).rejects.toThrow('Unexpected error');
    });
  });

  describe('getUserPermissions', () => {
    it('should call GetUserPermissionsInteractor and return permissions', async () => {
      const input = { userId: 'u1' };
      const expectedPermissions = [PERMISSIONS.STUDENT_VIEW, PERMISSIONS.COURSE_VIEW];
      mockGetUserPermissions.mockResolvedValue(Result.ok<{ permissions: string[] }>({ permissions: expectedPermissions }));

      const result = await controller.getUserPermissions(input);

      expect(mockGetUserPermissions).toHaveBeenCalledWith(input);
      expect(result.permissions).toEqual(expectedPermissions);
    });

    it('should throw error if GetUserPermissionsInteractor returns a failure result', async () => {
      const input = { userId: 'u1' };

      mockGetUserPermissions.mockResolvedValue(Result.fail<{ permissions: string[] }>('Failed to fetch permissions'));

      await expect(controller.getUserPermissions(input)).rejects.toThrow('Failed to fetch permissions');
    });

    // Test thêm: Kiểm tra trường hợp trả về mảng quyền rỗng
    it('should return empty permissions array when user has no permissions', async () => {
      const input = { userId: 'u1' };

      mockGetUserPermissions.mockResolvedValue(Result.ok<{ permissions: string[] }>({ permissions: [] }));

      const result = await controller.getUserPermissions(input);

      expect(result.permissions).toEqual([]);  // Kiểm tra trả về mảng rỗng
    });
  });

  describe('grantPermission', () => {
    it('should call GrantUserPermissionInteractor', async () => {
      const input = { userId: 'u1', permission: PERMISSIONS.STUDENT_EDIT };
      mockGrantPermission.mockResolvedValue(Result.ok<void>());

      await controller.grantPermission(input);

      expect(mockGrantPermission).toHaveBeenCalledWith(input);
    });

    // Test thêm: Kiểm tra khi GrantUserPermissionInteractor trả về lỗi
    it('should throw an error if GrantUserPermissionInteractor returns failure', async () => {
      const input = { userId: 'u1', permission: PERMISSIONS.STUDENT_EDIT };

      mockGrantPermission.mockResolvedValue(Result.fail<void>('Failed to grant permission'));

      await expect(controller.grantPermission(input)).rejects.toThrow('Failed to grant permission');
    });

    // Test thêm: Kiểm tra khi GrantUserPermissionInteractor ném lỗi bất ngờ
    it('should throw an error if GrantUserPermissionInteractor throws an exception', async () => {
      const input = { userId: 'u1', permission: PERMISSIONS.STUDENT_EDIT };

      mockGrantPermission.mockRejectedValue(new Error('Unexpected error'));

      await expect(controller.grantPermission(input)).rejects.toThrow('Unexpected error');
    });
  });

  describe('revokePermission', () => {
    it('should call RevokeUserPermissionInteractor', async () => {
      const input = { userId: 'u1', permission: PERMISSIONS.STUDENT_VIEW };

      mockRevokePermission.mockResolvedValue(Result.ok<void>());

      await controller.revokePermission(input);

      expect(mockRevokePermission).toHaveBeenCalledWith(input);
    });

    // Test thêm: Kiểm tra khi RevokeUserPermissionInteractor trả về lỗi
    it('should throw an error if RevokeUserPermissionInteractor returns failure', async () => {
      const input = { userId: 'u1', permission: PERMISSIONS.STUDENT_VIEW };

      mockRevokePermission.mockResolvedValue(Result.fail<void>('Failed to revoke permission'));

      await expect(controller.revokePermission(input)).rejects.toThrow('Failed to revoke permission');
    });

    // Test thêm: Kiểm tra khi RevokeUserPermissionInteractor ném lỗi bất ngờ
    it('should throw an error if RevokeUserPermissionInteractor throws an exception', async () => {
      const input = { userId: 'u1', permission: PERMISSIONS.STUDENT_VIEW };

      mockRevokePermission.mockRejectedValue(new Error('Unexpected error'));

      await expect(controller.revokePermission(input)).rejects.toThrow('Unexpected error');
    });
  });
});
