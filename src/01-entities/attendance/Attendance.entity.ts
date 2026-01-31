// 01-entities/business/Attendance/Attendance.entity.ts
import { BaseEntity } from '../shared/base/base.entity';
import {
  ATTENDANCE_STATUS,
  type AttendanceStatus
} from '../../shared/constants/classes.constant';

import { AttendanceTime } from './AttendanceTime.vo';
import { AttendanceScore } from './AttendanceScore.vo';
import { AttendanceFlags } from './AttendanceFlags.vo';
import { AttendanceMetadata } from './AttendanceMetadata.vo';

export interface AttendanceProps {
  id?: string;
  courseId: string;
  studentId: string;
  session: string;
  date: string;

  time?: AttendanceTime;
  score?: AttendanceScore;
  attendanceStatus?: AttendanceStatus;
  flags?: AttendanceFlags;
  metadata?: AttendanceMetadata;
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

export class Attendance extends BaseEntity<AttendanceJSON> {
  readonly courseId: string;
  readonly studentId: string;
  readonly session: string;
  readonly date: string;

  time: AttendanceTime;
  score: AttendanceScore;
  attendanceStatus: AttendanceStatus;
  flags: AttendanceFlags;
  metadata: AttendanceMetadata;

  constructor(props: AttendanceProps) {
    super({ id: props.id });

    this.courseId = props.courseId;
    this.studentId = props.studentId;
    this.session = props.session;
    this.date = props.date;

    this.time = props.time ?? AttendanceTime.createDefault();
    this.score = props.score ?? AttendanceScore.zero();
    this.flags = props.flags ?? AttendanceFlags.initial();
    this.metadata = props.metadata ?? AttendanceMetadata.empty();

    this.attendanceStatus = props.attendanceStatus ?? ATTENDANCE_STATUS.PRESENT;
  }

  // ===== Factory methods =====

  static create(props: AttendanceProps): Attendance {
    return new Attendance(props);
  }

  static createFromJSON(data: AttendanceJSON): Attendance {
    return new Attendance({
      id: data.id,
      courseId: data.courseId,
      studentId: data.studentId,
      session: data.session,
      date: data.date,
      attendanceStatus: data.attendanceStatus,
      time: AttendanceTime.fromJSON(data.time),
      score: AttendanceScore.fromJSON(data.score),
      flags: AttendanceFlags.fromJSON(data.flags),
      metadata: AttendanceMetadata.fromJSON(data.metadata)
    });
  }

  // ===== Domain behaviors =====

  checkIn(at: string = new Date().toISOString()): this {
    this.time = this.time.checkIn(at);

    if (this.time.isLate()) {
      this.attendanceStatus = ATTENDANCE_STATUS.LATE;
      this.flags = this.flags.markLate();
    } else {
      this.attendanceStatus = ATTENDANCE_STATUS.PRESENT;
    }

    return this;
  }

  checkOut(at: string = new Date().toISOString()): this {
    this.time = this.time.checkOut(at);

    if (this.time.isEarlyLeave()) {
      this.flags = this.flags.markEarlyLeave();
    }

    return this;
  }

  markAbsent(reason = '', excused = false): this {
    this.attendanceStatus = excused
      ? ATTENDANCE_STATUS.EXCUSED
      : ATTENDANCE_STATUS.ABSENT;

    this.flags = this.flags.markExcused(excused);
    this.metadata = this.metadata.withAbsentReason(reason);
    this.score = AttendanceScore.zero();

    return this;
  }

  updateScore(rawScore: number): this {
    this.score = AttendanceScore.fromRaw(rawScore, this.time);
    return this;
  }

  // ===== Queries =====

  isPresent(): boolean {
    return (
      this.attendanceStatus === ATTENDANCE_STATUS.PRESENT ||
      this.attendanceStatus === ATTENDANCE_STATUS.LATE
    );
  }

  isLate(): boolean {
    return this.attendanceStatus === ATTENDANCE_STATUS.LATE;
  }

  isAbsent(): boolean {
    return (
      this.attendanceStatus === ATTENDANCE_STATUS.ABSENT ||
      this.attendanceStatus === ATTENDANCE_STATUS.EXCUSED
    );
  }

  getScore(): number {
    return this.score.value;
  }

  // ===== Builder pattern =====

  withTime(time: AttendanceTime): this {
    this.time = time;
    return this;
  }

  withScore(score: AttendanceScore): this {
    this.score = score;
    return this;
  }

  withStatus(status: AttendanceStatus): this {
    this.attendanceStatus = status;
    return this;
  }

  // ===== Persistence =====

  toJSON(): AttendanceJSON {
    return {
      ...super.baseToJSON(),
      courseId: this.courseId,
      studentId: this.studentId,
      session: this.session,
      date: this.date,
      attendanceStatus: this.attendanceStatus,
      time: this.time.toJSON(),
      score: this.score.toJSON(),
      flags: this.flags.toJSON(),
      metadata: this.metadata.toJSON()
    };
  }

  clone(): this {
    const clone = new (this.constructor as any)({
      id: this.id,
      courseId: this.courseId,
      studentId: this.studentId,
      session: this.session,
      date: this.date,
      attendanceStatus: this.attendanceStatus,
      time: this.time.clone(),
      score: this.score.clone(),
      flags: this.flags.clone(),
      metadata: this.metadata.clone()
    });

    // Copy BaseEntity properties
    (clone as any).createdAt = this.createdAt;
    (clone as any).updatedAt = this.updatedAt;
    (clone as any).createdBy = this.createdBy;
    (clone as any).updatedBy = this.updatedBy;

    return clone;
  }

  // ===== Validation =====

  isValid(): boolean {
    return (
      !!this.courseId &&
      !!this.studentId &&
      !!this.session &&
      !!this.date &&
      !!this.attendanceStatus
    );
  }

  // ===== Comparison =====

  equals(other: Attendance): boolean {
    return (
      this.id === other.id &&
      this.courseId === other.courseId &&
      this.studentId === other.studentId &&
      this.session === other.session &&
      this.date === other.date
    );
  }

  // ===== Utilities =====

  toString(): string {
    return `Attendance(${this.id}) - ${this.studentId} at ${this.date} ${this.session}: ${this.attendanceStatus}`;
  }

  toSummary(): Record<string, any> {
    return {
      id: this.id,
      studentId: this.studentId,
      date: this.date,
      session: this.session,
      status: this.attendanceStatus,
      score: this.getScore(),
      isLate: this.isLate(),
      isAbsent: this.isAbsent()
    };
  }
}