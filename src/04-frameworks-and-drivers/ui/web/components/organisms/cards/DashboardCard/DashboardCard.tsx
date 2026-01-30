/** @jsxImportSource @emotion/react */
import { Card } from '../../../atoms/Card';
import { Box } from '../../../atoms/Box';
import { Text } from '../../../atoms/Text';
import { Icon } from '../../../atoms/Icon';
import * as styles from './DashboardCard.styles';
import type { DashboardCardProps } from './DashboardCard.types';

export const DashboardCard = ({
  icon,
  title,
  value,
  description,
  accentColor = 'primary',
  ...props
}: DashboardCardProps) => {
  return (
    <Card {...props}>
      <Box display="flex" alignItems="flex-start" gap="lg">
        <Box css={styles.iconWrapper(accentColor)}>
          <Icon size="lg">{icon}</Icon>
        </Box>

        <Box display="flex" flexDirection="column" gap="xs" minW={0}>
          <Text variant="body-sm" color="SECONDARY">
            {title}
          </Text>
          <Text variant="heading-lg" sx={{ lineHeight: 1.2 }}>
            {value}
          </Text>
          {description && <Text variant="caption">{description}</Text>}
        </Box>
      </Box>
    </Card>
  );
};

DashboardCard.displayName = 'DashboardCard';