/** @jsxImportSource @emotion/react */
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Text } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
export const BranchRevenueChart = ({ data }: { data: any[] }) => {
  // Process data: Group income by branch
  const chartData = data.reduce((acc: any[], curr) => {
    if (curr.type !== 'income') return acc;
    
    const existing = acc.find(item => item.branchId === curr.branchId);
    if (existing) {
      existing.amount += curr.amount;
    } else {
      acc.push({ branchId: curr.branchId, amount: curr.amount });
    }
    return acc;
  }, []);

  if (chartData.length === 0) {
    return (
      <Box height="100%" display="flex" alignItems="center" justifyContent="center">
        <Text color="SECONDARY">Chưa có dữ liệu doanh thu</Text>
      </Box>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={COLORS.NEUTRAL_BORDER} />
        <XAxis dataKey="branchId" />
        <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
        <Tooltip 
          formatter={(value: any) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)}
          labelStyle={{ color: 'black' }}
        />
        <Legend />
        <Bar dataKey="amount" name="Doanh thu" fill={COLORS.PRIMARY} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
