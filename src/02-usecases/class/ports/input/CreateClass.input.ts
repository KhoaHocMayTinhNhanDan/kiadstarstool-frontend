import { type ClassSession } from '@/01-entities/classes/ClassSession';

export interface CreateClassInput {
  branchId: string;
  name: string;
  code?: string;
  maxStudents: number;
  sessions: ClassSession[];
  teacherName?: string;
}