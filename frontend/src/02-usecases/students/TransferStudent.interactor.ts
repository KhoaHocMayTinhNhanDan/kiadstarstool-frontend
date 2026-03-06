import { Result } from '@/01-entities/shared/base/result';
import { type IStudentRepository } from './ports/gateways_interface/IStudentRepository';
import { type IClassRepository } from '@/02-usecases/class/ports/gateways_interface/IClassRepository';
import { type IBranchRepository } from '@/02-usecases/branch/ports/gateways_interface/IBranchRepository';
import { type TransferStudentInput } from './ports/input/TransferStudent.input';
import { BranchId } from '@/01-entities/branch/value-objects/BranchId.vo';
import { db, writeBatch } from '@/shared/config/firebase';

export class TransferStudentInteractor {
  private readonly studentRepo: IStudentRepository;
  private readonly classRepo: IClassRepository;
  private readonly branchRepo: IBranchRepository;

  constructor(studentRepo: IStudentRepository, classRepo: IClassRepository, branchRepo: IBranchRepository) {
    this.studentRepo = studentRepo;
    this.classRepo = classRepo;
    this.branchRepo = branchRepo;
  }

  async execute(input: TransferStudentInput): Promise<Result<void>> {
    // 1. Lấy thông tin học viên
    const student = await this.studentRepo.getById(input.studentId);
    if (!student) {
      return Result.fail('Student not found');
    }

    // 2. Lấy thông tin các lớp và chi nhánh liên quan
    const [fromClass, toClass] = await Promise.all([
      this.classRepo.getById(input.fromClassId),
      this.classRepo.getById(input.toClassId)
    ]);

    if (!fromClass) return Result.fail('Source class not found');
    if (!toClass) return Result.fail('Target class not found');

    // Kiểm tra tính hợp lệ của chi nhánh đích
    if (toClass.branchId.toString() !== input.toBranchId) {
      return Result.fail('Target class does not belong to the specified target branch');
    }

    const [fromBranch, toBranch] = await Promise.all([
      this.branchRepo.getById(fromClass.branchId),
      this.branchRepo.getById(BranchId.create(input.toBranchId))
    ]);

    if (!fromBranch) return Result.fail('Source branch not found');
    if (!toBranch) return Result.fail('Target branch not found');

    // Kiểm tra sức chứa của lớp mới
    if (!toClass.hasCapacity()) return Result.fail('Target class is full');

    // 3. Thực hiện chuyển lớp trên Student Entity (Domain Logic)
    const transferResult = student.transfer(
      input.fromClassId,
      input.toBranchId,
      input.toClassId,
      input.transferDate || new Date()
    );

    if (transferResult.isFailure) return transferResult;

    // 4. Cập nhật sĩ số các Entity
    // - Giảm sĩ số lớp cũ
    const updatedFromClass = fromClass.removeStudent().getValue();
    // - Tăng sĩ số lớp mới
    const updatedToClass = toClass.addStudent().getValue();

    // - Xử lý sĩ số chi nhánh
    let updatedFromBranch = fromBranch;
    let updatedToBranch = toBranch;

    // Nếu chuyển khác chi nhánh, cập nhật cả 2.
    // Nếu cùng chi nhánh, sĩ số tổng của chi nhánh không đổi (trừ khi ta muốn track chi tiết từng lớp trong branch aggregate, nhưng hiện tại currentStudents là tổng).
    if (fromBranch.id.toString() !== toBranch.id.toString()) {
      updatedFromBranch = fromBranch.removeStudent().getValue();
      
      if (!toBranch.capacity.hasStudentCapacity()) {
        return Result.fail('Target branch is full');
      }
      updatedToBranch = toBranch.addStudent().getValue();
    }

    // 5. Lưu tất cả thay đổi bằng writeBatch (Atomic Transaction)
    const batch = writeBatch(db);

    this.studentRepo.saveInBatch(student, batch);
    this.classRepo.updateInBatch(updatedFromClass, batch);
    this.classRepo.updateInBatch(updatedToClass, batch);
    
    if (fromBranch.id.toString() !== toBranch.id.toString()) {
      this.branchRepo.saveInBatch(updatedFromBranch, batch);
      this.branchRepo.saveInBatch(updatedToBranch, batch);
    }

    await batch.commit();

    return Result.ok();
  }
}