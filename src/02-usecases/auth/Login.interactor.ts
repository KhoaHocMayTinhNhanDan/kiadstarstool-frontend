// login/Login.interactor.ts
import  { type LoginInput } from './ports/input/ILoginInput';
import  { type LoginOutput } from './ports/output/ILoginOutput';
import { type IAuthRepository } from './ports/gateways_interface/IAuthRepository';
import { Credentials } from '../../01-entities/auth/Credentials.vo';
import { Result } from '../../01-entities/shared/base/result';

export class LoginInteractor {
  private readonly authRepo: IAuthRepository;

  constructor(authRepo: IAuthRepository) {
    this.authRepo = authRepo;
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
      // TODO: Map session to LoginOutput if needed, or adjust the return type.
      return Result.ok({ token: session.accessToken, refreshToken: session.refreshToken ?? '' });
    } catch (error: any) {
      return Result.fail(error.message || 'An unexpected error occurred during authentication');
    }
  }
}
