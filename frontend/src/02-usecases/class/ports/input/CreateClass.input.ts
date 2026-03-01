import { type ClassStatus } from '@/01-entities/classes/ClassStatus.enum';
import { type ClassSession } from '@/01-entities/classes/ClassSession';
import { type TuitionConfig } from '@/01-entities/classes/Class.entity';

export interface CreateClassInput {
  branchId: string;
  name: string;
  code: string;
  maxStudents?: number;
  status: ClassStatus;
  sessions?: ClassSession[];
  teacherName?: string;
  tuition?: TuitionConfig;
}