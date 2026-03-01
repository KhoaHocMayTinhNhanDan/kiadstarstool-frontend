/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import { Box, Button, Icon, Text } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { UserPlus, DollarSign, CalendarCheck } from 'lucide-react';

const actions = [
  {
    id: 'add-student',
    label: 'Thêm học viên',
    icon: <UserPlus />,
    href: '/students/new',
    color: 'PRIMARY'
  },
  {
    id: 'collect-tuition',
    label: 'Thu học phí',
    icon: <DollarSign />,
    href: '/finance/collect-tuition',
    color: 'SUCCESS'
  },
  {
    id: 'take-attendance',
    label: 'Điểm danh',
    icon: <CalendarCheck />,
    href: '/attendance',
    color: 'WARNING'
  }
];

export const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <Box display="flex" gap="md" flexWrap="wrap">
      {actions.map(action => (
        <Button key={action.id} variant="outline" size="md" onClick={() => navigate(action.href)} leftIcon={<Icon color={action.color as any}>{action.icon}</Icon>}>
          {action.label}
        </Button>
      ))}
    </Box>
  );
};