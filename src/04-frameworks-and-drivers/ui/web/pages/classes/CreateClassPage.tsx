/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { ArrowLeft, Save, X } from 'lucide-react';
import { Box, Text, Button, Icon, Input } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING, RADIUS } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms/00-core/tokens-constants';
import { AppContext } from '@/00-core/app-context';
import { useI18n } from '@/shared/i18n/useI18n';
import { useToast } from '@/04-frameworks-and-drivers/ui/web/app/hooks/user/useToast';

export const CreateClassPage = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [branches, setBranches] = useState<{id: string, name: string}[]>([]);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    branchId: '',
    schedule: '',
    teacherName: '',
    maxStudents: 20
  });

  // 1. Load danh sách chi nhánh để hiển thị trong Select
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const controller = AppContext.getBranchController();
        const result = await controller.listBranches({});
        if (result.isSuccess) {
          setBranches(result.getValue());
          // Mặc định chọn chi nhánh đầu tiên nếu có
          if (result.getValue().length > 0) {
            setFormData(prev => ({ ...prev, branchId: result.getValue()[0].id }));
          }
        }
      } catch (error) {
        console.error('Failed to load branches', error);
      }
    };
    fetchBranches();
  }, []);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // Basic Validation
    if (!formData.name || !formData.branchId) {
      toast.error('Vui lòng nhập tên lớp và chọn chi nhánh.');
      return;
    }

    setIsLoading(true);
    try {
      const controller = AppContext.getClassesController();
      const result = await controller.createClass(formData);

      if (result.isSuccess) {
        toast.success('Tạo lớp học thành công!');
        navigate('/classes');
      } else {
        toast.error(result.getErrorValue() as string);
      }
    } catch (error: any) {
      toast.error(error.message || 'Đã có lỗi xảy ra.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap="lg" maxWidth="800px" mx="auto">
      {/* Header */}
      <Box display="flex" alignItems="center" gap="sm">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/classes')}
          leftIcon={<Icon><ArrowLeft /></Icon>}
        >
          {t('common.view_all')}
        </Button>
        <Box>
          <Text as="h1" variant="heading-lg" weight="bold">{t('classes.create_title')}</Text>
          <Text color="SECONDARY">{t('classes.create_subtitle')}</Text>
        </Box>
      </Box>

      {/* Form Container */}
      <Box 
        p="xl" 
        bg="BACKGROUND_PAPER" 
        borderRadius="md" 
        border={`1px solid ${COLORS.NEUTRAL_BORDER}`}
        display="flex"
        flexDirection="column"
        gap="lg"
      >
        {/* Class Name */}
        <Box>
          <Text weight="semibold" mb="xs">{t('classes.name_label')} <Text as="span" color="DANGER">*</Text></Text>
          <Input 
            placeholder={t('classes.name_placeholder')} 
            value={formData.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value)}
          />
        </Box>

        {/* Branch Select */}
        <Box>
          <Text weight="semibold" mb="xs">{t('classes.branch_label')} <Text as="span" color="DANGER">*</Text></Text>
          <select
            value={formData.branchId}
            onChange={(e) => handleChange('branchId', e.target.value)}
            style={{
              width: '100%',
              padding: SPACING.sm,
              borderRadius: RADIUS.md,
              border: `1px solid ${COLORS.NEUTRAL_BORDER}`,
              outline: 'none',
              backgroundColor: 'white',
              height: '40px'
            }}
          >
            <option value="" disabled>{t('classes.branch_placeholder')}</option>
            {branches.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </Box>

        {/* Schedule & Teacher */}
        <Box display="grid" css={css`grid-template-columns: 1fr 1fr; gap: ${SPACING.md};`}>
          <Box>
            <Text weight="semibold" mb="xs">{t('classes.schedule_label')}</Text>
            <Input 
              placeholder={t('classes.schedule_placeholder')} 
              value={formData.schedule}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('schedule', e.target.value)}
            />
          </Box>
          <Box>
            <Text weight="semibold" mb="xs">{t('classes.teacher_label')}</Text>
            <Input 
              placeholder={t('classes.teacher_placeholder')} 
              value={formData.teacherName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('teacherName', e.target.value)}
            />
          </Box>
        </Box>

        {/* Actions */}
        <Box display="flex" justifyContent="flex-end" gap="md" mt="md" pt="md" borderTop={`1px solid ${COLORS.NEUTRAL_BORDER}`}>
          <Button variant="ghost" onClick={() => navigate('/classes')} leftIcon={<Icon><X /></Icon>}>{t('branch.cancel_button')}</Button>
          <Button variant="primary" onClick={handleSubmit} isLoading={isLoading} leftIcon={<Icon><Save /></Icon>}>{t('common.create_new')}</Button>
        </Box>
      </Box>
    </Box>
  );
};