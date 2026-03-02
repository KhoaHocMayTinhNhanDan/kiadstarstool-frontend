import { Result } from '@/01-entities/shared/base/result';
import { ListActivitiesInteractor } from '@/02-usecases/activity/ListActivities.interactor';
import { type ListActivitiesInput } from '@/02-usecases/activity/ports/input/ListActivities.input';
import { type ListActivitiesOutput } from '@/02-usecases/activity/ports/output/ListActivities.output';

export class ActivityController {
  private readonly listActivitiesInteractor: ListActivitiesInteractor;

  constructor(listActivitiesInteractor: ListActivitiesInteractor) {
    this.listActivitiesInteractor = listActivitiesInteractor;
  }

  async listActivities(input: ListActivitiesInput): Promise<Result<ListActivitiesOutput>> {
    try {
      return await this.listActivitiesInteractor.execute(input);
    } catch (error: any) {
      console.error('[ActivityController] ListActivities unexpected error:', error);
      return Result.fail<ListActivitiesOutput>('An unexpected error occurred');
    }
  }
}