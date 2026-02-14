export interface GetDashboardStatsInput {
  timeRange: 'week' | 'month' | 'year';
  branchIds?: string[];
}