export interface AttendanceTimeProps {
  startTime: string;
  endTime: string;
  checkInTime: string | null;
  checkOutTime: string | null;
}

export interface AttendanceTimeJSON {
  startTime: string;
  endTime: string;
  checkInTime: string | null;
  checkOutTime: string | null;
}

export class AttendanceTime {
  readonly startTime: string;
  readonly endTime: string;
  readonly checkInTime: string | null;
  readonly checkOutTime: string | null;

  constructor(props: AttendanceTimeProps) {
    this.startTime = props.startTime;
    this.endTime = props.endTime;
    this.checkInTime = props.checkInTime;
    this.checkOutTime = props.checkOutTime;
  }

  static createDefault(): AttendanceTime {
    return new AttendanceTime({
      startTime: '08:00',
      endTime: '10:00',
      checkInTime: null,
      checkOutTime: null
    });
  }

  checkIn(at: string): AttendanceTime {
    return new AttendanceTime({
      ...this,
      checkInTime: at
    });
  }

  checkOut(at: string): AttendanceTime {
    return new AttendanceTime({
      ...this,
      checkOutTime: at
    });
  }

  isLate(): boolean {
    if (!this.checkInTime) return false;
    return this.minutesDiff(this.startTime, this.checkInTime) > 0;
  }

  isEarlyLeave(): boolean {
    if (!this.checkOutTime) return false;
    return this.minutesDiff(this.checkOutTime, this.endTime) > 0;
  }

  actualDurationMinutes(): number {
    if (!this.checkInTime || !this.checkOutTime) return 0;
    return (
      (new Date(this.checkOutTime).getTime() -
        new Date(this.checkInTime).getTime()) /
      60000
    );
  }

  private minutesDiff(from: string, to: string): number {
    const [h, m] = from.split(':').map(Number);
    const actual = new Date(to);
    const expected = new Date(actual);
    expected.setHours(h, m, 0, 0);
    return Math.round((actual.getTime() - expected.getTime()) / 60000);
  }

  toJSON(): AttendanceTimeJSON {
    return {
      startTime: this.startTime,
      endTime: this.endTime,
      checkInTime: this.checkInTime,
      checkOutTime: this.checkOutTime
    };
  }

  static fromJSON(data: AttendanceTimeJSON): AttendanceTime {
    return new AttendanceTime({
      startTime: data.startTime,
      endTime: data.endTime,
      checkInTime: data.checkInTime,
      checkOutTime: data.checkOutTime
    });
  }

  clone(): AttendanceTime {
    return new AttendanceTime({
      startTime: this.startTime,
      endTime: this.endTime,
      checkInTime: this.checkInTime,
      checkOutTime: this.checkOutTime
    });
  }
}