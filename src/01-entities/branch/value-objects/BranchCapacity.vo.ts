// src/01-entities/business/value-objects/BranchCapacity.vo.ts
export interface BranchCapacityProps {
  totalRooms?: number;
  availableRooms?: number;
  maxStudents?: number;
  currentStudents?: number;
  maxTeachers?: number;
  currentTeachers?: number;
  maxStaff?: number;
  currentStaff?: number;
}

export class BranchCapacity {
  readonly totalRooms: number;
  readonly availableRooms: number;
  readonly maxStudents: number;
  readonly currentStudents: number;
  readonly maxTeachers: number;
  readonly currentTeachers: number;
  readonly maxStaff: number;
  readonly currentStaff: number;

  constructor(props: BranchCapacityProps = {}) {
    this.totalRooms = props.totalRooms ?? 0;
    this.availableRooms = props.availableRooms ?? 0;
    this.maxStudents = props.maxStudents ?? 100;
    this.currentStudents = props.currentStudents ?? 0;
    this.maxTeachers = props.maxTeachers ?? 20;
    this.currentTeachers = props.currentTeachers ?? 0;
    this.maxStaff = props.maxStaff ?? 10;
    this.currentStaff = props.currentStaff ?? 0;
  }

  hasStudentCapacity(): boolean {
    return this.currentStudents < this.maxStudents;
  }

  availableStudentSpots(): number {
    return Math.max(0, this.maxStudents - this.currentStudents);
  }

  studentFillRate(): number {
    return this.maxStudents > 0
      ? Math.round((this.currentStudents / this.maxStudents) * 100)
      : 0;
  }

  addStudent(): BranchCapacity {
    if (!this.hasStudentCapacity()) return this;
    return new BranchCapacity({ ...this, currentStudents: this.currentStudents + 1 });
  }

  removeStudent(): BranchCapacity {
    return new BranchCapacity({
      ...this,
      currentStudents: Math.max(0, this.currentStudents - 1)
    });
  }

  updateTeachers(change: number): BranchCapacity {
    const next = this.currentTeachers + change;
    if (next < 0 || next > this.maxTeachers) return this;
    return new BranchCapacity({ ...this, currentTeachers: next });
  }
}
