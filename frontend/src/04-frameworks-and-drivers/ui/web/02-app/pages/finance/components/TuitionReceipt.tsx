/** @jsxImportSource @emotion/react */
import React from 'react';
import { Box, Text, Card } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';

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

export const TuitionReceipt = React.forwardRef<HTMLDivElement, TuitionReceiptProps>(
  ({ studentName, className, amountPaid, paymentDate, paymentMethod, transactionCode, collectedBy, branchName, branchAddress }, ref) => {
    return (
      <Card ref={ref} sx={{ border: `1px solid ${COLORS.NEUTRAL_BORDER}`, p: 'xl', maxWidth: '600px', mx: 'auto', bg: '#fff' }}>
        <Box textAlign="center" mb="lg">
          <Text variant="heading-lg" weight="bold" color="PRIMARY">BIÊN LAI THU HỌC PHÍ</Text>
          <Text size="sm" color="SECONDARY">Ngày: {paymentDate.toLocaleString('vi-VN')}</Text>
        </Box>
        <Box display="flex" flexDirection="column" gap="sm" mb="lg">
          <Text>Trung tâm: <Text as="span" weight="bold">{branchName}</Text></Text>
          <Text size="sm" color="SECONDARY">Địa chỉ: {branchAddress}</Text>
        </Box>
        <Box display="flex" flexDirection="column" gap="md" mb="xl" py="lg" borderTop={`2px dashed ${COLORS.NEUTRAL_BORDER}`} borderBottom={`2px dashed ${COLORS.NEUTRAL_BORDER}`}>
          <Box display="flex" justifyContent="space-between"><Text color="SECONDARY">Học viên:</Text><Text weight="medium">{studentName}</Text></Box>
          <Box display="flex" justifyContent="space-between"><Text color="SECONDARY">Lớp:</Text><Text weight="medium">{className}</Text></Box>
          <Box display="flex" justifyContent="space-between"><Text color="SECONDARY">Hình thức:</Text><Text weight="medium">{paymentMethod}</Text></Box>
          <Box display="flex" justifyContent="space-between" mt="md" p="md" bg="NEUTRAL_LIGHT" borderRadius="md">
            <Text size="lg" weight="bold">SỐ TIỀN:</Text>
            <Text size="lg" weight="bold" color="PRIMARY">{(amountPaid || 0).toLocaleString('vi-VN')} VNĐ</Text>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" mt="xl">
          <Box textAlign="center"><Text weight="medium">Người nộp</Text><Text size="sm" color="SECONDARY">(Ký tên)</Text></Box>
          <Box textAlign="center">
            <Text weight="medium">Người thu</Text><Text size="sm" color="SECONDARY">(Ký tên)</Text>
            <Text weight="bold" >{collectedBy}</Text>
          </Box>
        </Box>
        <Text size="xs" color="SECONDARY">Mã phiếu: {transactionCode}</Text>
      </Card>
    );
  }
);