import { AttendanceTime } from '../business/attendance/value-objects/AttendanceTime.vo';

export interface AttendanceScoreJSON {
  value: number;
}

export class AttendanceScore {
  readonly value: number;

  private constructor(value: number) {
    this.value = Math.max(0, Math.min(10, value));
  }

  static zero(): AttendanceScore {
    return new AttendanceScore(0);
  }

  static fromRaw(raw: number, time: AttendanceTime): AttendanceScore {
    let score = Number(raw) || 0;

    if (time.isLate()) score -= 1;
    if (time.isEarlyLeave()) score -= 1;

    return new AttendanceScore(score);
  }

  toJSON(): AttendanceScoreJSON {
    return { value: this.value };
  }

  static fromJSON(data: AttendanceScoreJSON): AttendanceScore {
    return new AttendanceScore(data.value);
  }

  clone(): AttendanceScore {
    return new AttendanceScore(this.value);
  }
}