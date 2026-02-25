import { Class, type ClassProps } from '@/01-entities/classes/Class.entity';
import { ClassId } from '@/01-entities/classes/value-objects/ClassId.vo';
import { BranchId } from '@/01-entities/branch/value-objects/BranchId.vo';
import { ClassStatus } from '@/01-entities/classes/ClassStatus.enum';
import { type IClassDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/class/IClassDataSource';
import { type ClassSession } from '@/01-entities/classes/ClassSession';
import { mockDatabase } from '@/04-frameworks-and-drivers/database/LocalStorage';

export class MockClassDataSource implements IClassDataSource {
  constructor() {
    this.initialize();
  }

  // This now seeds the central mock database if it's empty
  private initialize() {
    let classStore = mockDatabase.getCollection<any>('classes');

    if (classStore.length === 0) {
      console.log('[MockClassDataSource] Seeding initial class data...');
      
      // In a real DB, currentStudents would be a denormalized field updated by transactions/triggers.
      // Here, we seed it with a realistic static number. The anti-pattern of calculating it on-the-fly is removed.
      const seedData = [
        // --- Classes for Branch 01 (Hà Nội) ---
        {
          id: 'class-01',
          branchId: 'branch-01',
          name: 'Tiếng Anh Giao Tiếp (K12)',
          code: 'ENG-K1-001',
          status: ClassStatus.ACTIVE,
          maxStudents: 20,
          currentStudents: 5, // Static denormalized count
          startDate: new Date('2025-11-15'), // Bắt đầu trong quá khứ, vẫn đang active
          sessions: [
            { day: 'Mon', startTime: '18:00', endTime: '19:30' },
            { day: 'Wed', startTime: '18:00', endTime: '19:30' },
            { day: 'Fri', startTime: '18:00', endTime: '19:30' }
          ] as ClassSession[],
          teacherName: 'Nguyễn Văn A',
          tuition: { courseFee: 5000000, monthlyFee: 1500000, sessionFee: 250000, currency: 'VND' }
        },
        {
          id: 'class-02',
          branchId: 'branch-01',
          name: 'Luyện thi IELTS Intensive',
          code: 'IELTS-001',
          status: ClassStatus.ACTIVE,
          maxStudents: 15,
          currentStudents: 4, // Static denormalized count
          startDate: new Date('2026-01-15'), // Bắt đầu trong quá khứ, vẫn đang active
          sessions: [
            { day: 'Tue', startTime: '19:30', endTime: '21:00' },
            { day: 'Thu', startTime: '19:30', endTime: '21:00' },
            { day: 'Sat', startTime: '19:30', endTime: '21:00' }
          ] as ClassSession[],
          teacherName: 'Trần Thị B',
          tuition: { sessionFee: 350000, monthlyFee: 3000000, currency: 'VND' }
        },
        {
          id: 'class-05', // Lớp thứ 3 tại HN
          branchId: 'branch-01',
          name: 'Tiếng Anh Thiếu Nhi (Starters)',
          code: 'KID-ST-01',
          status: ClassStatus.ACTIVE,
          maxStudents: 20,
          currentStudents: 3, // Static denormalized count
          startDate: new Date('2025-12-15'), // Bắt đầu trong quá khứ, vẫn đang active
          sessions: [
            { day: 'Sat', startTime: '08:00', endTime: '10:00' },
            { day: 'Sat', startTime: '14:00', endTime: '16:00' },
            { day: 'Sun', startTime: '08:00', endTime: '10:00' }
          ] as ClassSession[],
          teacherName: 'Lê Văn C',
          tuition: { sessionFee: 200000, monthlyFee: 1600000, currency: 'VND' }
        },
        
        // --- Classes for Branch 02 (HCM) ---
        {
          id: 'class-03',
          branchId: 'branch-02',
          name: 'TOEIC Căn Bản',
          code: 'TOEIC-B-01',
          status: ClassStatus.ACTIVE,
          maxStudents: 30,
          currentStudents: 6, // Static denormalized count
          startDate: new Date('2025-11-20'), // Bắt đầu trong quá khứ, vẫn đang active
          sessions: [
            { day: 'Mon', startTime: '09:00', endTime: '10:30' },
            { day: 'Wed', startTime: '09:00', endTime: '10:30' },
            { day: 'Fri', startTime: '09:00', endTime: '10:30' }
          ] as ClassSession[],
          teacherName: 'Phạm Văn D',
          tuition: { courseFee: 4500000, monthlyFee: 1200000, currency: 'VND' }
        },
        {
          id: 'class-04',
          branchId: 'branch-02',
          name: 'Kỹ Năng Giao Tiếp Nâng Cao',
          code: 'COM-002',
          status: ClassStatus.COMPLETED,
          maxStudents: 20, // Lớp đã kết thúc vẫn có sĩ số
          currentStudents: 18,
          startDate: new Date('2025-01-10'), // Đã bắt đầu trong quá khứ
          endDate: new Date('2025-04-10'),   // Đã kết thúc trong quá khứ
          sessions: [
            { day: 'Tue', startTime: '14:00', endTime: '16:00' },
            { day: 'Thu', startTime: '14:00', endTime: '16:00' },
            { day: 'Sat', startTime: '14:00', endTime: '16:00' }
          ] as ClassSession[],
          teacherName: 'Hoàng Thị E',
          tuition: { courseFee: 6000000, currency: 'VND' }
        },
        // --- Lớp học tương lai & lớp đã kết thúc ---
        {
          id: 'class-future',
          branchId: 'branch-01',
          name: 'Lớp Tiếng Anh Sắp Khai Giảng',
          code: 'FUTURE-01',
          status: ClassStatus.PLANNED,
          maxStudents: 25,
          currentStudents: 0, // Lớp chưa mở
          startDate: new Date('2026-04-01'), // Ngày bắt đầu trong tương lai
          sessions: [
            { day: 'Mon', startTime: '18:00', endTime: '19:30' }
          ] as ClassSession[],
          teacherName: 'Giáo viên Mới',
          tuition: { courseFee: 5500000, currency: 'VND' }
        },
        {
          id: 'class-06',
          branchId: 'branch-01',
          name: 'Ngữ Pháp Nâng Cao',
          code: 'GRAMMAR-ADV',
          status: ClassStatus.ACTIVE,
          maxStudents: 20,
          currentStudents: 0, // Lớp mới, chưa có học viên
          startDate: new Date('2026-02-01'),
          sessions: [
            { day: 'Tue', startTime: '18:00', endTime: '19:30' },
            { day: 'Thu', startTime: '18:00', endTime: '19:30' }
          ] as ClassSession[],
          teacherName: 'Lê Văn C',
          tuition: { courseFee: 4000000, currency: 'VND' }
        },
        {
          id: 'class-07',
          branchId: 'branch-02',
          name: 'Luyện Nói IELTS',
          code: 'IELTS-SPK',
          status: ClassStatus.ACTIVE,
          maxStudents: 10,
          currentStudents: 0, // Lớp mới, chưa có học viên
          startDate: new Date('2026-02-10'),
          sessions: [
            { day: 'Wed', startTime: '19:00', endTime: '20:30' }
          ] as ClassSession[],
          teacherName: 'Hoàng Thị E',
          tuition: { sessionFee: 400000, currency: 'VND' }
        },
        {
          id: 'class-08',
          branchId: 'branch-01',
          name: 'Tiếng Anh Doanh Nghiệp',
          code: 'BIZ-ENG-01',
          status: ClassStatus.ACTIVE,
          maxStudents: 18,
          currentStudents: 0, // Lớp mới, chưa có học viên
          startDate: new Date('2025-12-01'),
          sessions: [
            { day: 'Fri', startTime: '14:00', endTime: '15:30' }
          ] as ClassSession[],
          teacherName: 'Trần Thị B',
          tuition: { courseFee: 10000000, currency: 'VND' }
        },
        {
          id: 'class-09',
          branchId: 'branch-02',
          name: 'TOEIC Nâng Cao',
          code: 'TOEIC-A-01',
          status: ClassStatus.ACTIVE,
          maxStudents: 25,
          currentStudents: 0, // Lớp mới, chưa có học viên
          startDate: new Date('2026-01-20'),
          sessions: [
            { day: 'Tue', startTime: '09:00', endTime: '10:30' },
            { day: 'Thu', startTime: '09:00', endTime: '10:30' }
          ] as ClassSession[],
          teacherName: 'Phạm Văn D',
          tuition: { courseFee: 6500000, currency: 'VND' }
        }
      ];

      mockDatabase.setCollection('classes', seedData);
    }
  }

  private hydrate(data: any): Class {
    const result = Class.create({
      id: ClassId.create(data.id),
      branchId: BranchId.create(data.branchId),
      name: data.name,
      code: data.code,
      status: data.status,
      maxStudents: data.maxStudents,
      // The count is now read directly from the stored data.
      currentStudents: data.currentStudents || 0,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : undefined,
      sessions: data.sessions || [],
      teacherName: data.teacherName,
      tuition: data.tuition
    });

    if (result.isFailure) {
      throw new Error(`Failed to hydrate class ${data.id}: ${result.getErrorValue()}`);
    }

    return result.getValue();
  }

  async getByBranchId(branchId: string): Promise<Class[]> {
    await new Promise(resolve => setTimeout(resolve, 400)); // Simulate network delay
    const classStore = mockDatabase.getCollection<any>('classes');
    
    const filtered = branchId 
      ? classStore.filter(c => c.branchId === branchId)
      : classStore;

    // No longer calculating student count on the fly. We just hydrate what's in the DB.
    return filtered.map(this.hydrate);
  }

  async save(classEntity: Class): Promise<void> {
    const classStore = mockDatabase.getCollection<any>('classes');
    const index = classStore.findIndex(c => c.id === classEntity.id.toString());

    const dataToSave = {
      id: classEntity.id.toString(),
      branchId: classEntity.branchId.toString(),
      name: classEntity.name,
      code: classEntity.code,
      status: classEntity.status,
      maxStudents: classEntity.maxStudents,
      currentStudents: classEntity.currentStudents,
      startDate: classEntity.startDate,
      endDate: classEntity.endDate,
      sessions: classEntity.sessions,
      teacherName: classEntity.teacherName,
      tuition: classEntity.tuition
    };

    if (index > -1) {
      classStore[index] = dataToSave;
    } else {
      classStore.push(dataToSave);
    }
    mockDatabase.persist();
  }

  async getById(id: string): Promise<Class | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const classStore = mockDatabase.getCollection<any>('classes');
    const cls = classStore.find(c => c.id === id);
    if (!cls) return null;

    return this.hydrate(cls);
  }

  async getAll(): Promise<Class[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const classStore = mockDatabase.getCollection<any>('classes');
    return classStore.map(this.hydrate);
  }
  async update(classEntity: Class): Promise<void> {
    await this.save(classEntity);
  }

  async delete(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    let classStore = mockDatabase.getCollection<any>('classes');
    classStore = classStore.filter(c => c.id !== id);
    mockDatabase.setCollection('classes', classStore);
  }
}