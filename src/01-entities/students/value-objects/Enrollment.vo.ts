// src/01-entities/students/value-objects/Enrollment.vo.ts
import { ValueObject } from '../../shared/base/ValueObject';
import { Result } from '../../shared/base/result';

export interface EnrollmentProps {
  branchId: string;
  classId?: string; // Có thể null nếu học viên chỉ mới đăng ký vào chi nhánh mà chưa xếp lớp
  status: 'active' | 'inactive' | 'completed' | 'dropped' | 'transferred';
  joinedDate: Date;
  endDate?: Date;
}

export class Enrollment extends ValueObject<EnrollmentProps> {
  get branchId(): string {
    return this.props.branchId;
  }

  get classId(): string | undefined {
    return this.props.classId;
  }

  get status(): string {
    return this.props.status;
  }

  get joinedDate(): Date {
    return this.props.joinedDate;
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
    return Result.ok<Enrollment>(new Enrollment(props));
  }
}
