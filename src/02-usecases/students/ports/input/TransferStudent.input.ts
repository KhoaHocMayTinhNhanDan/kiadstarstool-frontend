export interface TransferStudentInput {
  studentId: string;
  fromClassId: string;
  toBranchId: string;
  toClassId: string;
  transferDate?: Date;
}