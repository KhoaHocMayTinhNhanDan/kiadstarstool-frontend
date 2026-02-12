import { type LoginOutput } from '@/02-usecases/auth/ports/output/ILoginOutput';

export class AuthPresenter {
  present(output: LoginOutput) {
    return {
      // LoginOutput hiện tại chỉ chứa token.
      // Các thông tin user (id, roles...) sẽ được decode từ token ở tầng UI (AuthContext).
      // Presenter này hiện tại chỉ đóng vai trò chuyển đổi tên trường (nếu cần).
      accessToken: output.token,
      refreshToken: output.refreshToken,
    };
  }
}