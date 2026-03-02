import { type IStudentDataSource, type StudentDTO } from '@/03-interface-adapters/gateways/outbound/device_interfaces/student/IStudentDataSource';
import { Student } from '@/01-entities/students/Student.entity';
import { mockDatabase } from '@/04-frameworks-and-drivers/database/LocalStorage';

export class MockStudentDataSource implements IStudentDataSource {
  constructor() {
    this.initialize();
  }

  // This now seeds the central mock database if it's empty
  private initialize() {
    let studentStore = mockDatabase.getCollection<StudentDTO>('students');

    if (studentStore.length > 0) {
      /*
      try {
        studentStore = JSON.parse(storedData) as StudentDTO[];
        
        // SANITIZE: Kiểm tra nếu có enrollment nào đang active mà tiền = 0 thì coi như data lỗi -> Reset
        const hasCorruptedData = studentStore.some(s => 
          s.enrollments && s.enrollments.some(e => e.status === 'active' && (e.tuitionAmount === 0 || e.tuitionAmount === undefined))
        );
        if (hasCorruptedData) {
          console.warn('[MockStudentDataSource] Phát hiện dữ liệu lỗi (Học phí = 0). Đang reset lại dữ liệu mẫu...');
          studentStore = []; // Xóa để seed lại từ đầu
        }
      } catch (e) {
        console.error('Failed to parse students', e);
        studentStore = [];
      }
      */
     return; // Already seeded
    }

    const seedData: StudentDTO[] = [
        // --- Students in Branch 01 (Hà Nội) ---
        // CASE 1: Học viên học tại 2 cơ sở (Bản ghi tại HN)
        {
          id: 'student-01',
          name: 'Nguyễn Văn An',
          email: 'an.nguyen@example.com',
          phone: '0901234567',
          status: 'active',
          enrollments: [
            { branchId: 'branch-01', classId: 'class-01', status: 'active', joinedDate: '2025-11-15', tuitionAmount: 5000000, paymentStatus: 'paid', prepaidSessions: 24, usedSessions: 5 }
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
            { branchId: 'branch-01', classId: 'class-01', status: 'transferred', joinedDate: '2025-02-20', endDate: '2025-07-01', tuitionAmount: 5000000, paymentStatus: 'paid', prepaidSessions: 24, usedSessions: 10 }
          ]
        },
        {
          id: 'student-03',
          name: 'Lê Văn Cường',
          email: 'cuong.le@example.com',
          status: 'active',
          enrollments: [
            { branchId: 'branch-01', classId: 'class-01', status: 'dropped', joinedDate: '2024-11-10', endDate: '2025-01-01', tuitionAmount: 5000000, paymentStatus: 'partial', prepaidSessions: 24, usedSessions: 4 }
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
            { branchId: 'branch-01', classId: 'class-01', status: 'active', joinedDate: '2025-11-20', tuitionAmount: 5000000, paymentStatus: 'paid', prepaidSessions: 24, usedSessions: 2 },
            { branchId: 'branch-01', classId: 'class-02', status: 'active', joinedDate: '2026-01-15', tuitionAmount: 8750000, paymentStatus: 'paid', prepaidSessions: 30, usedSessions: 1 },
            { branchId: 'branch-01', classId: 'class-05', status: 'active', joinedDate: '2025-12-15', tuitionAmount: 3000000, paymentStatus: 'unpaid', prepaidSessions: 15, usedSessions: 1 }
          ]
        },

        // --- Students in Branch 02 (HCM) ---
        {
          id: 'student-05',
          name: 'Hoàng Văn Em',
          email: 'em.hoang@example.com',
          status: 'active',
          enrollments: [
            { branchId: 'branch-02', classId: 'class-03', status: 'active', joinedDate: '2025-11-25', tuitionAmount: 4500000, paymentStatus: 'paid', prepaidSessions: 12, usedSessions: 11 } // Sắp hết hạn
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
            { branchId: 'branch-02', classId: 'class-03', status: 'active', joinedDate: '2025-12-01', tuitionAmount: 4500000, paymentStatus: 'paid', prepaidSessions: 12, usedSessions: 2 }
          ]
        },
        // CASE 2: Chuyển cơ sở (Bản ghi mới tại HCM - Đang học)
        {
          id: 'student-transfer-new',
          name: 'Trần Thị Bình',
          email: 'binh.tran@example.com',
          status: 'active',
          enrollments: [
            { branchId: 'branch-02', classId: 'class-03', status: 'active', joinedDate: '2025-07-20', tuitionAmount: 4500000, paymentStatus: 'paid', prepaidSessions: 24, usedSessions: 15 }
          ]
        },
        // --- Additional Students for Pagination Demo ---
        {
          id: 'student-08',
          name: 'Lý Thường Kiệt',
          email: 'kiet.ly@example.com',
          phone: '0911223344',
          status: 'active',
          enrollments: [
            { branchId: 'branch-01', classId: 'class-01', status: 'active', joinedDate: '2025-11-16', tuitionAmount: 5000000, paymentStatus: 'paid', prepaidSessions: 24, usedSessions: 6 }
          ]
        },
        {
          id: 'student-09',
          name: 'Trần Hưng Đạo',
          email: 'dao.tran@example.com',
          phone: '0922334455',
          status: 'active',
          enrollments: [
            { branchId: 'branch-01', classId: 'class-02', status: 'active', joinedDate: '2026-01-16', tuitionAmount: 8750000, paymentStatus: 'paid', prepaidSessions: 30, usedSessions: 0 }
          ]
        },
        {
          id: 'student-10',
          name: 'Ngô Quyền',
          email: 'quyen.ngo@example.com',
          phone: '0933445566',
          status: 'active',
          enrollments: [
            { branchId: 'branch-02', classId: 'class-03', status: 'active', joinedDate: '2025-11-21', tuitionAmount: 4500000, paymentStatus: 'paid', prepaidSessions: 12, usedSessions: 3 }
          ]
        },
        {
          id: 'student-11',
          name: 'Đinh Bộ Lĩnh',
          email: 'linh.dinh@example.com',
          phone: '0944556677',
          status: 'archived',
          enrollments: [
            { branchId: 'branch-01', classId: 'class-01', status: 'dropped', joinedDate: '2025-01-01', endDate: '2025-06-01', tuitionAmount: 5000000, paymentStatus: 'unpaid', prepaidSessions: 24, usedSessions: 0 }
          ]
        },
        {
          id: 'student-12',
          name: 'Lê Hoàn',
          email: 'hoan.le@example.com',
          phone: '0955112233',
          status: 'active',
          enrollments: [
            { branchId: 'branch-02', classId: 'class-03', status: 'active', joinedDate: '2025-11-28', tuitionAmount: 4500000, paymentStatus: 'paid', prepaidSessions: 12, usedSessions: 1 }
          ]
        },
        {
          id: 'student-13',
          name: 'Lý Công Uẩn',
          email: 'uan.ly@example.com',
          phone: '0966223344',
          status: 'active',
          enrollments: [
            { branchId: 'branch-01', classId: 'class-02', status: 'active', joinedDate: '2026-01-20', tuitionAmount: 8750000, paymentStatus: 'paid', prepaidSessions: 30, usedSessions: 0 }
          ]
        },
        {
          id: 'student-14',
          name: 'Trần Nhân Tông',
          email: 'tong.tran@example.com',
          phone: '0977334455',
          status: 'active',
          enrollments: [
            { branchId: 'branch-01', classId: 'class-05', status: 'active', joinedDate: '2025-12-20', tuitionAmount: 3000000, paymentStatus: 'paid', prepaidSessions: 15, usedSessions: 0 }
          ]
        },
        {
          id: 'student-15',
          name: 'Lê Thánh Tông',
          email: 'tong.le@example.com',
          phone: '0988445566',
          status: 'active',
          enrollments: [
            { branchId: 'branch-01', classId: 'class-01', status: 'active', joinedDate: '2025-11-18', tuitionAmount: 5000000, paymentStatus: 'paid', prepaidSessions: 24, usedSessions: 8 }
          ]
        },
        {
          id: 'student-16',
          name: 'Quang Trung',
          email: 'trung.quang@example.com',
          phone: '0999556677',
          status: 'active',
          enrollments: [
            { branchId: 'branch-02', classId: 'class-03', status: 'active', joinedDate: '2025-11-22', tuitionAmount: 4500000, paymentStatus: 'paid', prepaidSessions: 12, usedSessions: 4 }
          ]
        },
        {
          id: 'student-17',
          name: 'Yết Kiêu',
          email: 'kieu.yet@example.com',
          phone: '0913456789',
          status: 'active',
          enrollments: [
            { branchId: 'branch-01', classId: 'class-02', status: 'active', joinedDate: '2026-01-18', tuitionAmount: 8750000, paymentStatus: 'paid', prepaidSessions: 30, usedSessions: 0 }
          ]
        },
        {
          id: 'student-18',
          name: 'Dã Tượng',
          email: 'tuong.da@example.com',
          phone: '0924567890',
          status: 'active',
          enrollments: [
            { branchId: 'branch-01', classId: 'class-05', status: 'active', joinedDate: '2025-12-18', tuitionAmount: 3000000, paymentStatus: 'paid', prepaidSessions: 15, usedSessions: 0 }
          ]
        },
        {
          id: 'student-19',
          name: 'Phạm Ngũ Lão',
          email: 'lao.pham@example.com',
          phone: '0935678901',
          status: 'active',
          enrollments: [
            { branchId: 'branch-02', classId: 'class-03', status: 'active', joinedDate: '2025-11-23', tuitionAmount: 4500000, paymentStatus: 'paid', prepaidSessions: 12, usedSessions: 5 }
          ]
        },
        {
          id: 'student-20',
          name: 'Trần Quốc Tuấn',
          email: 'tuan.tran@example.com',
          phone: '0946789012',
          status: 'active',
          enrollments: [
            { branchId: 'branch-01', classId: 'class-01', status: 'active', joinedDate: '2025-11-19', tuitionAmount: 5000000, paymentStatus: 'paid', prepaidSessions: 24, usedSessions: 7 }
          ]
        },
        {
          id: 'student-21',
          name: 'Võ Thị Sáu',
          email: 'sau.vo@example.com',
          phone: '0957890123',
          status: 'archived',
          enrollments: [
            { branchId: 'branch-02', classId: 'class-04', status: 'completed', joinedDate: '2025-01-12', endDate: '2025-04-09', tuitionAmount: 6000000, paymentStatus: 'paid', prepaidSessions: 24, usedSessions: 24 }
          ]
        }
      ];
    mockDatabase.setCollection('students', seedData);
  }

  async getByBranchId(branchId: string): Promise<StudentDTO[]> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
    const studentStore = mockDatabase.getCollection<StudentDTO>('students');

    if (!branchId) return studentStore; // Trả về tất cả nếu không có branchId
    
    // Lọc học viên có enrollment tại branchId (bất kể trạng thái active hay dropped/completed)
    // This logic mimics a 'where array-contains' query
    return studentStore.filter(s => 
      s.enrollments.some(e => e.branchId === branchId)
    );
  }

  async getById(id: string): Promise<StudentDTO | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const studentStore = mockDatabase.getCollection<StudentDTO>('students');
    const found = studentStore.find(s => s.id === id) || null;
    if (found) {
      console.log(`[MockStudentDataSource] getById(${id}) returning enrollments:`, JSON.stringify(found.enrollments, null, 2));
    }
    return found;
  }

  async save(student: Student): Promise<void> {
    console.log('[MockStudentDataSource] Saving student:', student.id.toString());
    console.log('[MockStudentDataSource] Enrollments to save:', JSON.stringify(student.enrollments, null, 2));
    const studentStore = mockDatabase.getCollection<StudentDTO>('students');

    // Check if exists to update or push new
    const index = studentStore.findIndex(s => s.id === student.id.toString());
    const data: StudentDTO = {
      id: student.id.toString(),
      name: student.name,
      email: student.email,
      phone: student.phone,
      status: student.status,
      enrollments: student.enrollments.map(e => ({
        branchId: e.branchId,
        classId: e.classId,
        status: e.status,
        joinedDate: e.joinedDate.toISOString(),
        endDate: e.endDate?.toISOString(),
        tuitionAmount: e.tuitionAmount,
        paidAmount: e.paidAmount,
        paymentStatus: e.paymentStatus,
        prepaidSessions: e.prepaidSessions,
        usedSessions: e.usedSessions
      }))
    };

    if (index >= 0) {
      studentStore[index] = data;
    } else {
      studentStore.push(data);
    }
    mockDatabase.persist();
  }
}