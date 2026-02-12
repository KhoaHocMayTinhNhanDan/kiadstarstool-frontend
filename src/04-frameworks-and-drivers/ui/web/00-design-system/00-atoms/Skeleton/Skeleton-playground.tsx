import { Skeleton } from './Skeleton';
import { Box } from '../Box/Box';
import { Card } from '../Card/Card';
import { Text } from '../Text/Text';

export const SkeletonPlayground = () => {
  return (
    <Box p="lg">
      <Text as="h2" size="2xl" weight="bold" sx={{ marginBottom: '24px' }}>💀 Skeleton Demo</Text>

      <Box display="flex" gap="xl" flexWrap="wrap">
        {/* Profile Card Skeleton */}
        <Card sx={{ width: 300 }}>
          <Box display="flex" alignItems="center" gap="md" mb="md">
            <Skeleton variant="circular" width={48} height={48} />
            <Box flex={1}>
              <Skeleton variant="text" width="60%" sx={{ marginBottom: 8 }} />
              <Skeleton variant="text" width="40%" />
            </Box>
          </Box>
          <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 8 }} />
        </Card>

        {/* List Skeleton */}
        <Card sx={{ width: 300 }}>
          {[1, 2, 3].map((i) => (
            <Box key={i} display="flex" alignItems="center" gap="md" mb={i === 3 ? 'none' : 'md'}>
              <Skeleton variant="rounded" width={40} height={40} />
              <Skeleton variant="text" width={`calc(100% - 52px)`} />
            </Box>
          ))}
        </Card>

        {/* Custom Style (sx) */}
        <Card sx={{ width: 300 }}>
          <Box mb="sm"><Text weight="semibold">Custom Style (sx)</Text></Box>
          <Skeleton variant="rectangular" height={50} sx={{ backgroundColor: '#bfdbfe', borderRadius: '12px' }} />
          <Skeleton variant="text" width="80%" sx={{ marginTop: 8, backgroundColor: '#bfdbfe' }} />
        </Card>
      </Box>
    </Box>
  );
};