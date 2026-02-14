import { Result } from '@/01-entities/shared/base/result';
import { type IStudentRepository } from './ports/gateways_interface/IStudentRepository';
import { type ListStudentsByBranchInput } from './ports/input/ListStudentsByBranch.input';
import { type ListStudentsByBranchOutput } from './ports/output/ListStudentsByBranch.output';

export class ListStudentsByBranchInteractor {
  private readonly studentRepo: IStudentRepository;

  constructor(studentRepo: IStudentRepository) {
    this.studentRepo = studentRepo;
  }

  async execute(input: ListStudentsByBranchInput): Promise<Result<ListStudentsByBranchOutput>> {
    const students = await this.studentRepo.getByBranchId(input.branchId);
    
    // Map Entity -> DTO
    const output = students.map(student => {
      // Logic: Lấy ngày tham gia dựa trên enrollment của chi nhánh đang lọc
      // Nếu không lọc (lấy tất cả), lấy ngày tham gia sớm nhất
      let joinedDate = new Date();
      
      if (input.branchId) {
        const enrollment = student.enrollments.find(e => e.branchId === input.branchId);
        if (enrollment) joinedDate = enrollment.joinedDate;
      } else if (student.enrollments.length > 0) {
        // Sort để lấy ngày cũ nhất
        const sortedEnrollments = [...student.enrollments].sort((a, b) => 
          a.joinedDate.getTime() - b.joinedDate.getTime()
        );
        joinedDate = sortedEnrollments[0].joinedDate;
      }

      return {
        id: student.id.toString(),
        name: student.name,
        email: student.email,
        phone: student.phone,
        status: student.status,
        joinedDate: joinedDate
      };
    });

    return Result.ok(output);
  }
}