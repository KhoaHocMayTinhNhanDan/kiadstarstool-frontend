// src/04-frameworks-and-drivers/ui/web/components/02-organisms/cards/StatsCard/StatsCard.organism.tsx
/** @jsxImportSource @emotion/react */
import React from 'react';
import { Box, Text, Icon } from '../../../00-atoms';
import * as styles from './StatsCard.styles';
import type { StatsCardProps } from './StatsCard.types';

const TrendUpIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" /></svg>
);

const TrendDownIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z" /></svg>
);

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  trend,
  description,
  accentColor = 'primary',
  isLoading = false,
  className,
  sx,
  testId = 'stats-card',
}) => {
  const isPositive = trend?.direction === 'up' || (trend?.direction === undefined && (trend?.value || 0) >= 0);
  const TrendIcon = isPositive ? TrendUpIcon : TrendDownIcon;

  if (isLoading) {
    // Skeleton Loading State
    return (
      <Box css={[styles.card, sx]} className={className} data-testid={`${testId}-loading`}>
        <div css={styles.skeletonHeader}>
          <div css={styles.skeletonContent}>
            <Box width="60%" height="16px" bg="NEUTRAL_LIGHT" radius="sm" />
            <Box width="80%" height="32px" bg="NEUTRAL_LIGHT" radius="sm" mt="xs" />
          </div>
          <Box width="48px" height="48px" bg="NEUTRAL_LIGHT" radius="md" />
        </div>
        <div css={styles.skeletonFooter}>
          <Box width="40%" height="20px" bg="NEUTRAL_LIGHT" radius="full" />
        </div>
      </Box>
    );
  }

  return (
    <Box css={[styles.card, sx]} className={className} data-testid={testId}>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb="md">
        <Box display="flex" flexDirection="column" gap="xs" style={{ minWidth: 0 }}>
          <Text variant="body-sm" color="SECONDARY" truncate>
            {title}
          </Text>
          <Text variant="heading-lg" weight="bold" sx={{ lineHeight: 1 }}>
            {value}
          </Text>
        </Box>

        {icon && (
          <div css={styles.iconBox(accentColor)}>
            <Icon size="md">{icon}</Icon>
          </div>
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
    </Box>
  );
};