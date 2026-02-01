import { type LoginOutput } from '@/02-usecases/auth/login/Login.output';

export class AuthPresenter {
  present(output: LoginOutput) {
    return {
      user: {
        id: output.userId,
        displayName: output.displayName,
        // FIX: LoginOutput chỉ trả về 'role' (string).
        // Ta bọc nó vào mảng [role] để Frontend nhận được 'roles' (string[])
        // giúp đồng bộ với cấu trúc AuthIdentity hoặc JWT claims.
        roles: [output.role],
        permissions: output.permissions,
      },
      accessToken: output.accessToken,
      refreshToken: output.refreshToken,
    };
  }
}