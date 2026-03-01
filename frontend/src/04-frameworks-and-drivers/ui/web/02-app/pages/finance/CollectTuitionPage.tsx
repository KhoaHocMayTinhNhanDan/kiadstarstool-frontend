/** @jsxImportSource @emotion/react */
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { ArrowLeft, Save, Printer, Search, CreditCard } from 'lucide-react';
import { Box, Text, Button, Icon, Input, Card } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { AppContext } from '@/00-core/app-context';
import { useToast } from '../../../01-ui-core/hooks/useToast';
import { useAuth } from '../../hooks/user/useAuthorization';
import { TuitionReceipt } from './components/TuitionReceipt';

export const CollectTuitionPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preSelectedStudentId = searchParams.get('studentId');
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Refs for printing
  const receiptRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: receiptRef,
  });

  // Data States
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [unpaidEnrollments, setUnpaidEnrollments] = useState<any[]>([]);
  const [selectedEnrollment, setSelectedEnrollment] = useState<any>(null);
  const [branches, setBranches] = useState<any[]>([]);
  
  // Form States
  const [amount, setAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionData, setTransactionData] = useState<any>(null);

  // 1. Load initial data
  useEffect(() => {
    const init = async () => {
      const branchController = AppContext.getBranchController();
      const studentController = AppContext.getStudentsController();

      const [branchRes, studentRes] = await Promise.all([
        branchController.listBranches({}),
        studentController.listStudentsByBranch({ branchId: '' })
      ]);

      if (branchRes.isSuccess) setBranches(branchRes.getValue());
      if (studentRes.isSuccess) {
        const allStudents = studentRes.getValue();
        setStudents(allStudents);
        
        // Auto select if param exists
        if (preSelectedStudentId) {
          const found = allStudents.find(s => s.id === preSelectedStudentId);
          if (found) handleSelectStudent(found.id);
        }
      }
    };
    init();
  }, [preSelectedStudentId]);

  // 2. Handle Student Selection
  const handleSelectStudent = async (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    // Fetch full details to get enrollments
    const controller = AppContext.getStudentsController();
    const result = await controller.getStudentDetails({ studentId });
    
    if (result.isSuccess) {
      const details = result.getValue();
      setSelectedStudent(details);
      
      // Filter unpaid or partial enrollments
      const unpaid = details.enrollments.filter(e => e.paymentStatus !== 'paid');
      setUnpaidEnrollments(unpaid);
      
      // Auto select first unpaid if available
      if (unpaid.length > 0) {
        handleSelectEnrollment(unpaid[0], details);
      } else {
        setSelectedEnrollment(null);
        setAmount(0);
      }
    }
  };

  const handleSelectEnrollment = (enrollment: any, studentDetails: any = selectedStudent) => {
    setSelectedEnrollment(enrollment);
    // Suggest amount: tuitionAmount - paidAmount
    const remaining = (enrollment.tuitionAmount || 0) - (enrollment.paidAmount || 0);
    setAmount(remaining > 0 ? remaining : 0);
  };

  // 3. Submit Payment
  const handleSubmit = async () => {
    if (!selectedStudent || !selectedEnrollment || amount <= 0) {
      toast.error('Vui lòng kiểm tra lại thông tin thanh toán');
      return;
    }

    setIsLoading(true);
    try {
      const controller = AppContext.getFinanceController();
      
      // Gọi UseCase CollectTuition (hoặc CreateTransaction nếu chưa có CollectTuition)
      // Ở đây dùng collectTuition như đã định nghĩa trong controller
      const result = await controller.collectTuition({
        studentId: selectedStudent.id,
        branchId: selectedEnrollment.branchId,
        classId: selectedEnrollment.classId,
        amount: amount,
        method: paymentMethod as any,
        transactionDate: new Date(),
        performedBy: user?.id || 'unknown',
        description: note || `Thu học phí lớp ${selectedEnrollment.classId}`
      });

      if (result.isSuccess) {
        toast.success('Thu học phí thành công!');
        setIsSuccess(true);
        
        // Prepare data for receipt
        const branch = branches.find(b => b.id === selectedEnrollment.branchId);
        setTransactionData({
          studentName: selectedStudent.name,
          className: selectedEnrollment.classId, // Trong thực tế nên map sang tên lớp
          amountPaid: amount,
          paymentDate: new Date(),
          paymentMethod: paymentMethod,
          transactionCode: result.getValue().transactionId,
          collectedBy: user?.displayName || 'Admin',
          branchName: branch?.name || 'KiadStars',
          branchAddress: branch?.address || ''
        });
      } else {
        toast.error(result.getErrorValue() as string);
      }
    } catch (error) {
      toast.error('Đã có lỗi xảy ra');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setTransactionData(null);
    setAmount(0);
    setNote('');
    // Reload student data to update status
    if (selectedStudent) handleSelectStudent(selectedStudent.id);
  };

  // --- Render Success View (Receipt) ---
  if (isSuccess && transactionData) {
    return (
      <Box p="xl" maxWidth="800px" mx="auto">
        <Box mb="lg" display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap="sm">
            <Icon color="SUCCESS" size="lg"><CreditCard /></Icon>
            <Box>
              <Text variant="heading-lg" weight="bold" color="SUCCESS">Giao dịch thành công</Text>
              <Text color="SECONDARY">Mã GD: {transactionData.transactionCode}</Text>
            </Box>
          </Box>
          <Box display="flex" gap="sm">
            <Button variant="outline" onClick={handleReset}>Thu tiếp</Button>
            <Button variant="primary" leftIcon={<Icon><Printer /></Icon>} onClick={handlePrint}>In phiếu thu</Button>
          </Box>
        </Box>

        <Box border={`1px solid ${COLORS.NEUTRAL_BORDER}`} borderRadius="md" overflow="hidden">
          {/* Hidden component for printing */}
          <div style={{ display: 'none' }}>
            <TuitionReceipt ref={receiptRef} {...transactionData} />
          </div>
          {/* Visible preview */}
          <TuitionReceipt {...transactionData} />
        </Box>
      </Box>
    );
  }

  // --- Render Form View ---
  return (
    <Box p="xl" maxWidth="800px" mx="auto">
      <Box mb="lg" display="flex" alignItems="center" gap="sm">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} leftIcon={<Icon><ArrowLeft /></Icon>}>
          Quay lại
        </Button>
        <Text as="h1" variant="heading-xl" weight="bold">Thu học phí</Text>
      </Box>

      <Box display="grid" gridTemplateColumns="1fr 1fr" gap="lg">
        {/* Left Column: Selection */}
        <Box display="flex" flexDirection="column" gap="lg">
          <Card>
            <Text weight="bold" mb="md">1. Chọn Học viên</Text>
            <Box display="flex" gap="sm" mb="md">
              <Input 
                placeholder="Tìm tên hoặc SĐT..." 
                onChange={(e) => {
                  // Simple client-side filter for demo
                  // In real app, use debounce and API search
                }}
              />
              <Button variant="ghost"><Icon><Search /></Icon></Button>
            </Box>
            <select 
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: `1px solid ${COLORS.NEUTRAL_BORDER}` }}
              value={selectedStudent?.id || ''}
              onChange={(e) => handleSelectStudent(e.target.value)}
            >
              <option value="">-- Chọn học viên --</option>
              {students.map(s => (
                <option key={s.id} value={s.id}>{s.name} - {s.phone}</option>
              ))}
            </select>

            {selectedStudent && (
              <Box mt="md" p="sm" bg="BACKGROUND_NEUTRAL" borderRadius="sm">
                <Text weight="bold">{selectedStudent.name}</Text>
                <Text size="sm" color="SECONDARY">{selectedStudent.phone}</Text>
                <Text size="sm" color="SECONDARY">{selectedStudent.email}</Text>
              </Box>
            )}
          </Card>

          <Card>
            <Text weight="bold" mb="md">2. Chọn Khoản thu (Lớp học)</Text>
            {unpaidEnrollments.length === 0 ? (
              <Text color="SECONDARY" size="sm">Học viên này không có khoản nợ nào.</Text>
            ) : (
              <Box display="flex" flexDirection="column" gap="sm">
                {unpaidEnrollments.map((e, idx) => (
                  <Box 
                    key={idx}
                    p="sm" 
                    border={`1px solid ${selectedEnrollment === e ? COLORS.PRIMARY : COLORS.NEUTRAL_BORDER}`}
                    borderRadius="sm"
                    bg={selectedEnrollment === e ? 'PRIMARY_LIGHT' : 'white'}
                    onClick={() => handleSelectEnrollment(e)}
                    css={{ cursor: 'pointer' }}
                  >
                    <Text weight="medium">{e.classId || 'Chưa xếp lớp'}</Text>
                    <Text size="sm" color="SECONDARY">{e.branchId}</Text>
                    <Box display="flex" justifyContent="space-between" mt="xs">
                      <Text size="sm">Học phí: {(e.tuitionAmount || 0).toLocaleString()}đ</Text>
                      <Text size="sm" color="DANGER">Còn nợ: {((e.tuitionAmount || 0) - (e.paidAmount || 0)).toLocaleString()}đ</Text>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Card>
        </Box>

        {/* Right Column: Payment Details */}
        <Box display="flex" flexDirection="column" gap="lg">
          <Card>
            <Text weight="bold" mb="md">3. Thông tin thanh toán</Text>
            
            <Box mb="md">
              <Text size="sm" mb="xs">Số tiền thực thu</Text>
              <Input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                style={{ fontSize: '18px', fontWeight: 'bold', color: COLORS.PRIMARY }}
              />
            </Box>

            <Box mb="md">
              <Text size="sm" mb="xs">Hình thức thanh toán</Text>
              <select
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: `1px solid ${COLORS.NEUTRAL_BORDER}` }}
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="cash">Tiền mặt</option>
                <option value="bank_transfer">Chuyển khoản</option>
                <option value="qr_code">Quét mã QR</option>
                <option value="credit_card">Thẻ tín dụng</option>
              </select>
            </Box>

            <Box mb="lg">
              <Text size="sm" mb="xs">Ghi chú</Text>
              <Input 
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="VD: Phụ huynh đóng tiền mặt..."
              />
            </Box>

            <Button 
              variant="primary" 
              size="lg"
              onClick={handleSubmit}
              isLoading={isLoading}
              disabled={!selectedEnrollment || amount <= 0}
              leftIcon={<Icon><Save /></Icon>}
            >
              Xác nhận thu tiền
            </Button>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};
