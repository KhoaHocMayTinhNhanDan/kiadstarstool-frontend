import { type IStudentDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/students/IStudentDataSource';
import { Student } from '@/01-entities/students/Student.entity';

export class MockStudentDataSource implements IStudentDataSource {
  private students = [
    // --- Students in Branch 01 (Hà Nội) ---
    // CASE 1: Học viên học tại 2 cơ sở (Bản ghi tại HN)
    {
      id: 'student-01',
      name: 'Nguyễn Văn An',
      email: 'an.nguyen@example.com',
      phone: '0901234567',
      status: 'active',
      enrollments: [
        { branchId: 'branch-01', classId: 'class-01', status: 'active', joinedDate: '2023-01-15' }
      ]
    },
    // CASE 2: Chuyển cơ sở (Bản ghi cũ tại HN - Đã nghỉ)
    {
      id: 'student-transfer-old',
      name: 'Trần Thị Bình',
      email: 'binh.tran@example.com',
      phone: '0909876543',
      status: 'active', // Tài khoản vẫn active, nhưng enrollment cũ inactive
      enrollments: [
        { branchId: 'branch-01', classId: 'class-01', status: 'transferred', joinedDate: '2023-02-20', endDate: '2023-07-01' }
      ]
    },
    {
      id: 'student-03',
      name: 'Lê Văn Cường',
      email: 'cuong.le@example.com',
      status: 'active',
      enrollments: [
        { branchId: 'branch-01', classId: 'class-01', status: 'dropped', joinedDate: '2022-11-10', endDate: '2023-01-01' }
      ]
    },
    // CASE 3: Học 3 lớp tại cơ sở A (Multi-class)
    {
      id: 'student-04',
      name: 'Phạm Thị Dung',
      email: 'dung.pham@example.com',
      phone: '0912345678',
      status: 'active',
      enrollments: [
        { branchId: 'branch-01', classId: 'class-01', status: 'active', joinedDate: '2023-03-05' },
        { branchId: 'branch-01', classId: 'class-02', status: 'active', joinedDate: '2023-03-05' },
        { branchId: 'branch-01', classId: 'class-05', status: 'active', joinedDate: '2023-10-05' }
      ]
    },

    // --- Students in Branch 02 (HCM) ---
    {
      id: 'student-05',
      name: 'Hoàng Văn Em',
      email: 'em.hoang@example.com',
      status: 'active',
      enrollments: [
        { branchId: 'branch-02', classId: 'class-03', status: 'active', joinedDate: '2023-04-01' }
      ]
    },
    // CASE 1: Học viên học tại 2 cơ sở (Bản ghi tại HCM - ID khác, cùng thông tin cá nhân)
    {
      id: 'student-01-hcm',
      name: 'Nguyễn Văn An',
      email: 'an.nguyen@example.com',
      phone: '0901234567',
      status: 'active',
      enrollments: [
        { branchId: 'branch-02', classId: 'class-03', status: 'active', joinedDate: '2023-06-15' }
      ]
    },
    // CASE 2: Chuyển cơ sở (Bản ghi mới tại HCM - Đang học)
    {
      id: 'student-transfer-new',
      name: 'Trần Thị Bình',
      email: 'binh.tran@example.com',
      status: 'active',
      enrollments: [
        { branchId: 'branch-02', classId: 'class-03', status: 'active', joinedDate: '2023-07-20' }
      ]
    }
  ];

  async getByBranchId(branchId: string): Promise<any[]> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
    if (!branchId) return this.students; // Trả về tất cả nếu không có branchId
    
    // Lọc học viên có enrollment active tại branchId
    return this.students.filter(s => 
      s.enrollments.some((e: any) => e.branchId === branchId && e.status === 'active')
    );
  }

  async getById(id: string): Promise<any | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.students.find(s => s.id === id) || null;
  }

  async save(student: Student): Promise<void> {
    this.students.push({
      id: student.id.toString(),
      name: student.name,
      email: student.email,
      phone: student.phone,
      status: student.status,
      enrollments: student.enrollments.map(e => ({ ...e.props, joinedDate: e.joinedDate.toISOString() }))
    });
  }
}