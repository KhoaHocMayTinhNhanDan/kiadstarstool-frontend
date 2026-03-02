import { ValueObject } from '../../shared/value-objects/ValueObject';

export interface BranchCapacityProps {
  totalRooms: number;
  availableRooms: number;
  maxStudents: number;
  currentStudents: number;
  maxTeachers: number;
  currentTeachers: number;
  maxStaff: number;
  currentStaff: number;
}

export class BranchCapacity extends ValueObject<BranchCapacityProps> {
  private constructor(props: BranchCapacityProps) {
    super(props);
  }

  static create(props: Partial<BranchCapacityProps> = {}): BranchCapacity {
    return new BranchCapacity({
      totalRooms: Math.max(0, props.totalRooms ?? 0),
      availableRooms: Math.max(0, props.availableRooms ?? 0),
      maxStudents: Math.max(0, props.maxStudents ?? 100),
      currentStudents: Math.max(0, props.currentStudents ?? 0),
      maxTeachers: Math.max(0, props.maxTeachers ?? 20),
      currentTeachers: Math.max(0, props.currentTeachers ?? 0),
      maxStaff: Math.max(0, props.maxStaff ?? 10),
      currentStaff: Math.max(0, props.currentStaff ?? 0),
    });
  }

  hasStudentCapacity(): boolean {
    return this.props.currentStudents < this.props.maxStudents;
  }

  addStudent(): BranchCapacity {
    if (!this.hasStudentCapacity()) return this;
    return new BranchCapacity({
      ...this.props,
      currentStudents: this.props.currentStudents + 1
    });
  }

  get currentStudents(): number { return this.props.currentStudents; }
  get maxStudents(): number { return this.props.maxStudents; }
  get currentTeachers(): number { return this.props.currentTeachers; }
  get maxTeachers(): number { return this.props.maxTeachers; }
}