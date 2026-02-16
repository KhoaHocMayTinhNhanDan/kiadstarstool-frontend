import { Class } from '@/01-entities/classes/Class.entity';
import { ClassId } from '@/01-entities/classes/value-objects/ClassId.vo';
import { BranchId } from '@/01-entities/branch/value-objects/BranchId.vo';
import { ClassStatus } from '@/01-entities/classes/ClassStatus.enum';
import { type IClassDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/class/IClassDataSource';
import { type ClassSession } from '@/01-entities/classes/ClassSession';

let classStore = new Map<string, Class>();
const STORAGE_KEY = 'mock_classes_db_v9';

export class MockClassDataSource implements IClassDataSource {
  constructor() {
    this.initialize();
  }

  private initialize() {
    // 1. Try to load from localStorage
    const storedData = localStorage.getItem(STORAGE_KEY);
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        classStore = new Map(parsedData.map((item: any) => [item.id, this.hydrateClass(item)]));
        console.log('[MockClassDataSource] Loaded data from localStorage', classStore.size);
      } catch (e) {
        console.error('[MockClassDataSource] Failed to parse localStorage data', e);
        classStore.clear();
      }
    }

    // 2. If empty, seed data
    if (classStore.size === 0) {
      console.log('[MockClassDataSource] Seeding initial class data...');
      
      const classes = [
        // --- Classes for Branch 01 (Hà Nội) ---
        {
          id: 'class-01',
          branchId: 'branch-01',
          name: 'Tiếng Anh Giao Tiếp (K12)',
          code: 'ENG-K1-001',
          status: ClassStatus.ACTIVE,
          maxStudents: 20,
          currentStudents: 0, // Để Use Case tự tính toán dựa trên dữ liệu điểm danh/đăng ký
          startDate: new Date('2023-09-01'),
          sessions: [
            { day: 'Mon', startTime: '18:00', endTime: '19:30' },
            { day: 'Wed', startTime: '18:00', endTime: '19:30' },
            { day: 'Fri', startTime: '18:00', endTime: '19:30' }
          ] as ClassSession[],
          teacherName: 'Nguyễn Văn A'
        },
        {
          id: 'class-02',
          branchId: 'branch-01',
          name: 'Luyện thi IELTS Intensive',
          code: 'IELTS-001',
          status: ClassStatus.ACTIVE,
          maxStudents: 15,
          currentStudents: 0,
          startDate: new Date('2023-11-01'),
          sessions: [
            { day: 'Tue', startTime: '19:30', endTime: '21:00' },
            { day: 'Thu', startTime: '19:30', endTime: '21:00' },
            { day: 'Sat', startTime: '19:30', endTime: '21:00' }
          ] as ClassSession[],
          teacherName: 'Trần Thị B'
        },
        {
          id: 'class-05', // Lớp thứ 3 tại HN
          branchId: 'branch-01',
          name: 'Tiếng Anh Thiếu Nhi (Starters)',
          code: 'KID-ST-01',
          status: ClassStatus.ACTIVE,
          maxStudents: 20,
          currentStudents: 0,
          startDate: new Date('2023-10-05'),
          sessions: [
            { day: 'Sat', startTime: '08:00', endTime: '10:00' },
            { day: 'Sun', startTime: '08:00', endTime: '10:00' }
          ] as ClassSession[],
          teacherName: 'Lê Văn C'
        },
        
        // --- Classes for Branch 02 (HCM) ---
        {
          id: 'class-03',
          branchId: 'branch-02',
          name: 'TOEIC Căn Bản',
          code: 'TOEIC-B-01',
          status: ClassStatus.ACTIVE,
          maxStudents: 30,
          currentStudents: 0,
          startDate: new Date('2023-08-15'),
          sessions: [
            { day: 'Mon', startTime: '09:00', endTime: '10:30' },
            { day: 'Wed', startTime: '09:00', endTime: '10:30' },
            { day: 'Fri', startTime: '09:00', endTime: '10:30' }
          ] as ClassSession[],
          teacherName: 'Phạm Văn D'
        },
        {
          id: 'class-04',
          branchId: 'branch-02',
          name: 'Kỹ Năng Giao Tiếp Nâng Cao',
          code: 'COM-002',
          status: ClassStatus.COMPLETED,
          maxStudents: 20,
          currentStudents: 0,
          startDate: new Date('2023-01-10'),
          endDate: new Date('2023-04-10'),
          sessions: [
            { day: 'Tue', startTime: '14:00', endTime: '16:00' },
            { day: 'Thu', startTime: '14:00', endTime: '16:00' },
            { day: 'Sat', startTime: '14:00', endTime: '16:00' }
          ] as ClassSession[],
          teacherName: 'Hoàng Thị E'
        }
      ];

      classes.forEach(data => {
        const classEntity = Class.create({
          id: ClassId.create(data.id),
          branchId: BranchId.create(data.branchId),
          name: data.name,
          code: data.code,
          status: data.status,
          maxStudents: data.maxStudents,
          currentStudents: data.currentStudents,
          startDate: data.startDate,
          endDate: data.endDate,
          sessions: data.sessions, // Pass directly to create
          teacherName: data.teacherName
        }).getValue();

        classStore.set(classEntity.id.toString(), classEntity);
      });
      
      this.persist();
    }
  }

  private persist() {
    try {
      const dataToSave = Array.from(classStore.values()).map(c => ({
        id: c.id.toString(),
        branchId: c.branchId.toString(),
        name: c.name,
        code: c.code,
        status: c.status,
        maxStudents: c.maxStudents,
        currentStudents: c.currentStudents,
        startDate: c.startDate,
        endDate: c.endDate,
        sessions: c.sessions, // Getter is public, no need for 'as any'
        teacherName: c.teacherName
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.error('[MockClassDataSource] Failed to save to localStorage', e);
    }
  }

  private hydrateClass(data: any): Class {
    const result = Class.create({
      id: ClassId.create(data.id),
      branchId: BranchId.create(data.branchId),
      name: data.name,
      code: data.code,
      status: data.status,
      maxStudents: data.maxStudents,
      currentStudents: data.currentStudents,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : undefined,
      sessions: data.sessions || [],
      teacherName: data.teacherName
    });

    if (result.isFailure) {
      throw new Error(`Failed to hydrate class ${data.id}: ${result.getErrorValue()}`);
    }

    return result.getValue();
  }

  // Helper: Tính toán sĩ số thực tế từ MockStudentDataSource
  private getRealStudentCount(classId: string): number {
    try {
      const studentsJson = localStorage.getItem('mock_students_db_v6');
      if (!studentsJson) return 0;
      const students = JSON.parse(studentsJson);
      
      // Đếm học viên có enrollment vào classId này và status là active
      return students.filter((s: any) => 
        s.status === 'active' && 
        s.enrollments.some((e: any) => e.classId === classId && e.status === 'active')
      ).length;
    } catch (e) {
      return 0;
    }
  }

  async getByBranchId(branchId: string): Promise<Class[]> {
    await new Promise(resolve => setTimeout(resolve, 400)); // Simulate network delay
    const all = Array.from(classStore.values());
    
    let filtered = branchId 
      ? all.filter(c => c.branchId.toString() === branchId)
      : all;

    // Cập nhật sĩ số thực tế trước khi trả về
    filtered = filtered.map(c => {
      const realCount = this.getRealStudentCount(c.id.toString());
      return c.updateInfo({ currentStudents: realCount }).isSuccess ? c : c;
    });

    return filtered;
  }

  async save(classEntity: Class): Promise<void> {
    classStore.set(classEntity.id.toString(), classEntity);
    this.persist();
  }

  async getById(id: string): Promise<Class | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const cls = classStore.get(id);
    if (!cls) return null;

    // Cập nhật sĩ số thực tế
    const realCount = this.getRealStudentCount(id);
    cls.updateInfo({ currentStudents: realCount });
    
    return cls;
  }

   
   async getAll(): Promise<Class[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const all = Array.from(classStore.values());
    // Cập nhật sĩ số thực tế
    return all.map(c => {
      const realCount = this.getRealStudentCount(c.id.toString());
      c.updateInfo({ currentStudents: realCount });
      return c;
    });
  }
  async update(classEntity: Class): Promise<void> {
    await this.save(classEntity);
  }

  async delete(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    classStore.delete(id);
    this.persist();
  }
}