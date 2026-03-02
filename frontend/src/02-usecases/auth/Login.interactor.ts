// login/Login.interactor.ts
import  { type LoginInput } from './ports/input/ILoginInput';
import  { type LoginOutput } from './ports/output/ILoginOutput';
import { type IAuthRepository } from './ports/gateways_interface/IAuthRepository';
import { Credentials } from '../../01-entities/auth/value-objects/Credentials.vo';
import { Result } from '../../01-entities/shared/base/result';
import { RecordActivityInteractor } from '../activity/RecordActivity.interactor';

export class LoginInteractor {
  private readonly authRepo: IAuthRepository;
  private readonly recordActivityInteractor: RecordActivityInteractor;

  constructor(authRepo: IAuthRepository, recordActivityInteractor: RecordActivityInteractor) {
    this.authRepo = authRepo;
    this.recordActivityInteractor = recordActivityInteractor;
  }

  async execute(input: LoginInput): Promise<Result<LoginOutput>> {
    const credentialsResult = Credentials.create(
      input.username_or_email,
      input.password,
    );

    if (credentialsResult.isFailure) {
      return Result.fail(credentialsResult.getErrorValue());
    }

    const credentials = credentialsResult.getValue();

    try {
      const authSessionResult = await this.authRepo.authenticate(credentials);

      if (authSessionResult.isFailure) {
        return Result.fail(authSessionResult.getErrorValue());
      }

      const session = authSessionResult.getValue();

      // Ghi lại lịch sử đăng nhập
      await this.recordActivityInteractor.execute({
        userId: session.userId,
        type: 'auth_login',
        description: 'Đăng nhập vào hệ thống',
      });

      return Result.ok({ token: session.accessToken, refreshToken: session.refreshToken ?? '' });
    } catch (error: any) {
      return Result.fail(error.message || 'An unexpected error occurred during authentication');
    }
  }
}
