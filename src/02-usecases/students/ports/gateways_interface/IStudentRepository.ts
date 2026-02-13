import { type StudentListItem } from '../output/ListStudentsByBranch.output';

export interface IStudentRepository {
  getByBranchId(branchId: string): Promise<StudentListItem[]>;
}