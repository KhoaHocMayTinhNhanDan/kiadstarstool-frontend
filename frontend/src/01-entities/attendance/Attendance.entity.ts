// 01-entities/business/Attendance/Attendance.entity.ts
import { AuditedEntity, type AuditedProps } from '../shared/base/audited.entity';
import {
  ATTENDANCE_STATUS,
  type AttendanceStatus
} from '../../shared/constants/classes.constant';

import { AttendanceTime } from './value-objects/AttendanceTime.vo';
import { AttendanceScore } from './value-objects/AttendanceScore.vo';
import { AttendanceFlags } from './value-objects/AttendanceFlags.vo';
import { AttendanceMetadata } from './value-objects/AttendanceMetadata.vo';
import { Identifier } from '../shared/Identifier.vo';

export interface AttendanceProps extends AuditedProps {
  courseId: string;
  studentId: string;
  session: string;
  date: string;

  time?: AttendanceTime;
  score?: AttendanceScore;
  attendanceStatus?: AttendanceStatus;
  flags?: AttendanceFlags;
  metadata?: AttendanceMetadata;
  createdBy?: Identifier;
  updatedBy?: Identifier;
}

export interface AttendanceJSON {
  id: string;
  courseId: string;
  studentId: string;
  session: string;
  date: string;
  attendanceStatus: AttendanceStatus;
  time: ReturnType<AttendanceTime['toJSON']>;
  score: ReturnType<AttendanceScore['toJSON']>;
  flags: ReturnType<AttendanceFlags['toJSON']>;
  metadata: ReturnType<AttendanceMetadata['toJSON']>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export class Attendance extends AuditedEntity<Identifier> {
  readonly courseId: string;
  readonly studentId: string;
  readonly session: string;
  readonly date: string;

  // Use private fields for mutable properties and expose getters
  private _time: AttendanceTime;
  private _score: AttendanceScore;
  private _attendanceStatus: AttendanceStatus;
  private _flags: AttendanceFlags;
  private _metadata: AttendanceMetadata;

  // Public getters
  get time(): AttendanceTime { return this._time; }
  get score(): AttendanceScore { return this._score; }
  get attendanceStatus(): AttendanceStatus { return this._attendanceStatus; }
  get flags(): AttendanceFlags { return this._flags; }
  get metadata(): AttendanceMetadata { return this._metadata; }

  constructor(props: AttendanceProps) {
    // Pass all props to the base constructor, including audit fields
    super({
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    });

    this.courseId = props.courseId;
    this.studentId = props.studentId;
    this.session = props.session;
    this.date = props.date;

    // Initialize internal state
    this._time = props.time ?? AttendanceTime.createDefault();
    this._score = props.score ?? AttendanceScore.zero();
    this._flags = props.flags ?? AttendanceFlags.initial();
    this._metadata = props.metadata ?? AttendanceMetadata.empty();
    this._attendanceStatus = props.attendanceStatus ?? ATTENDANCE_STATUS.PRESENT;
  }

  // ===== Factory methods =====

  static create(props: AttendanceProps): Attendance {
    return new Attendance(props);
  }

  static createFromJSON(data: AttendanceJSON): Attendance {
    return new Attendance({
      id: Identifier.create(data.id),
      courseId: data.courseId,
      studentId: data.studentId,
      session: data.session,
      date: data.date,
      attendanceStatus: data.attendanceStatus,
      time: AttendanceTime.fromJSON(data.time),
      score: AttendanceScore.fromJSON(data.score),
      flags: AttendanceFlags.fromJSON(data.flags),
      metadata: AttendanceMetadata.fromJSON(data.metadata),
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
      createdBy: data.createdBy ? Identifier.create(data.createdBy) : undefined,
      updatedBy: data.updatedBy ? Identifier.create(data.updatedBy) : undefined,
    });
  }

  // ===== Domain behaviors =====

  checkIn(at: string = new Date().toISOString()): this {
    this._time = this._time.checkIn(at);
    
    // Cải tiến: checkIn chỉ ghi nhận thời gian và cờ (flag), không tự động đổi status.
    // Việc quyết định status (PRESENT hay LATE) sẽ do UseCase hoặc một method khác đảm nhiệm.
    if (this._time.isLate()) {
      this._flags = this._flags.markLate();
    }

    return this;
  }

  checkOut(at: string = new Date().toISOString()): this {
    this._time = this._time.checkOut(at);

    if (this._time.isEarlyLeave()) {
      this._flags = this._flags.markEarlyLeave();
    }

    return this;
  }

  markAbsent(reason = '', excused = false): this {
    this._attendanceStatus = excused
      ? ATTENDANCE_STATUS.EXCUSED
      : ATTENDANCE_STATUS.ABSENT;

    this._flags = this._flags.markExcused(excused);
    this._metadata = this._metadata.withAbsentReason(reason);
    this._score = AttendanceScore.zero();

    return this;
  }

  updateScore(rawScore: number): this {
    this._score = AttendanceScore.fromRaw(rawScore, this._time);
    return this;
  }

  // ===== Queries =====

  isPresent(): boolean {
    return (
      this._attendanceStatus === ATTENDANCE_STATUS.PRESENT ||
      this._attendanceStatus === ATTENDANCE_STATUS.LATE
    );
  }

  isLate(): boolean {
    return this._attendanceStatus === ATTENDANCE_STATUS.LATE;
  }

  isAbsent(): boolean {
    return (
      this._attendanceStatus === ATTENDANCE_STATUS.ABSENT ||
      this._attendanceStatus === ATTENDANCE_STATUS.EXCUSED
    );
  }

  getScore(): number {
    return this._score.value;
  }

  // ===== Builder pattern =====

  withTime(time: AttendanceTime): this {
    this._time = time;
    return this;
  }

  withScore(score: AttendanceScore): this {
    this._score = score;
    return this;
  }

  withStatus(status: AttendanceStatus): this {
    this._attendanceStatus = status;
    return this;
  }

  // ===== Persistence =====

  toJSON(): AttendanceJSON {
    return {
      id: this.id.toString(),
      courseId: this.courseId,
      studentId: this.studentId,
      session: this.session,
      date: this.date,
      attendanceStatus: this._attendanceStatus,
      time: this._time.toJSON(),
      score: this._score.toJSON(),
      flags: this._flags.toJSON(),
      metadata: this._metadata.toJSON(),
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      createdBy: this.createdBy?.toString() ?? '',
      updatedBy: this.updatedBy?.toString() ?? ''
    };
  }

  clone(): this {
    const clone = new (this.constructor as any)({
      id: this.id,
      courseId: this.courseId,
      studentId: this.studentId,
      session: this.session,
      date: this.date,
      attendanceStatus: this._attendanceStatus,
      time: this._time.clone(),
      score: this._score.clone(),
      flags: this._flags.clone(),
      metadata: this._metadata.clone(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy
    });

    return clone;
  }

  // ===== Validation =====

  isValid(): boolean {
    return (
      !!this.courseId &&
      !!this.studentId &&
      !!this.session &&
      !!this.date &&
      !!this._attendanceStatus
    );
  }

  // ===== Comparison =====

  // The `equals` method from the base `Entity` class is sufficient, which compares by ID.
  // If more complex equality is needed, it can be overridden.

  // ===== Utilities =====

  toString(): string {
    return `Attendance(${this.id.toString()}) - ${this.studentId} at ${this.date} ${this.session}: ${this._attendanceStatus}`;
  }

  toSummary(): Record<string, any> {
    return {
      id: this.id.toString(),
      studentId: this.studentId,
      date: this.date,
      session: this.session,
      status: this._attendanceStatus,
      score: this.getScore(),
      isLate: this.isLate(),
      isAbsent: this.isAbsent()
    };
  }
}