/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useParams, useNavigate } from 'react-router-dom';

import { Box, Text, Button, Input, Avatar, LoadingSpinner, Checkbox, Icon } 
from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';

import { COLORS, RADIUS } 
from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';

import { AppContext } from '@/05-bootstrap/app-context';
import { useToast } from '../../../01-ui-core/hooks/useToast';
import { useAuth } from '../../hooks/user/useAuth';

import { Save, User, ArrowLeft, Shield, AlertTriangle, Ban, History, Upload } from 'lucide-react';

import { type UserOutput } from '@/02-usecases/users/ports/output/IUserOutput';
import { useCurrentUserProfile } from '../../hooks/user/useCurrentUserProfile';

import { 
  type PermissionCode,
  PERMISSION_GROUPS,
  getPermissionLabel,
  PERMISSIONS
} from '@/shared/constants/authorization';

import { UserActivityHistory } from './components/UserActivityHistory';
import { PermissionGuard } from '../../permissions/PermissionGuard';



export const UserProfilePage = () => {

  const { id } = useParams<{ id: string }>();
  const { user: currentUser, permissions: authPermissions } = useAuth();
  const { userProfile: currentUserProfile } = useCurrentUserProfile();
  const { toast } = useToast();
  const navigate = useNavigate();

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
  /*                              AVATAR UPLOAD                                 */
  /* -------------------------------------------------------------------------- */

  const handleUploadAvatar = () => {

    const cloudinary = (window as any).cloudinary;

    if (!cloudinary) {

      toast.error("Upload widget chưa sẵn sàng");
      return;

    }

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;

    const apiUrl = import.meta.env.VITE_API_URL || "/api";

    const widget = cloudinary.createUploadWidget({

      cloudName,
      apiKey,

      sources: ["local", "url", "camera"],
      multiple: false,

      cropping: true,
      croppingAspectRatio: 1,

      folder: "avatars",

      clientAllowedFormats: ["png", "jpg", "jpeg", "webp"],

      uploadSignature: (callback: (signature: string) => void, params: any) => {
        fetch(`${apiUrl}/sign-upload`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paramsToSign: params })
        })
        .then(res => {
          if (!res.ok) {
            // Ném lỗi để catch block bên dưới xử lý
            throw new Error(`API ký tên thất bại với status ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          callback(data.signature);
        })
        .catch((err: Error) => {
          console.error("Sign error:", err);
          toast.error(`Không thể ký upload ảnh: ${err.message}`);
        });
      }

    },

    (error: any, result: any) => {

      if (error) {

        console.error(error);
        toast.error("Upload thất bại");

        return;

      }

      if (result?.event === "success") {

        const newUrl = result.info.secure_url;
        const oldUrl = photoURL; // Lấy URL hiện tại trước khi cập nhật

        // Cập nhật UI ngay lập tức
        setPhotoURL(newUrl);

        // Thêm kiểm tra để đảm bảo targetUserId tồn tại
        if (!targetUserId) {
          toast.error("Không thể xác định người dùng để cập nhật ảnh.");
          setPhotoURL(oldUrl); // Hoàn tác lại ảnh trên UI nếu có lỗi
          return;
        }

        // Gọi controller để lưu ngay lập tức
        const controller = AppContext.getUsersController();
        controller.updateAvatar({
          userId: targetUserId,
          newPhotoURL: newUrl,
          oldPhotoURL: oldUrl,
        }).then(saveResult => {
          if (saveResult.isSuccess) {
            toast.success("Đã cập nhật ảnh đại diện");
          } else {
            toast.error(`Lỗi cập nhật ảnh: ${saveResult.getErrorValue()}`);
            setPhotoURL(oldUrl); // Hoàn tác lại ảnh trên UI nếu lưu thất bại
          }
        });

      }

    });

    widget.open();

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

        <Box display="flex" alignItems="center" gap="lg">

          <Avatar
            src={photoURL}
            alt={displayName}
            size="xl"
            fallback={displayName?.[0]?.toUpperCase() || <User />}
          />

          <Box>

            <Button
              variant="outline"
              size="sm"
              leftIcon={<Upload size={16} />}
              onClick={handleUploadAvatar}
            >
              Tải ảnh lên
            </Button>

            <Text size="xs" color="SECONDARY">
              JPG, PNG, WebP
            </Text>

          </Box>

        </Box>



        <Box display="flex" flexDirection="column" gap="md">

          <Input
            label="Họ và tên"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />

          <Input
            label="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <Input
            label="Email"
            value={userData.email || ""}
            disabled
          />

          <Box mt="md">

            <Button
              onClick={handleSave}
              isLoading={isSaving}
              leftIcon={<Save size={18} />}
            >
              Lưu thay đổi
            </Button>

          </Box>

        </Box>

      </Box>

    </Box>

  );

};