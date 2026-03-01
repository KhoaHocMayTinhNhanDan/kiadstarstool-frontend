export type PaymentScheme = 'course' | 'monthly' | 'session';

export interface EnrollStudentInput {
  studentId: string;
  classId: string;
  branchId: string; // Để verify lớp thuộc chi nhánh đúng
  joinedDate?: Date;
  paymentScheme: PaymentScheme; // Bắt buộc chọn hình thức đóng
  quantity?: number; // Số lượng (số tháng hoặc số buổi). Mặc định là 1 (nếu là course/monthly)
  // Có thể override học phí nếu cần (vd: giảm giá), nếu không sẽ lấy giá gốc của lớp
  discountAmount?: number; 
  // prepaidSessions?: number; // Deprecated: Dùng quantity kết hợp paymentScheme='session'
}