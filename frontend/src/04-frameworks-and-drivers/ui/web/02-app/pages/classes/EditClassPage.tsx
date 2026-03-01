/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, X, Trash2 } from 'lucide-react';
import { Box, Text, Button, Icon, Input } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { AppContext } from '@/00-core/app-context';
import { useI18n } from '@/shared/i18n/useI18n';
import { useToast } from '../../../01-ui-core/hooks/useToast';
import { ConfirmDialog } from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/modals/ConfirmDialog';
import { type DayOfWeek, DAY_MAP, type ClassSession } from '@/01-entities/classes/ClassSession';
import { ClassStatus } from '@/01-entities/classes/ClassStatus.enum';
import { isValidTimeRange } from '../../../01-ui-core/utils/validators/time.validator';

type TimeSlot = { startTime: string; endTime: string; active: boolean };
type ScheduleRow = { id: string; day: DayOfWeek; slots: [TimeSlot, TimeSlot, TimeSlot] };

const DEFAULT_SLOTS: [TimeSlot, TimeSlot, TimeSlot] = [
  { startTime: '08:00', endTime: '09:30', active: false },
  { startTime: '14:00', endTime: '15:30', active: false },
  { startTime: '18:00', endTime: '19:30', active: false }, // Default inactive for new rows
];

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
    maxStudents: number | '';
    status: ClassStatus;
  }

  // Form State
  const [formData, setFormData] = useState<PageFormData>({
    id: '',
    name: '',
    branchId: '',
    code: '',
    maxStudents: '',
    status: 'active'
  });

  // Schedule State
  const [scheduleRows, setScheduleRows] = useState<ScheduleRow[]>([]);
  const [teacherName, setTeacherName] = useState('');
  const [tuition, setTuition] = useState<{ courseFee: number | ''; sessionFee: number | ''; monthlyFee: number | '' }>({
    courseFee: '',
    sessionFee: '',
    monthlyFee: ''
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
            code: data.code,
            branchId: data.branchId,
            maxStudents: data.maxStudents,
            status: data.status
          });
          setTeacherName(data.teacherName || '');

          // Populate sessions from structured data
          if (data.sessions && Array.isArray(data.sessions)) {
            // Group sessions by day
            const groupedSessions: Record<string, ClassSession[]> = {};
            data.sessions.forEach((s: ClassSession) => {
              if (!groupedSessions[s.day]) groupedSessions[s.day] = [];
              groupedSessions[s.day].push(s);
            });

            const rows: ScheduleRow[] = Object.entries(groupedSessions).map(([day, sessions], idx) => {
              const slots = JSON.parse(JSON.stringify(DEFAULT_SLOTS)) as [TimeSlot, TimeSlot, TimeSlot];
              
              sessions.forEach(s => {
                const startH = parseInt(s.startTime.split(':')[0]);
                let slotIndex = 2; // Default Evening
                if (startH >= 5 && startH < 12) slotIndex = 0; // Morning
                else if (startH >= 12 && startH < 17) slotIndex = 1; // Afternoon

                slots[slotIndex] = {
                  startTime: s.startTime,
                  endTime: s.endTime,
                  active: true
                };
              });

              return {
                id: Date.now().toString() + idx,
                day: day as DayOfWeek,
                slots
              };
            });
            setScheduleRows(rows);
          }

          if (data.tuition) {
            setTuition({ 
              courseFee: data.tuition.courseFee || '',
              sessionFee: data.tuition.sessionFee || '',
              monthlyFee: data.tuition.monthlyFee || ''
            });
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

  const handleSubmit = async () => {
    if (!formData.name || !formData.branchId || !formData.code) {
      toast.error('Vui lòng nhập tên lớp và chọn chi nhánh.');
      return;
    }
    
    // Validate time slots
    for (const row of scheduleRows) {
      for (const slot of row.slots) {
        if (slot.active) {
          if (!isValidTimeRange(slot.startTime, slot.endTime)) {
            toast.error(`Giờ kết thúc phải lớn hơn giờ bắt đầu (${DAY_MAP[row.day]}: ${slot.startTime} - ${slot.endTime})`);
            return;
          }
        }
      }
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
      const result = await controller.updateClassInfo({
        classId: formData.id,
        name: formData.name,
        code: formData.code,
        maxStudents: formData.maxStudents === '' ? undefined : Number(formData.maxStudents),
        status: formData.status,
        teacherName: teacherName,
        sessions: finalSessions,
        tuition: { 
          courseFee: tuition.courseFee ? Number(tuition.courseFee) : undefined,
          sessionFee: tuition.sessionFee ? Number(tuition.sessionFee) : undefined,
          monthlyFee: tuition.monthlyFee ? Number(tuition.monthlyFee) : undefined,
          currency: 'VND' 
        }
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
          <Text weight="semibold" mb="sm">{t('classes.schedule_label')}</Text>
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
                              style={{ fontSize: '12px', border: 'none', background: 'transparent', padding: 0, color: slot.active ? 'inherit' : '#aaa',
                                borderColor: slot.active && !isValidTimeRange(slot.startTime, slot.endTime) ? COLORS.DANGER : undefined, borderWidth: slot.active && !isValidTimeRange(slot.startTime, slot.endTime) ? '1px' : '0px', borderStyle: slot.active && !isValidTimeRange(slot.startTime, slot.endTime) ? 'solid' : 'none' }}
                            />
                            <Input 
                              type="time" 
                              value={slot.endTime} 
                              disabled={!slot.active}
                              onChange={(e) => updateSlot(row.id, index, 'endTime', e.target.value)}
                              style={{ fontSize: '12px', border: 'none', background: 'transparent', padding: 0, color: slot.active ? 'inherit' : '#aaa',
                                borderColor: slot.active && !isValidTimeRange(slot.startTime, slot.endTime) ? COLORS.DANGER : undefined, borderWidth: slot.active && !isValidTimeRange(slot.startTime, slot.endTime) ? '1px' : '0px', borderStyle: slot.active && !isValidTimeRange(slot.startTime, slot.endTime) ? 'solid' : 'none' }}
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                handleChange('maxStudents', value === '' ? '' : Number(value));
              }}
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
