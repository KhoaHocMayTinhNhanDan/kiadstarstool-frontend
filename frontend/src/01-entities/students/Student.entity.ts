import { AggregateRoot } from '../shared/base/AggregateRoot';
import { Identifier } from '../shared/value-objects/Identifier.vo';
import { Result } from '../shared/base/result';
import { Enrollment, type EnrollmentProps } from './value-objects/Enrollment.vo';

export interface StudentProps {
  id?: Identifier;
  name: string;
  email: string;
  phone?: string;
  status: 'active' | 'inactive' | 'archived';
  enrollments?: Enrollment[];
}

export class Student extends AggregateRoot<Identifier> {
  private _name: string;
  private _email: string;
  private _phone?: string;
  private _status: 'active' | 'inactive' | 'archived';
  private _enrollments: Enrollment[];

  get name(): string { return this._name; }
  get email(): string { return this._email; }
  get phone(): string | undefined { return this._phone; }
  get status(): 'active' | 'inactive' | 'archived' { return this._status; }
  get enrollments(): Enrollment[] { return this._enrollments; }

  private constructor(props: StudentProps) {
    super(props);
    this._name = props.name;
    this._email = props.email;
    this._phone = props.phone;
    this._status = props.status;
    this._enrollments = props.enrollments || [];
  }

  public static create(props: StudentProps): Result<Student> {
    if (!props.name) {
      return Result.fail<Student>('Student name is required');
    }
    if (!props.email) {
      return Result.fail<Student>('Student email is required');
    }
    
    return Result.ok<Student>(new Student({
      ...props,
      enrollments: props.enrollments || []
    }));
  }

  // --- Domain Logic ---

  /**
   * Ghi danh học viên vào một lớp học.
   * Đây là hành vi nghiệp vụ, nên nằm trong Student Entity.
   */
  public enroll(enrollmentProps: EnrollmentProps): Result<void> {
    // Business Rule: Không cho ghi danh vào lớp đang học (active)
    const isAlreadyEnrolled = this._enrollments.some(
      e => e.classId === enrollmentProps.classId && e.status === 'active'
    );
    if (isAlreadyEnrolled) {
      return Result.fail('Student is already actively enrolled in this class.');
    }

    const enrollmentOrError = Enrollment.create(enrollmentProps);
    if (enrollmentOrError.isFailure) {
      return Result.fail(enrollmentOrError.getErrorValue());
    }

    this._enrollments.push(enrollmentOrError.getValue());
    return Result.ok();
  }

  /**
   * Chuyển lớp cho học viên.
   */
  public transfer(fromClassId: string, toBranchId: string, toClassId: string, transferDate: Date): Result<void> {
    const currentEnrollmentIndex = this._enrollments.findIndex(
      e => e.classId === fromClassId && e.status === 'active'
    );

    if (currentEnrollmentIndex === -1) {
      return Result.fail('Cannot find active enrollment for the "from" class.');
    }

    // 1. Cập nhật enrollment cũ
    const oldEnrollment = this._enrollments[currentEnrollmentIndex];
    const updatedOldEnrollment = Enrollment.create({
      ...oldEnrollment.props,
      status: 'transferred',
      endDate: transferDate
    }).getValue(); // Giả định thành công

    this._enrollments[currentEnrollmentIndex] = updatedOldEnrollment;

    // 2. Tạo enrollment mới
    const newEnrollmentResult = Enrollment.create({
      branchId: toBranchId,
      classId: toClassId,
      status: 'active',
      joinedDate: transferDate
    });

    if (newEnrollmentResult.isFailure) {
      return Result.fail(newEnrollmentResult.getErrorValue());
    }

    this._enrollments.push(newEnrollmentResult.getValue());
    return Result.ok();
  }
}