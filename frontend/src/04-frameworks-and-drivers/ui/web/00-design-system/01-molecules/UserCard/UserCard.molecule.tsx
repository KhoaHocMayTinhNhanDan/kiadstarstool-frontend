/** @jsxImportSource @emotion/react */
import { Box } from '../../00-atoms/Box';
import { Avatar } from '../../00-atoms/Avatar';
import { Text } from '../../00-atoms/Text';
import { Card } from '../../00-atoms/Card';
import { getUserCardStyles } from './UserCard.molecule.styles';

export interface UserCardProps {
  name: string;
  role?: string;
  avatarUrl?: string;
  onClick?: () => void;
  className?: string;
}

export const UserCard = ({ name, role, avatarUrl, onClick, className }: UserCardProps) => {
  return (
    <Card 
      variant="outlined" 
      padding="12px" 
      css={getUserCardStyles(!!onClick)}
      onClick={onClick}
      className={className}
    >
      <Avatar src={avatarUrl} fallback={name.charAt(0)} />
      <Box>
        <Text weight="medium" size="sm">{name}</Text>
        {role && <Text size="xs" color="SECONDARY">{role}</Text>}
      </Box>
    </Card>
  );
};