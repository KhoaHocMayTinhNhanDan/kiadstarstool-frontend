export interface LogoutInput {
  /**
   * ID của người dùng thực hiện hành động đăng xuất.
   * Cần thiết để ghi lại lịch sử hoạt động.
   */
  userId: string;
  revokeAllSessions?: boolean; // Tùy chọn: Đăng xuất khỏi tất cả thiết bị?
}