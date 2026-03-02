import { type ActivityType } from '@/01-entities/activity/Activity.entity';

export interface RecordActivityInput {
  userId: string;
  type: ActivityType;
  description: string;
  details?: Record<string, any>;
}