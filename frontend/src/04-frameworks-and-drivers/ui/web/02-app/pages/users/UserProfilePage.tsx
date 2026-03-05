/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Text, Button, Input, Avatar, LoadingSpinner, Checkbox, Icon } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, RADIUS } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { AppContext } from '@/05-bootstrap/app-context';
import { useToast } from '../../../01-ui-core/hooks/useToast';
import { useAuth } from '../../hooks/user/useAuth';
import { Save, User, ArrowLeft, Shield, AlertTriangle, Ban, History } from 'lucide-react';
import { type UserOutput } from '@/02-usecases/users/ports/output/IUserOutput';
import { useCurrentUserProfile } from '../../hooks/user/useCurrentUserProfile';
import { type PermissionCode, PERMISSION_GROUPS, getPermissionLabel, PERMISSIONS } from '@/shared/constants/authorization';
import { UserActivityHistory } from './components/UserActivityHistory';
import { PermissionGuard } from '../../permissions/PermissionGuard';

export const UserProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser, permissions: authPermissions } = useAuth(); // Lấy permissions đã được xử lý từ hook
  const { userProfile: currentUserProfile } = useCurrentUserProfile();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [userData, setUserData] = useState<UserOutput | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'activity'>('profile');

  // Form states
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [phone, setPhone] = useState('');
  const [permissions, setPermissions] = useState<string[]>([]);

  // Xác định user cần xem: Lấy từ URL param hoặc lấy user hiện tại
  const targetUserId = id || currentUser?.id;
  const isOwnProfile = !id || currentUser?.id === id;

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
        // FIX: Ép kiểu 'any' vì UserOutput interface đang thiếu định nghĩa permissions
        setPermissions((userAsOutput as any).permissions || []);
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
          // FIX: Ép kiểu 'any' tương tự
          setPermissions((data as any).permissions || []);
        } else {
          // Fallback: Nếu không tìm thấy trong DB nhưng là chính mình, dùng thông tin từ Auth
          if (isOwnProfile && currentUser) {
            const fallbackData = {
              uid: currentUser.id,
              email: currentUser.email,
              displayName: currentUser.displayName || currentUser.email.split('@')[0],
              photoURL: currentUser.photoURL || '',
              phone: '',
              role: currentUser.roles?.[0]?.value || 'student',
              isActive: true,
              permissions: authPermissions || [], // Sử dụng trực tiếp, an toàn hơn
            } as unknown as UserOutput;
            
            setUserData(fallbackData);
            setDisplayName(fallbackData.displayName);
            setPhotoURL(fallbackData.photoURL || '');
            setPermissions((fallbackData as any).permissions);
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

  const handlePermissionChange = async (permissionCode: PermissionCode, isChecked: boolean) => {
    if (!targetUserId) return;

    // Optimistic update
    const originalPermissions = [...permissions];
    setPermissions(prev => 
      isChecked ? [...prev, permissionCode] : prev.filter(p => p !== permissionCode)
    );

    try {
      const controller = AppContext.getAuthorizationController();
      const input = { userId: targetUserId, permission: permissionCode };
      const result = isChecked 
        ? await controller.grantPermission(input) 
        : await controller.revokePermission(input);

      if (result.isSuccess) {
        toast.success(`Đã cập nhật quyền: ${permissionCode}`);
      } else {
        const error = result.getErrorValue();
        toast.error(`Lỗi: ${typeof error === 'string' ? error : 'Không thể cập nhật quyền.'}`);
        setPermissions(originalPermissions); // Revert on failure
      }
    } catch (error) {
      console.error(error);
      toast.error('Lỗi hệ thống khi cập nhật quyền');
      setPermissions(originalPermissions); // Revert on failure
    }
  };

  const handleDeactivateUser = async () => {
    if (!targetUserId) return;

    if (!window.confirm('Bạn có chắc chắn muốn vô hiệu hóa người dùng này?')) {
      return;
    }

    try {
      const controller = AppContext.getUsersController();
      const result = await controller.deactivateUser(targetUserId);

      if (result.isSuccess) {
        toast.success('Đã vô hiệu hóa người dùng');
        navigate('/users');
      } else {
        toast.error(result.getErrorValue());
      }
    } catch (error) {
      toast.error('Lỗi hệ thống khi vô hiệu hóa người dùng');
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

      {/* Tabs Navigation */}
      <Box display="flex" borderBottom={`1px solid ${COLORS.NEUTRAL_BORDER}`} mb="lg">
        <Button 
          variant="ghost" 
          onClick={() => setActiveTab('profile')}
          leftIcon={<User size={16} />}
          css={activeTab === 'profile' ? css`border-bottom: 2px solid ${COLORS.PRIMARY}; color: ${COLORS.PRIMARY}; border-radius: 0;` : css`border-radius: 0;`}
        >
          Thông tin
        </Button>
        <Button 
          variant="ghost" 
          onClick={() => setActiveTab('activity')}
          leftIcon={<History size={16} />}
          css={activeTab === 'activity' ? css`border-bottom: 2px solid ${COLORS.PRIMARY}; color: ${COLORS.PRIMARY}; border-radius: 0;` : css`border-radius: 0;`}
        >
          Lịch sử hoạt động
        </Button>
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
        {activeTab === 'profile' && (
          <>
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

            {/* Permissions Section - Only for Admins viewing other profiles */}
            <PermissionGuard required={[PERMISSIONS.USERS_UPDATE]}>
              {!isOwnProfile && (
                <Box>
                  <Box display="flex" alignItems="center" gap="sm" mb="md" pt="xl" borderTop={`1px solid ${COLORS.NEUTRAL_BORDER}`}>
                    <Icon color="PRIMARY"><Shield /></Icon>
                    <Text variant="heading-md" weight="bold">Phân quyền</Text>
                  </Box>
                  <Box display="flex" flexDirection="column" gap="xl">
                    {PERMISSION_GROUPS.map(group => (
                      <Box key={group.name}>
                        <Text weight="semibold">{group.name}</Text>
                        <Text size="sm" color="SECONDARY" mb="md">{group.description}</Text>
                        <Box
                          display="grid"
                          gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
                          gap="md"
                        >
                          {group.codes.map(code => (
                            <Box
                              key={code}
                              p="sm"
                              bg="BACKGROUND_NEUTRAL"
                              borderRadius="md"
                              display="flex"
                              alignItems="flex-start"
                              gap="sm"
                            >
                              <Checkbox
                                id={`perm-${code}`}
                                checked={permissions.includes(code)}
                                onCheckedChange={(checked) => handlePermissionChange(code, checked === true)}
                              />
                              <Box>
                                <Text as="label" htmlFor={`perm-${code}`} weight="medium" size="sm" sx={{ cursor: 'pointer' }}>
                                  {getPermissionLabel(code)}
                                </Text>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </PermissionGuard>
          </>
        )}

        {activeTab === 'activity' && (
          <UserActivityHistory userId={targetUserId!} />
        )}

        {/* Danger Zone - Only for Admins viewing other profiles */}
        <PermissionGuard required={[PERMISSIONS.USERS_DELETE]}>
          {!isOwnProfile && (
            <Box mt="xl" pt="xl" borderTop={`1px solid ${COLORS.NEUTRAL_BORDER}`}>
              <Box display="flex" alignItems="center" gap="sm" mb="md">
                <Icon color="DANGER"><AlertTriangle /></Icon>
                <Text variant="heading-md" weight="bold" color="DANGER">Khu vực nguy hiểm</Text>
              </Box>
              <Box p="md" bg="DANGER_LIGHT" borderRadius="md" display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Text weight="bold" color="DANGER_DARK">Vô hiệu hóa tài khoản</Text>
                  <Text size="sm" color="DANGER_DARK">Người dùng sẽ bị đăng xuất và không thể truy cập hệ thống.</Text>
                </Box>
                <Button variant="danger" onClick={handleDeactivateUser} leftIcon={<Ban size={16} />}>
                  Vô hiệu hóa
                </Button>
              </Box>
            </Box>
          )}
        </PermissionGuard>
      </Box>
    </Box>
  );
};
// File: UserProfilePage.tsx
