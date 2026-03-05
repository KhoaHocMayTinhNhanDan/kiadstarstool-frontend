// src/01-entities/students/value-objects/Enrollment.vo.ts
import { ValueObject } from '../../shared/value-objects/ValueObject';
import { Result } from '../../shared/base/result';

export type PaymentStatus = 'paid' | 'unpaid' | 'partial' | 'waived'; // waived = miễn học phí

export const ENROLLMENT_DEFAULTS = {
  SESSIONS_PER_MONTH: 10,
  SESSIONS_PER_COURSE: 30
};

export interface EnrollmentProps {
  branchId: string;
  classId?: string; // Có thể null nếu học viên chỉ mới đăng ký vào chi nhánh mà chưa xếp lớp
  status: 'active' | 'inactive' | 'completed' | 'dropped' | 'transferred';
  joinedDate: Date;
  endDate?: Date;
  tuitionAmount?: number; // Số tiền thực tế phải trả cho lần ghi danh này (có thể khác giá gốc)
  paidAmount?: number;    // Số tiền đã thanh toán
  paymentStatus?: PaymentStatus; // Trạng thái thanh toán
  
  // Hỗ trợ trả theo buổi (Prepaid)
  prepaidSessions?: number; // Tổng số buổi đã mua (VD: 10 buổi)
  usedSessions?: number;    // Số buổi đã học (VD: 2 buổi)
}

export class Enrollment extends ValueObject<EnrollmentProps> {
  get branchId(): string {
    return this.props.branchId;
  }

  get classId(): string | undefined {
    return this.props.classId;
  }

  get status(): 'active' | 'inactive' | 'completed' | 'dropped' | 'transferred' {
    return this.props.status;
  }

  get joinedDate(): Date {
    return this.props.joinedDate;
  }

  get endDate(): Date | undefined {
    return this.props.endDate;
  }

  get tuitionAmount(): number | undefined {
    return this.props.tuitionAmount;
  }

  get paidAmount(): number {
    return this.props.paidAmount || 0;
  }

  get paymentStatus(): PaymentStatus | undefined {
    return this.props.paymentStatus;
  }

  get prepaidSessions(): number {
    return this.props.prepaidSessions || 0;
  }

  get usedSessions(): number {
    return this.props.usedSessions || 0;
  }

  private constructor(props: EnrollmentProps) {
    super(props);
  }

  public static create(props: EnrollmentProps): Result<Enrollment> {
    if (!props.branchId) {
      return Result.fail<Enrollment>('Branch ID is required for enrollment');
    }
    if (!props.joinedDate) {
      return Result.fail<Enrollment>('Joined Date is required');
    }
    return Result.ok<Enrollment>(new Enrollment({
      ...props,
      tuitionAmount: props.tuitionAmount ?? 0,
      paidAmount: props.paidAmount ?? 0,
      paymentStatus: props.paymentStatus ?? 'unpaid',
      prepaidSessions: props.prepaidSessions ?? 0,
      usedSessions: props.usedSessions ?? 0
    }));
  }

  // Domain Method: Nạp thêm buổi học (Top-up)
  public addSessions(count: number, amountPaid: number): Result<Enrollment> {
    return Enrollment.create({
      ...this.props,
      prepaidSessions: (this.props.prepaidSessions || 0) + count,
      tuitionAmount: (this.props.tuitionAmount || 0) + amountPaid
    });
  }

  // Domain Method: Trừ buổi học (khi điểm danh)
  public consumeSession(): Result<Enrollment> {
    return Enrollment.create({
      ...this.props,
      usedSessions: (this.props.usedSessions || 0) + 1
    });
  }

  // Domain Method: Hoàn lại buổi học (khi sửa điểm danh từ Có mặt -> Vắng)
  public refundSession(): Result<Enrollment> {
    return Enrollment.create({
      ...this.props,
      usedSessions: Math.max(0, (this.props.usedSessions || 0) - 1)
    });
  }

  public toJSON() {
    return {
      branchId: this.branchId,
      classId: this.classId,
      status: this.status,
      joinedDate: this.joinedDate.toISOString(),
      endDate: this.endDate ? this.endDate.toISOString() : undefined,
      tuitionAmount: this.tuitionAmount,
      paidAmount: this.paidAmount,
      paymentStatus: this.paymentStatus,
      prepaidSessions: this.prepaidSessions,
      usedSessions: this.usedSessions
    };
  }
}
