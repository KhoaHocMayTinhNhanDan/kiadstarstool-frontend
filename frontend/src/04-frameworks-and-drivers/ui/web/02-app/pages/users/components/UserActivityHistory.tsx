/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { Box, Text, LoadingSpinner, Icon } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { AppContext } from '@/05-bootstrap/app-context';
import { useToast } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/hooks/useToast';
import { DollarSign, Edit, LogIn, LogOut, UserCog } from 'lucide-react';
import { type ActivityOutput } from '@/02-usecases/activity/ports/output/ListActivities.output';

interface UserActivityHistoryProps {
  userId: string;
}

// Map activity types to icons for the UI
const activityIconMap: Record<string, React.ReactNode> = {
  'auth_logout': <LogOut />,
  'auth_login': <LogIn />,
  'user_update': <UserCog />,
  'transaction_created': <DollarSign />,
  'other': <Edit />,
};

export const UserActivityHistory = ({ userId }: UserActivityHistoryProps) => {
  const [activities, setActivities] = useState<ActivityOutput[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchActivities = async () => {
      if (!userId) return;
      setIsLoading(true);
      try {
        // Giả định AppContext đã có phương thức getActivityController()
        const controller = (AppContext as any).getActivityController();
        const result = await controller.listActivities({ userId });
        
        if (result.isSuccess) {
          setActivities(result.getValue());
        } else {
          toast.error(result.getErrorValue() || "Không thể tải lịch sử hoạt động.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Lỗi hệ thống khi tải lịch sử hoạt động.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, [userId]); // FIX: Bỏ 'toast' khỏi dependency để tránh vòng lặp vô hạn

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (activities.length === 0) {
    return <Text>Không có hoạt động nào được ghi nhận.</Text>;
  }

  return (
    <Box display="flex" flexDirection="column" gap="md">
      {activities.map(activity => (
        <Box key={activity.id} display="flex" gap="md" p="sm" bg="BACKGROUND_NEUTRAL" borderRadius="md">
          <Icon color="SECONDARY">{activityIconMap[activity.type] || <Edit />}</Icon>
          <Box flex="1">
            <Text weight="medium">{activity.description}</Text>
            {activity.details && <Text size="sm" color="SECONDARY">{activity.details}</Text>}
          </Box>
          <Text size="sm" color="SECONDARY" sx={{ whiteSpace: 'nowrap' }}>
            {activity.timestamp.toLocaleString('vi-VN')}
          </Text>
        </Box>
      ))}
    </Box>
  );
};
