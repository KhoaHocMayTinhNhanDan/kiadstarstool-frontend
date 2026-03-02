import { Result } from '@/01-entities/shared/base/result';
import { Activity } from '@/01-entities/activity/Activity.entity';
import { type IActivityRepository } from './ports/gateways_interface/IActivityRepository';
import { type RecordActivityInput } from './ports/input/RecordActivity.input';

export class RecordActivityInteractor {
  private readonly activityRepo: IActivityRepository;

  constructor(activityRepo: IActivityRepository) {
    this.activityRepo = activityRepo;
  }

  async execute(input: RecordActivityInput): Promise<Result<void>> {
    try {
      const activity = Activity.create(input);
      await this.activityRepo.save(activity);
      return Result.ok();
    } catch (error: any) {
      // Log error nhưng không làm crash luồng chính nếu việc ghi log thất bại
      console.error('[RecordActivityInteractor] Failed to record activity:', error);
      return Result.fail('Failed to record activity');
    }
  }
}