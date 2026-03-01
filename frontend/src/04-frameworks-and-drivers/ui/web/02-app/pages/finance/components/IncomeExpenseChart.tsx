/** @jsxImportSource @emotion/react */
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Text } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';

export const IncomeExpenseChart = ({ data }: { data: any[] }) => {
  // Process data: Group by date (last 7 days or similar)
  // For simplicity, we'll just sort by date and show raw points if sparse, or group by day
  const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Group by Date string (YYYY-MM-DD)
  const groupedData = sortedData.reduce((acc: any[], curr) => {
    const dateStr = new Date(curr.date).toLocaleDateString('vi-VN');
    let existing = acc.find(item => item.date === dateStr);
    
    if (!existing) {
      existing = { date: dateStr, income: 0, expense: 0 };
      acc.push(existing);
    }

    if (curr.type === 'income') existing.income += curr.amount;
    if (curr.type === 'expense') existing.expense += curr.amount;
    
    return acc;
  }, []);

  if (groupedData.length === 0) {
    return (
      <Box height="100%" display="flex" alignItems="center" justifyContent="center">
        <Text color="SECONDARY">Chưa có dữ liệu giao dịch</Text>
      </Box>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={groupedData}>
        <defs>
          <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={COLORS.SUCCESS} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={COLORS.SUCCESS} stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={COLORS.DANGER} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={COLORS.DANGER} stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={COLORS.NEUTRAL_BORDER} />
        <Tooltip formatter={(value: any) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)} />
        <Legend />
        <Area type="monotone" dataKey="income" name="Thu" stroke={COLORS.SUCCESS} fillOpacity={1} fill="url(#colorIncome)" />
        <Area type="monotone" dataKey="expense" name="Chi" stroke={COLORS.DANGER} fillOpacity={1} fill="url(#colorExpense)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
