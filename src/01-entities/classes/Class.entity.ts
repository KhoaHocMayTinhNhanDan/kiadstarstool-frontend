import { Entity } from '../shared/base/base.entity';
import { Identifier } from '../shared/Identifier.vo';
import { Result } from '../shared/base/result';
import { BranchId } from '../branch/value-objects/BranchId.vo';
import { ClassId } from './value-objects/ClassId.vo';
import { ClassStatus } from './ClassStatus.enum';
import { type ClassSession, DAY_MAP } from './ClassSession';

export interface ClassProps {
  id?: ClassId;
  branchId: BranchId;
  name: string;
  code: string;
  status: ClassStatus;
  maxStudents: number;
  currentStudents: number;
  startDate: Date;
  endDate?: Date;
  sessions: ClassSession[];
  teacherName?: string;
}

export class Class extends Entity<ClassId> {
  private _branchId: BranchId;
  private _name: string;
  private _code: string;
  private _status: ClassStatus;
  private _maxStudents: number;
  private _currentStudents: number;
  private _startDate: Date;
  private _endDate?: Date;
  private _sessions: ClassSession[];
  private _teacherName?: string;

  get branchId(): BranchId { return this._branchId; }
  get name(): string { return this._name; }
  get code(): string { return this._code; }
  
  // Logic tự động tính trạng thái dựa trên ngày tháng
  get status(): ClassStatus {
    const now = new Date();
    // 1. Nếu đã quá ngày kết thúc -> Completed
    if (this._endDate && now > this._endDate) {
      return ClassStatus.COMPLETED;
    }
    // 2. Nếu chưa đến ngày bắt đầu -> Planned
    if (now < this._startDate) {
      return ClassStatus.PLANNED;
    }
    // 3. Còn lại trả về trạng thái đã lưu (cho phép admin hủy/đóng lớp thủ công)
    return this._status;
  }

  get maxStudents(): number { return this._maxStudents; }
  get currentStudents(): number { return this._currentStudents; }
  get startDate(): Date { return this._startDate; }
  get endDate(): Date | undefined { return this._endDate; }
  get sessions(): ClassSession[] { return this._sessions; }
  get teacherName(): string | undefined { return this._teacherName; }

  // Computed property: Tự động tạo chuỗi hiển thị từ sessions
  get schedule(): string {
    if (!this._sessions || this._sessions.length === 0) return 'Chưa có lịch';
    const days = this._sessions.map(s => DAY_MAP[s.day]).join('-');
    const time = `${this._sessions[0].startTime}-${this._sessions[0].endTime}`;
    return `${days} (${time})`;
  }

  private constructor(props: ClassProps) {
    super(props);
    this._branchId = props.branchId;
    this._name = props.name;
    this._code = props.code;
    this._status = props.status;
    this._maxStudents = props.maxStudents;
    this._currentStudents = props.currentStudents;
    this._startDate = props.startDate;
    this._endDate = props.endDate;
    this._sessions = props.sessions;
    this._teacherName = props.teacherName;
  }

  public static create(props: ClassProps): Result<Class> {
    if (!props.name) {
      return Result.fail<Class>('Class name is required');
    }
    if (!props.branchId) {
      return Result.fail<Class>('Branch ID is required');
    }
    
    return Result.ok<Class>(new Class({
      ...props,
      sessions: props.sessions || [],
      currentStudents: props.currentStudents || 0
    }));
  }

  public updateInfo(props: Partial<ClassProps>): Result<void> {
    if (props.name !== undefined) this._name = props.name;
    if (props.code !== undefined) this._code = props.code;
    if (props.maxStudents !== undefined) this._maxStudents = props.maxStudents;
    if (props.currentStudents !== undefined) this._currentStudents = props.currentStudents;
    if (props.status !== undefined) this._status = props.status;
    if (props.sessions !== undefined) this._sessions = props.sessions;
    if (props.teacherName !== undefined) this._teacherName = props.teacherName;
    return Result.ok();
  }
}