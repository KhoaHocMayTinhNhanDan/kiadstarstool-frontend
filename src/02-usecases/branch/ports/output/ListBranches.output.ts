export interface BranchListItem {
  id: string;
  name: string;
  code: string;
  address: string;
  isActive: boolean;
  studentCount: number;
}

export type ListBranchesOutput = BranchListItem[];