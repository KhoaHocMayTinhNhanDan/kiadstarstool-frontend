/** @jsxImportSource @emotion/react */
import { Box, Text, Card, Icon } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { UserPlus, DollarSign, BookOpen, Bell } from 'lucide-react';

export interface ActivityItem {
  id: string;
  type: 'student' | 'finance' | 'class' | 'system';
  title: string;
  description: string;
  timestamp: Date;
}

const getActivityIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'student': return <UserPlus size={16} />;
    case 'finance': return <DollarSign size={16} />;
    case 'class': return <BookOpen size={16} />;
    default: return <Bell size={16} />;
  }
};

const getActivityColor = (type: ActivityItem['type']) => {
  switch (type) {
    case 'student': return 'PRIMARY';
    case 'finance': return 'SUCCESS';
    case 'class': return 'WARNING';
    default: return 'SECONDARY';
  }
};

const formatTime = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return 'Vừa xong';
  if (minutes < 60) return `${minutes} phút trước`;
  if (hours < 24) return `${hours} giờ trước`;
  return `${days} ngày trước`;
};

export const RecentActivities = ({ activities }: { activities: ActivityItem[] }) => {
  return (
    <Card>
      <Box mb="md">
        <Text weight="bold" size="lg">Hoạt động gần đây</Text>
      </Box>
      <Box display="flex" flexDirection="column" gap="md">
        {activities.length === 0 ? (
          <Text color="SECONDARY" size="sm">Chưa có hoạt động nào.</Text>
        ) : (
          activities.map((item) => (
            <Box key={item.id} display="flex" gap="md" alignItems="flex-start">
              <Box 
                minW="32px" h="32px" 
                borderRadius="full" 
                bg={`${getActivityColor(item.type)}_LIGHT` as any} 
                color={getActivityColor(item.type) as any}
                display="flex" alignItems="center" justifyContent="center"
              >
                <Icon>{getActivityIcon(item.type)}</Icon>
              </Box>
              <Box flex="1">
                <Text size="sm" weight="medium">{item.title}</Text>
                <Text size="xs" color="SECONDARY" truncate>{item.description}</Text>
              </Box>
              <Text size="xs" color="SECONDARY" style={{ whiteSpace: 'nowrap' }}>
                {formatTime(item.timestamp)}
              </Text>
            </Box>
          ))
        )}
      </Box>
    </Card>
  );
};