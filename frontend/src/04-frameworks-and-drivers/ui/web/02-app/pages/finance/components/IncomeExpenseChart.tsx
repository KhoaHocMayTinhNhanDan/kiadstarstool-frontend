/** @jsxImportSource @emotion/react */
import { useMemo } from 'react';
import { Box } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { BarChart } from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/charts/BarChart';
import { COLORS } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';

export const IncomeExpenseChart = ({ transactions, data }: { transactions?: any[], data?: any[] }) => {

  const chartData = useMemo(() => {
    // Nếu có data truyền vào trực tiếp (từ Dashboard), sử dụng nó
    if (data) return data;

    // Fallback: Logic cũ cho trang Finance (6 tháng gần nhất)
    if (!transactions) return [];

    const months: Record<string, { name: string; income: number; expense: number }> = {};
    const today = new Date();

    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${d.getMonth()}`;

      months[key] = {
        name: `T${d.getMonth() + 1}`,
        income: 0,
        expense: 0
      };
    }

    transactions.forEach((t) => {
      const d = new Date(t.date);
      const key = `${d.getFullYear()}-${d.getMonth()}`;

      if (months[key]) {
        if (t.type === 'income') months[key].income += Number(t.amount);
        if (t.type === 'expense') months[key].expense += Number(t.amount);
      }
    });

    return Object.values(months);
  }, [transactions, data]);

  return (
    <Box height="100%">
      <BarChart
        data={chartData}
        xAxisKey="name"
        series={[
          { key: 'income', name: 'Thu', color: COLORS.SUCCESS },
          { key: 'expense', name: 'Chi', color: COLORS.DANGER }
        ]}
        height="100%"
        valueFormatter={(val) =>
          new Intl.NumberFormat('vi-VN', {
            notation: 'compact',
            compactDisplay: 'short'
          }).format(Number(val))
        }
      />
    </Box>
  );
};