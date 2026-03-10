/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import { Box, Text, Button } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { ArrowLeft } from 'lucide-react';

interface UserProfileHeaderProps {
  isOwnProfile: boolean;
}

export const UserProfileHeader = ({ isOwnProfile }: UserProfileHeaderProps) => {
  const navigate = useNavigate();

  return (
    <>
      <Box mb="lg">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          leftIcon={<ArrowLeft size={16} />}
        >
          Quay lại
        </Button>
      </Box>
      <Box mb="xl">
        <Text as="h1" variant="heading-xl" weight="bold">
          {isOwnProfile ? "Hồ sơ của tôi" : "Thông tin người dùng"}
        </Text>
      </Box>
    </>
  );
};