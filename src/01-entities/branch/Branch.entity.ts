// src/01-entities/business/Branch.entity.ts
import { Result } from '../shared/base/result';
import { AuditedEntity, type AuditedProps } from '../shared/base/audited.entity';
import { BranchId } from './value-objects/BranchId.vo';
import { BranchAddress } from './value-objects/BranchAddress.vo';
import { BranchCapacity } from './value-objects/BranchCapacity.vo';
import { BranchFinancial } from './value-objects/BranchFinancial.vo';
import { BranchOperatingHours } from './value-objects/BranchOperatingHours.vo';

export interface BranchProps extends AuditedProps {
  id?: BranchId;
  name: string;
  code: string;
  address: BranchAddress;
  capacity: BranchCapacity;
  financial: BranchFinancial;
  operatingHours: BranchOperatingHours;
  isActive?: boolean;
}

export class Branch extends AuditedEntity<BranchId> {
  readonly name: string;
  readonly code: string;
  readonly address: BranchAddress;
  readonly capacity: BranchCapacity;
  readonly financial: BranchFinancial;
  readonly operatingHours: BranchOperatingHours;
  readonly isActive: boolean;

  private constructor(props: BranchProps) {
    super(props);
    this.name = props.name.trim();
    this.code = props.code.trim();
    this.address = props.address;
    this.capacity = props.capacity;
    this.financial = props.financial;
    this.operatingHours = props.operatingHours;
    this.isActive = props.isActive ?? true;
  }

  // ===== Factory =====

  static create(props: BranchProps): Result<Branch> {
    if (!props.name?.trim()) {
      return Result.fail<Branch>('Branch name is required');
    }

    if (!props.code?.trim()) {
      return Result.fail<Branch>('Branch code is required');
    }

    const now = new Date();

    return Result.ok(
      new Branch({
        ...props,
        id: props.id ?? BranchId.create(),
        createdAt: props.createdAt ?? now,
        updatedAt: props.updatedAt ?? now,
      })
    );
  }

  // ===== Domain behavior =====

  addStudent(): Result<Branch> {
    if (!this.capacity.hasStudentCapacity()) {
      return Result.fail<Branch>('Branch is full');
    }

    return Result.ok(
      this.clone({
        capacity: this.capacity.addStudent()
      })
    );
  }

  monthlyProfit(): number {
    return this.financial.monthlyProfit();
  }

  isOpenNow(date: Date = new Date()): boolean {
    if (!this.isActive) return false;
    return this.operatingHours.isOpenAt(date);
  }

  minutesUntilClose(date: Date = new Date()): number {
    return this.operatingHours.minutesUntilClose(date);
  }

  // ===== Clone (SAFE) =====

  clone(overrides: Partial<BranchProps> = {}): Branch {
    return new Branch({
      id: overrides.id ?? this.id,
      name: overrides.name ?? this.name,
      code: overrides.code ?? this.code,
      address: overrides.address ?? this.address,
      capacity: overrides.capacity ?? this.capacity,
      financial: overrides.financial ?? this.financial,
      operatingHours: overrides.operatingHours ?? this.operatingHours,
      isActive: overrides.isActive ?? this.isActive,
      createdAt: overrides.createdAt ?? this.createdAt,
      updatedAt: overrides.updatedAt ?? this.updatedAt,
      createdBy: overrides.createdBy ?? this.createdBy,
      updatedBy: overrides.updatedBy ?? this.updatedBy,
    });
  }
}
