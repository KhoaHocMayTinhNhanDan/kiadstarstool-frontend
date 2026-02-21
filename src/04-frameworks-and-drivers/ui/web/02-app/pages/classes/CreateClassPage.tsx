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

type TimeSlot = { startTime: string; endTime: string; active: boolean };
type ScheduleRow = { id: string; day: DayOfWeek; slots: [TimeSlot, TimeSlot, TimeSlot] };

const DEFAULT_SLOTS: [TimeSlot, TimeSlot, TimeSlot] = [
  { startTime: '08:00', endTime: '09:30', active: false },
  { startTime: '14:00', endTime: '15:30', active: false },
  { startTime: '18:00', endTime: '19:30', active: true }, // Default to Evening active
];

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
  const [scheduleRows, setScheduleRows] = useState<ScheduleRow[]>([{
    id: Date.now().toString(),
    day: 'Mon',
    slots: JSON.parse(JSON.stringify(DEFAULT_SLOTS))
  }]);

  const [teacherName, setTeacherName] = useState('');
  const [tuition, setTuition] = useState<{ courseFee: number | ''; sessionFee: number | ''; monthlyFee: number | '' }>({
    courseFee: '',
    sessionFee: '',
    monthlyFee: ''
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

  const addRow = () => {
    setScheduleRows(prev => [...prev, {
      id: Date.now().toString(),
      day: 'Mon',
      slots: JSON.parse(JSON.stringify(DEFAULT_SLOTS))
    }]);
  };

  const removeRow = (id: string) => {
    setScheduleRows(prev => prev.filter(r => r.id !== id));
  };

  const updateRowDay = (id: string, day: DayOfWeek) => {
    setScheduleRows(prev => prev.map(r => r.id === id ? { ...r, day } : r));
  };

  const updateSlot = (rowId: string, slotIndex: number, field: keyof TimeSlot, value: any) => {
    setScheduleRows(prev => prev.map(row => {
      if (row.id !== rowId) return row;
      const newSlots = [...row.slots] as [TimeSlot, TimeSlot, TimeSlot];
      newSlots[slotIndex] = { ...newSlots[slotIndex], [field]: value };
      return { ...row, slots: newSlots };
    }));
  };

  const applyTemplate = (days: DayOfWeek[]) => {
    const baseId = Date.now().toString();
    const newRows: ScheduleRow[] = days.map((day, index) => ({
      id: `${baseId}-${index}`,
      day,
      slots: JSON.parse(JSON.stringify(DEFAULT_SLOTS))
    }));
    setScheduleRows(newRows);
  };

  const handleSubmit = async () => {
    // Basic Validation
    if (!formData.name || !formData.branchId || !formData.code) {
      toast.error('Vui lòng nhập tên lớp và chọn chi nhánh.');
      return;
    }

    // Flatten rows into sessions
    const finalSessions: any[] = [];
    scheduleRows.forEach(row => {
      row.slots.forEach(slot => {
        if (slot.active) {
          finalSessions.push({ day: row.day, startTime: slot.startTime, endTime: slot.endTime });
        }
      });
    });

    if (finalSessions.length === 0) {
      toast.error('Vui lòng chọn ít nhất một buổi học.');
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
        sessions: finalSessions,
        teacherName,
        tuition: { 
          courseFee: tuition.courseFee ? Number(tuition.courseFee) : undefined,
          sessionFee: tuition.sessionFee ? Number(tuition.sessionFee) : undefined,
          monthlyFee: tuition.monthlyFee ? Number(tuition.monthlyFee) : undefined,
          currency: 'VND' 
        }
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
          <Box display="flex" justifyContent="space-between" alignItems="center" mb="sm">
            <Text weight="semibold">{t('classes.schedule_label')} <Text as="span" color="DANGER">*</Text></Text>
            <Box display="flex" gap="xs">
              <Button size="sm" variant="outline" onClick={() => applyTemplate(['Mon', 'Wed', 'Fri'])}>T2-4-6</Button>
              <Button size="sm" variant="outline" onClick={() => applyTemplate(['Tue', 'Thu', 'Sat'])}>T3-5-7</Button>
              <Button size="sm" variant="outline" onClick={() => applyTemplate(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])}>T2-CN</Button>
            </Box>
          </Box>

          <Box p="md" border={`1px solid ${COLORS.NEUTRAL_BORDER}`} borderRadius="md" overflow="auto">
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', paddingBottom: '8px', width: '100px' }}>Thứ</th>
                  <th style={{ textAlign: 'center', paddingBottom: '8px' }}>Sáng</th>
                  <th style={{ textAlign: 'center', paddingBottom: '8px' }}>Chiều</th>
                  <th style={{ textAlign: 'center', paddingBottom: '8px' }}>Tối</th>
                  <th style={{ width: '40px' }}></th>
                </tr>
              </thead>
              <tbody>
                {scheduleRows.map((row) => (
                  <tr key={row.id} style={{ borderTop: `1px solid ${COLORS.NEUTRAL_LIGHT}` }}>
                    <td style={{ padding: '8px' }}>
                      <select
                        value={row.day}
                        onChange={(e) => updateRowDay(row.id, e.target.value as DayOfWeek)}
                        style={{ width: '100%', padding: '6px', borderRadius: '4px', border: `1px solid ${COLORS.NEUTRAL_BORDER}` }}
                      >
                        {(Object.keys(DAY_MAP) as DayOfWeek[]).map(dayKey => (
                          <option key={dayKey} value={dayKey}>{DAY_MAP[dayKey]}</option>
                        ))}
                      </select>
                    </td>
                    {row.slots.map((slot, index) => (
                      <td key={index} style={{ padding: '8px' }}>
                        <Box 
                          display="flex" 
                          alignItems="center" 
                          gap="xs" 
                          bg={slot.active ? 'PRIMARY_LIGHT' : 'transparent'} 
                          p="xs" 
                          borderRadius="md"
                          border={slot.active ? `1px solid ${COLORS.PRIMARY}` : '1px solid transparent'}
                        >
                          <Input 
                            type="checkbox" 
                            checked={slot.active} 
                            onChange={(e) => updateSlot(row.id, index, 'active', e.target.checked)}
                            style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                          />
                          <Box display="flex" flexDirection="column" gap="2px">
                            <Input 
                              type="time" 
                              value={slot.startTime} 
                              disabled={!slot.active}
                              onChange={(e) => updateSlot(row.id, index, 'startTime', e.target.value)}
                              style={{ fontSize: '12px', border: 'none', background: 'transparent', padding: 0, color: slot.active ? 'inherit' : '#aaa' }}
                            />
                            <Input 
                              type="time" 
                              value={slot.endTime} 
                              disabled={!slot.active}
                              onChange={(e) => updateSlot(row.id, index, 'endTime', e.target.value)}
                              style={{ fontSize: '12px', border: 'none', background: 'transparent', padding: 0, color: slot.active ? 'inherit' : '#aaa' }}
                            />
                          </Box>
                        </Box>
                      </td>
                    ))}
                    <td style={{ textAlign: 'center', padding: '8px' }}>
                      <Button variant="ghost" intent="danger" size="sm" onClick={() => removeRow(row.id)}><Icon><X size={16} /></Icon></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button variant="outline" size="sm" onClick={addRow} type="button" sx={{ marginTop: '12px' }}>
              Thêm ngày học
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

        {/* Tuition */}
        <Box>
          <Text weight="semibold" mb="xs">Học phí</Text>
          <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap="md">
            <Box>
              <Text size="sm" mb="xxs">Theo khóa</Text>
              <Input 
                type="number"
                placeholder="VNĐ"
                value={tuition.courseFee}
                onChange={(e) => setTuition(prev => ({ ...prev, courseFee: e.target.value === '' ? '' : Number(e.target.value) }))}
              />
            </Box>
            <Box>
              <Text size="sm" mb="xxs">Theo buổi</Text>
              <Input 
                type="number"
                placeholder="VNĐ"
                value={tuition.sessionFee}
                onChange={(e) => setTuition(prev => ({ ...prev, sessionFee: e.target.value === '' ? '' : Number(e.target.value) }))}
              />
            </Box>
            <Box>
              <Text size="sm" mb="xxs">Theo tháng</Text>
              <Input 
                type="number"
                placeholder="VNĐ"
                value={tuition.monthlyFee}
                onChange={(e) => setTuition(prev => ({ ...prev, monthlyFee: e.target.value === '' ? '' : Number(e.target.value) }))}
              />
            </Box>
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