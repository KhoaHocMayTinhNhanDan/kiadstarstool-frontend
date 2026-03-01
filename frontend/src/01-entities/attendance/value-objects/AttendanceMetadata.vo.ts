export interface AttendanceMetadataProps {
  location: string;
  deviceInfo: string;
  absentReason: string;
}

export interface AttendanceMetadataJSON {
  location: string;
  deviceInfo: string;
  absentReason: string;
}

export class AttendanceMetadata {
  readonly location: string;
  readonly deviceInfo: string;
  readonly absentReason: string;

  constructor(props: AttendanceMetadataProps) {
    this.location = props.location;
    this.deviceInfo = props.deviceInfo;
    this.absentReason = props.absentReason;
  }

  static empty(): AttendanceMetadata {
    return new AttendanceMetadata({
      location: '',
      deviceInfo: '',
      absentReason: ''
    });
  }

  withAbsentReason(reason: string): AttendanceMetadata {
    return new AttendanceMetadata({
      ...this,
      absentReason: reason
    });
  }

  toJSON(): AttendanceMetadataJSON {
    return {
      location: this.location,
      deviceInfo: this.deviceInfo,
      absentReason: this.absentReason
    };
  }

  static fromJSON(data: AttendanceMetadataJSON): AttendanceMetadata {
    return new AttendanceMetadata({
      location: data.location,
      deviceInfo: data.deviceInfo,
      absentReason: data.absentReason
    });
  }

  clone(): AttendanceMetadata {
    return new AttendanceMetadata({
      location: this.location,
      deviceInfo: this.deviceInfo,
      absentReason: this.absentReason
    });
  }
}