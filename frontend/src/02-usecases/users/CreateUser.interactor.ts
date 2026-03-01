import { Result } from '@/01-entities/shared/base/result';
import { User } from '@/01-entities/users/User.entity';
import { UserId } from '@/01-entities/users/base/UserId.vo';
import { UserRole } from '@/01-entities/users/base/UserRole.vo';
import { UserPermissions } from '@/01-entities/users/base/UserPermissions.vo';
import { PhoneNumber } from '@/01-entities/shared/base/PhoneNumber.vo';
import { AdminProfile } from '@/01-entities/users/archetypes/admin/AdminProfile.vo';
import { TeacherProfile } from '@/01-entities/users/archetypes/teacher/TeacherProfile.vo';
import { StaffProfile } from '@/01-entities/users/archetypes/staff/StaffProfile.vo';
import { type IUserRepository } from './ports/gateways_interface/IUserRepository';
import { ROLE_PRESETS, buildRolePermissions } from '@/shared/constants/authorization/auth.policy';
import { type IUserProfile } from '@/01-entities/users/base/IUserProfile.vo';

export interface CreateUserInput {
  id: string; // ID từ Auth System (Firebase UID)
  email: string;
  displayName: string;
  role: string;
  photoURL?: string;
  phone?: string;
}

export class CreateUserInteractor {
  private readonly userRepo: IUserRepository;

  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo;
  }


  async execute(input: CreateUserInput): Promise<Result<void>> {
    try {
      // 1. Validate Role
      const roleResult = UserRole.create(input.role);
      if (roleResult.isFailure) return Result.fail(roleResult.getErrorValue());
      const role = roleResult.getValue();

      // 2. Create Profile based on Role
      let profile: IUserProfile;
      const phoneNumbers = input.phone ? [PhoneNumber.create(input.phone)] : [];

      switch (input.role) {
        case 'admin':
          profile = new AdminProfile({
            displayName: input.displayName,
            photoURL: input.photoURL,
            phoneNumbers,
            adminLevel: 1, // Default
          });
          break;
        case 'teacher':
          profile = new TeacherProfile({
            displayName: input.displayName,
            photoURL: input.photoURL,
            phoneNumbers,
          });
          break;
        case 'staff':
          profile = new StaffProfile({
            displayName: input.displayName,
            photoURL: input.photoURL,
            phoneNumbers,
          });
          break;
        default:
          return Result.fail(`Unsupported role for user creation: ${input.role}`);
      }

      // 3. Create User Entity
      // Lấy quyền mặc định từ Policy
      const defaultPermissions = buildRolePermissions(role.value);
      
      const user = User.create({
        id: UserId.create(input.id),
        email: input.email,
        role: role,
        profile: profile,
        permissions: UserPermissions.create(defaultPermissions).getValue(),
        isActive: true
      });

      // 4. Save to Repo
      await this.userRepo.save(user);

      return Result.ok();
    } catch (error: any) {
      console.error('[CreateUserInteractor]', error);
      return Result.fail(error.message || 'Failed to create user in database');
    }
  }
}
