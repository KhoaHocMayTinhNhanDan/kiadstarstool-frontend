/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { ArrowLeft, Save, X } from 'lucide-react';
import { Box, Text, Button, Icon, Input } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING, RADIUS } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms/00-core/tokens-constants';
import { AppContext } from '@/00-core/app-context';
import { useI18n } from '@/shared/i18n/useI18n';
import { useToast } from '../../../01-ui-core/hooks/useToast';
import { ClassStatus } from '@/01-entities/classes/ClassStatus.enum';
import { type DayOfWeek, DAY_MAP } from '@/01-entities/classes/ClassSession';

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
    maxStudents: 20,
    code: ''
  });

  // Schedule State
  const [sessions, setSessions] = useState<{ id: string; day: DayOfWeek; startTime: string; endTime: string }[]>([
    // Start with one empty session
    { id: Date.now().toString(), day: 'Mon', startTime: '', endTime: '' }
  ]);
  const [teacherName, setTeacherName] = useState('');

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
    // Basic Validation
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
      // NOTE: The createClass DTO from other parts of the app doesn't accept `sessions` or `teacherName` yet.
      // They are removed from this call to prevent a TS error.
      // The backend use case needs to be updated to handle them.
      const result = await controller.createClass({ 
        ...formData, 
        status: ClassStatus.PLANNED,
        // sessions: finalSessions, // TODO: Re-enable when backend supports it
        // teacherName, // TODO: Re-enable when backend supports it
      });

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

        {/* Class Code */}
        <Box>
          <Text weight="semibold" mb="xs">{t('classes.code_label')} <Text as="span" color="DANGER">*</Text></Text>
          <Input 
            placeholder={t('classes.code_placeholder')} 
            value={formData.code}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('code', e.target.value)}
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
        <Box>
          <Text weight="semibold" mb="xs">{t('classes.schedule_label')} <Text as="span" color="DANGER">*</Text></Text>
          <Box p="md" border={`1px solid ${COLORS.NEUTRAL_BORDER}`} borderRadius="md" display="flex" flexDirection="column" gap="md">
            {sessions.map((session, index) => (
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

        {/* Actions */}
        <Box display="flex" justifyContent="flex-end" gap="md" mt="md" pt="md" borderTop={`1px solid ${COLORS.NEUTRAL_BORDER}`}>
          <Button variant="ghost" onClick={() => navigate('/classes')} leftIcon={<Icon><X /></Icon>}>{t('branch.cancel_button')}</Button>
          <Button variant="primary" onClick={handleSubmit} isLoading={isLoading} leftIcon={<Icon><Save /></Icon>}>{t('common.create_new')}</Button>
        </Box>
      </Box>
    </Box>
  );
};