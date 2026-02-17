import { type IStudentDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/students/IStudentDataSource';
import { Student } from '@/01-entities/students/Student.entity';

// --- DTO Definitions (Schema for Database/LocalStorage) ---
export interface EnrollmentDTO {
  branchId: string;
  classId?: string;
  status: string;
  joinedDate: string; // ISO String
  endDate?: string;   // ISO String
}

export interface StudentDTO {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: string;
  enrollments: EnrollmentDTO[];
}

let studentStore: StudentDTO[] = [];
const STORAGE_KEY = 'mock_students_db_v7';

export class MockStudentDataSource implements IStudentDataSource {
  constructor() {
    this.initialize();
  }

  private initialize() {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      try {
        studentStore = JSON.parse(storedData) as StudentDTO[];
      } catch (e) {
        console.error('Failed to parse students', e);
      }
    }

    if (studentStore.length === 0) {
      studentStore = [
        // --- Students in Branch 01 (Hà Nội) ---
        // CASE 1: Học viên học tại 2 cơ sở (Bản ghi tại HN)
        {
          id: 'student-01',
          name: 'Nguyễn Văn An',
          email: 'an.nguyen@example.com',
          phone: '0901234567',
          status: 'active',
          enrollments: [
            { branchId: 'branch-01', classId: 'class-01', status: 'active', joinedDate: '2025-11-15' }
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
            { branchId: 'branch-01', classId: 'class-01', status: 'transferred', joinedDate: '2025-02-20', endDate: '2025-07-01' }
          ]
        },
        {
          id: 'student-03',
          name: 'Lê Văn Cường',
          email: 'cuong.le@example.com',
          status: 'active',
          enrollments: [
            { branchId: 'branch-01', classId: 'class-01', status: 'dropped', joinedDate: '2024-11-10', endDate: '2025-01-01' }
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
            { branchId: 'branch-01', classId: 'class-01', status: 'active', joinedDate: '2025-11-20' },
            { branchId: 'branch-01', classId: 'class-02', status: 'active', joinedDate: '2026-01-15' },
            { branchId: 'branch-01', classId: 'class-05', status: 'active', joinedDate: '2025-12-15' }
          ]
        },

        // --- Students in Branch 02 (HCM) ---
        {
          id: 'student-05',
          name: 'Hoàng Văn Em',
          email: 'em.hoang@example.com',
          status: 'active',
          enrollments: [
            { branchId: 'branch-02', classId: 'class-03', status: 'active', joinedDate: '2025-11-25' }
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
            { branchId: 'branch-02', classId: 'class-03', status: 'active', joinedDate: '2025-12-01' }
          ]
        },
        // CASE 2: Chuyển cơ sở (Bản ghi mới tại HCM - Đang học)
        {
          id: 'student-transfer-new',
          name: 'Trần Thị Bình',
          email: 'binh.tran@example.com',
          status: 'active',
          enrollments: [
            { branchId: 'branch-02', classId: 'class-03', status: 'active', joinedDate: '2025-07-20' }
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
            { branchId: 'branch-01', classId: 'class-01', status: 'active', joinedDate: '2025-11-16' }
          ]
        },
        {
          id: 'student-09',
          name: 'Trần Hưng Đạo',
          email: 'dao.tran@example.com',
          phone: '0922334455',
          status: 'active',
          enrollments: [
            { branchId: 'branch-01', classId: 'class-02', status: 'active', joinedDate: '2026-01-16' }
          ]
        },
        {
          id: 'student-10',
          name: 'Ngô Quyền',
          email: 'quyen.ngo@example.com',
          phone: '0933445566',
          status: 'active',
          enrollments: [
            { branchId: 'branch-02', classId: 'class-03', status: 'active', joinedDate: '2025-11-21' }
          ]
        },
        {
          id: 'student-11',
          name: 'Đinh Bộ Lĩnh',
          email: 'linh.dinh@example.com',
          phone: '0944556677',
          status: 'inactive',
          enrollments: [
            { branchId: 'branch-01', classId: 'class-01', status: 'dropped', joinedDate: '2025-01-01', endDate: '2025-06-01' }
          ]
        }
      ];
      this.persist();
    }
  }

  private persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(studentStore));
  }

  async getByBranchId(branchId: string): Promise<StudentDTO[]> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
    if (!branchId) return studentStore; // Trả về tất cả nếu không có branchId
    
    // Lọc học viên có enrollment active tại branchId
    return studentStore.filter(s => 
      s.enrollments.some(e => e.branchId === branchId && e.status === 'active')
    );
  }

  async getById(id: string): Promise<StudentDTO | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return studentStore.find(s => s.id === id) || null;
  }

  async save(student: Student): Promise<void> {
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
        endDate: e.endDate?.toISOString()
      }))
    };

    if (index >= 0) {
      studentStore[index] = data;
    } else {
      studentStore.push(data);
    }
    this.persist();
  }
}