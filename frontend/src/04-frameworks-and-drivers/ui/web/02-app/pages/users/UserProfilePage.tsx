/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, LoadingSpinner } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, RADIUS } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { AppContext } from '@/05-bootstrap/app-context';
import { useToast } from '../../../01-ui-core/hooks/useToast';
import { useAuth } from '../../hooks/user/useAuth';
import { type UserOutput } from '@/02-usecases/users/ports/output/IUserOutput';
import { useCurrentUserProfile } from '../../hooks/user/useCurrentUserProfile';
import { UserProfileHeader } from './components/userprofile/UserProfileHeader';
import { AvatarUpload } from './components/userprofile/AvatarUpload';
import { UserInfoForm } from './components/userprofile/UserInfoForm';



export const UserProfilePage = () => {

  const { id } = useParams<{ id: string }>();
  const { user: currentUser, permissions: authPermissions } = useAuth();
  const { userProfile: currentUserProfile } = useCurrentUserProfile();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [userData, setUserData] = useState<UserOutput | null>(null);

  const [activeTab, setActiveTab] = useState<'profile' | 'activity'>('profile');

  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [phone, setPhone] = useState('');
  const [permissions, setPermissions] = useState<string[]>([]);

  const targetUserId = id || currentUser?.id;
  const isOwnProfile = !id || currentUser?.id === id;



  /* -------------------------------------------------------------------------- */
  /*                            LOAD CLOUDINARY SCRIPT                          */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if ((window as any).cloudinary) return;
    const script = document.createElement('script');
    script.src = "https://upload-widget.cloudinary.com/global/all.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);



  /* -------------------------------------------------------------------------- */
  /*                                FETCH USER                                  */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    const fetchUser = async () => {
      if (!targetUserId) return;
      if (isOwnProfile && currentUserProfile) {

        const user = currentUserProfile;

        setUserData(user);
        setDisplayName(user.displayName || '');
        setPhotoURL(user.photoURL || '');
        setPhone(user.phone || '');

        setPermissions((user as any).permissions || []);

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
          setPermissions((data as any).permissions || []);

        } else {
          toast.error("Không tìm thấy người dùng");
        }

      } catch (err) {
        console.error(err);
        toast.error("Lỗi tải dữ liệu");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();

  }, [targetUserId, isOwnProfile, currentUserProfile]);



  /* -------------------------------------------------------------------------- */
  /*                                  SAVE                                      */
  /* -------------------------------------------------------------------------- */

  const handleSave = async () => {
    if (!targetUserId) return;
    setIsSaving(true);
    try {

      const controller = AppContext.getUsersController();

      const result = await controller.updateProfile({

        userId: targetUserId,
        displayName,
        newPhotoURL: photoURL, // Gửi URL mới
        oldPhotoURL: userData?.photoURL,
        phone

      });

      if (result.isSuccess) {

        toast.success("Cập nhật thành công");
        // Cập nhật lại state `userData` để lần lưu tiếp theo có `oldPhotoURL` chính xác
        setUserData(prev => {
          if (!prev) return null;
          return {
            ...prev,
            displayName: displayName,
            photoURL: photoURL,
            phone: phone,
          };
        });

      } else {

        toast.error(result.getErrorValue());

      }

    } catch (error) {
      console.error('[UserProfilePage] Failed to save profile:', error);
      toast.error("Lỗi khi lưu");
    } finally {
      setIsSaving(false);
    }
  };


  /* -------------------------------------------------------------------------- */
  /*                                  UI                                        */
  /* -------------------------------------------------------------------------- */

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" h="50vh">
        <LoadingSpinner />
      </Box>
    );

  }
  if (!userData) return <Text>User not found</Text>;



  return (
    <Box p="lg" css={{ maxWidth: "800px", margin: "0 auto" }}>
      <UserProfileHeader isOwnProfile={isOwnProfile} />
      <Box
        bg="BACKGROUND_PAPER"
        p="xl"
        display="flex"
        flexDirection="column"
        gap="xl"
        css={{ borderRadius: RADIUS.lg, border: `1px solid ${COLORS.NEUTRAL_BORDER}` }}
      >
        <AvatarUpload photoURL={photoURL} displayName={displayName} targetUserId={targetUserId} onPhotoURLChange={setPhotoURL} />
        <UserInfoForm 
          displayName={displayName}
          phone={phone}
          email={userData.email || ""}
          isSaving={isSaving}
          onDisplayNameChange={setDisplayName}
          onPhoneChange={setPhone}
          onSave={handleSave}
        />
      </Box>
    </Box>
  );

};