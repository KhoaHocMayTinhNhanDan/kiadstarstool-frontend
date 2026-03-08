import { Student } from '@/01-entities/students/Student.entity';
import { Identifier } from '@/01-entities/shared/value-objects/Identifier.vo';
import { Enrollment } from '@/01-entities/students/value-objects/Enrollment.vo';
import { type IStudentRepository } from '@/02-usecases/students/ports/gateways_interface/IStudentRepository';
import { type IStudentDataSource, type StudentDTO } from '../../outbound/device_interfaces/students/IStudentDataSource';
import { type IPendingTuitionDataSource } from '../../outbound/device_interfaces/finance/IPendingTuitionDataSource';

export class StudentRepository implements IStudentRepository {
  public readonly dataSource: IStudentDataSource;

  constructor(dataSource: IStudentDataSource) {
    this.dataSource = dataSource;
  }

  private toDomain(dto: StudentDTO): Student {
    const enrollments = (dto.enrollments || []).map(e => {
      const enrollmentResult = Enrollment.create({
        branchId: e.branchId,
        classId: e.classId,
        status: e.status as any,
        joinedDate: new Date(e.joinedDate),
        endDate: e.endDate ? new Date(e.endDate) : undefined,
        tuitionAmount: e.tuitionAmount,
        paidAmount: e.paidAmount,
        paymentStatus: e.paymentStatus as any,
        prepaidSessions: e.prepaidSessions,
        usedSessions: e.usedSessions
      });
      // Trong repository, ta có thể tin tưởng dữ liệu từ DB là hợp lệ
      return enrollmentResult.getValue();
    });

    const studentResult = Student.create({
      id: Identifier.create(dto.id),
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined,
      status: dto.status as any,
      enrollments: enrollments,
    });

    return studentResult.getValue();
  }

  async getById(id: string): Promise<Student | null> {
    try {
      const dto = await this.dataSource.getById(id);
      return dto ? this.toDomain(dto) : null;
    } catch (error) {
      console.error("[StudentRepository] getById error:", error);
      throw new Error("student/repo-fetch-failed");
    }
  }

  async getByBranchId(branchId: string, limit?: number, lastId?: string, keyword?: string): Promise<Student[]> {
    try {
      const dtos = await this.dataSource.getByBranchId(branchId, limit, lastId, keyword);
      return dtos.map(dto => this.toDomain(dto));
    } catch (error) {
      console.error("[StudentRepository] getByBranchId error:", error);
      throw new Error("student/repo-fetch-failed");
    }
  }

  async save(student: Student): Promise<void> {
    await this.dataSource.save(student);
  }

  saveInBatch(student: Student, batch: any): void {
    this.dataSource.saveInBatch(student, batch);
  }

  async getStudentsWithPendingTuition(branchId?: string): Promise<Student[]> {
    const pendingSource = this.dataSource as unknown as IPendingTuitionDataSource;
    
    if (typeof pendingSource.getPendingTuitions !== 'function') {
      return [];
    }

    const dtos = await pendingSource.getPendingTuitions(branchId);
    return dtos.map(dto => this.toDomain(dto));
  }
}