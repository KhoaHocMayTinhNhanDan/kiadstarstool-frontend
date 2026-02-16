import { type ClassStatus } from '@/01-entities/classes/ClassStatus.enum';

export interface UpdateClassInfoInput {
  classId: string;
  name?: string;
  code?: string;
  maxStudents?: number;
  status?: ClassStatus;
  schedule?: string;
}