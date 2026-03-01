/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Text, Button, Input, Icon } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, RADIUS, SHADOWS } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { useToast } from '../../../01-ui-core/hooks/useToast';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { AppContext } from '@/00-core/app-context';

export const CreateUserPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    role: 'teacher', // Thay đổi vai trò mặc định thành 'teacher'
    phone: ''
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password || !formData.displayName) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc (*)');
      return;
    }

    setIsLoading(true);
    try {
      const controller = AppContext.getUsersController();
      const result = await controller.createUser(formData);

      if (result.isSuccess) {
        toast.success(`Đã tạo người dùng ${formData.displayName}`);
        navigate('/users');
      } else {
        toast.error(result.getErrorValue());
      }
    } catch (error) {
      console.error(error);
      toast.error('Có lỗi xảy ra khi tạo người dùng');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxWidth="800px" mx="auto" p="lg">
      <Box mb="lg">
        <Button variant="ghost" size="sm" onClick={() => navigate('/users')} leftIcon={<Icon><ArrowLeft /></Icon>}>
          Quay lại danh sách
        </Button>
      </Box>

      <Box mb="xl">
        <Text as="h1" variant="heading-xl" weight="bold">Thêm người dùng mới</Text>
        <Text color="SECONDARY">Tạo tài khoản mới cho hệ thống.</Text>
      </Box>

      <Box 
        bg="BACKGROUND_PAPER" 
        p="xl" 
        css={{ 
          boxShadow: SHADOWS.sm,
          borderRadius: RADIUS.lg,
          border: `1px solid ${COLORS.NEUTRAL_BORDER}`,
        }}
      >
        <Box display="flex" flexDirection="column" gap="lg">
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap="lg">
            <Input 
              label="Họ và tên (*)" 
              placeholder="Nhập họ tên đầy đủ"
              value={formData.displayName}
              onChange={(e) => handleChange('displayName', e.target.value)}
            />
            <Input 
              label="Số điện thoại" 
              placeholder="Nhập số điện thoại"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </Box>

          <Box display="grid" gridTemplateColumns="1fr 1fr" gap="lg">
            <Input 
              label="Email (*)" 
              type="email"
              placeholder="example@kiadstars.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            
            <Box display="flex" flexDirection="column" gap="xs">
              <Text size="sm" weight="medium" color="text-primary">Vai trò (*)</Text>
              <select
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
                style={{
                  padding: '10px',
                  borderRadius: RADIUS.md,
                  border: `1px solid ${COLORS.NEUTRAL_BORDER}`,
                  outline: 'none',
                  backgroundColor: 'white',
                  width: '100%',
                  height: '42px',
                  cursor: 'pointer'
                }}
              >
                <option value="teacher">Giáo viên</option>
                <option value="staff">Nhân viên</option>
                <option value="admin">Quản trị viên</option>
              </select>
            </Box>
          </Box>

          <Input 
            label="Mật khẩu (*)" 
            type="password"
            placeholder="Nhập mật khẩu"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
          />

          <Box display="flex" justifyContent="flex-end" gap="md" mt="md">
            <Button variant="ghost" onClick={() => navigate('/users')}>
              Hủy bỏ
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSubmit} 
              isLoading={isLoading}
              leftIcon={<Icon><UserPlus /></Icon>}
            >
              Tạo người dùng
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};