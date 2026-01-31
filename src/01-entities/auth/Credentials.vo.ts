import { Result } from '../shared/base/result';
import { ValueObject } from '../shared/base/ValueObject';
import { AuthError } from '../errors/AuthError';

interface CredentialsProps {
  username: string;
  password: string;
}

export class Credentials extends ValueObject<CredentialsProps> {
  private constructor(props: CredentialsProps) {
    super(props);
  }

  get username(): string {
    return this.props.username;
  }

  get password(): string {
    return this.props.password;
  }

  public static create(username: string, password: string): Result<Credentials> {
    // Validate Username
    if (!username || username.trim().length === 0) {
      return Result.fail<Credentials>(AuthError.invalidCredentials().message);
    }

    // Validate Password
    if (!password || password.trim().length === 0) {
      return Result.fail<Credentials>(AuthError.invalidCredentials().message);
    }

    // Return valid object
    return Result.ok<Credentials>(new Credentials({ username: username.trim(), password }));
  }
}