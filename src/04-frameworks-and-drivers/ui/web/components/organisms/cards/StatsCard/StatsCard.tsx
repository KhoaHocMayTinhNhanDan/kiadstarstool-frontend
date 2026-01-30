/** @jsxImportSource @emotion/react */
import React from 'react';
import { Card } from '../../../atoms/Card';
import { Box } from '../../../atoms/Box';
import { Text } from '../../../atoms/Text';
import { Icon } from '../../../atoms/Icon';
import * as styles from './StatsCard.styles';
import type { StatsCardProps } from './StatsCard.types';

const TrendUpIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" /></svg>
);

const TrendDownIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z" /></svg>
);

export const StatsCard = ({
  title,
  value,
  icon,
  trend,
  description,
  accentColor = 'primary',
  ...props
}: StatsCardProps) => {
  const isPositive = trend?.direction === 'up' || (trend?.direction === undefined && (trend?.value || 0) >= 0);
  const TrendIcon = isPositive ? TrendUpIcon : TrendDownIcon;

  return (
    <Card {...props}>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb="md">
        <Box display="flex" flexDirection="column" gap="xs" minW={0}>
          <Text variant="body-sm" color="SECONDARY" truncate>
            {title}
          </Text>
          <Text variant="heading-lg" weight="bold" sx={{ lineHeight: 1 }}>
            {value}
          </Text>
        </Box>

        {icon && (
          <Box css={styles.iconBox(accentColor)}>
            <Icon size="md">{icon}</Icon>
          </Box>
        )}
      </Box>

      {(trend || description) && (
        <Box display="flex" alignItems="center" gap="sm" flexWrap="wrap">
          {trend && (
            <span css={styles.trendBadge(isPositive)}>
              <Icon size="xs">{TrendIcon}</Icon>
              {Math.abs(trend.value)}%
            </span>
          )}
          
          {(trend?.label || description) && (
            <Text variant="caption" color="SECONDARY" truncate>
              {trend?.label || description}
            </Text>
          )}
        </Box>
      )}
    </Card>
  );
};

StatsCard.displayName = 'StatsCard';