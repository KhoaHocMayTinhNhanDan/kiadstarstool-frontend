import { DashboardCard } from './DashboardCard';
import { Box } from '../../../atoms/Box/Box';
import { Text } from '../../../atoms/Text/Text';
import { Icon } from '../../../atoms/Icon';

const UsersIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);

const RevenueIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9h4v2h-4v-2zm-2-4h8v2H8V7z" />
  </svg>
);

const OrdersIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
  </svg>
);

const GrowthIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
  </svg>
);

export const DashboardCardPlayground = () => {
  return (
    <Box p="lg">
      <Text as="h2" variant="heading-2xl" sx={{ mb: '24px' }}>
        📈 DashboardCard Demo
      </Text>

      <Box
        display="grid"
        gap="lg"
        sx={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        }}
      >
        <DashboardCard
          icon={UsersIcon}
          title="Total Users"
          value="10,240"
          description={
            <Text as="span" color="SUCCESS">
              +12% from last month
            </Text>
          }
          accentColor="primary"
        />

        <DashboardCard
          icon={RevenueIcon}
          title="Revenue"
          value="$25,480"
          description="+5.2% vs last week"
          accentColor="success"
        />

        <DashboardCard
          icon={OrdersIcon}
          title="New Orders"
          value="352"
          description="2 new orders pending"
          accentColor="warning"
        />

        <DashboardCard
          icon={GrowthIcon}
          title="Bounce Rate"
          value="24.5%"
          description={
            <Text as="span" color="DANGER">
              -3.1% from yesterday
            </Text>
          }
          accentColor="danger"
        />
      </Box>
    </Box>
  );
};