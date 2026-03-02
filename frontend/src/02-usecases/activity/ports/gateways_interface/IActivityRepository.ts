import { type Activity } from '@/01-entities/activity/Activity.entity';

export interface IActivityRepository {
  save(activity: Activity): Promise<void>;
  findByUserId(userId: string): Promise<Activity[]>;
}