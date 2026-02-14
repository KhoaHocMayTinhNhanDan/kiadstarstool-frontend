export interface UpdateClassInfoInput {
  id: string;
  name: string;
  branchId: string;
  schedule?: string;
  teacherName?: string;
  maxStudents: number;
  status: string;
}