export interface StudentListItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: string;
  joinedDate: Date;
}

export type ListStudentsByBranchOutput = StudentListItem[];