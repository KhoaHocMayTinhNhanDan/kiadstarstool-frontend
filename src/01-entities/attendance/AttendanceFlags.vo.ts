export interface AttendanceFlagsProps {
  isLate: boolean;
  isEarlyLeave: boolean;
  isExcused: boolean;
}

export interface AttendanceFlagsJSON {
  isLate: boolean;
  isEarlyLeave: boolean;
  isExcused: boolean;
}

export class AttendanceFlags {
  readonly isLate: boolean;
  readonly isEarlyLeave: boolean;
  readonly isExcused: boolean;

  constructor(props: AttendanceFlagsProps) {
    this.isLate = props.isLate;
    this.isEarlyLeave = props.isEarlyLeave;
    this.isExcused = props.isExcused;
  }

  static initial(): AttendanceFlags {
    return new AttendanceFlags({
      isLate: false,
      isEarlyLeave: false,
      isExcused: false
    });
  }

  markLate(): AttendanceFlags {
    return new AttendanceFlags({ ...this, isLate: true });
  }

  markEarlyLeave(): AttendanceFlags {
    return new AttendanceFlags({ ...this, isEarlyLeave: true });
  }

  markExcused(excused: boolean): AttendanceFlags {
    return new AttendanceFlags({ ...this, isExcused: excused });
  }

  toJSON(): AttendanceFlagsJSON {
    return {
      isLate: this.isLate,
      isEarlyLeave: this.isEarlyLeave,
      isExcused: this.isExcused
    };
  }

  static fromJSON(data: AttendanceFlagsJSON): AttendanceFlags {
    return new AttendanceFlags({
      isLate: data.isLate,
      isEarlyLeave: data.isEarlyLeave,
      isExcused: data.isExcused
    });
  }

  clone(): AttendanceFlags {
    return new AttendanceFlags({
      isLate: this.isLate,
      isEarlyLeave: this.isEarlyLeave,
      isExcused: this.isExcused
    });
  }
}