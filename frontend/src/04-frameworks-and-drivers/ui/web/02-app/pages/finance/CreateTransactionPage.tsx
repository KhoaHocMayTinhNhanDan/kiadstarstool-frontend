/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Box, Text, Button, Icon, Input, Card, Select } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { AppContext } from '@/05-bootstrap/app-context';
import { useToast } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/hooks/useToast';
import { useAuth } from '../../hooks/user/useAuth';
import { type BranchListItem } from '@/02-usecases/branch/ports/output/ListBranches.output';

export const CreateTransactionPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [branches, setBranches] = useState<BranchListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // Using a more specific type for formData improves type safety
  const [formData, setFormData] = useState<{
    type: 'income' | 'expense';
    amount: string;
    branchId: string;
    description: string;
    method: 'cash' | 'bank_transfer' | 'qr_code' | 'credit_card';
    transactionDate: string;
  }>({
    type: 'expense',
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
      // FIX: Kết hợp ngày từ form và giờ/phút/giây hiện tại để có timestamp chính xác
      // Input 'date' chỉ trả về YYYY-MM-DD, khi new Date() sẽ bị set về 00:00:00
      const datePart = formData.transactionDate;
      const now = new Date();
      const timePart = now.toTimeString().split(' ')[0]; // "HH:mm:ss"
      const transactionDate = new Date(`${datePart}T${timePart}`);

      const controller = AppContext.getFinanceController();
      const result = await controller.createTransaction({
        branchId: formData.branchId,
        // NOTE: ID generation on the client is not robust. This should ideally be handled by the backend.
        code: `TRX-${Date.now()}`,
        type: formData.type as any,
        amount: Number(formData.amount),
        method: formData.method,
        transactionDate: transactionDate,
        description: formData.description,
        performedBy: user?.id  || 'unknown'
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
            <Select
              label="Loại giao dịch"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              options={[
                { label: 'Chi phí (Expense)', value: 'expense' },
                { label: 'Thu nhập khác (Income)', value: 'income' }
              ]}
              fullWidth
            />

            <Select
              label="Chi nhánh"
              value={formData.branchId}
              onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
              options={branches.map(b => ({ label: b.name, value: b.id }))}
              fullWidth
            />

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

            <Select
              label="Hình thức"
              value={formData.method}
              onChange={(e) => setFormData({ ...formData, method: e.target.value as any })}
              options={[
                { label: 'Tiền mặt', value: 'cash' },
                { label: 'Chuyển khoản', value: 'bank_transfer' },
                { label: 'Thẻ tín dụng', value: 'credit_card' }
              ]}
              fullWidth
            />

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
