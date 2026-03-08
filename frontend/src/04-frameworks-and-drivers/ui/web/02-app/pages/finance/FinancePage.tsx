// src/04-frameworks-and-drivers/ui/web/02-app/pages/finance/FinancePage.tsx
/** @jsxImportSource @emotion/react */
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, DollarSign, TrendingUp, TrendingDown, Download } from 'lucide-react';

import {
  Box,
  Text,
  Button,
  Icon,
  Select,
  Card
} from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';

import { COLORS } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { AppContext } from '@/05-bootstrap/app-context';
import { useToast } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/hooks/useToast';

import { DataTable } from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/data/DataTable/DataTable.organism';

import { IncomeExpenseChart } from './components/IncomeExpenseChart';
import { BranchRevenueChart } from './components/BranchRevenueChart';
import { FilterBar, type TimeRangeType } from '../../share-page-or-components/components/FilterBar';
import { getChartDateRange, groupIncomeExpenseByLabel } from '../../../../../../shared/utils/chartDataUtils';
import { useI18n } from '@/shared/i18n/useI18n';

export const FinancePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useI18n();

  const [transactions, setTransactions] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [selectedBranchIds, setSelectedBranchIds] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<TimeRangeType>('today');
  const [customStartDate, setCustomStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [customEndDate, setCustomEndDate] = useState(new Date().toISOString().split('T')[0]);

  // ---------------------------
  // Load branches (once)
  // ---------------------------
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const branchController = AppContext.getBranchController();
        const result = await branchController.listBranches({});

        if (result.isSuccess) {
          setBranches(result.getValue());
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchBranches();
  }, []);

  // ---------------------------
  // Load transactions
  // ---------------------------
  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);

      try {
        const financeController = AppContext.getFinanceController();

        // Fetch ALL transactions and filter locally for better UX
        const result = await financeController.listTransactions({});
        if (result.isSuccess) {
          setTransactions(result.getValue());
        }
      } catch (err) {
        console.error(err);
        toast.error('Lỗi tải dữ liệu giao dịch');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // ---------------------------
  // Filter Logic
  // ---------------------------
  const filteredData = useMemo(() => {
    const { start, end } = getChartDateRange(timeRange, 0, customStartDate, customEndDate);

    const filteredTransactions = transactions.filter(t => {
      const trxDate = new Date(t.date);
      const isInBranch = selectedBranchIds.length === 0 || selectedBranchIds.includes(t.branchId);
      const isInTimeRange = trxDate >= start && trxDate <= end;
      return isInBranch && isInTimeRange;
    });

    // Determine grouping mode for chart
    let chartGroupingMode: any = timeRange;
    if (timeRange === 'custom') {
        const diffDays = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
        if (diffDays <= 2) chartGroupingMode = 'today';
        else if (diffDays <= 31) chartGroupingMode = 'day';
        else if (diffDays <= 90) chartGroupingMode = 'week';
        else if (diffDays <= 730) chartGroupingMode = 'month';
        else chartGroupingMode = 'year';
    }

    const chartData = groupIncomeExpenseByLabel(filteredTransactions, chartGroupingMode, t);

    return {
      transactions: filteredTransactions,
      chartData
    };
  }, [transactions, selectedBranchIds, timeRange, customStartDate, customEndDate, t]);

  const toggleBranch = (branchId: string) => {
    setSelectedBranchIds(prev => prev.includes(branchId) ? prev.filter(id => id !== branchId) : [...prev, branchId]);
  };

  // ---------------------------
  // Summary
  // ---------------------------
  const summary = useMemo(() => {
    return filteredData.transactions.reduce(
      (acc, curr) => {
        const amount = Number(curr.amount) || 0;

        if (curr.type === 'income') acc.income += amount;
        if (curr.type === 'expense') acc.expense += amount;

        return acc;
      },
      { income: 0, expense: 0 }
    );
  }, [filteredData.transactions]);

  // ---------------------------
  // Table columns
  // ---------------------------
  const columns = useMemo(
    () => [
      {
        key: 'code',
        header: 'Mã GD',
        render: (item: any) => (
          <Text weight="medium" size="sm">
            {item.code}
          </Text>
        )
      },

      {
        key: 'date',
        header: 'Ngày',
        render: (item: any) => (
          <Text size="sm">
            {new Date(item.date).toLocaleDateString('vi-VN')}
          </Text>
        )
      },

      {
        key: 'type',
        header: 'Loại',
        render: (item: any) => (
          <Box
            display="inline-flex"
            alignItems="center"
            gap="xs"
            px="sm"
            py="xxs"
            borderRadius="full"
            bg={item.type === 'income' ? 'SUCCESS_LIGHT' : 'DANGER_LIGHT'}
          >
            <Icon
              size="xs"
              color={item.type === 'income' ? 'SUCCESS' : 'DANGER'}
            >
              {item.type === 'income' ? <TrendingUp /> : <TrendingDown />}
            </Icon>

            <Text
              size="xs"
              weight="bold"
              color={item.type === 'income' ? 'SUCCESS' : 'DANGER'}
            >
              {item.type === 'income' ? 'Thu' : 'Chi'}
            </Text>
          </Box>
        )
      },

      {
        key: 'description',
        header: 'Nội dung',
        width: '30%',
        render: (item: any) => (
          <Box>
            <Text size="sm" truncate>
              {item.description}
            </Text>

            {item.studentId && (
              <Text size="xs" color="SECONDARY">
                HV: {item.studentId}
              </Text>
            )}
          </Box>
        )
      },

      {
        key: 'amount',
        header: 'Số tiền',
        render: (item: any) => (
          <Text
            weight="bold"
            color={item.type === 'income' ? 'SUCCESS' : 'DANGER'}
          >
            {item.type === 'income' ? '+' : '-'}
            {(item.amount || 0).toLocaleString('vi-VN')} đ
          </Text>
        )
      }
    ],
    []
  );

  return (
    <Box
      p="xl"
      maxWidth="1200px"
      mx="auto"
      display="flex"
      flexDirection="column"
      gap="lg"
    >
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap="md"
      >
        <Box>
          <Text as="h1" variant="heading-xl" weight="bold">
            Tài chính
          </Text>

          <Text color="SECONDARY">
            Quản lý thu chi và dòng tiền.
          </Text>
        </Box>

        <Box display="flex" gap="sm">
          <Button
            variant="outline"
            leftIcon={
              <Icon>
                <DollarSign />
              </Icon>
            }
            onClick={() => navigate('/finance/collect-tuition')}
          >
            Thu học phí
          </Button>

          <Button
            variant="primary"
            leftIcon={
              <Icon>
                <Plus />
              </Icon>
            }
            onClick={() => navigate('/finance/new')}
          >
            Ghi chép thu chi
          </Button>
        </Box>
      </Box>

      {/* FILTERS */}
      <FilterBar 
        branches={branches}
        selectedBranchIds={selectedBranchIds}
        onToggleBranch={toggleBranch}
        onClearBranchSelection={() => setSelectedBranchIds([])}
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        customStartDate={customStartDate}
        onCustomStartDateChange={setCustomStartDate}
        customEndDate={customEndDate}
        onCustomEndDateChange={setCustomEndDate}
      />

      {/* KPI CARDS */}
      <Box
        display="grid"
        gap="md"
        sx={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
        }}
      >
        <Card
          sx={{
            background: `linear-gradient(135deg, ${COLORS.PRIMARY} 0%, ${COLORS.PRIMARY_DARK} 100%)`,
            color: 'white'
          }}
        >
          <Box display="flex" alignItems="center" gap="md">
            <Box
              p="sm"
              bg="rgba(255,255,255,0.2)"
              borderRadius="full"
            >
              <Icon size="lg" color="white">
                <DollarSign />
              </Icon>
            </Box>

            <Box>
              <Text size="sm" color="white" sx={{ opacity: 0.9 }}>
                Lợi nhuận ròng
              </Text>

              <Text variant="heading-lg" weight="bold">
                {(summary.income - summary.expense).toLocaleString(
                  'vi-VN'
                )}{' '}
                đ
              </Text>
            </Box>
          </Box>
        </Card>

        <Card>
          <Box display="flex" alignItems="center" gap="md">
            <Box p="sm" bg="SUCCESS_LIGHT" borderRadius="full">
              <Icon size="lg" color="SUCCESS">
                <TrendingUp />
              </Icon>
            </Box>

            <Box>
              <Text color="SECONDARY" size="sm">
                Tổng thu
              </Text>

              <Text color="SUCCESS" variant="heading-lg" weight="bold">
                +{summary.income.toLocaleString('vi-VN')} đ
              </Text>
            </Box>
          </Box>
        </Card>
      </Box>

      {/* CHARTS */}
      <Box
        sx={{
          display: "grid",
          gap: "24px",
          gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
          alignItems: "stretch"
        }}
      >
        <Card sx={{ p: 3, height: 420 }}>
          <Text variant="heading-md" mb="md">
            Thu / Chi (6 tháng gần nhất)
          </Text>

          <Box sx={{ width: "100%", height: "340px" }}>
            <IncomeExpenseChart data={filteredData.chartData} />
          </Box>
        </Card>

        <Card sx={{ p: 3, height: 420 }}>
          <Text variant="heading-md" mb="md">
            Tỷ trọng doanh thu theo Chi nhánh
          </Text>

          <Box sx={{ width: "100%", height: "340px" }}>
            <BranchRevenueChart
              transactions={filteredData.transactions}
              branches={branches}
            />
          </Box>
        </Card>
      </Box>

      {/* TRANSACTIONS TABLE */}
      <Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb="md"
        >
          <Text as="h2" variant="heading-lg" weight="bold">
            Lịch sử giao dịch
          </Text>

          <Box display="flex" gap="sm">
            <Button
              variant="ghost"
              leftIcon={
                <Icon>
                  <Download />
                </Icon>
              }
            >
              Xuất Excel
            </Button>
          </Box>
        </Box>

        <DataTable
          data={filteredData.transactions}
          columns={columns}
          keyExtractor={(item) => item.id}
          isLoading={isLoading}
          emptyMessage="Chưa có giao dịch nào."
          totalPages={0}
        />
      </Box>
    </Box>
  );
};