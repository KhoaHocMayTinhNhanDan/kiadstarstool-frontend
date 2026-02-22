/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Box, Text, Button, Icon, Card } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING } from '@/04-frameworks-and-drivers/ui/web/03-ui-shared/constants/tokens-constants';
import { AppContext } from '@/00-core/app-context';
import { type ListTransactionsOutput } from '@/02-usecases/finance/ports/output/ListTransactions.output';

export const FinancePage = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<ListTransactionsOutput>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterBranch, setFilterBranch] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        // Note: Cần đảm bảo FinanceController đã được khởi tạo đầy đủ trong bootstrap
        // Nếu chưa, phần này sẽ lỗi runtime. Giả định bootstrap đã được cập nhật.
        const controller = AppContext.getFinanceController(); 
        const result = await controller.listTransactions({ branchId: filterBranch });
        
        if (result.isSuccess) {
          setTransactions(result.getValue());
        }
      } catch (error) {
        console.error('Failed to fetch transactions', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [filterBranch]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <Box p="xl" maxWidth="1200px" mx="auto">
      <Box mb="lg" display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Text as="h1" variant="heading-xl" weight="bold">Quản lý Tài chính</Text>
          <Text color="SECONDARY">Theo dõi thu chi và dòng tiền.</Text>
        </Box>
        <Button 
          leftIcon={<Icon><Plus /></Icon>} 
          onClick={() => navigate('/finance/new')} // Cần tạo route này sau
        >
          Tạo giao dịch
        </Button>
      </Box>

      {/* Stats Cards (Placeholder) */}
      <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap="md" mb="lg">
        <Card>
          <Box display="flex" alignItems="center" gap="md">
            <Box p="md" bg="SUCCESS_LIGHT" borderRadius="full" color="SUCCESS">
              <Icon><TrendingUp /></Icon>
            </Box>
            <Box>
              <Text color="SECONDARY" size="sm">Tổng thu (Tháng này)</Text>
              <Text weight="bold" size="lg">{formatCurrency(transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0))}</Text>
            </Box>
          </Box>
        </Card>
        <Card>
          <Box display="flex" alignItems="center" gap="md">
            <Box p="md" bg="DANGER_LIGHT" borderRadius="full" color="DANGER">
              <Icon><TrendingDown /></Icon>
            </Box>
            <Box>
              <Text color="SECONDARY" size="sm">Tổng chi (Tháng này)</Text>
              <Text weight="bold" size="lg">{formatCurrency(transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0))}</Text>
            </Box>
          </Box>
        </Card>
      </Box>

      {/* Transaction List */}
      <Card>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb="md">
          <Text weight="bold" size="lg">Lịch sử giao dịch</Text>
          <Button variant="ghost" size="sm" leftIcon={<Icon><Filter /></Icon>}>Lọc</Button>
        </Box>

        {isLoading ? (
          <Text>Đang tải...</Text>
        ) : transactions.length === 0 ? (
          <Text color="SECONDARY" align="center">Chưa có giao dịch nào.</Text>
        ) : (
          <Box display="flex" flexDirection="column" gap="sm">
            {transactions.map((t) => (
              <Box 
                key={t.id} 
                p="md" 
                border={`1px solid ${COLORS.NEUTRAL_BORDER}`} 
                borderRadius="md"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box display="flex" gap="md" alignItems="center">
                  <Box 
                    p="sm" 
                    borderRadius="full" 
                    bg={t.type === 'income' ? 'SUCCESS_LIGHT' : 'DANGER_LIGHT'}
                    color={t.type === 'income' ? 'SUCCESS' : 'DANGER'}
                  >
                    <Icon size="sm">{t.type === 'income' ? <TrendingUp /> : <TrendingDown />}</Icon>
                  </Box>
                  <Box>
                    <Text weight="medium">{t.description || 'Giao dịch không tên'}</Text>
                    <Box display="flex" gap="sm">
                      <Text size="xs" color="SECONDARY">{t.code}</Text>
                      <Text size="xs" color="SECONDARY">•</Text>
                      <Text size="xs" color="SECONDARY">{new Date(t.date).toLocaleDateString('vi-VN')}</Text>
                    </Box>
                  </Box>
                </Box>
                <Box textAlign="right">
                  <Text 
                    weight="bold" 
                    color={t.type === 'income' ? 'SUCCESS' : 'DANGER'}
                  >
                    {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                  </Text>
                  <Text size="xs" color="SECONDARY">{t.method === 'bank_transfer' ? 'Chuyển khoản' : t.method === 'cash' ? 'Tiền mặt' : t.method}</Text>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Card>
    </Box>
  );
};