/** @jsxImportSource @emotion/react */
import React from 'react';
import { Card } from '../../../atoms/Card';
import { Box } from '../../../atoms/Box';
import { Text } from '../../../atoms/Text';
import { Avatar } from '../../../atoms/Avatar';
import { Button } from '../../../atoms/Button';
import * as styles from './UserProfileCard.styles';
import type { UserProfileCardProps } from './UserProfileCard.types';

export const UserProfileCard = ({
  avatarSrc,
  avatarFallback,
  name,
  role,
  coverSrc,
  stats,
  description,
  actions,
  onFollow,
  isFollowing,
  ...props
}: UserProfileCardProps) => {
  return (
    <Card {...props} sx={{ padding: 0, overflow: 'hidden', ...props.sx }}>
      {/* Cover Image */}
      {coverSrc ? (
        <img src={coverSrc} alt="Cover" css={styles.coverImage} />
      ) : (
        <div css={styles.coverImage} />
      )}

      <div css={styles.contentWrapper}>
        {/* Avatar */}
        <div css={styles.avatarWrapper}>
          <Avatar
            src={avatarSrc}
            fallback={avatarFallback}
            size="2xl"
            alt={name}
          />
        </div>

        {/* Info */}
        <Box display="flex" flexDirection="column" gap="xs" alignItems="center">
          <Text variant="heading-md">{name}</Text>
          {role && <Text variant="body-sm" color="SECONDARY">{role}</Text>}
        </Box>

        {description && (
          <Text variant="body-sm" align="center" color="TEXT_MUTED">
            {description}
          </Text>
        )}

        {/* Stats */}
        {stats && stats.length > 0 && (
          <div css={styles.statsWrapper}>
            {stats.map((stat, index) => (
              <div key={index} css={styles.statItem}>
                <span css={styles.statValue}>{stat.value}</span>
                <span css={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        {(() => {
          // Tách actions thành mảng các element riêng biệt
          const actionNodes = React.Children.toArray(actions);
          const hasFollow = !!onFollow;
          const totalButtons = (hasFollow ? 1 : 0) + actionNodes.length;

          if (totalButtons === 0) return null;

          return (
            <Box 
              display="grid" 
              gap="sm" 
              width="100%" 
              sx={{ 
                // Layout 2 cột cố định (50% - 50%). Sử dụng minmax(0, 1fr) để tránh vỡ layout khi text quá dài.
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                // Nếu tổng số nút là lẻ, nút cuối cùng sẽ chiếm trọn 2 cột (full width)
                ...(totalButtons % 2 !== 0 && {
                  '& > :last-child': {
                    gridColumn: '1 / -1',
                  },
                }),
              }}
            >
              {hasFollow && (
                <Button
                  variant={isFollowing ? 'outline' : 'primary'}
                  onClick={onFollow}
                  fullWidth
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
              )}
              {/* Render trực tiếp các nút con để CSS selector hoạt động chính xác.
                  Các Button được truyền vào đã có prop fullWidth. */}
              {actionNodes}
            </Box>
          );
        })()}
      </div>
    </Card>
  );
};

UserProfileCard.displayName = 'UserProfileCard';