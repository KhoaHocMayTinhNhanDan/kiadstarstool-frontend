import { type ClassStatus } from '@/01-entities/classes/ClassStatus.enum';
import { type ClassSession } from '@/01-entities/classes/ClassSession';
import { type TuitionConfig } from '@/01-entities/classes/Class.entity';

export interface GetClassDetailsOutput {
  id: string;
  name: string;
  code: string;
  branchId: string;
  maxStudents: number;
  currentStudents: number;
  status: ClassStatus;
  schedule: string;
  teacherName?: string;
  sessions: ClassSession[];
  tuition?: TuitionConfig;
  startDate: string;
  endDate?: string;
}