/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import { Box, Button, Icon, Text } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { UserPlus, DollarSign, CalendarCheck } from 'lucide-react';
import { useI18n } from '@/shared/i18n/useI18n';

export const QuickActions = () => {
  const navigate = useNavigate();
  const { t } = useI18n();

  const actions = [
    {
      id: 'add-student',
      label: t('dashboard.quick_actions.add_student', { defaultValue: 'Thêm học viên' }),
      icon: <UserPlus />,
      href: '/students/new',
      color: 'PRIMARY'
    },
    {
      id: 'collect-tuition',
      label: t('dashboard.quick_actions.collect_tuition', { defaultValue: 'Thu học phí' }),
      icon: <DollarSign />,
      href: '/finance/collect-tuition',
      color: 'SUCCESS'
    },
    {
      id: 'take-attendance',
      label: t('dashboard.quick_actions.attendance', { defaultValue: 'Điểm danh' }),
      icon: <CalendarCheck />,
      href: '/attendance',
      color: 'WARNING'
    }
  ];

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