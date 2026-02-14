import { type IDashboardRepository } from '@/02-usecases/dashboard/ports/gateways_interface/IDashboardRepository';
import { type IDashboardDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/dashboard/IDashboardDataSource';
import { type GetDashboardStatsInput } from '@/02-usecases/dashboard/ports/input/GetDashboardStats.input';
import { type GetDashboardStatsOutput } from '@/02-usecases/dashboard/ports/output/GetDashboardStats.output';

export class DashboardRepository implements IDashboardRepository {
  private readonly dataSource: IDashboardDataSource;

  constructor(dataSource: IDashboardDataSource) {
    this.dataSource = dataSource;
  }

  async getStats(input: GetDashboardStatsInput): Promise<GetDashboardStatsOutput> {
    return this.dataSource.getStats(input);
  }
}