/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Text, Button, Input, Avatar, LoadingSpinner } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, RADIUS } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { AppContext } from '@/05-bootstrap/app-context';
import { useToast } from '../../../01-ui-core/hooks/useToast';
import { useAuth } from '../../hooks/user/useAuthorization';
import { Save, User, ArrowLeft } from 'lucide-react';
import { type UserOutput } from '@/02-usecases/users/ports/output/IUserOutput';
import { useCurrentUserProfile } from '../../hooks/user/useCurrentUserProfile';

export const UserProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useAuth();
  const { userProfile: currentUserProfile } = useCurrentUserProfile();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [userData, setUserData] = useState<UserOutput | null>(null);

  // Form states
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [phone, setPhone] = useState('');

  // Xác định user cần xem: Lấy từ URL param hoặc lấy user hiện tại
  const targetUserId = id || currentUser?.id;
  const isOwnProfile = currentUser?.id === targetUserId;

  useEffect(() => {
    const fetchUser = async () => {
      if (!targetUserId) return;
      
      // Tối ưu: Nếu xem hồ sơ của chính mình và đã có thông tin trong context, không cần gọi API
      if (isOwnProfile && currentUserProfile) {
        const userAsOutput = currentUserProfile;
        setUserData(currentUserProfile);
        setDisplayName(userAsOutput.displayName || '');
        setPhotoURL(userAsOutput.photoURL || '');
        setPhone(userAsOutput.phone || '');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const controller = AppContext.getUsersController();
        const result = await controller.getUser({ userId: targetUserId });
        
        if (result.isSuccess) {
          const data = result.getValue();
          setUserData(data);
          setDisplayName(data.displayName);
          setPhotoURL(data.photoURL || '');
          setPhone(data.phone || '');
        } else {
          // Fallback: Nếu không tìm thấy trong DB nhưng là chính mình, dùng thông tin từ Auth
          if (isOwnProfile && currentUser) {
            const fallbackData = {
              id: currentUser.id,
              email: currentUser.email,
              displayName: currentUser.displayName || currentUser.email.split('@')[0],
              photoURL: currentUser.photoURL || '',
              phone: '',
              role: currentUser.roles?.[0]?.value || 'student',
            } as unknown as UserOutput;
            
            setUserData(fallbackData);
            setDisplayName(fallbackData.displayName);
            setPhotoURL(fallbackData.photoURL || '');
          } else {
            toast.error('Không tìm thấy thông tin người dùng');
          }
        }
      } catch (error) {
        console.error(error);
        toast.error('Lỗi khi tải thông tin');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [targetUserId, isOwnProfile, currentUser, currentUserProfile]);

  const handleSave = async () => {
    if (!targetUserId) return;

    setIsSaving(true);
    try {
      const controller = AppContext.getUsersController();
      const result = await controller.updateProfile({
        userId: targetUserId,
        displayName,
        photoURL,
        phone,
      });

      if (result.isSuccess) {
        toast.success('Cập nhật thành công');
      } else {
        toast.error(result.getErrorValue());
      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi lưu');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" h="50vh">
        <LoadingSpinner />
      </Box>
    );
  }

  if (!userData) {
    return <Text>User not found</Text>;
  }

  return (
    <Box p="lg" css={{
      maxWidth: '800px',
      margin: '0 auto',
    }}>
      <Box mb="lg">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} leftIcon={<ArrowLeft size={16} />}>
          Quay lại
        </Button>
      </Box>

      <Box mb="xl">
        <Text as="h1" variant="heading-xl" weight="bold">
          {isOwnProfile ? 'Hồ sơ của tôi' : 'Thông tin người dùng'}
        </Text>
        <Text color="SECONDARY">
          {isOwnProfile ? 'Quản lý thông tin cá nhân của bạn' : `Xem và chỉnh sửa thông tin của ${userData.displayName}`}
        </Text>
      </Box>

      <Box 
        bg="BACKGROUND_PAPER" 
        p="xl" 
        display="flex"
        flexDirection="column"
        gap="xl"
        css={{
          borderRadius: RADIUS.lg,
          border: `1px solid ${COLORS.NEUTRAL_BORDER}`
        }}
      >
        {/* Avatar Section */}
        <Box display="flex" alignItems="center" gap="lg">
          <Avatar 
            src={photoURL} 
            alt={displayName} 
            size="xl" 
            fallback={displayName?.[0]?.toUpperCase() || <User />} 
          />
          <Box>
            <Input 
              placeholder="Nhập URL ảnh đại diện..." 
              value={photoURL} 
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </Box>
        </Box>

        {/* Form Section */}
        <Box display="flex" flexDirection="column" gap="md" css={{ maxWidth: '500px' }}>
          <Input 
            label="Họ và tên" 
            value={displayName} 
            onChange={(e) => setDisplayName(e.target.value)} 
          />
          
          <Input 
            label="Số điện thoại" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            placeholder="0912345678"
          />

          <Input 
            label="Email" 
            value={userData.email || ''} 
            disabled 
            readOnly
          />          <Text size="xs" color="SECONDARY" style={{ marginTop: '-8px' }}>Email không thể thay đổi</Text>

          <Input 
            label="Vai trò" 
            value={userData.role} 
            disabled 
            readOnly
          />

          <Box mt="md">
            <Button onClick={handleSave} isLoading={isSaving} leftIcon={<Save size={18} />}>
              Lưu thay đổi
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
// File: UserProfilePage.tsx
