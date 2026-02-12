export interface UpdateBranchInfoInput {
  branchId: string;
  name: string;
  code: string;
  address?: {
    street: string;
    ward: string;
    district: string;
    city: string;
  };
  maxStudents?: number;
}