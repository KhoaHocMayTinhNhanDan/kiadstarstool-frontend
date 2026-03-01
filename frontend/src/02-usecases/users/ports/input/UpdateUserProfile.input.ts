export interface UpdateUserProfileInput {
  userId: string;
  displayName?: string;
  photoURL?: string;
  phone?: string;
  // Có thể mở rộng thêm các trường khác tùy theo loại profile (Admin/Staff/Teacher)
}