/** @jsxImportSource @emotion/react */
import { useMemo } from 'react';
import { Box } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { PieChart } from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/charts/PieChart';

export const BranchRevenueChart = ({
  transactions,
  branches
}: {
  transactions: any[];
  branches: any[];
}) => {

  const chartData = useMemo(() => {

    const branchMap: Record<string, number> = {};

    branches.forEach((b) => {
      branchMap[b.id] = 0;
    });

    transactions.forEach((t) => {
      if (t.type === 'income' && branchMap[t.branchId] !== undefined) {
        branchMap[t.branchId] += Number(t.amount);
      }
    });

    return branches
      .map((b) => ({
        name: b.name,
        value: branchMap[b.id] || 0
      }))
      .filter((d) => d.value > 0)
      .sort((a, b) => b.value - a.value);

  }, [transactions, branches]);

  return (
    <Box height="100%">
      <PieChart
        data={chartData}
        height="100%"
        valueFormatter={(val) =>
          new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            maximumFractionDigits: 0
          }).format(val)
        }
        emptyMessage="Chưa có dữ liệu doanh thu"
      />
    </Box>
  );
};