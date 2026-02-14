import { type GetDashboardStatsInput } from '@/02-usecases/dashboard/ports/input/GetDashboardStats.input';
import { type GetDashboardStatsOutput } from '@/02-usecases/dashboard/ports/output/GetDashboardStats.output';

export interface IDashboardDataSource {
  getStats(input: GetDashboardStatsInput): Promise<GetDashboardStatsOutput>;
}