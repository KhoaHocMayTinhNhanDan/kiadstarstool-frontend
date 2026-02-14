import { type IDashboardDataSource } from '@/03-interface-adapters/gateways/outbound/device_interfaces/dashboard/IDashboardDataSource';
import { type GetDashboardStatsInput } from '@/02-usecases/dashboard/ports/input/GetDashboardStats.input';
import { type GetDashboardStatsOutput } from '@/02-usecases/dashboard/ports/output/GetDashboardStats.output';

// --- Mock Data Constants (Moved from DashboardPage) ---

const MOCK_BRANCH_DATA: Record<string, { revenue: number, subs: number, sales: number, active: number }> = {
  'mock-branch-1': { revenue: 15231.89, subs: 850, sales: 4234, active: 200 },
  'mock-branch-2': { revenue: 12000.00, subs: 600, sales: 3000, active: 150 },
  'mock-branch-3': { revenue: 18000.00, subs: 900, sales: 5000, active: 223 },
  'default': { revenue: 5000.00, subs: 100, sales: 1000, active: 50 }
};

const MOCK_REVENUE_HISTORY: Record<string, Array<{ name: string; value: number }>> = {
  'mock-branch-1': [
    { name: 'Jan', value: 4000 }, { name: 'Feb', value: 3000 }, { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 }, { name: 'May', value: 1890 }, { name: 'Jun', value: 2390 },
  ],
  'mock-branch-2': [
    { name: 'Jan', value: 2400 }, { name: 'Feb', value: 1398 }, { name: 'Mar', value: 9800 },
    { name: 'Apr', value: 3908 }, { name: 'May', value: 4800 }, { name: 'Jun', value: 3800 },
  ],
  'mock-branch-3': [
    { name: 'Jan', value: 1000 }, { name: 'Feb', value: 2000 }, { name: 'Mar', value: 1500 },
    { name: 'Apr', value: 3000 }, { name: 'May', value: 2500 }, { name: 'Jun', value: 4000 },
  ],
  'default': [
    { name: 'Jan', value: 500 }, { name: 'Feb', value: 600 }, { name: 'Mar', value: 700 },
    { name: 'Apr', value: 800 }, { name: 'May', value: 900 }, { name: 'Jun', value: 1000 },
  ]
};

const MOCK_WEEKLY_DATA: Record<string, Array<{ name: string; value: number }>> = {
  'mock-branch-1': [
    { name: 'Mon', value: 500 }, { name: 'Tue', value: 600 }, { name: 'Wed', value: 450 },
    { name: 'Thu', value: 700 }, { name: 'Fri', value: 800 }, { name: 'Sat', value: 900 }, { name: 'Sun', value: 300 }
  ],
  'mock-branch-2': [
    { name: 'Mon', value: 300 }, { name: 'Tue', value: 400 }, { name: 'Wed', value: 350 },
    { name: 'Thu', value: 500 }, { name: 'Fri', value: 600 }, { name: 'Sat', value: 700 }, { name: 'Sun', value: 200 }
  ],
  'mock-branch-3': [
    { name: 'Mon', value: 200 }, { name: 'Tue', value: 300 }, { name: 'Wed', value: 250 },
    { name: 'Thu', value: 400 }, { name: 'Fri', value: 500 }, { name: 'Sat', value: 600 }, { name: 'Sun', value: 100 }
  ],
  'default': [
    { name: 'Mon', value: 100 }, { name: 'Tue', value: 150 }, { name: 'Wed', value: 120 },
    { name: 'Thu', value: 180 }, { name: 'Fri', value: 200 }, { name: 'Sat', value: 250 }, { name: 'Sun', value: 50 }
  ]
};

const MOCK_MONTHLY_DATA: Record<string, Array<{ name: string; value: number }>> = {
  'mock-branch-1': [
    { name: 'Week 1', value: 3500 }, { name: 'Week 2', value: 4200 }, { name: 'Week 3', value: 3800 }, { name: 'Week 4', value: 4500 }
  ],
  'mock-branch-2': [
    { name: 'Week 1', value: 2500 }, { name: 'Week 2', value: 3200 }, { name: 'Week 3', value: 2800 }, { name: 'Week 4', value: 3500 }
  ],
  'mock-branch-3': [
    { name: 'Week 1', value: 1500 }, { name: 'Week 2', value: 2200 }, { name: 'Week 3', value: 1800 }, { name: 'Week 4', value: 2500 }
  ],
  'default': [
    { name: 'Week 1', value: 500 }, { name: 'Week 2', value: 600 }, { name: 'Week 3', value: 700 }, { name: 'Week 4', value: 800 }
  ]
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

export class MockDashboardDataSource implements IDashboardDataSource {
  async getStats(input: GetDashboardStatsInput): Promise<GetDashboardStatsOutput> {
    await new Promise(resolve => setTimeout(resolve, 600)); // Simulate network delay

    const { timeRange, branchIds = [] } = input;
    
    // 1. Determine target branches (if empty, we assume "all" - but for mock calculation we need specific IDs or default)
    // In a real DB query, "empty" usually means no filter. Here we simulate by using keys from MOCK_BRANCH_DATA
    const targetBranchIds = branchIds.length > 0 
      ? branchIds 
      : Object.keys(MOCK_BRANCH_DATA).filter(k => k !== 'default');

    // 2. Aggregate Stats
    let totalSubs = 0;
    let totalSales = 0;
    let totalActive = 0;

    targetBranchIds.forEach(id => {
      const data = MOCK_BRANCH_DATA[id] || MOCK_BRANCH_DATA['default'];
      totalSubs += data.subs;
      totalSales += data.sales;
      totalActive += data.active;
    });

    // 3. Aggregate Chart Data
    const dataSource = timeRange === 'week' ? MOCK_WEEKLY_DATA : timeRange === 'month' ? MOCK_MONTHLY_DATA : MOCK_REVENUE_HISTORY;
    const labels = timeRange === 'week' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] : timeRange === 'month' ? ['Week 1', 'Week 2', 'Week 3', 'Week 4'] : MONTHS;

    const chartData = labels.map(label => {
      let totalValue = 0;
      targetBranchIds.forEach(id => {
        const history = dataSource[id] || dataSource['default'];
        const record = history.find(h => h.name === label);
        if (record) totalValue += record.value;
      });
      return { name: label, value: totalValue };
    });

    const totalRevenue = chartData.reduce((acc, curr) => acc + curr.value, 0);

    return {
      totalRevenue,
      totalSubs,
      totalSales,
      totalActive,
      chartData
    };
  }
}