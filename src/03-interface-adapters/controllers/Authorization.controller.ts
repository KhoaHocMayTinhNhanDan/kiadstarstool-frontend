import { CheckPermissionInteractor } from '../../02-usecases/authorization/CheckPermission.interactor';
import { GetUserPermissionsInteractor } from '../../02-usecases/authorization/GetUserPermissions.interactor';
import { GrantUserPermissionInteractor } from '../../02-usecases/authorization/GrantUserPermission.interactor';
import { RevokeUserPermissionInteractor } from '../../02-usecases/authorization/RevokeUserPermission.interactor';
import { type PermissionCode } from '../../shared/constants/authorization/auth.domain';

/**
 * Controller for authorization-related tasks.
 * This acts as a facade over the authorization use cases.
 */
export class AuthorizationController {
  private readonly checkPermissionInteractor: CheckPermissionInteractor;
  private readonly getUserPermissionsInteractor: GetUserPermissionsInteractor;
  private readonly grantUserPermissionInteractor: GrantUserPermissionInteractor;
  private readonly revokeUserPermissionInteractor: RevokeUserPermissionInteractor;

  constructor(
    checkPermissionInteractor: CheckPermissionInteractor,
    getUserPermissionsInteractor: GetUserPermissionsInteractor,
    grantUserPermissionInteractor: GrantUserPermissionInteractor,
    revokeUserPermissionInteractor: RevokeUserPermissionInteractor,
  ) {
    this.checkPermissionInteractor = checkPermissionInteractor;
    this.getUserPermissionsInteractor = getUserPermissionsInteractor;
    this.grantUserPermissionInteractor = grantUserPermissionInteractor;
    this.revokeUserPermissionInteractor = revokeUserPermissionInteractor;
  }

  async checkPermission(input: { userId: string; permission: PermissionCode }) {
    const result = await this.checkPermissionInteractor.execute(input);
    if (result.isFailure) {
      // In a real app, you'd return an HTTP error response
      throw new Error(String(result.getErrorValue()));
    }
    return result.getValue();
  }

  async getUserPermissions(input: { userId: string }) {
    const result = await this.getUserPermissionsInteractor.execute(input);
    if (result.isFailure) {
      throw new Error(String(result.getErrorValue()));
    }
    return result.getValue();
  }

  async grantPermission(input: { userId: string; permission: PermissionCode }) {
    const result = await this.grantUserPermissionInteractor.execute(input);
    if (result.isFailure) {
      throw new Error(String(result.getErrorValue()));
    }
  }

  async revokePermission(input: { userId:string; permission: PermissionCode }) {
    const result = await this.revokeUserPermissionInteractor.execute(input);
    if (result.isFailure) {
      throw new Error(String(result.getErrorValue()));
    }
  }
}