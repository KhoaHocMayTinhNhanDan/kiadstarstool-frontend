import { Result } from '@/01-entities/shared/base/result'
import { Permission } from '@/01-entities/users/base/Permission.vo'
import { type IUserRepository } from '@/02-usecases/ports/repositories/IUserRepository'


export interface CheckPermissionRequest {
  userId: string
  permission: string
}

export interface CheckPermissionResponse {
  allowed: boolean
  reason?: string
}

export class CheckPermissionInteractor {
  private readonly userRepository: IUserRepository
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }


  public async execute(
    request: CheckPermissionRequest
  ): Promise<Result<CheckPermissionResponse>> {
    const { userId, permission: permissionStr } = request

    // 1. Validate Permission format
    const permissionResult = Permission.create(permissionStr)
    if (permissionResult.isFailure) {
      return Result.fail<CheckPermissionResponse>(`Invalid permission format: ${permissionResult.getErrorValue()}`)
    }
    const requiredPermission = permissionResult.getValue()

    // 2. Get User
    try {
      const user = await this.userRepository.getById(userId)
      
      if (!user) {
        return Result.fail<CheckPermissionResponse>('User not found')
      }

      // 3. Check Logic (Delegated to Domain Entity)
      const isAllowed = user.hasPermission(requiredPermission)

      return Result.ok({ allowed: isAllowed })

    } catch (error) {
      console.error('[CheckPermissionInteractor] Error:', error)
      return Result.fail<CheckPermissionResponse>('Internal server error')
    }
  }
}