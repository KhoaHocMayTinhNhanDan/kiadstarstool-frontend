import { type ClassSession } from '@/01-entities/classes/ClassSession';

export interface UpdateClassInfoInput {
  id: string;
  name?: string;
  maxStudents?: number;
  status?: string;
  sessions?: ClassSession[];
  teacherName?: string;
}