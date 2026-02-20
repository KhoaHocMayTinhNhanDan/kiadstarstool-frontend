import { Entity } from '../shared/base/base.entity';
import { Identifier } from '../shared/Identifier.vo';
import { Result } from '../shared/base/result';
import { Enrollment, type EnrollmentProps } from './value-objects/Enrollment.vo';

export interface StudentProps {
  id?: Identifier;
  name: string;
  email: string;
  phone?: string;
  // Global status (ví dụ: tài khoản bị khóa, nợ học phí toàn hệ thống)
  status: 'active' | 'banned' | 'archived'; 
  enrollments: Enrollment[];
}

export class Student extends Entity<Identifier> {
  readonly name: string;
  readonly email: string;
  readonly phone?: string;
  readonly status: 'active' | 'banned' | 'archived';
  
  // Danh sách các lần ghi danh (Lịch sử học tập)
  private _enrollments: Enrollment[];

  private constructor(props: StudentProps) {
    super(props);
    this.name = props.name;
    this.email = props.email;
    this.phone = props.phone;
    this.status = props.status;
    this._enrollments = props.enrollments;
  }

  get enrollments(): Enrollment[] {
    return this._enrollments;
  }

  // Domain Method: Đăng ký vào một lớp/chi nhánh mới
  public enroll(props: EnrollmentProps): Result<void> {
    const enrollmentOrError = Enrollment.create(props);
    if (enrollmentOrError.isFailure) {
      return Result.fail(enrollmentOrError.getErrorValue());
    }
    
    // Logic nghiệp vụ: Kiểm tra xem đã học lớp này chưa (nếu cần)
    const isAlreadyEnrolled = this._enrollments.some(
      e => e.classId === props.classId && e.status === 'active'
    );

    if (isAlreadyEnrolled && props.classId) {
      return Result.fail('Student is already active in this class');
    }

    this._enrollments.push(enrollmentOrError.getValue());
    return Result.ok();
  }

  // Domain Method: Chuyển lớp (Đóng lớp cũ, mở lớp mới)
  public transfer(fromClassId: string, toBranchId: string, toClassId: string, transferDate: Date): Result<void> {
    // 1. Tìm enrollment hiện tại đang active
    const index = this._enrollments.findIndex(e => e.classId === fromClassId && e.status === 'active');
    
    if (index === -1) {
      return Result.fail('Student is not currently active in the source class');
    }

    const current = this._enrollments[index];

    // 2. Đóng enrollment cũ (Status: transferred)
    const closedOrError = Enrollment.create({
      branchId: current.branchId,
      classId: current.classId,
      status: 'transferred',
      joinedDate: current.joinedDate,
      endDate: transferDate
    });

    if (closedOrError.isFailure) return Result.fail(closedOrError.getErrorValue());
    this._enrollments[index] = closedOrError.getValue();

    // 3. Tạo enrollment mới tại lớp đích
    return this.enroll({
      branchId: toBranchId,
      classId: toClassId,
      status: 'active',
      joinedDate: transferDate
    });
  }

  // Helper: Lấy danh sách các chi nhánh đang theo học
  public getActiveBranchIds(): string[] {
    return [...new Set(this._enrollments
      .filter(e => e.status === 'active')
      .map(e => e.branchId))];
  }

  // Domain Method: Cập nhật thông tin enrollment (ví dụ: sau khi điểm danh)
  public updateEnrollment(index: number, enrollment: Enrollment): Result<void> {
    if (index < 0 || index >= this._enrollments.length) return Result.fail('Enrollment index out of bounds');
    this._enrollments[index] = enrollment;
    return Result.ok();
  }

  public static create(props: StudentProps, id?: Identifier): Result<Student> {
    if (!props.name) {
      return Result.fail<Student>('Name is required');
    }
    if (!props.email) {
      return Result.fail<Student>('Email is required');
    }

    return Result.ok<Student>(new Student({ 
      ...props, 
      id: id ?? props.id,
      enrollments: props.enrollments || [] 
    }));
  }
}