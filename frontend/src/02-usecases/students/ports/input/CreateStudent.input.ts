export interface CreateStudentInput {
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: Date;
  branchId: string;
}