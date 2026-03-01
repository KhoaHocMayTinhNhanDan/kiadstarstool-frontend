import { Branch } from '../../../../src/01-entities/branch/Branch.entity';
import { BranchAddress } from '../../../../src/01-entities/branch/value-objects/BranchAddress.vo';
import { BranchCapacity } from '../../../../src/01-entities/branch/value-objects/BranchCapacity.vo';
import { BranchFinancial } from '../../../../src/01-entities/branch/value-objects/BranchFinancial.vo';
import { BranchOperatingHours } from '../../../../src/01-entities/branch/value-objects/BranchOperatingHours.vo';

describe('Branch Entity', () => {
  // Helper để tạo props hợp lệ
  const createValidProps = () => ({
    name: 'Test Branch',
    code: 'TEST-01',
    address: BranchAddress.create({ city: 'Hanoi' }),
    capacity: BranchCapacity.create({ maxStudents: 10, currentStudents: 0 }),
    financial: BranchFinancial.create(),
    operatingHours: BranchOperatingHours.create(),
  });

  describe('create', () => {
    it('should create a valid branch with audit fields', () => {
      const props = createValidProps();
      const result = Branch.create(props);

      expect(result.isSuccess).toBe(true);
      const branch = result.getValue();
      
      expect(branch.name).toBe('Test Branch');
      expect(branch.code).toBe('TEST-01');
      expect(branch.id).toBeDefined();
      // Kiểm tra Audit fields được tự động thêm
      expect(branch.createdAt).toBeInstanceOf(Date);
      expect(branch.updatedAt).toBeInstanceOf(Date);
    });

    it('should fail if name is empty', () => {
      const props = createValidProps();
      const result = Branch.create({ ...props, name: '' });

      expect(result.isFailure).toBe(true);
      expect(result.getErrorValue()).toContain('Branch name is required');
    });

    it('should fail if code is empty', () => {
      const props = createValidProps();
      const result = Branch.create({ ...props, code: '   ' });

      expect(result.isFailure).toBe(true);
      expect(result.getErrorValue()).toContain('Branch code is required');
    });
  });

  describe('addStudent', () => {
    it('should increase student count when capacity is available', () => {
      const props = createValidProps();
      // max 10, current 0
      const branch = Branch.create(props).getValue();

      const result = branch.addStudent();

      expect(result.isSuccess).toBe(true);
      const updatedBranch = result.getValue();
      expect(updatedBranch.capacity.currentStudents).toBe(1);
      // Kiểm tra tính bất biến (Immutability): branch cũ không đổi
      expect(branch.capacity.currentStudents).toBe(0);
    });

    it('should fail when branch is full', () => {
      const props = createValidProps();
      // max 1, current 1
      const capacity = BranchCapacity.create({ maxStudents: 1, currentStudents: 1 });
      const branch = Branch.create({ ...props, capacity }).getValue();

      const result = branch.addStudent();

      expect(result.isFailure).toBe(true);
      expect(result.getErrorValue()).toContain('Branch is full');
    });
  });
});