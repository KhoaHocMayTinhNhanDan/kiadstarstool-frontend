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
    if (classStore.size > 0) return;

    console.log('[MockClassDataSource] Seeding initial class data...');
    
    const classes = [
      // Classes for Branch 1 (Center A)
      {
        id: 'mock-class-1',
        branchId: 'mock-branch-1',
        name: 'English for Kids (K1)',
        code: 'ENG-K1-001',
        status: ClassStatus.ACTIVE,
        maxStudents: 20,
        currentStudents: 15,
        startDate: new Date('2023-09-01'),
      },
      {
        id: 'mock-class-2',
        branchId: 'mock-branch-1',
        name: 'IELTS Prep (I1)',
        code: 'IELTS-001',
        status: ClassStatus.PLANNED,
        maxStudents: 15,
        currentStudents: 5,
        startDate: new Date('2023-11-01'),
      },
      // Classes for Branch 2 (Center B)
      {
        id: 'mock-class-3',
        branchId: 'mock-branch-2',
        name: 'TOEIC Basic',
        code: 'TOEIC-B-01',
        status: ClassStatus.ACTIVE,
        maxStudents: 30,
        currentStudents: 28,
        startDate: new Date('2023-08-15'),
      },
      {
        id: 'mock-class-4',
        branchId: 'mock-branch-2',
        name: 'Communication Skill',
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
    return Array.from(classStore.values()).filter(c => c.branchId.toString() === branchId);
  }

  async save(classEntity: Class): Promise<void> {
    classStore.set(classEntity.id.toString(), classEntity);
  }
}