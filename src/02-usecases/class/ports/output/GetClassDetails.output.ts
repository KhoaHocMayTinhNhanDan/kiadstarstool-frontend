export interface GetClassDetailsOutput {
  id: string;
  name: string;
  branchId: string;
  code: string;
  schedule?: string;
  teacherName?: string;
  maxStudents: number;
  currentStudents: number;
  status: string;
}