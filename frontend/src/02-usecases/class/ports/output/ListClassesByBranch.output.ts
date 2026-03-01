import { type ClassStatus } from '@/01-entities/classes/ClassStatus.enum';
import { type ClassSession } from '@/01-entities/classes/ClassSession';
import { type TuitionConfig } from '@/01-entities/classes/Class.entity';

/**
 * Item structure for ListClassesByBranch output
 */
export interface ListClassesByBranchOutputItem {
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
  tuition?: TuitionConfig;
}

/**
 * ListClassesByBranchOutput - Array of class DTOs
 */
export type ListClassesByBranchOutput = ListClassesByBranchOutputItem[];