import { type GetDashboardStatsInput } from '../input/GetDashboardStats.input';
import { type GetDashboardStatsOutput } from '../output/GetDashboardStats.output';

export interface IDashboardRepository {
  getStats(input: GetDashboardStatsInput): Promise<GetDashboardStatsOutput>;
}