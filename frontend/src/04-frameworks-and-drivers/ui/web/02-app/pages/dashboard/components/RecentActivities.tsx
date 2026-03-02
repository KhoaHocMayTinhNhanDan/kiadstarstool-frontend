/** @jsxImportSource @emotion/react */
import { Box, Text, Card, Icon } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { UserPlus, DollarSign, BookOpen, Bell } from 'lucide-react';
import { useI18n } from '@/shared/i18n/useI18n';
import { type LanguageCode } from '@/shared/i18n/i18n.config';

export interface ActivityItem {
  id: string;
  type: 'student' | 'finance' | 'class' | 'system';
  titleKey: string; // i18n key for the title
  descriptionKey?: string; // i18n key for a structured description
  descriptionContext?: string; // Raw, dynamic text for the description
  timestamp: Date;
  params?: Record<string, string | number>; // Params for i18n interpolation
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

const currencyMap: Record<LanguageCode, { locale: string; currency: string }> = {
  vi: { locale: 'vi-VN', currency: 'VND' },
  en: { locale: 'en-US', currency: 'USD' },
  ja: { locale: 'ja-JP', currency: 'JPY' },
  zh: { locale: 'zh-CN', currency: 'CNY' },
};

const formatTime = (date: Date, t: (key: string, params?: any) => string) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return t('common.time.just_now', { defaultValue: 'Vừa xong' });
  if (minutes < 60) return t('common.time.minutes_ago', { count: minutes, defaultValue: `${minutes} phút trước` });
  if (hours < 24) return t('common.time.hours_ago', { count: hours, defaultValue: `${hours} giờ trước` });
  return t('common.time.days_ago', { count: days, defaultValue: `${days} ngày trước` });
};

export const RecentActivities = ({ activities }: { activities: ActivityItem[] }) => {
  const { t, language } = useI18n();

  return (
    <Card>
      <Box mb="md">
        <Text weight="bold" size="lg">{t('dashboard.recent_activity')}</Text>
      </Box>
      <Box display="flex" flexDirection="column" gap="md">
        {activities.length === 0 ? (
          <Text color="SECONDARY" size="sm">{t('dashboard.no_activity', { defaultValue: 'Chưa có hoạt động nào.' })}</Text>
        ) : (
          activities.map((item) => {
            // Determine the final description to show
            let finalDescription = '';
            if (item.descriptionKey) {
              finalDescription = t(item.descriptionKey, item.params);
            } else if (item.descriptionContext) {
              finalDescription = item.descriptionContext;
            }

            // Append formatted amount for finance activities
            if (item.type === 'finance' && item.params?.amount) {
              const { locale, currency } = currencyMap[language] || currencyMap.en;
              const formattedAmount = new Intl.NumberFormat(locale, { style: 'currency', currency }).format(item.params.amount as number);
              
              if (finalDescription) {
                finalDescription = `${finalDescription} - ${formattedAmount}`;
              } else {
                finalDescription = formattedAmount;
              }
            }

            return (
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
                  <Text size="sm" weight="medium">{t(item.titleKey)}</Text>
                  <Text size="xs" color="SECONDARY" truncate>{finalDescription}</Text>
                </Box>
                <Text size="xs" color="SECONDARY" style={{ whiteSpace: 'nowrap' }}>
                  {formatTime(item.timestamp, t)}
                </Text>
              </Box>
            );
          })
        )}
      </Box>
    </Card>
  );
};