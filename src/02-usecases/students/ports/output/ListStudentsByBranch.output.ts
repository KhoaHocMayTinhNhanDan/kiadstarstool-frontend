export interface StudentListItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'active' | 'inactive';
  joinedDate: Date;
}

export type ListStudentsByBranchOutput = StudentListItem[];