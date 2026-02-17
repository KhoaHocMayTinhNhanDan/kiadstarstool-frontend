import { type IAttendanceDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/attendance/IAttendanceDataSource';
import { Attendance, type AttendanceJSON } from '@/01-entities/attendance/Attendance.entity';
import { ATTENDANCE_STATUS } from '@/shared/constants/classes.constant';

let attendanceStore = new Map<string, AttendanceJSON>();
const STORAGE_KEY = 'mock_attendance_db_v7';

export class MockAttendanceDataSource implements IAttendanceDataSource {
  constructor() {
    this.initialize();
  }

  private initialize() {
    // 1. Try to load from localStorage
    const storedData = localStorage.getItem(STORAGE_KEY);
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        attendanceStore = new Map(parsedData);

        console.log('[MockAttendanceDataSource] Loaded data from localStorage', attendanceStore.size);
      } catch (e) {
        console.error('[MockAttendanceDataSource] Failed to parse localStorage data', e);
        attendanceStore.clear();
      }
    }

    // 2. If empty, seed data
    if (attendanceStore.size === 0) {
      console.log('[MockAttendanceDataSource] Seeding initial data...');
      
      const mockData: AttendanceJSON[] = [
        // --- Class 01 (Hà Nội) - Ngày 2026-02-16 (Thứ 2) ---
        {
          id: 'att-1',
          courseId: 'class-01',
          studentId: 'student-01', // Nguyễn Văn An
          session: 'morning',
          date: '2026-02-16',
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
          date: '2025-12-25', // Dữ liệu cũ
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
          date: '2026-02-16',
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

        // --- Class 02 (Hà Nội) - Ngày 2026-02-17 (Thứ 3) ---
        // Phạm Thị Dung học tiếp lớp 2 (Multi-class)
        {
          id: 'att-4',
          courseId: 'class-02',
          studentId: 'student-04', 
          session: 'evening',
          date: '2026-02-17',
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

        // --- Class 05 (Hà Nội) - Ngày 2026-02-15 (Chủ Nhật) ---
        // Phạm Thị Dung học tiếp lớp 3 (Multi-class)
        {
          id: 'att-6',
          courseId: 'class-05',
          studentId: 'student-04',
          session: 'afternoon',
          date: '2026-02-15',
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

        // --- Class 03 (HCM) - Ngày 2026-02-16 (Thứ 2) ---
        // Nguyễn Văn An (HCM) đi học
        {
          id: 'att-7',
          courseId: 'class-03',
          studentId: 'student-01-hcm', // ID khác student-01
          session: 'evening',
          date: '2026-02-16',
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
          date: '2025-12-20',
          attendanceStatus: ATTENDANCE_STATUS.PRESENT,
          time: { checkInTime: '08:00', checkOutTime: '10:00', startTime: '08:00', endTime: '10:00' },
          score: { value: 9.5 },
          flags: { isLate: false, isEarlyLeave: false, isExcused: false },
          metadata: { location: '', deviceInfo: '', absentReason: '' },
          createdAt: new Date('2025-12-20').toISOString(),
          updatedAt: new Date('2025-12-20').toISOString(),
          createdBy: 'admin',
          updatedBy: 'admin'
        }
      ];

      mockData.forEach(d => attendanceStore.set(d.id, d));
      this.persist();
    }
  }

  private persist() {
    try {
      // Convert Map to Array of entries for JSON serialization
      const dataToSave = Array.from(attendanceStore.entries());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.error('[MockAttendanceDataSource] Failed to save to localStorage', e);
    }
  }

  async getByClassId(classId: string): Promise<Attendance[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const allRecords = Array.from(attendanceStore.values());
    // Filter by classId
    return allRecords.filter(json => json.courseId === classId).map(json => Attendance.createFromJSON(json));
  }

  async getByClassAndDate(classId: string, date: string): Promise<Attendance[]> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
    
    const queryDate = date.split('T')[0];
    const allRecords = Array.from(attendanceStore.values());
    
    // Filter by classId and date
    const filtered = allRecords.filter(json => json.courseId === classId && json.date === queryDate);
    
    return filtered.map(json => Attendance.createFromJSON(json));
  }

  async getByStudentAndDate(studentId: string, classId: string, date: string): Promise<Attendance | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const queryDate = date.split('T')[0];
    const allRecords = Array.from(attendanceStore.values());
    
    const found = allRecords.find(json => 
      json.studentId === studentId && json.courseId === classId && json.date === queryDate
    );

    return found ? Attendance.createFromJSON(found) : null;
  }

  async getByStudentId(studentId: string): Promise<Attendance[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const allRecords = Array.from(attendanceStore.values());
    return allRecords.filter(json => json.studentId === studentId).map(json => Attendance.createFromJSON(json));
  }

  async save(attendance: Attendance): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const json = attendance.toJSON();
    attendanceStore.set(json.id, json);
    this.persist();
  }

  async deleteByClassId(classId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const keysToDelete: string[] = [];
    for (const [key, value] of attendanceStore.entries()) {
      if (value.courseId === classId) {
        keysToDelete.push(key);
      }
    }
    keysToDelete.forEach(key => attendanceStore.delete(key));
    this.persist();
  }
}