export interface IStudentDataSource {
  getByBranchId(branchId: string): Promise<any[]>;
}