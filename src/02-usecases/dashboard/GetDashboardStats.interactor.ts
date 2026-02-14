import { Result } from '@/01-entities/shared/base/result';
import { type IDashboardRepository } from './ports/gateways_interface/IDashboardRepository';
import { type GetDashboardStatsInput } from './ports/input/GetDashboardStats.input';
import { type GetDashboardStatsOutput } from './ports/output/GetDashboardStats.output';

export class GetDashboardStatsInteractor {
  private readonly repository: IDashboardRepository;

  constructor(repository: IDashboardRepository) {
    this.repository = repository;
  }

  async execute(input: GetDashboardStatsInput): Promise<Result<GetDashboardStatsOutput>> {
    const stats = await this.repository.getStats(input);
    return Result.ok(stats);
  }
}