/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { ArrowLeft, Save, X, Trash2 } from 'lucide-react';
import { Box, Text, Button, Icon, Input } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING, RADIUS } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms/00-core/tokens-constants';
import { AppContext } from '@/00-core/app-context';
import { useI18n } from '@/shared/i18n/useI18n';
import { useToast } from '../../../01-ui-core/hooks/useToast';
import { ConfirmDialog } from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/modals/ConfirmDialog';
import { type DayOfWeek, DAY_MAP, type ClassSession } from '@/01-entities/classes/ClassSession';
import { ClassStatus } from '@/01-entities/classes/ClassStatus.enum';

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
  
  interface PageFormData {
    id: string;
    name: string;
    branchId: string;
    code: string;
    maxStudents: number;
    status: ClassStatus;
  }

  // Form State
  const [formData, setFormData] = useState<PageFormData>({
    id: '',
    name: '',
    branchId: '',
    code: '',
    maxStudents: 20,
    status: ClassStatus.ACTIVE
  });

  // Schedule State
  const [sessions, setSessions] = useState<{ id: string; day: DayOfWeek; startTime: string; endTime: string }[]>([]);
  const [teacherName, setTeacherName] = useState('');

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
            code: data.code,
            branchId: data.branchId,
            maxStudents: data.maxStudents,
            status: data.status
          });
          setTeacherName((data as any).teacherName || '');

          // Populate sessions from structured data
          if (data.sessions && Array.isArray(data.sessions)) {
            setSessions(data.sessions.map((s: ClassSession) => ({
              ...s,
              id: Math.random().toString() // Add a temporary unique ID for UI keys
            })));
          }
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

  const addSession = () => {
    setSessions(prev => [...prev, { id: Date.now().toString(), day: 'Mon', startTime: '', endTime: '' }]);
  };

  const removeSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
  };

  const handleSessionChange = (id: string, field: 'day' | 'startTime' | 'endTime', value: string) => {
    setSessions(prev =>
      prev.map(s => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.branchId || !formData.code) {
      toast.error('Vui lòng nhập tên lớp và chọn chi nhánh.');
      return;
    }
    
    const finalSessions = sessions.map(({ id, ...rest }) => rest);
    if (finalSessions.some(s => !s.day || !s.startTime || !s.endTime)) {
      toast.error('Vui lòng điền đầy đủ thông tin cho tất cả các buổi học.');
      return;
    }

    setIsLoading(true);
    try {
      const controller = AppContext.getClassesController();
      // NOTE: Dùng interactor `updateClassInfo` chỉ cập nhật thông tin cơ bản.
      // Việc cập nhật `sessions` và `teacherName` sẽ cần một use case riêng hoặc sửa đổi use case hiện tại.
      const result = await controller.updateClassInfo({
        classId: formData.id,
        name: formData.name,
        code: formData.code,
        maxStudents: formData.maxStudents,
        status: formData.status,
      });

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

        {/* Class Code */}
        <Box>
          <Text weight="semibold" mb="xs">{t('classes.code_label')} <Text as="span" color="DANGER">*</Text></Text>
          <Input 
            placeholder={t('classes.code_placeholder')} 
            value={formData.code}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('code', e.target.value)}
          />
        </Box>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap="lg">
          <Box>
            <Text weight="semibold" mb="xs">{t('classes.branch_label')} <Text as="span" color="DANGER">*</Text></Text>
            <select
              value={formData.branchId}
              onChange={(e) => handleChange('branchId', e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: `1px solid ${COLORS.NEUTRAL_BORDER}`, height: '40px', backgroundColor: 'white' }}
            >
              {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </Box>
          <Box>
            <Text weight="semibold" mb="xs">Trạng thái</Text>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value as ClassStatus)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: `1px solid ${COLORS.NEUTRAL_BORDER}`, height: '40px', backgroundColor: 'white' }}
            >
              {Object.values(ClassStatus).map(statusValue => (
                <option key={statusValue} value={statusValue}>{t(`classes.status.${statusValue}`, statusValue.charAt(0).toUpperCase() + statusValue.slice(1))}</option>
              ))}
            </select>
          </Box>
        </Box>

        {/* Schedule & Teacher */}
        <Box>
          <Text weight="semibold" mb="xs">{t('classes.schedule_label')} <Text as="span" color="DANGER">*</Text></Text>
          <Box p="md" border={`1px solid ${COLORS.NEUTRAL_BORDER}`} borderRadius="md" display="flex" flexDirection="column" gap="md">
            {sessions.map((session) => (
              <Box key={session.id} display="flex" gap="md" alignItems="center">
                <select
                  value={session.day}
                  onChange={(e) => handleSessionChange(session.id, 'day', e.target.value)}
                  style={{ padding: '8px', borderRadius: '4px', border: `1px solid ${COLORS.NEUTRAL_BORDER}` }}
                >
                  {(Object.keys(DAY_MAP) as DayOfWeek[]).map(dayKey => (
                    <option key={dayKey} value={dayKey}>{DAY_MAP[dayKey]}</option>
                  ))}
                </select>
                <Input 
                  type="time" 
                  value={session.startTime}
                  onChange={(e) => handleSessionChange(session.id, 'startTime', e.target.value)}
                  style={{ padding: '8px', borderRadius: '4px', border: `1px solid ${COLORS.NEUTRAL_BORDER}` }}
                />
                <Text>-</Text>
                <Input 
                  type="time" 
                  value={session.endTime}
                  onChange={(e) => handleSessionChange(session.id, 'endTime', e.target.value)}
                  style={{ padding: '8px', borderRadius: '4px', border: `1px solid ${COLORS.NEUTRAL_BORDER}` }}
                />
                {sessions.length > 1 && (
                  <Button variant="ghost" intent="danger" size="sm" onClick={() => removeSession(session.id)} type="button">
                    <Icon><X size={16} /></Icon>
                  </Button>
                )}
              </Box>
            ))}
            <Button variant="outline" size="sm" onClick={addSession} type="button" sx={{ alignSelf: 'flex-start' }}>
              Thêm buổi học
            </Button>
          </Box>
        </Box>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap="lg">
          <Box>
            <Text weight="semibold" mb="xs">{t('classes.teacher_label')}</Text>
            <Input 
              placeholder={t('classes.teacher_placeholder')} 
              value={teacherName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTeacherName(e.target.value)}
            />
          </Box>
          <Box>
            <Text weight="semibold" mb="xs">{t('classes.max_students_label')}</Text>
            <Input 
              type="number"
              value={formData.maxStudents}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('maxStudents', Number(e.target.value))}
            />
          </Box>
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
