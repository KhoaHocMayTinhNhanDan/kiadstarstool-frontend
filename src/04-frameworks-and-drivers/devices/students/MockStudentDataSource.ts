import { type IStudentDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/students/IStudentDataSource';

export class MockStudentDataSource implements IStudentDataSource {
  private students = [
    {
      id: 'student-1',
      branchId: 'mock-branch-1',
      name: 'Nguyen Van A',
      email: 'nguyenvana@example.com',
      phone: '0901234567',
      status: 'active',
      joinedDate: '2023-01-15'
    },
    {
      id: 'student-2',
      branchId: 'mock-branch-1',
      name: 'Tran Thi B',
      email: 'tranthib@example.com',
      phone: '0909876543',
      status: 'active',
      joinedDate: '2023-02-20'
    },
    {
      id: 'student-3',
      branchId: 'mock-branch-1',
      name: 'Le Van C',
      email: 'levanc@example.com',
      status: 'inactive',
      joinedDate: '2022-11-10'
    },
    {
      id: 'student-4',
      branchId: 'mock-branch-2',
      name: 'Pham Thi D',
      email: 'phamthid@example.com',
      phone: '0912345678',
      status: 'active',
      joinedDate: '2023-03-05'
    },
    {
      id: 'student-5',
      branchId: 'mock-branch-2',
      name: 'Hoang Van E',
      email: 'hoangvane@example.com',
      status: 'active',
      joinedDate: '2023-04-01'
    }
  ];

  async getByBranchId(branchId: string): Promise<any[]> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
    return this.students.filter(s => s.branchId === branchId);
  }
}