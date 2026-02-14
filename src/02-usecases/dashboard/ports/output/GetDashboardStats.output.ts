export interface DashboardChartData {
  name: string;
  value: number;
}

export interface GetDashboardStatsOutput {
  totalRevenue: number;
  totalSubs: number;
  totalSales: number;
  totalActive: number;
  chartData: DashboardChartData[];
}