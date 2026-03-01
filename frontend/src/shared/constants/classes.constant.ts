// src/shared/constants/classes.constant.ts

/* =====================
 *  ATTENDANCE STATUS
 * ===================== */

export const ATTENDANCE_STATUS = {
  PRESENT: 'present',
  LATE: 'late',
  ABSENT: 'absent',
  EXCUSED: 'excused',
  EARLY_LEAVE: 'early_leave',
  HALF_DAY: 'half_day'
} as const;

export type AttendanceStatus = typeof ATTENDANCE_STATUS[keyof typeof ATTENDANCE_STATUS];

/* =====================
 *  CLASS SESSIONS
 * ===================== */

export const SESSIONS = {
  MORNING: 'morning',
  AFTERNOON: 'afternoon',
  EVENING: 'evening',
  FULL_DAY: 'full_day',
  CUSTOM: 'custom'
} as const;

export type SessionType = typeof SESSIONS[keyof typeof SESSIONS];

/* =====================
 *  COURSE TYPES
 * ===================== */

export const COURSE_TYPES = {
  REGULAR: 'regular',
  INTENSIVE: 'intensive',
  WEEKEND: 'weekend',
  ONLINE: 'online',
  HYBRID: 'hybrid',
  PRIVATE: 'private',
  GROUP: 'group'
} as const;

export type CourseType = typeof COURSE_TYPES[keyof typeof COURSE_TYPES];

/* =====================
 *  COURSE LEVELS
 * ===================== */

export const COURSE_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
  MASTER: 'master',
  ALL_LEVELS: 'all_levels'
} as const;

export type CourseLevel = typeof COURSE_LEVELS[keyof typeof COURSE_LEVELS];

/* =====================
 *  DAYS OF WEEK
 * ===================== */

export const DAYS_OF_WEEK = {
  MONDAY: 'monday',
  TUESDAY: 'tuesday',
  WEDNESDAY: 'wednesday',
  THURSDAY: 'thursday',
  FRIDAY: 'friday',
  SATURDAY: 'saturday',
  SUNDAY: 'sunday'
} as const;

export type DayOfWeek = typeof DAYS_OF_WEEK[keyof typeof DAYS_OF_WEEK];

/* =====================
 *  CLASS STATUS
 * ===================== */

export const CLASS_STATUS = {
  SCHEDULED: 'scheduled',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  POSTPONED: 'postponed',
  ARCHIVED: 'archived'
} as const;

export type ClassStatus = typeof CLASS_STATUS[keyof typeof CLASS_STATUS];

/* =====================
 *  STUDENT STATUS
 * ===================== */

export const STUDENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  GRADUATED: 'graduated',
  DROPPED: 'dropped',
  PROBATION: 'probation'
} as const;

export type StudentStatus = typeof STUDENT_STATUS[keyof typeof STUDENT_STATUS];

/* =====================
 *  ENROLLMENT STATUS
 * ===================== */

export const ENROLLMENT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  WAITLISTED: 'waitlisted',
  REJECTED: 'rejected',
  WITHDRAWN: 'withdrawn',
  COMPLETED: 'completed'
} as const;

export type EnrollmentStatus = typeof ENROLLMENT_STATUS[keyof typeof ENROLLMENT_STATUS];

/* =====================
 *  PAYMENT STATUS
 * ===================== */

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  PARTIAL: 'partial',
  OVERDUE: 'overdue',
  REFUNDED: 'refunded',
  CANCELLED: 'cancelled'
} as const;

export type PaymentStatus = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];

/* =====================
 *  ATTENDANCE METHODS
 * ===================== */

export const ATTENDANCE_METHODS = {
  MANUAL: 'manual',
  QR_CODE: 'qr_code',
  FACE_RECOGNITION: 'face_recognition',
  FINGERPRINT: 'fingerprint',
  NFC: 'nfc',
  GEO_FENCE: 'geo_fence'
} as const;

export type AttendanceMethod = typeof ATTENDANCE_METHODS[keyof typeof ATTENDANCE_METHODS];

/* =====================
 *  SCORING SYSTEM
 * ===================== */

export const SCORING_SYSTEM = {
  PERCENTAGE: 'percentage',  // 0-100%
  POINTS_10: 'points_10',    // 0-10 điểm
  POINTS_100: 'points_100',  // 0-100 điểm
  LETTER_GRADE: 'letter_grade', // A, B, C, D, F
  GPA: 'gpa'                // 0-4.0
} as const;

export type ScoringSystem = typeof SCORING_SYSTEM[keyof typeof SCORING_SYSTEM];

/* =====================
 *  GRADE LETTERS
 * ===================== */

export const GRADE_LETTERS = {
  A_PLUS: 'A+',
  A: 'A',
  A_MINUS: 'A-',
  B_PLUS: 'B+',
  B: 'B',
  B_MINUS: 'B-',
  C_PLUS: 'C+',
  C: 'C',
  C_MINUS: 'C-',
  D_PLUS: 'D+',
  D: 'D',
  D_MINUS: 'D-',
  F: 'F',
  INCOMPLETE: 'I',
  WITHDRAWN: 'W'
} as const;

export type GradeLetter = typeof GRADE_LETTERS[keyof typeof GRADE_LETTERS];

/* =====================
 *  TIME SLOTS
 * ===================== */

export const TIME_SLOTS = {
  SLOT_1: '07:00-08:30',
  SLOT_2: '08:30-10:00',
  SLOT_3: '10:00-11:30',
  SLOT_4: '13:00-14:30',
  SLOT_5: '14:30-16:00',
  SLOT_6: '16:00-17:30',
  SLOT_7: '18:00-19:30',
  SLOT_8: '19:30-21:00'
} as const;

export type TimeSlot = typeof TIME_SLOTS[keyof typeof TIME_SLOTS];

/* =====================
 *  CLASSROOM TYPES
 * ===================== */

export const CLASSROOM_TYPES = {
  STANDARD: 'standard',
  LAB: 'lab',
  STUDIO: 'studio',
  CONFERENCE: 'conference',
  ONLINE: 'online',
  HYBRID: 'hybrid'
} as const;

export type ClassroomType = typeof CLASSROOM_TYPES[keyof typeof CLASSROOM_TYPES];

/* =====================
 *  DEFAULT VALUES
 * ===================== */

export const DEFAULT_VALUES = {
  // Attendance
  DEFAULT_CHECK_IN_TIME: '08:00',
  DEFAULT_CHECK_OUT_TIME: '10:00',
  MAX_LATE_MINUTES: 30,
  MAX_EARLY_LEAVE_MINUTES: 30,
  
  // Scoring
  DEFAULT_SCORE: 0,
  MAX_SCORE: 10,
  MIN_SCORE: 0,
  DEFAULT_BEHAVIOR_RATING: 5,
  DEFAULT_PARTICIPATION_RATING: 5,
  MAX_RATING: 5,
  MIN_RATING: 1,
  
  // Duration
  DEFAULT_CLASS_DURATION: 120, // minutes
  MIN_CLASS_DURATION: 30,
  MAX_CLASS_DURATION: 480,
  
  // Capacity
  DEFAULT_CLASS_CAPACITY: 30,
  MIN_CLASS_CAPACITY: 1,
  MAX_CLASS_CAPACITY: 100,
  
  // Pagination
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100
} as const;

/* =====================
 *  VALIDATION RULES
 * ===================== */

export const VALIDATION_RULES = {
  // Student
  STUDENT_CODE_PATTERN: /^[A-Z]{2,4}-\d{3,6}$/,
  STUDENT_NAME_MIN_LENGTH: 2,
  STUDENT_NAME_MAX_LENGTH: 100,
  
  // Course
  COURSE_CODE_PATTERN: /^[A-Z]{3,6}\d{3,4}$/,
  COURSE_NAME_MIN_LENGTH: 3,
  COURSE_NAME_MAX_LENGTH: 200,
  
  // General
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_PATTERN: /^[0-9]{10,15}$/,
  
  // Time
  TIME_PATTERN: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
  DATE_PATTERN: /^\d{4}-\d{2}-\d{2}$/
} as const;

/* =====================
 *  ERROR MESSAGES
 * ===================== */

export const ERROR_MESSAGES = {
  // Attendance
  ATTENDANCE_NOT_FOUND: 'Attendance record not found',
  ATTENDANCE_ALREADY_EXISTS: 'Attendance record already exists for this session',
  INVALID_CHECK_IN_TIME: 'Check-in time cannot be in the future',
  INVALID_CHECK_OUT_TIME: 'Check-out time cannot be before check-in time',
  ATTENDANCE_CANNOT_BE_MODIFIED: 'Attendance cannot be modified after 24 hours',
  
  // Course
  COURSE_NOT_FOUND: 'Course not found',
  COURSE_FULL: 'Course is full',
  COURSE_NOT_ACTIVE: 'Course is not active',
  
  // Student
  STUDENT_NOT_FOUND: 'Student not found',
  STUDENT_NOT_ENROLLED: 'Student is not enrolled in this course',
  STUDENT_SUSPENDED: 'Student account is suspended',
  
  // General
  UNAUTHORIZED: 'You are not authorized to perform this action',
  VALIDATION_ERROR: 'Validation failed',
  NETWORK_ERROR: 'Network connection failed',
  SERVER_ERROR: 'Internal server error'
} as const;

/* =====================
 *  SUCCESS MESSAGES
 * ===================== */

export const SUCCESS_MESSAGES = {
  // Attendance
  ATTENDANCE_CREATED: 'Attendance record created successfully',
  ATTENDANCE_UPDATED: 'Attendance record updated successfully',
  ATTENDANCE_DELETED: 'Attendance record deleted successfully',
  
  // Course
  COURSE_CREATED: 'Course created successfully',
  COURSE_UPDATED: 'Course updated successfully',
  
  // Student
  STUDENT_ENROLLED: 'Student enrolled successfully',
  STUDENT_UNENROLLED: 'Student unenrolled successfully',
  
  // General
  OPERATION_SUCCESSFUL: 'Operation completed successfully',
  DATA_SAVED: 'Data saved successfully'
} as const;

/* =====================
 *  HELPER FUNCTIONS
 * ===================== */

/**
 * Get color for attendance status
 */
export const getAttendanceStatusColor = (status: AttendanceStatus): string => {
  const colors: Record<AttendanceStatus, string> = {
    [ATTENDANCE_STATUS.PRESENT]: '#10b981', // green
    [ATTENDANCE_STATUS.LATE]: '#f59e0b',    // amber
    [ATTENDANCE_STATUS.ABSENT]: '#ef4444',  // red
    [ATTENDANCE_STATUS.EXCUSED]: '#6b7280', // gray
    [ATTENDANCE_STATUS.EARLY_LEAVE]: '#f97316', // orange
    [ATTENDANCE_STATUS.HALF_DAY]: '#8b5cf6' // violet
  };
  return colors[status] || '#6b7280';
};

/**
 * Get icon for attendance status
 */
export const getAttendanceStatusIcon = (status: AttendanceStatus): string => {
  const icons: Record<AttendanceStatus, string> = {
    [ATTENDANCE_STATUS.PRESENT]: '✅',
    [ATTENDANCE_STATUS.LATE]: '⚠️',
    [ATTENDANCE_STATUS.ABSENT]: '❌',
    [ATTENDANCE_STATUS.EXCUSED]: '⏸️',
    [ATTENDANCE_STATUS.EARLY_LEAVE]: '↩️',
    [ATTENDANCE_STATUS.HALF_DAY]: '½'
  };
  return icons[status] || '❓';
};

/**
 * Get label for attendance status
 */
export const getAttendanceStatusLabel = (status: AttendanceStatus): string => {
  const labels: Record<AttendanceStatus, string> = {
    [ATTENDANCE_STATUS.PRESENT]: 'Có mặt',
    [ATTENDANCE_STATUS.LATE]: 'Đến muộn',
    [ATTENDANCE_STATUS.ABSENT]: 'Vắng mặt',
    [ATTENDANCE_STATUS.EXCUSED]: 'Vắng có phép',
    [ATTENDANCE_STATUS.EARLY_LEAVE]: 'Về sớm',
    [ATTENDANCE_STATUS.HALF_DAY]: 'Nửa ngày'
  };
  return labels[status] || status;
};

/**
 * Get session label
 */
export const getSessionLabel = (session: SessionType): string => {
  const labels: Record<SessionType, string> = {
    [SESSIONS.MORNING]: 'Sáng',
    [SESSIONS.AFTERNOON]: 'Chiều',
    [SESSIONS.EVENING]: 'Tối',
    [SESSIONS.FULL_DAY]: 'Cả ngày',
    [SESSIONS.CUSTOM]: 'Tùy chỉnh'
  };
  return labels[session] || session;
};

/**
 * Check if attendance status is considered present
 */
export const isPresentStatus = (status: AttendanceStatus): boolean => {
  return [
    ATTENDANCE_STATUS.PRESENT,
    ATTENDANCE_STATUS.LATE,
    ATTENDANCE_STATUS.HALF_DAY,
    ATTENDANCE_STATUS.EARLY_LEAVE
  ].includes(status as typeof ATTENDANCE_STATUS.PRESENT | typeof ATTENDANCE_STATUS.LATE | typeof ATTENDANCE_STATUS.HALF_DAY | typeof ATTENDANCE_STATUS.EARLY_LEAVE);
};

/**
 * Check if attendance status is considered absent
 */
export const isAbsentStatus = (status: AttendanceStatus): boolean => {
  return [
    ATTENDANCE_STATUS.ABSENT,
    ATTENDANCE_STATUS.EXCUSED
  ].includes(status as typeof ATTENDANCE_STATUS.ABSENT | typeof ATTENDANCE_STATUS.EXCUSED);
};

/**
 * Calculate grade from score
 */
export const calculateGrade = (
  score: number, 
  system: ScoringSystem = SCORING_SYSTEM.POINTS_10
): GradeLetter => {
  let percentage: number;
  
  switch (system) {
    case SCORING_SYSTEM.POINTS_10:
      percentage = (score / 10) * 100;
      break;
    case SCORING_SYSTEM.POINTS_100:
      percentage = score;
      break;
    case SCORING_SYSTEM.PERCENTAGE:
      percentage = score;
      break;
    default:
      percentage = (score / 10) * 100;
  }
  
  if (percentage >= 97) return GRADE_LETTERS.A_PLUS;
  if (percentage >= 93) return GRADE_LETTERS.A;
  if (percentage >= 90) return GRADE_LETTERS.A_MINUS;
  if (percentage >= 87) return GRADE_LETTERS.B_PLUS;
  if (percentage >= 83) return GRADE_LETTERS.B;
  if (percentage >= 80) return GRADE_LETTERS.B_MINUS;
  if (percentage >= 77) return GRADE_LETTERS.C_PLUS;
  if (percentage >= 73) return GRADE_LETTERS.C;
  if (percentage >= 70) return GRADE_LETTERS.C_MINUS;
  if (percentage >= 67) return GRADE_LETTERS.D_PLUS;
  if (percentage >= 63) return GRADE_LETTERS.D;
  if (percentage >= 60) return GRADE_LETTERS.D_MINUS;
  return GRADE_LETTERS.F;
};

/**
 * Convert grade to GPA
 */
export const gradeToGPA = (grade: GradeLetter): number => {
  const gpaMap: Record<GradeLetter, number> = {
    [GRADE_LETTERS.A_PLUS]: 4.0,
    [GRADE_LETTERS.A]: 4.0,
    [GRADE_LETTERS.A_MINUS]: 3.7,
    [GRADE_LETTERS.B_PLUS]: 3.3,
    [GRADE_LETTERS.B]: 3.0,
    [GRADE_LETTERS.B_MINUS]: 2.7,
    [GRADE_LETTERS.C_PLUS]: 2.3,
    [GRADE_LETTERS.C]: 2.0,
    [GRADE_LETTERS.C_MINUS]: 1.7,
    [GRADE_LETTERS.D_PLUS]: 1.3,
    [GRADE_LETTERS.D]: 1.0,
    [GRADE_LETTERS.D_MINUS]: 0.7,
    [GRADE_LETTERS.F]: 0.0,
    [GRADE_LETTERS.INCOMPLETE]: 0.0,
    [GRADE_LETTERS.WITHDRAWN]: 0.0
  };
  
  return gpaMap[grade] || 0.0;
};

/* =====================
 *  EXPORT ALL
 * ===================== */

export default {
  // Constants
  ATTENDANCE_STATUS,
  SESSIONS,
  COURSE_TYPES,
  COURSE_LEVELS,
  DAYS_OF_WEEK,
  CLASS_STATUS,
  STUDENT_STATUS,
  ENROLLMENT_STATUS,
  PAYMENT_STATUS,
  ATTENDANCE_METHODS,
  SCORING_SYSTEM,
  GRADE_LETTERS,
  TIME_SLOTS,
  CLASSROOM_TYPES,
  
  // Defaults
  DEFAULT_VALUES,
  
  // Validation
  VALIDATION_RULES,
  
  // Messages
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  
  // Helper functions
  getAttendanceStatusColor,
  getAttendanceStatusIcon,
  getAttendanceStatusLabel,
  getSessionLabel,
  isPresentStatus,
  isAbsentStatus,
  calculateGrade,
  gradeToGPA
};