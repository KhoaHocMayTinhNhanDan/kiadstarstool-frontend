import { StatsCard } from './StatsCard';
import { Box } from '../../../atoms/Box/Box';
import { Text } from '../../../atoms/Text/Text';

const WalletIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" /></svg>
);

const UsersIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>
);

const ActivityIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" /></svg>
);

export const StatsCardPlayground = () => {
  return (
    <Box p="lg">
      <Text as="h2" variant="heading-2xl" sx={{ mb: '24px' }}>
        📊 StatsCard Demo
      </Text>

      <Box
        display="grid"
        gap="lg"
        sx={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        }}
      >
        <StatsCard
          title="Total Revenue"
          value="$45,231.89"
          icon={WalletIcon}
          accentColor="success"
          trend={{ value: 20.1, label: "vs last month" }}
        />

        <StatsCard
          title="Active Users"
          value="2,345"
          icon={UsersIcon}
          accentColor="info"
          trend={{ value: -4.5, label: "vs last week" }}
        />

        <StatsCard
          title="Bounce Rate"
          value="42.3%"
          icon={ActivityIcon}
          accentColor="warning"
          trend={{ value: 12.5, direction: 'down', label: "vs yesterday" }}
        />

        <StatsCard
          title="Pending Tasks"
          value="12"
          description="Requires immediate attention"
          accentColor="danger"
        />
      </Box>
    </Box>
  );
};