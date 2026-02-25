/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Box, Text, Button, Icon, Input, Card } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { AppContext } from '@/00-core/app-context';
import { useToast } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/hooks/useToast';
import { useAuth } from '../../hooks/user/useAuth';
import { type BranchListItem } from '@/02-usecases/branch/ports/output/ListBranches.output';

export const CreateTransactionPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [branches, setBranches] = useState<BranchListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    type: 'expense', // Default to expense as income usually comes from tuition
    amount: '',
    branchId: '',
    description: '',
    method: 'cash',
    transactionDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const fetchBranches = async () => {
      const controller = AppContext.getBranchController();
      const result = await controller.listBranches({});
      if (result.isSuccess) {
        const data = result.getValue();
        setBranches(data);
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, branchId: data[0].id }));
        }
      }
    };
    fetchBranches();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.branchId || !formData.description) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    setIsLoading(true);
    try {
      const controller = AppContext.getFinanceController();
      const result = await controller.createTransaction({
        branchId: formData.branchId,
        code: `TRX-${Date.now()}`, // Simple ID generation
        type: formData.type as any,
        amount: Number(formData.amount),
        method: formData.method as any,
        transactionDate: new Date(formData.transactionDate),
        description: formData.description,
        performedBy: user?.id || user?.uid || 'unknown'
      });

      if (result.isSuccess) {
        toast.success('Tạo giao dịch thành công');
        navigate('/finance');
      } else {
        toast.error(result.getErrorValue() as string);
      }
    } catch (error) {
      toast.error('Đã có lỗi xảy ra');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p="xl" maxWidth="600px" mx="auto">
      <Box mb="lg" display="flex" alignItems="center" gap="sm">
        <Button variant="ghost" size="sm" onClick={() => navigate('/finance')} leftIcon={<Icon><ArrowLeft /></Icon>}>
          Quay lại
        </Button>
        <Text as="h1" variant="heading-xl" weight="bold">Tạo giao dịch mới</Text>
      </Box>

      <Card>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap="md">
            <Box>
              <Text weight="semibold" mb="xs">Loại giao dịch</Text>
              <select
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: `1px solid ${COLORS.NEUTRAL_BORDER}` }}
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="expense">Chi phí (Expense)</option>
                <option value="income">Thu nhập khác (Income)</option>
              </select>
            </Box>

            <Box>
              <Text weight="semibold" mb="xs">Chi nhánh</Text>
              <select
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: `1px solid ${COLORS.NEUTRAL_BORDER}` }}
                value={formData.branchId}
                onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
              >
                {branches.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </Box>

            <Box>
              <Text weight="semibold" mb="xs">Số tiền</Text>
              <Input 
                type="number" 
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="VNĐ"
              />
            </Box>

            <Box>
              <Text weight="semibold" mb="xs">Ngày giao dịch</Text>
              <Input 
                type="date" 
                value={formData.transactionDate}
                onChange={(e) => setFormData({ ...formData, transactionDate: e.target.value })}
              />
            </Box>

            <Box>
              <Text weight="semibold" mb="xs">Hình thức</Text>
              <select
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: `1px solid ${COLORS.NEUTRAL_BORDER}` }}
                value={formData.method}
                onChange={(e) => setFormData({ ...formData, method: e.target.value })}
              >
                <option value="cash">Tiền mặt</option>
                <option value="bank_transfer">Chuyển khoản</option>
                <option value="credit_card">Thẻ tín dụng</option>
              </select>
            </Box>

            <Box>
              <Text weight="semibold" mb="xs">Mô tả</Text>
              <Input 
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="VD: Mua văn phòng phẩm..."
              />
            </Box>

            <Box mt="md" display="flex" justifyContent="flex-end">
              <Button type="submit" variant="primary" isLoading={isLoading} leftIcon={<Icon><Save /></Icon>}>
                Lưu giao dịch
              </Button>
            </Box>
          </Box>
        </form>
      </Card>
    </Box>
  );
};
