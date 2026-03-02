import { Result } from '@/01-entities/shared/base/result';
import { type IActivityRepository } from './ports/gateways_interface/IActivityRepository';
import { type ListActivitiesInput } from './ports/input/ListActivities.input';
import { type ListActivitiesOutput, type ActivityOutput } from './ports/output/ListActivities.output';

export class ListActivitiesInteractor {
  private readonly activityRepo: IActivityRepository;

  constructor(activityRepo: IActivityRepository) {
    this.activityRepo = activityRepo;
  }

  async execute(input: ListActivitiesInput): Promise<Result<ListActivitiesOutput>> {
    try {
      const activities = await this.activityRepo.findByUserId(input.userId);

      const output = activities
        .map((activity): ActivityOutput => ({
          id: activity.id.toString(),
          type: activity.type,
          description: activity.description,
          timestamp: activity.timestamp,
          // Simple details stringification for UI
          details: activity.details ? JSON.stringify(activity.details) : undefined,
        }))
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()); // Sort by most recent

      return Result.ok(output);
    } catch (error: any) {
      console.error('[ListActivitiesInteractor] Error:', error);
      return Result.fail('Failed to retrieve user activities.');
    }
  }
}