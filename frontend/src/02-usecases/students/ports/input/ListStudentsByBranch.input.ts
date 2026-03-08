export interface ListStudentsByBranchInput {
  branchId: string;
  limit?: number;
  lastId?: string;
  keyword?: string;
}