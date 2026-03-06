export interface UpdateStudentInfoInput {
  studentId: string;
  name?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: Date;
  status?: 'active' | 'inactive' | 'archived';
}