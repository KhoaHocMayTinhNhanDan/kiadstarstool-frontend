import { type ClassStatus } from '@/01-entities/classes/ClassStatus.enum';
import { type ClassSession } from '@/01-entities/classes/ClassSession';

export interface GetClassDetailsOutput {
  id: string;
  name: string;
  code: string;
  branchId: string;
  maxStudents: number;
  currentStudents: number;
  status: ClassStatus;
  schedule: string;
  sessions: ClassSession[];
}