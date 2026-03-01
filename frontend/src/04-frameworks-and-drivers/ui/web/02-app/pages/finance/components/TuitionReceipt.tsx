/** @jsxImportSource @emotion/react */
import React from 'react';
import { Box, Text } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { SPACING, COLORS } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';

interface TuitionReceiptProps {
  studentName: string;
  className: string;
  amountPaid: number;
  paymentDate: Date;
  paymentMethod: string;
  transactionCode: string;
  collectedBy: string;
  branchName: string;
  branchAddress: string;
}

// Sử dụng React.forwardRef để truyền ref vào DOM element
export const TuitionReceipt = React.forwardRef<HTMLDivElement, TuitionReceiptProps>((props, ref) => {
  const {
    studentName,
    className,
    amountPaid,
    paymentDate,
    paymentMethod,
    transactionCode,
    collectedBy,
    branchName,
    branchAddress,
  } = props;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const paymentMethodMap: Record<string, string> = {
    cash: 'Tiền mặt',
    bank_transfer: 'Chuyển khoản',
    qr_code: 'Quét mã QR',
    credit_card: 'Thẻ tín dụng'
  };

  return (
    <Box 
      ref={ref} 
      p="xl" 
      bg="white" 
      color="black"
      css={{
        '@media print': {
          padding: 0,
          boxShadow: 'none',
          border: 'none',
        }
      }}
    >
      <Box textAlign="center" mb="lg">
        <Text as="h2" variant="heading-lg" weight="bold">{branchName}</Text>
        <Text size="sm" color="SECONDARY">{branchAddress}</Text>
      </Box>

      <Box textAlign="center" mb="xl">
        <Text as="h1" variant="heading-xl" weight="bold" css={{ textTransform: 'uppercase' }}>Phiếu Thu Học Phí</Text>
        <Text size="sm" color="SECONDARY">Ngày: {paymentDate.toLocaleDateString('vi-VN')}</Text>
      </Box>

      <Box display="flex" flexDirection="column" gap="md" mb="xl">
        <InfoRow label="Họ tên học viên:" value={studentName} />
        <InfoRow label="Thanh toán cho lớp:" value={className} />
        <InfoRow label="Mã giao dịch:" value={transactionCode} />
      </Box>

      <Box border={`1px solid ${COLORS.NEUTRAL_BORDER}`} borderRadius="md" overflow="hidden" mb="xl">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ padding: SPACING.sm, textAlign: 'left' }}>Nội dung</th>
              <th style={{ padding: SPACING.sm, textAlign: 'right' }}>Số tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: SPACING.sm }}>Học phí</td>
              <td style={{ padding: SPACING.sm, textAlign: 'right' }}>{formatCurrency(amountPaid)}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr style={{ borderTop: `1px solid ${COLORS.NEUTRAL_BORDER}` }}>
              <td style={{ padding: SPACING.sm, textAlign: 'right' }}><Text weight="bold">Tổng cộng:</Text></td>
              <td style={{ padding: SPACING.sm, textAlign: 'right' }}><Text weight="bold">{formatCurrency(amountPaid)}</Text></td>
            </tr>
          </tfoot>
        </table>
      </Box>

      <Box display="grid" gridTemplateColumns="1fr 1fr" textAlign="center" mt="50px">
        <Box>
          <Text weight="bold">Người nộp tiền</Text>
          <Text size="sm">(Ký, họ tên)</Text>
        </Box>
        <Box>
          <Text weight="bold">Người thu tiền</Text>
          <Text size="sm">(Ký, họ tên)</Text>
          <Text style={{ height: '80px' }} weight="bold">{collectedBy}</Text>
        </Box>
      </Box>
    </Box>
  );
});

const InfoRow = ({ label, value }: { label: string, value: string }) => (
  <Box display="flex" justifyContent="space-between">
    <Text color="SECONDARY">{label}</Text>
    <Text weight="medium">{value}</Text>
  </Box>
);