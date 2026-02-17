import { type ClassStatus } from '@/01-entities/classes/ClassStatus.enum';
import { type ClassSession } from '@/01-entities/classes/ClassSession';

export type ListOngoingClassesOutput = Array<{
  id: string;
  name: string;
  code: string;
  branchId: string;
  teacherName?: string;
  maxStudents: number;
  currentStudents: number;
  schedule: string;
  status: ClassStatus;
  sessions: ClassSession[];
}>;