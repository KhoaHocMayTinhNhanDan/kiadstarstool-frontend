/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer, Filter, CreditCard } from 'lucide-react';
import { Box, Text, Button, Icon, Input, Select, Card } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { AppContext } from '@/05-bootstrap/app-context';
import { useToast } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/hooks/useToast';
import { TuitionReceipt } from './components/TuitionReceipt';
import { useAuth } from '../../hooks/user/useAuth';
import { useReactToPrint } from 'react-to-print';
import { DataTable } from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/data/DataTable/DataTable.organism';
import { Modal } from '@/04-frameworks-and-drivers/ui/web/00-design-system/01-molecules/Modal';
import { PaymentStatusBadge } from '../students/components/StudentSharedComponents';

type PendingTuitionItem = {
  studentId: string;
  studentName: string;
  studentPhone?: string;
  branchId: string;
  branchName: string;
  classId: string;
  className: string;
  tuitionAmount: number;
  paidAmount: number;
  paymentStatus: 'unpaid' | 'partial';
  enrollment: any; // The original enrollment object
};

type PaymentMethod = 'cash' | 'bank_transfer' | 'qr_code';

export const CollectTuitionPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const receiptRef = useRef<HTMLDivElement>(null);

  // Data states
  const [allPendingTuitions, setAllPendingTuitions] = useState<PendingTuitionItem[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter states
  const [selectedBranchId, setSelectedBranchId] = useState('');
  const [selectedClassId, setSelectedClassId] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  // Modal states
  const [paymentModalData, setPaymentModalData] = useState<PendingTuitionItem | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [amountToCollect, setAmountToCollect] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [receiptModalData, setReceiptModalData] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const financeController = AppContext.getFinanceController();
        const branchController = AppContext.getBranchController();
        const classController = AppContext.getClassesController();

        // OPTIMIZED: Sử dụng API chuyên biệt để lấy danh sách nợ
        const [pendingResult, branchResult, classResult] = await Promise.all([
          financeController.listPendingTuitions({}), 
          branchController.listBranches({}),
          classController.listClassesByBranch('') // Fetch all classes
        ]);

        const branchesData = branchResult.isSuccess ? branchResult.getValue() : [];
        const classesData = classResult.isSuccess ? classResult.getValue() : [];
        setBranches(branchesData);
        setClasses(classesData);

        if (pendingResult.isSuccess) {
          const pendingDTOs = pendingResult.getValue();
          const branchMap = new Map(branchesData.map(b => [b.id, b.name]));
          const classMap = new Map(classesData.map(c => [c.id, c.name]));

          const pendingItems: PendingTuitionItem[] = pendingDTOs.map(dto => ({
            studentId: dto.studentId,
            studentName: dto.studentName,
            studentPhone: dto.studentPhone,
            branchId: dto.branchId,
            branchName: branchMap.get(dto.branchId) || dto.branchId,
            classId: dto.classId,
            className: classMap.get(dto.classId) || dto.classId,
            tuitionAmount: dto.tuitionAmount,
            paidAmount: dto.paidAmount,
            paymentStatus: dto.paymentStatus,
            // Mock enrollment object for compatibility with existing logic
            enrollment: { 
              branchId: dto.branchId, 
              classId: dto.classId, 
              paymentStatus: dto.paymentStatus,
              tuitionAmount: dto.tuitionAmount,
              paidAmount: dto.paidAmount
            }
          }));
          
          setAllPendingTuitions(pendingItems);
        }
      } catch (error) {
        toast.error('Lỗi tải dữ liệu các khoản phí cần thu.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredClassesForDropdown = useMemo(() => {
    if (!selectedBranchId) return classes;
    return classes.filter(c => c.branchId === selectedBranchId);
  }, [selectedBranchId, classes]);

  const filteredTuitions = useMemo(() => {
    return allPendingTuitions.filter(item => {
      const branchMatch = !selectedBranchId || item.branchId === selectedBranchId;
      const classMatch = !selectedClassId || item.classId === selectedClassId;
      const keywordMatch = !searchKeyword || item.studentName.toLowerCase().includes(searchKeyword.toLowerCase());
      return branchMatch && classMatch && keywordMatch;
    });
  }, [allPendingTuitions, selectedBranchId, selectedClassId, searchKeyword]);

  const openPaymentModal = (item: PendingTuitionItem) => {
    // const remainingAmount = item.tuitionAmount - item.paidAmount;
    // setAmountToCollect(remainingAmount.toString());
    setAmountToCollect('0');
    setPaymentModalData(item);
  };

  const handleCollect = async (item: PendingTuitionItem) => {
    const collectAmount = Number(amountToCollect);
    const remainingAmount = item.tuitionAmount - item.paidAmount;

    if (isNaN(collectAmount) || collectAmount <= 0) {
      toast.error('Số tiền thu phải là một số dương.');
      return;
    }
    if (collectAmount > remainingAmount) {
      toast.error(`Số tiền thu không được lớn hơn số tiền chưa thanh toán (${remainingAmount.toLocaleString()} đ).`);
      return;
    }

    // Tạo nội dung giao dịch chi tiết
    let description = `Thu học phí lớp ${item.className} - ${item.studentName}`;
    if (item.studentPhone) description += ` - ${item.studentPhone}`;
    
    // Thêm hậu tố nếu là thanh toán 1 phần hoặc thanh toán nốt
    if (collectAmount < remainingAmount) {
      description += ' (Thanh toán 1 phần)';
    } else if (item.paidAmount > 0) {
      description += ' (Thanh toán nốt)';
    }

    setIsProcessing(true);
    try {
      const controller = AppContext.getFinanceController();
      const result = await controller.collectTuition({
        studentId: item.studentId,
        branchId: item.branchId,
        classId: item.classId,
        amount: collectAmount,
        method: paymentMethod,
        transactionDate: new Date(),
        performedBy: user?.id || 'unknown',
        description: description
      });

      if (result.isSuccess) {
        toast.success('Thu học phí thành công!');
        const { updatedPaymentStatus, transactionId } = result.getValue();
        setPaymentModalData(null); // Close payment modal
        setReceiptModalData({ transactionResult: { transactionId }, tuitionItem: item, paymentMethod, amountCollected: collectAmount });
        
        // Refresh list based on the new payment status
        if (updatedPaymentStatus === 'paid') {
          setAllPendingTuitions(prev => prev.filter(p => p.enrollment !== item.enrollment));
        } else {
          setAllPendingTuitions(prev => prev.map(p => {
            if (p.enrollment === item.enrollment) {
              return { ...p, paidAmount: p.paidAmount + collectAmount, paymentStatus: 'partial' };
            }
            return p;
          }));
        }
      } else {
        toast.error(result.getErrorValue() as string);
      }
    } catch (error) {
      toast.error('Lỗi hệ thống khi thu học phí');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePrint = useReactToPrint({ contentRef: receiptRef });

  const columns = [
    {
      key: 'student',
      header: 'Học viên',
      render: (item: PendingTuitionItem) => <Text weight="medium">{item.studentName}</Text>
    },
    {
      key: 'class',
      header: 'Lớp / Chi nhánh',
      render: (item: PendingTuitionItem) => (
        <Box>
          <Text size="sm">{item.className}</Text>
          <Text size="xs" color="SECONDARY">{item.branchName}</Text>
        </Box>
      )
    },
    {
      key: 'amount',
      header: 'Số tiền phải thu',
      render: (item: PendingTuitionItem) => <Text weight="bold" color="DANGER">{(item.tuitionAmount - item.paidAmount).toLocaleString()} đ</Text>
    },
    {
      key: 'status',
      header: 'Trạng thái',
      render: (item: PendingTuitionItem) => <PaymentStatusBadge status={item.paymentStatus} />
    },
    {
      key: 'action',
      header: 'Hành động',
      align: 'center' as const,
      render: (item: PendingTuitionItem) => (
        <Button size="sm" variant="outline" onClick={() => openPaymentModal(item)} leftIcon={<Icon><CreditCard /></Icon>}>
          Tạo phiếu thu
        </Button>
      )
    }
  ];

  return (
    <Box p="xl" maxWidth="1200px" mx="auto">
      <Button variant="ghost" onClick={() => navigate('/finance')} leftIcon={<Icon><ArrowLeft /></Icon>} sx={{ mb: 'lg' }}>
        Quay lại Tài chính
      </Button>

      <Text as="h1" variant="heading-xl" weight="bold" mb="md">Thu học phí</Text>

      <Card>
        <Box display="flex" gap="md" alignItems="center" mb="md" flexWrap="wrap">
          <Input placeholder="Tìm theo tên học viên..." value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} fullWidth />
          <Icon color="SECONDARY"><Filter /></Icon>
          <Select
            value={selectedBranchId}
            onChange={(e) => setSelectedBranchId(e.target.value)}
            options={[{ label: 'Tất cả chi nhánh', value: '' }, ...branches.map(b => ({ label: b.name, value: b.id }))]}
          />
          <Select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            options={[{ label: 'Tất cả lớp', value: '' }, ...filteredClassesForDropdown.map(c => ({ label: c.name, value: c.id }))]}
          />
        </Box>

        <DataTable
          data={filteredTuitions}
          columns={columns}
          keyExtractor={(item) => item.studentId + item.classId}
          isLoading={isLoading}
          emptyMessage="Không có khoản phí nào cần thu."
          totalPages={0}
        />
      </Card>

      {/* Payment Modal */}
      <Modal isOpen={!!paymentModalData} onClose={() => setPaymentModalData(null)} title="Xác nhận thu học phí">
        {paymentModalData && (
          <Box display="flex" flexDirection="column" gap="md">
            <Text>Học viên: <Text as="span" weight="bold">{paymentModalData.studentName}</Text></Text>
            <Text>Lớp: <Text as="span" weight="bold">{paymentModalData.className}</Text></Text>
            {/* <Text>Chưa thanh toán: <Text as="span" weight="bold">{(paymentModalData.tuitionAmount - paymentModalData.paidAmount).toLocaleString()} đ</Text></Text> */}
            {/* <Text>Còn lại sau thu: <Text as="span" weight="bold" color="DANGER">{(paymentModalData.tuitionAmount - paymentModalData.paidAmount - (Number(amountToCollect) || 0)).toLocaleString()} đ</Text></Text> */}
            <Text>Chưa thanh toán: <Text as="span" weight="bold" color="DANGER">{(paymentModalData.tuitionAmount - paymentModalData.paidAmount - (Number(amountToCollect) || 0)).toLocaleString()} đ</Text></Text>
            <Box display="flex" gap="sm" alignItems="flex-end">
              <Box flex={1}>
                <Input
                  type="number"
                  label="Số tiền thu"
                  value={amountToCollect}
                  onChange={(e) => setAmountToCollect(e.target.value)}
                  placeholder="Nhập số tiền cần thu"
                  fullWidth
                />
              </Box>
              <Button variant="outline" onClick={() => setAmountToCollect((paymentModalData.tuitionAmount - paymentModalData.paidAmount).toString())}>
                Thu tất cả
              </Button>
            </Box>
            <Select
              label="Phương thức thanh toán"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
              options={[
                { label: 'Tiền mặt', value: 'cash' },
                { label: 'Chuyển khoản', value: 'bank_transfer' },
                { label: 'Quét mã QR', value: 'qr_code' }
              ]}
              fullWidth
            />
            <Button onClick={() => handleCollect(paymentModalData)} isLoading={isProcessing} fullWidth>Xác nhận thu {Number(amountToCollect).toLocaleString()} đ</Button>
          </Box>
        )}
      </Modal>

      {/* Receipt Modal */}
      <Modal isOpen={!!receiptModalData} onClose={() => setReceiptModalData(null)} title="Thu thành công">
        {receiptModalData && (
          <Box>
            <div style={{ display: 'none' }}>
              <TuitionReceipt
                ref={receiptRef}
                studentName={receiptModalData.tuitionItem.studentName}
                className={receiptModalData.tuitionItem.className}
                amountPaid={receiptModalData.amountCollected}
                paymentDate={new Date()}
                paymentMethod={receiptModalData.paymentMethod}
                transactionCode={receiptModalData.transactionResult.transactionId}
                collectedBy={user?.displayName || 'Admin'}
                branchName={receiptModalData.tuitionItem.branchName}
                branchAddress={branches.find(b => b.id === receiptModalData.tuitionItem.branchId)?.address || ''}
              />
            </div>
            <TuitionReceipt
              studentName={receiptModalData.tuitionItem.studentName}
              className={receiptModalData.tuitionItem.className}
              amountPaid={receiptModalData.amountCollected}
              paymentDate={new Date()}
              paymentMethod={receiptModalData.paymentMethod}
              transactionCode={receiptModalData.transactionResult.transactionId}
              collectedBy={user?.displayName || 'Admin'}
              branchName={receiptModalData.tuitionItem.branchName}
              branchAddress={branches.find(b => b.id === receiptModalData.tuitionItem.branchId)?.address || ''}
            />
            <Box display="flex" justifyContent="center" gap="md" mt="lg">
              <Button variant="outline" onClick={handlePrint} leftIcon={<Icon><Printer /></Icon>}>In biên lai</Button>
              <Button onClick={() => setReceiptModalData(null)}>Đóng</Button>
            </Box>
          </Box>
        )}
      </Modal>
    </Box>
  );
};