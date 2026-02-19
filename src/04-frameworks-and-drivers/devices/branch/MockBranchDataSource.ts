import { Branch } from '@/01-entities/branch/Branch.entity';
import { BranchAddress } from '@/01-entities/branch/value-objects/BranchAddress.vo';
import { BranchCapacity } from '@/01-entities/branch/value-objects/BranchCapacity.vo';
import { BranchFinancial } from '@/01-entities/branch/value-objects/BranchFinancial.vo';
import { BranchId } from '@/01-entities/branch/value-objects/BranchId.vo';
import { BranchOperatingHours } from '@/01-entities/branch/value-objects/BranchOperatingHours.vo';
import { type IBranchDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/branch/IBranchDataSource';

// Mock in-memory storage
let branchStore = new Map<string, Branch>();
const STORAGE_KEY = 'mock_branches_db_v7';

// Helper để lấy dữ liệu thô từ Value Object (xử lý trường hợp VO bọc trong 'props')
const getVOProps = (vo: any) => (vo && vo.props) ? vo.props : vo;

export class MockBranchDataSource implements IBranchDataSource {
  constructor() {
    this.initialize();
  }

  private initialize() {
    // 1. Try to load from localStorage
    const storedData = localStorage.getItem(STORAGE_KEY);
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        // Re-hydrate entities from JSON
        branchStore = new Map(parsedData.map((item: any) => [item.id, this.hydrateBranch(item)]));
        console.log('[MockBranchDataSource] Loaded data from localStorage', branchStore.size);
      } catch (e) {
        console.error('[MockBranchDataSource] Failed to parse localStorage data', e);
      }
    }

    // 2. If empty, seed data
    if (branchStore.size === 0) {
      console.log('[MockBranchDataSource] Seeding initial data...');
      const branches = [
        {
          id: 'branch-01', // Cơ sở A
          name: 'KiadStars Hội Sở (Hà Nội)',
          code: 'BR-HN-01',
          street: '18 Hoàng Quốc Việt',
          ward: 'Nghĩa Đô',
          district: 'Cầu Giấy',
          city: 'Hà Nội',
          maxStudents: 500,
          currentStudents: 320,
          isActive: true
        },
        {
          id: 'branch-02', // Cơ sở B
          name: 'KiadStars Chi Nhánh HCM',
          code: 'BR-HCM-01',
          street: '202 Võ Văn Tần',
          ward: 'Phường 5',
          district: 'Quận 3',
          city: 'Hồ Chí Minh',
          maxStudents: 300,
          currentStudents: 150,
          isActive: true
        },
        {
          id: 'branch-03',
          name: 'KiadStars Cần Thơ (Sắp khai trương)',
          code: 'BR-CT-01',
          street: '202 30/4 Street',
          ward: 'Xuan Khanh',
          district: 'Ninh Kieu',
          city: 'Can Tho',
          maxStudents: 120,
          currentStudents: 0,
          isActive: false // Inactive branch
        }
      ];

      branches.forEach(data => {
        const branch = Branch.create({
          id: BranchId.create(data.id),
          name: data.name,
          code: data.code,
          address: BranchAddress.create({
            street: data.street,
            ward: data.ward,
            district: data.district,
            city: data.city
          }),
          capacity: BranchCapacity.create({ maxStudents: data.maxStudents, currentStudents: data.currentStudents }),
          financial: BranchFinancial.create(),
          operatingHours: BranchOperatingHours.create(),
          isActive: data.isActive
        }).getValue();
        
        branchStore.set(branch.id.toString(), branch);
      });
      
      this.persist();
    }
  }

  private persist() {
    try {
      // Convert Map to Array for JSON serialization
      // We need to serialize the internal state of entities, or use a toJSON method if available.
      // For simplicity here, we'll map to a plain object structure that matches what we need to re-hydrate.
      // Ideally, entities should have a toDTO() or similar method.
      const dataToSave = Array.from(branchStore.values()).map(branch => ({
        ...branch, // This spreads public readonly properties
        // Ensure nested VOs are serialized correctly if they don't auto-serialize well
        id: branch.id.toString(),
        createdAt: branch.createdAt, // Explicitly save audit fields
        updatedAt: branch.updatedAt,
        address: getVOProps(branch.address),
        capacity: getVOProps(branch.capacity),
        financial: getVOProps(branch.financial),
        operatingHours: getVOProps(branch.operatingHours)
      }));
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.error('[MockBranchDataSource] Failed to save to localStorage', e);
    }
  }

  private hydrateBranch(data: any): Branch {
    // Re-create Branch entity from plain object
    return Branch.create({
      id: BranchId.create(data.id),
      name: data.name,
      code: data.code,
      address: BranchAddress.create(data.address),
      capacity: BranchCapacity.create(data.capacity),
      financial: BranchFinancial.create(data.financial),
      operatingHours: BranchOperatingHours.create(data.operatingHours),
      isActive: data.isActive,
      createdAt: data.createdAt ? new Date(data.createdAt) : undefined,
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : undefined,
    }).getValue();
  }

  // Helper: Tính toán sĩ số thực tế từ MockStudentDataSource
  private getRealStudentCount(branchId: string): number {
    try {
      const studentsJson = localStorage.getItem('mock_students_db_v9');
      if (!studentsJson) return 0;
      const students = JSON.parse(studentsJson);
      
      // Đếm học viên thuộc branchId này và status là active
      return students.filter((s: any) => 
        s.status === 'active' && 
        s.enrollments.some((e: any) => e.branchId === branchId && e.status === 'active')
      ).length;
    } catch (e) {
      return 0;
    }
  }

  async save(branch: Branch): Promise<void> {
    console.log('[MockBranchDataSource] Saving branch:', branch);
    await new Promise(resolve => setTimeout(resolve, 500));
    branchStore.set(branch.id.toString(), branch);
    this.persist();
  }

  async getById(id: string): Promise<Branch | null> {
    console.log('[MockBranchDataSource] Finding branch by ID:', id);
    await new Promise(resolve => setTimeout(resolve, 300));
    const branch = branchStore.get(id);
    
    if (branch) {
      // Cập nhật sĩ số thực tế (Mock logic: update trực tiếp vào entity trong memory)
      const realCount = this.getRealStudentCount(id);
      // Lưu ý: Branch entity cần method updateCapacity hoặc ta tạo lại Capacity VO
      // Vì Mock nên ta có thể "cheat" một chút để UI đúng. Cần check isSuccess để tránh crash.
      (branch as any)._capacity = BranchCapacity.create({ maxStudents: branch.capacity.maxStudents, currentStudents: realCount });
    }
    return branch || null;
  }

  async delete(id: string): Promise<void> {
    console.log('[MockBranchDataSource] Deleting branch:', id);
    await new Promise(resolve => setTimeout(resolve, 500));
    branchStore.delete(id);
    this.persist();
  }

  async findAll(): Promise<Branch[]> {
    console.log('[MockBranchDataSource] Finding all branches');
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const branches = Array.from(branchStore.values());
    return branches.map(b => {
      const realCount = this.getRealStudentCount(b.id.toString());
      (b as any)._capacity = BranchCapacity.create({ maxStudents: b.capacity.maxStudents, currentStudents: realCount });
      return b;
    });
  }

  async exists(code: string): Promise<boolean> {
    console.log('[MockBranchDataSource] Checking existence for code:', code);
    await new Promise(resolve => setTimeout(resolve, 300));
    const branches = Array.from(branchStore.values());
    return branches.some(b => b.code === code);
  }
}