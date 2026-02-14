/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { ArrowLeft, Save, X, Trash2 } from 'lucide-react';
import { Box, Text, Button, Icon, Input } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING, RADIUS } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms/00-core/tokens-constants';
import { AppContext } from '@/00-core/app-context';
import { useI18n } from '@/shared/i18n/useI18n';
import { useToast } from '@/04-frameworks-and-drivers/ui/web/app/hooks/user/useToast';
import { ConfirmDialog } from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/modals/ConfirmDialog';

export const EditClassPage = () => {
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();
  const { t } = useI18n();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [branches, setBranches] = useState<{id: string, name: string}[]>([]);
  
  // Form State
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    branchId: '',
    schedule: '',
    teacherName: '',
    maxStudents: 20,
    status: 'active'
  });

  // 1. Load Data
  useEffect(() => {
    const fetchData = async () => {
      if (!classId) return;
      setIsFetching(true);
      try {
        // Fetch Branches
        const branchController = AppContext.getBranchController();
        const branchResult = await branchController.listBranches({});
        if (branchResult.isSuccess) {
          setBranches(branchResult.getValue());
        }

        // Fetch Class Details
        const classController = AppContext.getClassesController();
        const classResult = await classController.getClassDetails(classId);
        
        if (classResult.isSuccess) {
          const data = classResult.getValue();
          setFormData({
            id: data.id,
            name: data.name,
            branchId: data.branchId,
            schedule: data.schedule || '',
            teacherName: data.teacherName || '',
            maxStudents: data.maxStudents,
            status: data.status
          });
        } else {
          toast.error(t('classes.not_found'));
          navigate('/classes');
        }
      } catch (error) {
        console.error('Failed to load data', error);
        toast.error(t('common.error'));
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, [classId, navigate, t]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.branchId) {
      toast.error('Vui lòng nhập tên lớp và chọn chi nhánh.');
      return;
    }

    setIsLoading(true);
    try {
      const controller = AppContext.getClassesController();
      const result = await controller.updateClass(formData);

      if (result.isSuccess) {
        toast.success('Cập nhật lớp học thành công!');
        navigate(`/classes/${classId}`);
      } else {
        toast.error(result.getErrorValue() as string);
      }
    } catch (error: any) {
      toast.error(error.message || 'Đã có lỗi xảy ra.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!classId) return;
    setIsDeleting(true);
    try {
      const controller = AppContext.getClassesController();
      const result = await controller.deleteClass(classId);

      if (result.isSuccess) {
        toast.success(t('classes.delete_success'));
        navigate('/classes');
      } else {
        toast.error(result.getErrorValue() as string);
        setIsDeleting(false);
        setShowDeleteConfirm(false);
      }
    } catch (error: any) {
      toast.error(error.message || 'Đã có lỗi xảy ra.');
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (isFetching) {
    return <Box p="xl"><Text>{t('common.loading')}</Text></Box>;
  }

  return (
    <Box display="flex" flexDirection="column" gap="lg" maxWidth="800px" mx="auto">
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap="sm">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(`/classes/${classId}`)}
            leftIcon={<Icon><ArrowLeft /></Icon>}
          >
            {t('common.detail')}
          </Button>
          <Box>
            <Text as="h1" variant="heading-lg" weight="bold">{t('classes.edit_title')}</Text>
            <Text color="SECONDARY">{t('classes.edit_subtitle')}</Text>
          </Box>
        </Box>
        
        <Button 
          variant="danger" 
          size="sm" 
          leftIcon={<Icon><Trash2 /></Icon>}
          onClick={() => setShowDeleteConfirm(true)}
        >
          {t('branch.delete_button')}
        </Button>
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
        {/* ... (Các trường nhập liệu giữ nguyên như cũ) ... */}
        <Box>
          <Text weight="semibold" mb="xs">{t('classes.name_label')} <Text as="span" color="DANGER">*</Text></Text>
          <Input 
            placeholder={t('classes.name_placeholder')} 
            value={formData.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value)}
          />
        </Box>

        {/* ... (Các phần khác của form) ... */}
        
        {/* Actions */}
        <Box display="flex" justifyContent="flex-end" gap="md" mt="md" pt="md" borderTop={`1px solid ${COLORS.NEUTRAL_BORDER}`}>
          <Button variant="ghost" onClick={() => navigate(`/classes/${classId}`)} leftIcon={<Icon><X /></Icon>}>{t('branch.cancel_button')}</Button>
          <Button variant="primary" onClick={handleSubmit} isLoading={isLoading} leftIcon={<Icon><Save /></Icon>}>{t('branch.save_button')}</Button>
        </Box>
      </Box>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title={t('classes.delete_title')}
        description={t('classes.delete_confirm_message')}
        confirmText={t('branch.delete_button')}
        cancelText={t('branch.cancel_button')}
        variant="danger"
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onClose={() => setShowDeleteConfirm(false)}
      />
    </Box>
  );
};
