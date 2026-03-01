import { Result } from '@/01-entities/shared/base/result';
import { GetDashboardStatsInteractor } from '@/02-usecases/dashboard/GetDashboardStats.interactor';
import { type GetDashboardStatsInput } from '@/02-usecases/dashboard/ports/input/GetDashboardStats.input';
import { type GetDashboardStatsOutput } from '@/02-usecases/dashboard/ports/output/GetDashboardStats.output';

export class DashboardController {
  private readonly getStatsInteractor: GetDashboardStatsInteractor;

  constructor(getStatsInteractor: GetDashboardStatsInteractor) {
    this.getStatsInteractor = getStatsInteractor;
  }

  async getStats(input: GetDashboardStatsInput): Promise<Result<GetDashboardStatsOutput>> {
    try {
      return await this.getStatsInteractor.execute(input);
    } catch (error: any) {
      return Result.fail('An unexpected error occurred while fetching dashboard stats');
    }
  }
}
