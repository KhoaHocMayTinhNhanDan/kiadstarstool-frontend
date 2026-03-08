/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { Box, Text, Button, Icon, Input, Card, Select } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { AppContext } from '@/05-bootstrap/app-context';
import { useToast } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/hooks/useToast';
import { COLORS, SPACING } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { formatPhoneString } from '@/shared/utils/phoneUtils';
import { usePhoneList } from '../../hooks/usePhoneList';

export const CreateStudentPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const { phones, addPhone, removePhone, updatePhone, validateAll } = usePhoneList();
  const [branchId, setBranchId] = useState('');
  const [branches, setBranches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBranches = async () => {
      const branchController = AppContext.getBranchController();
      const result = await branchController.listBranches({});
      if (result.isSuccess) {
        const branchList = result.getValue();
        setBranches(branchList);
        // Tự động chọn chi nhánh đầu tiên nếu có
        if (branchList.length > 0) {
          setBranchId(branchList[0].id);
        }
      }
    };
    fetchBranches();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAll()) {
      toast.error('Vui lòng kiểm tra lại số điện thoại');
      return;
    }

    setIsLoading(true);
    try {
      // Format phones array into a single string for backend compatibility
      // Ex: "090123 (Bố) - 090456 (Mẹ)"
      const formattedPhone = formatPhoneString(phones);

      const controller = AppContext.getStudentsController();
      const result = await controller.createStudent({
        name,
        email,
        phone: formattedPhone,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        branchId,
      });

      if (result.isSuccess) {
        toast.success('Tạo học viên thành công!');
        navigate('/students');
      } else {
        toast.error(result.getErrorValue() as string);
      }
    } catch (error) {
      toast.error('Đã có lỗi không mong muốn xảy ra.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p="xl" maxWidth="800px" mx="auto">
      <Box mb="lg">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/students')}
          leftIcon={<Icon><ArrowLeft /></Icon>}
        >
          Quay lại danh sách
        </Button>
      </Box>

      <Card>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap="lg">
            <Box>
              <Text as="h1" variant="heading-lg" weight="bold">Tạo hồ sơ học viên mới</Text>
              <Text color="SECONDARY">Nhập thông tin cơ bản của học viên.</Text>
            </Box>

            <Box display="flex" flexDirection="column" gap="md">
              <Box><Text as="label" htmlFor="student-name" weight="semibold" mb="xs" sx={{ display: 'block' }}>Họ và tên <Text as="span" color="DANGER">*</Text></Text><Input id="student-name" value={name} onChange={(e) => setName(e.target.value)} required /></Box>
              <Box><Text as="label" htmlFor="student-email" weight="semibold" mb="xs" sx={{ display: 'block' }}>Email</Text><Input id="student-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></Box>
              
              <Box>
                <Text as="label" htmlFor="student-dob" weight="semibold" mb="xs" sx={{ display: 'block' }}>Ngày sinh</Text>
                <Input 
                  id="student-dob" 
                  type="date" 
                  value={dateOfBirth} 
                  onChange={(e) => setDateOfBirth(e.target.value)} 
                />
              </Box>
              
              {/* Dynamic Phone List */}
              <Box>
                <Text as="label" weight="semibold" mb="xs" sx={{ display: 'block' }}>Số điện thoại liên hệ</Text>
                <Box display="flex" flexDirection="column" gap="sm">
                  {phones.map((item, index) => (
                    <Box key={index} display="flex" gap="sm" alignItems="center">
                      <Box flex="1">
                        <Input 
                          placeholder="Số điện thoại..." 
                          value={item.number} 
                          onChange={(e) => updatePhone(index, 'number', e.target.value)} 
                          error={(item as any).error}
                        />
                      </Box>
                      <Box width="150px">
                        <Input 
                          placeholder="Ghi chú (VD: Bố)" 
                          value={item.note} 
                          onChange={(e) => updatePhone(index, 'note', e.target.value)} 
                        />
                      </Box>
                      {phones.length > 1 && (
                        <Button variant="ghost" size="sm" onClick={() => removePhone(index)} type="button" title="Xóa số này">
                          <Icon color="DANGER"><Trash2 /></Icon>
                        </Button>
                      )}
                    </Box>
                  ))}
                  <Box>
                    <Button variant="outline" size="sm" onClick={addPhone} type="button" leftIcon={<Icon><Plus /></Icon>}>
                      Thêm số khác
                    </Button>
                  </Box>
                </Box>
              </Box>

              <Box>
                <Text as="label" htmlFor="student-branch" weight="semibold" mb="xs" sx={{ display: 'block' }}>Chi nhánh ban đầu <Text as="span" color="DANGER">*</Text></Text>
                <Select
                  id="student-branch"
                  value={branchId}
                  onChange={(e) => setBranchId(e.target.value)}
                  options={[
                    { label: '-- Chọn chi nhánh --', value: '', disabled: true },
                    ...branches.map(b => ({ label: b.name, value: b.id }))
                  ]}
                  fullWidth
                  required
                />
              </Box>
            </Box>

            <Box display="flex" justifyContent="flex-end" gap="sm" mt="md">
              <Button variant="ghost" onClick={() => navigate('/students')} type="button">Hủy</Button>
              <Button type="submit" isLoading={isLoading}>Lưu học viên</Button>
            </Box>
          </Box>
        </form>
      </Card>
    </Box>
  );
};