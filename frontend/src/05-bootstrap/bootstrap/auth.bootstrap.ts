import { AuthRepository } from '@/03-interface-adapters/gateways/inbound/repositories/AuthRepository'
import { UserRepository } from '@/03-interface-adapters/gateways/inbound/repositories/UserRepository'

import type { IAuthAuthentication } from '@/03-interface-adapters/gateways/outbound/device_interfaces/auth/IAuthAuthentication'
import type { IAuthAccountManagement } from '@/03-interface-adapters/gateways/outbound/device_interfaces/auth/IAuthAccountManagement'
import type { IAuthSession } from '@/03-interface-adapters/gateways/outbound/device_interfaces/auth/IAuthSession'

import { AuthPresenter } from '@/03-interface-adapters/presenters/auth/Auth.presenter'

import { LoginInteractor } from '@/02-usecases/auth/Login.interactor'
import { LogoutInteractor } from '@/02-usecases/auth/Logout.interactor'

import { AuthController } from '@/03-interface-adapters/controllers/Auth.controller'

import { CheckPermissionInteractor } from '@/02-usecases/authorization/CheckPermission.interactor'
import { GetUserPermissionsInteractor } from '@/02-usecases/authorization/GetUserPermissions.interactor'
import { GrantUserPermissionInteractor } from '@/02-usecases/authorization/GrantUserPermission.interactor'
import { RevokeUserPermissionInteractor } from '@/02-usecases/authorization/RevokeUserPermission.interactor'

import { AuthorizationController } from '@/03-interface-adapters/controllers/Authorization.controller'

import type { RecordActivityInteractor } from '@/02-usecases/activity/RecordActivity.interactor'

export function bootstrapAuth(
  authDriver: IAuthAuthentication & IAuthAccountManagement & IAuthSession,
  recordActivityInteractor: RecordActivityInteractor,
  userRepository: UserRepository
) {
  const authRepository = new AuthRepository(authDriver)

  const authPresenter = new AuthPresenter()

  authDriver.onAuthStateChanged((userIdentity) => {
    authPresenter.setUser(userIdentity)
  })

  const loginInteractor = new LoginInteractor(
    authRepository,
    recordActivityInteractor
  )

  const logoutInteractor = new LogoutInteractor(
    authRepository,
    recordActivityInteractor
  )

  const authController = new AuthController(
    loginInteractor,
    logoutInteractor
  )

  const checkPermissionInteractor =
    new CheckPermissionInteractor(userRepository)

  const getUserPermissionsInteractor =
    new GetUserPermissionsInteractor(userRepository)

  const grantUserPermissionInteractor =
    new GrantUserPermissionInteractor(userRepository)

  const revokeUserPermissionInteractor =
    new RevokeUserPermissionInteractor(userRepository)

  const authorizationController = new AuthorizationController(
    checkPermissionInteractor,
    getUserPermissionsInteractor,
    grantUserPermissionInteractor,
    revokeUserPermissionInteractor
  )

  return {
    authRepository,
    authPresenter,
    loginInteractor,
    logoutInteractor,
    authController,
    authorizationController,
  }
}