import { Branch } from '@/01-entities/branch/Branch.entity';
import { BranchAddress } from '@/01-entities/branch/value-objects/BranchAddress.vo';
import { BranchCapacity } from '@/01-entities/branch/value-objects/BranchCapacity.vo';
import { BranchFinancial } from '@/01-entities/branch/value-objects/BranchFinancial.vo';
import { BranchId } from '@/01-entities/branch/value-objects/BranchId.vo';
import { BranchOperatingHours } from '@/01-entities/branch/value-objects/BranchOperatingHours.vo';
import { type IBranchDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/branch/IBranchDataSource';

// Mock in-memory storage
let branchStore = new Map<string, Branch>();
const STORAGE_KEY = 'mock_branches_db';

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
          id: 'mock-branch-1',
          name: 'KiadStars Center A',
          code: 'BR-001',
          street: '123 Main St',
          ward: 'Ward 1',
          district: 'District 1',
          city: 'Ho Chi Minh City',
          maxStudents: 200,
          currentStudents: 150,
          isActive: true
        },
        {
          id: 'mock-branch-2',
          name: 'KiadStars Center B',
          code: 'BR-002',
          street: '456 Le Loi',
          ward: 'Ward 4',
          district: 'District 3',
          city: 'Ho Chi Minh City',
          maxStudents: 150,
          currentStudents: 120,
          isActive: true
        },
        {
          id: 'mock-branch-3',
          name: 'KiadStars Hanoi Hub',
          code: 'BR-HN-01',
          street: '789 Kim Ma',
          ward: 'Ngoc Khanh',
          district: 'Ba Dinh',
          city: 'Hanoi',
          maxStudents: 300,
          currentStudents: 280,
          isActive: true
        },
        {
          id: 'mock-branch-4',
          name: 'KiadStars Da Nang',
          code: 'BR-DN-01',
          street: '101 Nguyen Van Linh',
          ward: 'Nam Duong',
          district: 'Hai Chau',
          city: 'Da Nang',
          maxStudents: 100,
          currentStudents: 45,
          isActive: true
        },
        {
          id: 'mock-branch-5',
          name: 'KiadStars Can Tho (Coming Soon)',
          code: 'BR-CT-01',
          street: '202 30/4 Street',
          ward: 'Xuan Khanh',
          district: 'Ninh Kieu',
          city: 'Can Tho',
          maxStudents: 120,
          currentStudents: 0,
          isActive: false // Inactive branch
        },
        {
          id: 'mock-branch-6',
          name: 'KiadStars Online HQ',
          code: 'BR-ONLINE',
          street: 'Virtual Office',
          ward: '-',
          district: '-',
          city: 'Global',
          maxStudents: 1000,
          currentStudents: 850,
          isActive: true
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
    return Array.from(branchStore.values());
  }

  async exists(code: string): Promise<boolean> {
    console.log('[MockBranchDataSource] Checking existence for code:', code);
    await new Promise(resolve => setTimeout(resolve, 300));
    const branches = Array.from(branchStore.values());
    return branches.some(b => b.code === code);
  }
}