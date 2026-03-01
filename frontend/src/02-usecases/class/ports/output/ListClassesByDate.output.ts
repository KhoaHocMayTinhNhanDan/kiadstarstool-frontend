// src/02-usecases/class/ports/output/ListClassesByDate.output.ts
import { type ClassStatus } from '@/01-entities/classes/ClassStatus.enum';
import { type ClassSession } from '@/01-entities/classes/ClassSession';

/**
 * ListClassesByDateOutput
 * 
 * Output data for the ListClassesByDate use case
 */
export interface ListClassesByDateOutputItem {
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
}

export type ListClassesByDateOutput = ListClassesByDateOutputItem[];
