import { type ClassStatus } from '@/01-entities/classes/ClassStatus.enum';

export interface CreateClassInput {
  branchId: string;
  name: string;
  code: string;
  maxStudents?: number;
  status: ClassStatus;
}