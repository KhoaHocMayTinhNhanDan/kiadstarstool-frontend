import { ClassStatus } from '@/01-entities/classes/ClassStatus.enum';

export interface ClassListItem {
  id: string;
  name: string;
  code: string;
  status: ClassStatus;
  currentStudents: number;
  maxStudents: number;
  startDate?: Date;
  endDate?: Date;
}

export type ListClassesByBranchOutput = ClassListItem[];