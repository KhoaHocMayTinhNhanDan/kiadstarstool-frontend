import { Result } from '../shared/base/result';
import { AuditedEntity, type AuditedProps } from '../shared/base/audited.entity';
import { ClassId } from './value-objects/ClassId.vo';
import { BranchId } from '../branch/value-objects/BranchId.vo';
import { ClassStatus } from './ClassStatus.enum';

export interface ClassProps extends AuditedProps {
  id?: ClassId;
  branchId: BranchId; // Reference to the parent Branch
  name: string;
  code: string;
  status?: ClassStatus;
  startDate?: Date;
  endDate?: Date;
  maxStudents: number;
  currentStudents?: number;
}

export class Class extends AuditedEntity<ClassId> {
  readonly branchId: BranchId;
  readonly name: string;
  readonly code: string;
  readonly status: ClassStatus;
  readonly startDate?: Date;
  readonly endDate?: Date;
  readonly maxStudents: number;
  readonly currentStudents: number;

  private constructor(props: ClassProps) {
    super(props);
    this.branchId = props.branchId;
    this.name = props.name;
    this.code = props.code;
    this.status = props.status ?? ClassStatus.PLANNED;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.maxStudents = props.maxStudents;
    this.currentStudents = props.currentStudents ?? 0;
  }

  static create(props: ClassProps): Result<Class> {
    if (!props.name?.trim()) {
      return Result.fail<Class>('Class name is required');
    }
    if (!props.code?.trim()) {
      return Result.fail<Class>('Class code is required');
    }
    if (props.maxStudents < 0) {
      return Result.fail<Class>('Max students cannot be negative');
    }

    const now = new Date();

    return Result.ok(
      new Class({
        ...props,
        id: props.id ?? ClassId.create(),
        status: props.status ?? ClassStatus.PLANNED,
        currentStudents: props.currentStudents ?? 0,
        createdAt: props.createdAt ?? now,
        updatedAt: props.updatedAt ?? now,
      })
    );
  }

  // ===== Domain Behaviors =====

  updateInfo(name: string, code: string, maxStudents: number): Result<Class> {
    if (!name?.trim()) return Result.fail('Class name is required');
    if (!code?.trim()) return Result.fail('Class code is required');
    if (maxStudents < this.currentStudents) {
      return Result.fail('Max students cannot be less than current students');
    }
    
    return Result.ok(this.clone({ name, code, maxStudents, updatedAt: new Date() }));
  }

  start(): Result<Class> {
    if (this.status !== ClassStatus.PLANNED) {
      return Result.fail('Only planned classes can be started');
    }
    return Result.ok(this.clone({ status: ClassStatus.ACTIVE, startDate: new Date(), updatedAt: new Date() }));
  }

  complete(): Result<Class> {
    if (this.status !== ClassStatus.ACTIVE) {
      return Result.fail('Only active classes can be completed');
    }
    return Result.ok(this.clone({ status: ClassStatus.COMPLETED, endDate: new Date(), updatedAt: new Date() }));
  }

  cancel(): Result<Class> {
    if (this.status === ClassStatus.COMPLETED) {
      return Result.fail('Cannot cancel completed classes');
    }
    return Result.ok(this.clone({ status: ClassStatus.CANCELLED, updatedAt: new Date() }));
  }

  // ===== Clone (Immutable) =====

  private clone(overrides: Partial<ClassProps> = {}): Class {
    return new Class({
      id: this.id,
      branchId: this.branchId,
      name: this.name,
      code: this.code,
      status: this.status,
      startDate: this.startDate,
      endDate: this.endDate,
      maxStudents: this.maxStudents,
      currentStudents: this.currentStudents,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy,
      ...overrides,
    });
  }
}