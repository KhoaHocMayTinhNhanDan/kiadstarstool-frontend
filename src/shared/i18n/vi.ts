// src/shared/i18n/vi.ts
import { en } from './en'

export const vi: Record<keyof typeof en, string> = {
  'app.title': 'Quản lý học sinh',
  'auth.login': 'Đăng nhập',
  'auth.logout': 'Đăng xuất',
  'auth.email': 'Email',
  'auth.backToLogin': 'Quay lại đăng nhập',
  'auth.forgotPassword.title': 'Quên mật khẩu?',
  'auth.forgotPassword.description': 'Nhập email của bạn và chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu.',
  'auth.forgotPassword.submit': 'Gửi liên kết',
  'auth.validation.emailRequired': 'Vui lòng nhập email',
  'auth.validation.emailInvalid': 'Email không hợp lệ',
  'user.name': 'Tên người dùng',
  'error.UNKNOWN': 'Đã xảy ra lỗi',
  'loadingSpinner.defaultLabel': 'Đang tải...',
  'loadingSpinner.loading': 'Đang tải...',
  'switch.on': 'Bật',
  'switch.off': 'Tắt',
  'switch.required': 'Bắt buộc',
  'switch.test.themes.purple': 'Tím',
  'switch.test.themes.emerald': 'Ngọc lục bảo',
  'switch.test.themes.rose': 'Hồng',
  'switch.test.description': 'Đây là một thành phần công tắc được sử dụng để chuyển đổi cài đặt bật và tắt.',
  'switch.test.darkMode': 'chế độ sáng/tối'
}
