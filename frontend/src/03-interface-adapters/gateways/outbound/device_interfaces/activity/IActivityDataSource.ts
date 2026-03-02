import { type ActivityJSON } from '@/01-entities/activity/Activity.entity';

export interface IActivityDataSource {
  save(activity: ActivityJSON): Promise<void>;
  findByUserId(userId: string): Promise<ActivityJSON[]>;
}