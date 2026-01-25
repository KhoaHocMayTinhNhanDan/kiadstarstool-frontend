import { Skeleton } from './Skeleton';
import { Box } from '../Box/Box';
import { Card } from '../Card/Card';

export const SkeletonTest = () => {
  return (
    <Box p="24px">
      <h2 style={{ marginBottom: 24, fontFamily: 'system-ui' }}>💀 Skeleton Demo</h2>

      <Box display="flex" gap="32px" flexWrap="wrap">
        {/* Profile Card Skeleton */}
        <Card style={{ width: 300 }}>
          <Box display="flex" alignItems="center" gap="16px" mb="16px">
            <Skeleton variant="circular" width={48} height={48} />
            <Box flex="1">
              <Skeleton variant="text" width="60%" style={{ marginBottom: 8 }} />
              <Skeleton variant="text" width="40%" />
            </Box>
          </Box>
          <Skeleton variant="rectangular" height={120} style={{ borderRadius: 8 }} />
        </Card>

        {/* List Skeleton */}
        <Card style={{ width: 300 }}>
          {[1, 2, 3].map((i) => (
            <Box key={i} display="flex" alignItems="center" gap="12px" mb={i === 3 ? 0 : "16px"}>
              <Skeleton variant="rounded" width={40} height={40} />
              <Skeleton variant="text" width={`calc(100% - 52px)`} />
            </Box>
          ))}
        </Card>
      </Box>
    </Box>
  );
};