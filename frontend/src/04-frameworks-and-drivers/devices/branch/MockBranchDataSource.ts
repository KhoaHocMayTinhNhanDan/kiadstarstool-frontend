import { Branch } from '@/01-entities/branch/Branch.entity';
import { BranchAddress } from '@/01-entities/branch/value-objects/BranchAddress.vo';
import { BranchCapacity } from '@/01-entities/branch/value-objects/BranchCapacity.vo';
import { BranchFinancial } from '@/01-entities/branch/value-objects/BranchFinancial.vo';
import { BranchId } from '@/01-entities/branch/value-objects/BranchId.vo';
import { BranchOperatingHours } from '@/01-entities/branch/value-objects/BranchOperatingHours.vo';
import { type IBranchDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/branch/IBranchDataSource';
import { mockDatabase } from '@/04-frameworks-and-drivers/database/LocalStorage';

// Helper để lấy dữ liệu thô từ Value Object (xử lý trường hợp VO bọc trong 'props')
const getVOProps = (vo: any) => (vo && vo.props) ? vo.props : vo;

export class MockBranchDataSource implements IBranchDataSource {
  constructor() {
    this.initialize();
  }

  private initialize() {
    let branchStore = mockDatabase.getCollection<any>('branches');

    if (branchStore.length === 0) {
      console.log('[MockBranchDataSource] Seeding initial data...');
      // In a real DB, currentStudents would be a denormalized field.
      // The anti-pattern of calculating it on-the-fly is removed.
      const seedData = [
        {
          id: 'branch-01', // Cơ sở A
          name: 'KiadStars Chi Nhánh Hà Nội',
          code: 'BR-HN-01',
          address: {
            street: '18 Hoàng Quốc Việt',
            ward: 'Nghĩa Đô',
            district: 'Cầu Giấy',
            city: 'Hà Nội'
          },
          capacity: {
            maxStudents: 500,
            currentStudents: 12,
            totalRooms: 10
          },
          isActive: true,
          financial: {
            bankAccount: '190320102023',
            taxCode: '0101234567',
            yearlyTarget: 5000000000,
            currency: 'VND',
            monthlyRevenue: 0,
            monthlyExpenses: 0
          },
          operatingHours: {
            monday: { open: '08:00', close: '21:00' },
            tuesday: { open: '08:00', close: '21:00' },
            wednesday: { open: '08:00', close: '21:00' },
            thursday: { open: '08:00', close: '21:00' },
            friday: { open: '08:00', close: '21:00' },
            saturday: { open: '08:00', close: '18:00' },
            sunday: { open: '08:00', close: '12:00' }
          }
        },
        {
          id: 'branch-02', // Cơ sở B
          name: 'KiadStars Chi Nhánh HCM',
          code: 'BR-HCM-01',
          address: {
            street: '202 Võ Văn Tần',
            ward: 'Phường 5',
            district: 'Quận 3',
            city: 'Hồ Chí Minh'
          },
          capacity: {
            maxStudents: 300,
            currentStudents: 6,
            totalRooms: 8
          },
          isActive: true,
          financial: {
            bankAccount: '0071000123456',
            taxCode: '0301234567',
            yearlyTarget: 3000000000,
            currency: 'VND',
            monthlyRevenue: 0,
            monthlyExpenses: 0
          },
          operatingHours: {
            monday: { open: '09:00', close: '21:00' },
            tuesday: { open: '09:00', close: '21:00' },
            wednesday: { open: '09:00', close: '21:00' },
            thursday: { open: '09:00', close: '21:00' },
            friday: { open: '09:00', close: '21:00' },
            saturday: { open: '08:00', close: '17:00' },
            sunday: { open: '08:00', close: '12:00' }
          }
        },
        {
          id: 'branch-03',
          name: 'KiadStars Cần Thơ (Sắp khai trương)',
          code: 'BR-CT-01',
          address: {
            street: '202 30/4 Street',
            ward: 'Xuan Khanh',
            district: 'Ninh Kieu',
            city: 'Can Tho'
          },
          capacity: {
            maxStudents: 120,
            currentStudents: 0,
            totalRooms: 5
          },
          isActive: false // Inactive branch
        }
      ];

      mockDatabase.setCollection('branches', seedData);
    }
  }

  private hydrate(data: any): Branch {
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

  async save(branch: Branch): Promise<void> {
    console.log('[MockBranchDataSource] Saving branch:', branch);
    await new Promise(resolve => setTimeout(resolve, 500));
    const branchStore = mockDatabase.getCollection<any>('branches');
    const index = branchStore.findIndex(b => b.id === branch.id.toString());

    const dataToSave = {
      id: branch.id.toString(),
      name: branch.name,
      code: branch.code,
      address: getVOProps(branch.address),
      capacity: getVOProps(branch.capacity),
      financial: getVOProps(branch.financial),
      operatingHours: getVOProps(branch.operatingHours),
      isActive: branch.isActive,
      createdAt: branch.createdAt,
      updatedAt: branch.updatedAt,
    };

    if (index > -1) {
      branchStore[index] = dataToSave;
    } else {
      branchStore.push(dataToSave);
    }
    mockDatabase.persist();
  }

  async getById(id: string): Promise<Branch | null> {
    console.log('[MockBranchDataSource] Finding branch by ID:', id);
    await new Promise(resolve => setTimeout(resolve, 300));
    const branchStore = mockDatabase.getCollection<any>('branches');
    const branchData = branchStore.find(b => b.id === id);
    return branchData ? this.hydrate(branchData) : null;
  }

  async delete(id: string): Promise<void> {
    console.log('[MockBranchDataSource] Deleting branch:', id);
    await new Promise(resolve => setTimeout(resolve, 500));
    let branchStore = mockDatabase.getCollection<any>('branches');
    branchStore = branchStore.filter(b => b.id !== id);
    mockDatabase.setCollection('branches', branchStore);
  }

  async findAll(): Promise<Branch[]> {
    console.log('[MockBranchDataSource] Finding all branches');
    await new Promise(resolve => setTimeout(resolve, 300));
    const branchStore = mockDatabase.getCollection<any>('branches');
    return branchStore.map(this.hydrate);
  }

  async exists(code: string): Promise<boolean> {
    console.log('[MockBranchDataSource] Checking existence for code:', code);
    await new Promise(resolve => setTimeout(resolve, 300));
    const branchStore = mockDatabase.getCollection<any>('branches');
    return branchStore.some(b => b.code === code);
  }

  saveInBatch(branch: Branch, batch: any): void {
    console.log('[MockBranchDataSource] Saving branch in batch:', branch.id.toString());
    const branchStore = mockDatabase.getCollection<any>('branches');
    const index = branchStore.findIndex(b => b.id === branch.id.toString());

    const dataToSave = {
      id: branch.id.toString(),
      name: branch.name,
      code: branch.code,
      address: getVOProps(branch.address),
      capacity: getVOProps(branch.capacity),
      financial: getVOProps(branch.financial),
      operatingHours: getVOProps(branch.operatingHours),
      isActive: branch.isActive,
      createdAt: branch.createdAt,
      updatedAt: branch.updatedAt,
    };

    if (index > -1) {
      branchStore[index] = dataToSave;
    } else {
      branchStore.push(dataToSave);
    }
    mockDatabase.persist();
  }
}