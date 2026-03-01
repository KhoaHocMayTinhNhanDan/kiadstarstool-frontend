/** @jsxImportSource @emotion/react */
import { Box, Text, Icon } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export const PaymentStatusBadge = ({ status }: { status: string }) => {
  let color = 'SECONDARY';
  let bg = 'NEUTRAL_LIGHT';
  let label = status;

  switch (status) {
    case 'paid':
      color = 'SUCCESS';
      bg = 'SUCCESS_LIGHT';
      label = 'Đã thanh toán';
      break;
    case 'unpaid':
      color = 'DANGER';
      bg = 'DANGER_LIGHT';
      label = 'Chưa thanh toán';
      break;
    case 'partial':
      color = 'WARNING';
      bg = 'WARNING_LIGHT';
      label = 'Thanh toán 1 phần';
      break;
  }

  return (
    <Box display="inline-flex" alignItems="center" px="sm" py="xxs" borderRadius="full" bg={bg}>
      <Text size="xs" weight="bold" color={color}>{label}</Text>
    </Box>
  );
};

export const InfoItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: React.ReactNode }) => (
  <Box display="flex" gap="md" alignItems="center">
    <Box color="SECONDARY"><Icon size="sm">{icon}</Icon></Box>
    <Box>
      <Text color="SECONDARY" size="xs">{label}</Text>
      <Text as="div" size="sm" weight="medium">{value}</Text>
    </Box>
  </Box>
);

export const StatusBadge = ({ status }: { status: string }) => {
  let color = 'SECONDARY';
  let bg = 'NEUTRAL_LIGHT';
  let icon = <Clock />;
  let label = status;

  switch (status) {
    case 'present':
      color = 'SUCCESS';
      bg = 'SUCCESS_LIGHT';
      icon = <CheckCircle />;
      label = 'Có mặt';
      break;
    case 'absent':
      color = 'DANGER';
      bg = 'DANGER_LIGHT';
      icon = <XCircle />;
      label = 'Vắng mặt';
      break;
    case 'late':
      color = 'WARNING';
      bg = 'WARNING_LIGHT';
      icon = <AlertCircle />;
      label = 'Đi muộn';
      break;
    case 'excused':
      color = 'INFO';
      bg = 'INFO_LIGHT';
      icon = <CheckCircle />;
      label = 'Có phép';
      break;
  }

  return (
    <Box display="inline-flex" alignItems="center" gap="xs" px="sm" py="xxs" borderRadius="full" bg={bg}>
      <Icon size="xs" color={color}>{icon}</Icon>
      <Text size="xs" weight="bold" color={color}>{label}</Text>
    </Box>
  );
};