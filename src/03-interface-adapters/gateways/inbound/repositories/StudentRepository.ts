import { Student } from '@/01-entities/students/Student.entity';
import { Enrollment } from '@/01-entities/students/value-objects/Enrollment.vo';
import { type IStudentDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/user/IUserDataSource';
import { type StudentDTO, type StudentEnrollmentDTO } from '@/04-frameworks-and-drivers/devices/students/student.dto';
import { type IStudentRepository } from '@/02-usecases/students/ports/gateways_interface/IStudentRepository';
import { Identifier } from '@/01-entities/shared/Identifier.vo';

export class StudentRepository implements IStudentRepository {
  private readonly dataSource: IStudentDataSource;

  constructor(dataSource: IStudentDataSource) {
    this.dataSource = dataSource;
  }

  private hydrate(dto: StudentDTO): Student {
    const enrollments = (dto.enrollments || [])
      .map((e: StudentEnrollmentDTO) => {
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
          usedSessions: e.usedSessions,
        });

        if (enrollmentResult.isFailure) {
          console.error(`Could not hydrate enrollment for student ${dto.id}:`, enrollmentResult.getErrorValue());
          return null; // Bỏ qua enrollment bị lỗi
        }
        return enrollmentResult.getValue();
      })
      .filter((e): e is Enrollment => e !== null); // Lọc bỏ các giá trị null

    const studentResult = Student.create({
      id: Identifier.create(dto.id),
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      status: dto.status as any,
      enrollments: enrollments,
    });

    if (studentResult.isFailure) {
      // Trong ứng dụng thực tế, bạn có thể throw lỗi hoặc trả về một giá trị mặc định an toàn
      throw new Error(`Could not hydrate student ${dto.id}: ${studentResult.getErrorValue()}`);
    }

    return studentResult.getValue();
  }

  async getById(id: string): Promise<Student | null> {
    const dto = await this.dataSource.getById(id);
    if (!dto) return null;
    return this.hydrate(dto);
  }

  async getByBranchId(branchId: string): Promise<Student[]> {
    const dtos = await this.dataSource.getByBranchId(branchId);
    return dtos.map(dto => this.hydrate(dto));
  }

  async save(student: Student): Promise<void> {
    await this.dataSource.save(student);
  }
}