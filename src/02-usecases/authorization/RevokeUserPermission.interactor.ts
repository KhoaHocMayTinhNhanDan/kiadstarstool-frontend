class RevokeUserPermissionInteractor {
  constructor(private userRepo: IUserRepository) {}

  async execute(userId: string, permissionCode: string) {
    const user = await this.userRepo.findById(userId);
    const permission = Permission.create(permissionCode);

    if (permission.isFailure) return Result.fail(permission.error);

    user.revokePermission(permission.getValue());
    await this.userRepo.save(user);

    return Result.ok();
  }
}
