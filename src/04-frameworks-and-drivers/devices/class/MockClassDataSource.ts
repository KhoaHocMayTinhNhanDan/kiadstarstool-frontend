import { Class } from '@/01-entities/classes/Class.entity';
import { ClassId } from '@/01-entities/classes/value-objects/ClassId.vo';
import { BranchId } from '@/01-entities/branch/value-objects/BranchId.vo';
import { ClassStatus } from '@/01-entities/classes/ClassStatus.enum';
import { type IClassDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/class/IClassDataSource';

let classStore = new Map<string, Class>();

export class MockClassDataSource implements IClassDataSource {
  constructor() {
    this.initialize();
  }

  private initialize() {
    // Reset store để đảm bảo dữ liệu luôn đồng bộ khi code thay đổi (HMR)
    classStore.clear();

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
        currentStudents: 15,
        startDate: new Date('2023-09-01'),
      },
      {
        id: 'class-02',
        branchId: 'branch-01',
        name: 'Luyện thi IELTS Intensive',
        code: 'IELTS-001',
        status: ClassStatus.ACTIVE,
        maxStudents: 15,
        currentStudents: 10,
        startDate: new Date('2023-11-01'),
      },
      {
        id: 'class-05', // Lớp thứ 3 tại HN
        branchId: 'branch-01',
        name: 'Tiếng Anh Thiếu Nhi (Starters)',
        code: 'KID-ST-01',
        status: ClassStatus.ACTIVE,
        maxStudents: 20,
        currentStudents: 18,
        startDate: new Date('2023-10-05'),
      },
      
      // --- Classes for Branch 02 (HCM) ---
      {
        id: 'class-03',
        branchId: 'branch-02',
        name: 'TOEIC Căn Bản',
        code: 'TOEIC-B-01',
        status: ClassStatus.ACTIVE,
        maxStudents: 30,
        currentStudents: 28,
        startDate: new Date('2023-08-15'),
      },
      {
        id: 'class-04',
        branchId: 'branch-02',
        name: 'Kỹ Năng Giao Tiếp Nâng Cao',
        code: 'COM-002',
        status: ClassStatus.COMPLETED,
        maxStudents: 20,
        currentStudents: 20,
        startDate: new Date('2023-01-10'),
        endDate: new Date('2023-04-10'),
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
        endDate: data.endDate
      }).getValue();

      classStore.set(classEntity.id.toString(), classEntity);
    });
  }

  async getByBranchId(branchId: string): Promise<Class[]> {
    await new Promise(resolve => setTimeout(resolve, 400)); // Simulate network delay
    const all = Array.from(classStore.values());
    if (!branchId) return all; // Trả về tất cả nếu không lọc theo chi nhánh
    return all.filter(c => c.branchId.toString() === branchId);
  }

  async save(classEntity: Class): Promise<void> {
    classStore.set(classEntity.id.toString(), classEntity);
  }

  async getById(id: string): Promise<Class | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return classStore.get(id) || null;
  }

  async update(classEntity: Class): Promise<void> {
    await this.save(classEntity);
  }

  async delete(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    classStore.delete(id);
  }
}