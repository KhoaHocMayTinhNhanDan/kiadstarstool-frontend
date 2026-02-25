/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, DollarSign, TrendingUp, TrendingDown, FileText, Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Box, Text, Button, Icon, Card, Input } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { AppContext } from '@/00-core/app-context';
import { StatCard } from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/cards/StatCard/StatCard';
import { IncomeExpenseChart } from './components/IncomeExpenseChart';
import { BarChart, type BarSeries } from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/charts/BarChart';
import { Pagination } from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/navigation/Pagination';

export const FinancePage = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const controller = AppContext.getFinanceController();
        const result = await controller.listTransactions({});
        if (result.isSuccess) {
          setTransactions(result.getValue());
        }
      } catch (error) {
        console.error('Failed to load transactions', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  // Calculate Stats
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const netProfit = totalIncome - totalExpense;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const formatDate = (dateValue: any) => {
    try {
      const d = new Date(dateValue);
      return isNaN(d.getTime()) ? 'N/A' : d.toLocaleDateString('vi-VN');
    } catch {
      return 'N/A';
    }
  };

  // Process data for BranchRevenueChart
  const branchRevenueData = transactions.reduce((acc: { name: string, revenue: number }[], curr) => {
    if (curr.type !== 'income') return acc;
    
    const branchName = curr.branchId; // TODO: Map branchId to branchName for better display
    const existing = acc.find(item => item.name === branchName);

    if (existing) {
      existing.revenue += curr.amount;
    } else {
      acc.push({ name: branchName, revenue: curr.amount });
    }
    return acc;
  }, []);
  const revenueSeries: BarSeries[] = [{ key: 'revenue', name: 'Doanh thu', color: COLORS.PRIMARY }];

  // Filter logic
  const filteredTransactions = transactions.filter(t => {
    const matchesType = filterType === 'all' || t.type === filterType;
    const matchesSearch = 
      t.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesType && matchesSearch;
  });

  // Sort logic
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (!sortConfig) return 0;
    
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    // Handle specific types
    if (sortConfig.key === 'date') {
      aValue = new Date(a.date).getTime();
      bValue = new Date(b.date).getTime();
    } else if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [filterType, searchQuery]);

  // Pagination logic
  const paginatedTransactions = sortedTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Helper render header sortable
  const SortableHeader = ({ label, sortKey, align = 'left' }: { label: string, sortKey?: string, align?: string }) => (
    <Box 
      display="flex" 
      alignItems="center" 
      gap="xs" 
      onClick={() => sortKey && handleSort(sortKey)}
      sx={{ 
        cursor: sortKey ? 'pointer' : 'default',
        justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
        userSelect: 'none',
        '&:hover': sortKey ? { color: COLORS.PRIMARY } : {}
      }}
    >
      <Text weight="semibold" size="sm">{label}</Text>
      {sortKey && (
        <Box display="flex" flexDirection="column" color={sortConfig?.key === sortKey ? 'PRIMARY' : 'NEUTRAL_LIGHT'}>
          {sortConfig?.key === sortKey ? (
            sortConfig.direction === 'asc' ? <Icon size="xs"><ArrowUp /></Icon> : <Icon size="xs"><ArrowDown /></Icon>
          ) : (
            <Icon size="xs"><ArrowUpDown /></Icon>
          )}
        </Box>
      )}
    </Box>
  );

  return (
    <Box display="flex" flexDirection="column" gap="lg">
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Text as="h1" variant="heading-lg" weight="bold">Quản lý Tài chính</Text>
          <Text color="SECONDARY">Theo dõi thu chi và doanh thu.</Text>
        </Box>
        <Box display="flex" gap="sm">
          <Button 
            variant="outline" 
            leftIcon={<Icon><DollarSign /></Icon>}
            onClick={() => navigate('/finance/collect-tuition')}
          >
            Thu học phí
          </Button>
          <Button 
            variant="primary" 
            leftIcon={<Icon><Plus /></Icon>}
            onClick={() => navigate('/finance/new')}
          >
            Tạo giao dịch
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap="md">
        <StatCard 
          title="Tổng thu" 
          value={formatCurrency(totalIncome)} 
          icon={<TrendingUp />} 
          accentColor="success" 
          isLoading={isLoading}
        />
        <StatCard 
          title="Tổng chi" 
          value={formatCurrency(totalExpense)} 
          icon={<TrendingDown />} 
          accentColor="danger" 
          isLoading={isLoading}
        />
        <StatCard 
          title="Lợi nhuận ròng" 
          value={formatCurrency(netProfit)} 
          icon={<DollarSign />} 
          accentColor={netProfit >= 0 ? 'primary' : 'danger'} 
          isLoading={isLoading}
        />
      </Box>

      {/* Charts Section */}
      <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(400px, 1fr))" gap="lg">
        <Card>
          <Text weight="bold" mb="md">Thu chi theo thời gian</Text>
          <Box h="300px" w="100%">
            {/* TODO: Nên thay thế bằng component AreaChart từ design system */}
            <IncomeExpenseChart data={transactions} /> 
          </Box>
        </Card>
        <Card>
          <Text weight="bold" mb="md">Doanh thu theo chi nhánh</Text>
          <Box h="300px" w="100%">
            <BarChart 
              data={branchRevenueData}
              xAxisKey="name"
              series={revenueSeries}
              isLoading={isLoading}
              valueFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
            />
          </Box>
        </Card>
      </Box>

      {/* Recent Transactions List */}
      <Card>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb="md" flexWrap="wrap" gap="md">
          <Text weight="bold">Giao dịch gần đây</Text>
          <Box display="flex" gap="sm" alignItems="center">
            <Box display="flex" alignItems="center" gap="sm" px="md" borderRadius="md" border={`1px solid ${COLORS.NEUTRAL_BORDER}`}>
               <Icon color="SECONDARY" size="sm"><Search /></Icon>
               <Input 
                 placeholder="Tìm mã, nội dung..." 
                 value={searchQuery}
                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                 style={{ border: 'none', background: 'transparent', padding: '8px 0', outline: 'none', width: '200px' }}
               />
            </Box>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              style={{ 
                padding: '8px 12px', 
                borderRadius: '6px', 
                border: `1px solid ${COLORS.NEUTRAL_BORDER}`,
                outline: 'none',
                cursor: 'pointer',
                height: '40px'
              }}
            >
              <option value="all">Tất cả</option>
              <option value="income">Khoản thu</option>
              <option value="expense">Khoản chi</option>
            </select>
          </Box>
        </Box>
        
        {/* Table using Box Grid */}
        <Box overflow="auto">
          {/* Header */}
          <Box 
            display="grid" 
            px="md" py="sm" 
            bg="NEUTRAL_LIGHT"
            sx={{ 
              gridTemplateColumns: "1.5fr 1.5fr 3fr 1.5fr 1.5fr",
              borderBottom: `1px solid ${COLORS.NEUTRAL_BORDER}`,
              minWidth: '800px' // Ensure horizontal scroll on small screens
            }}
          >
            <SortableHeader label="Mã GD" sortKey="code" />
            <SortableHeader label="Ngày" sortKey="date" />
            <SortableHeader label="Nội dung" sortKey="description" />
            <SortableHeader label="Chi nhánh" sortKey="branchId" />
            <SortableHeader label="Số tiền" sortKey="amount" align="right" />
          </Box>

          {/* Body */}
          {paginatedTransactions.map(t => (
            <Box 
              key={t.id} 
              display="grid" 
              px="md" py="md"
              alignItems="center"
              sx={{ 
                gridTemplateColumns: "1.5fr 1.5fr 3fr 1.5fr 1.5fr",
                borderBottom: `1px solid ${COLORS.NEUTRAL_LIGHT}`,
                minWidth: '800px',
                '&:hover': { backgroundColor: COLORS.NEUTRAL_LIGHT }
              }}
            >
              <Text size="sm" weight="medium">{t.code}</Text>
              <Text size="sm" color="SECONDARY">{formatDate(t.date)}</Text>
              <Text size="sm" truncate>{t.description}</Text>
              <Text size="sm" color="SECONDARY">{t.branchId}</Text>
              <Text size="sm" weight="bold" align="right" color={t.type === 'income' ? 'SUCCESS' : 'DANGER'}>
                {t.type === 'income' ? '+' : '-'}{t.amount.toLocaleString()}
              </Text>
            </Box>
          ))}
          
          {sortedTransactions.length > ITEMS_PER_PAGE && (
            <Box display="flex" justifyContent="center" p="md">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(sortedTransactions.length / ITEMS_PER_PAGE)}
                onPageChange={setCurrentPage}
              />
            </Box>
          )}
        </Box>
      </Card>
    </Box>
  );
};
