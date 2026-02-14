import { type IAttendanceDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/attendance/IAttendanceDataSource';
import { Attendance, type AttendanceJSON } from '@/01-entities/attendance/Attendance.entity';
import { ATTENDANCE_STATUS } from '@/shared/constants/classes.constant';

export class MockAttendanceDataSource implements IAttendanceDataSource {
  private attendanceStore: Map<string, AttendanceJSON> = new Map();

  constructor() {
    // Seed some mock data
    this.seedMockData();
  }

  private seedMockData() {
    const today = new Date().toISOString().split('T')[0];
    
    const mockData: AttendanceJSON[] = [
      // --- Class 01 (Hà Nội) - Hôm nay ---
      {
        id: 'att-1',
        courseId: 'class-01',
        studentId: 'student-01', // Nguyễn Văn An
        session: 'morning',
        date: today, // Today
        attendanceStatus: ATTENDANCE_STATUS.PRESENT,
        time: { checkInTime: '08:00', checkOutTime: '10:00', startTime: '08:00', endTime: '10:00' },
        score: { value: 10 },
        flags: { isLate: false, isEarlyLeave: false, isExcused: false },
        metadata: { location: '', deviceInfo: '', absentReason: '' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'admin',
        updatedBy: 'admin'
      },
      {
        id: 'att-2',
        courseId: 'class-01',
        studentId: 'student-transfer-old', // Trần Thị Bình (Cũ)
        session: 'morning',
        date: '2023-02-25', // Dữ liệu cũ
        attendanceStatus: ATTENDANCE_STATUS.ABSENT,
        time: { checkInTime: null, checkOutTime: null, startTime: '08:00', endTime: '10:00'  },
        score: { value: 0 },
        flags: { isLate: false, isEarlyLeave: false, isExcused: false },
        metadata: { location: '', deviceInfo: '', absentReason: 'Sick leave' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'admin',
        updatedBy: 'admin'
      },
      {
        id: 'att-3',
        courseId: 'class-01',
        studentId: 'student-04', // Phạm Thị Dung (Lớp 1)
        session: 'morning',
        date: today,
        attendanceStatus: ATTENDANCE_STATUS.PRESENT,
        time: { checkInTime: '07:55', checkOutTime: '10:05', startTime: '08:00', endTime: '10:00' },
        score: { value: 9 },
        flags: { isLate: false, isEarlyLeave: false, isExcused: false },
        metadata: { location: '', deviceInfo: '', absentReason: '' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'admin',
        updatedBy: 'admin'
      },

      // --- Class 02 (Hà Nội) ---
      // Phạm Thị Dung học tiếp lớp 2 (Multi-class)
      {
        id: 'att-4',
        courseId: 'class-02',
        studentId: 'student-04', 
        session: 'evening',
        date: today,
        attendanceStatus: ATTENDANCE_STATUS.LATE,
        time: { checkInTime: '18:15', checkOutTime: '20:00', startTime: '18:00', endTime: '20:00' },
        score: { value: 8 },
        flags: { isLate: true, isEarlyLeave: false, isExcused: false },
        metadata: { location: '', deviceInfo: '', absentReason: '' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'admin',
        updatedBy: 'admin'
      },

      // --- Class 05 (Hà Nội) ---
      // Phạm Thị Dung học tiếp lớp 3 (Multi-class)
      {
        id: 'att-6',
        courseId: 'class-05',
        studentId: 'student-04',
        session: 'afternoon',
        date: today,
        attendanceStatus: ATTENDANCE_STATUS.PRESENT,
        time: { checkInTime: '14:00', checkOutTime: '16:00', startTime: '14:00', endTime: '16:00' },
        score: { value: 9.5 },
        flags: { isLate: false, isEarlyLeave: false, isExcused: false },
        metadata: { location: '', deviceInfo: '', absentReason: '' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'admin',
        updatedBy: 'admin'
      },

      // --- Class 03 (HCM) ---
      // Nguyễn Văn An (HCM) đi học
      {
        id: 'att-7',
        courseId: 'class-03',
        studentId: 'student-01-hcm', // ID khác student-01
        session: 'evening',
        date: today,
        attendanceStatus: ATTENDANCE_STATUS.PRESENT,
        time: { checkInTime: '18:00', checkOutTime: '20:00', startTime: '18:00', endTime: '20:00' },
        score: { value: 10 },
        flags: { isLate: false, isEarlyLeave: false, isExcused: false },
        metadata: { location: '', deviceInfo: '', absentReason: '' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'admin',
        updatedBy: 'admin'
      },

      // --- Dữ liệu quá khứ cho student-01 để test lịch sử ---
      {
        id: 'att-5',
        courseId: 'class-01',
        studentId: 'student-01',
        session: 'morning',
        date: '2023-10-20',
        attendanceStatus: ATTENDANCE_STATUS.PRESENT,
        time: { checkInTime: '08:00', checkOutTime: '10:00', startTime: '08:00', endTime: '10:00' },
        score: { value: 9.5 },
        flags: { isLate: false, isEarlyLeave: false, isExcused: false },
        metadata: { location: '', deviceInfo: '', absentReason: '' },
        createdAt: new Date('2023-10-20').toISOString(),
        updatedAt: new Date('2023-10-20').toISOString(),
        createdBy: 'admin',
        updatedBy: 'admin'
      }
    ];

    mockData.forEach(d => this.attendanceStore.set(d.id, d));
  }

  async getByClassAndDate(classId: string, date: string): Promise<Attendance[]> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
    
    const queryDate = date.split('T')[0];
    const allRecords = Array.from(this.attendanceStore.values());
    
    // Filter by classId and date
    const filtered = allRecords.filter(json => json.courseId === classId && json.date === queryDate);
    
    return filtered.map(json => Attendance.createFromJSON(json));
  }

  async getByStudentAndDate(studentId: string, classId: string, date: string): Promise<Attendance | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const queryDate = date.split('T')[0];
    const allRecords = Array.from(this.attendanceStore.values());
    
    const found = allRecords.find(json => 
      json.studentId === studentId && json.courseId === classId && json.date === queryDate
    );

    return found ? Attendance.createFromJSON(found) : null;
  }

  async getByStudentId(studentId: string): Promise<Attendance[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const allRecords = Array.from(this.attendanceStore.values());
    return allRecords.filter(json => json.studentId === studentId).map(json => Attendance.createFromJSON(json));
  }

  async save(attendance: Attendance): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const json = attendance.toJSON();
    this.attendanceStore.set(json.id, json);
  }

  async deleteByClassId(classId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const keysToDelete: string[] = [];
    for (const [key, value] of this.attendanceStore.entries()) {
      if (value.courseId === classId) {
        keysToDelete.push(key);
      }
    }
    keysToDelete.forEach(key => this.attendanceStore.delete(key));
  }
}