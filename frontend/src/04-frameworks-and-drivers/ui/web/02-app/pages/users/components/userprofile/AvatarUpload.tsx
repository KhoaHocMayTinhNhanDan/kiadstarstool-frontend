/** @jsxImportSource @emotion/react */
import { Box, Text, Button, Avatar } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms'
import { Upload, User } from 'lucide-react'
import { useToast } from '../../../../../01-ui-core/hooks/useToast'
import { AppContext } from '@/05-bootstrap/app-context'

interface AvatarUploadProps {
  photoURL: string
  displayName: string
  targetUserId?: string
  onPhotoURLChange: (newUrl: string) => void
}

export const AvatarUpload = ({ photoURL, displayName, targetUserId, onPhotoURLChange }: AvatarUploadProps) => {
  const { toast } = useToast()

  const handleUploadAvatar = async () => {
    const cloudinary = (window as any).cloudinary
    if (!cloudinary || !targetUserId) {
      toast.error("Hệ thống chưa sẵn sàng")
      return
    }

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY
    const apiUrl = import.meta.env.VITE_API_URL || "/api"

    let token: string | null = await AppContext.getAuthDriver().getIdToken()
    if (!token) {
      toast.error("Không thể lấy token xác thực")
      return
    }

    const widget = cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        apiKey: apiKey,
        publicId: `avatars/${targetUserId}`,
        resourceType: "image",
        sources: ["local", "url", "camera"],
        multiple: false,
        
        // ✅ GIỚI HẠN DUNG LƯỢNG 20MB (20 * 1024 * 1024 = 20971520 bytes)
        maxFileSize: 20971520, // 20MB trong bytes
        
        // CẤU HÌNH CROP
        cropping: true,
        // croppingAspectRatio: 1, // Bắt buộc crop hình vuông
        showSkipCropButton: false,
        croppingShowDimensions: true,

        uploadSignature: async (callback: any, params: any) => {
          try {
            const res = await fetch(`${apiUrl}/sign-upload`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify({ paramsToSign: params })
            })
            const data = await res.json()
            if (data.error) throw new Error(data.error)
            callback(data.signature, data.timestamp)
          } catch (err) {
            console.error("Sign error:", err)
            toast.error("Không thể xác thực upload")
          }
        }
      },
      async (error: any, result: any) => {
        if (error) {
          // Xử lý lỗi cụ thể cho maxFileSize
          if (error.message?.includes('maxFileSize') || error.statusText?.includes('too large')) {
            toast.error("Ảnh vượt quá 20MB. Vui lòng chọn ảnh nhỏ hơn.")
          } else {
            toast.error("Upload thất bại")
          }
          console.error("Upload error:", error)
          return
        }

        if (result?.event === "success") {
          const info = result.info
          
          // PHẦN SỬA ĐỔI QUAN TRỌNG NHẤT
          // 1. Chèn tham số c_crop,g_custom để áp dụng vùng đã cắt từ Widget
          // 2. Thêm w_400,h_400,c_fill để resize ảnh về kích thước chuẩn cho Avatar
          const croppedUrl = info.secure_url.replace(
            '/upload/', 
            '/upload/c_crop,g_custom/w_400,h_400,c_fill/'
          )
          
          // Thêm version để ép trình duyệt tải lại ảnh mới (Cache Buster)
          const finalUrl = `${croppedUrl}?v=${info.version}`
          
          // Cập nhật State để UI hiển thị ảnh đã crop
          onPhotoURLChange(finalUrl)

          const controller = AppContext.getUsersController()
          const saveResult = await controller.updateAvatar({
            userId: targetUserId,
            newPhotoURL: finalUrl, // Lưu URL ĐÃ CÓ TRANSFORMATION vào DB
            oldPhotoURL: photoURL
          })

          if (saveResult.isSuccess) {
            toast.success("Đã cập nhật ảnh đại diện")
          } else {
            toast.error("Lỗi lưu database")
            onPhotoURLChange(photoURL) // Rollback nếu lỗi DB
          }
        }
      }
    )

    widget.open()
  }

  return (
    <Box display="flex" alignItems="center" gap="lg">
      <Avatar 
        src={photoURL} 
        alt={displayName} 
        size="xl" 
        fallback={displayName?.[0]?.toUpperCase() || <User />} 
      />
      <Box>
        <Button variant="outline" size="sm" leftIcon={<Upload size={16} />} onClick={handleUploadAvatar}>
          Thay ảnh đại diện
        </Button>
        <Text size="xs" color="SECONDARY">
          Tối đa 20MB (JPG, PNG, WebP)
        </Text>
      </Box>
    </Box>
  )
}