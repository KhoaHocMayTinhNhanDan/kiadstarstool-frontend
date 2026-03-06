// src/04-frameworks-and-drivers/ui/web/02-app/pages/branch/CreateBranchPage.tsx
/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X } from 'lucide-react';
import { Box, Text, Button, Input, Card, Icon, Select } from '../../../00-design-system/00-atoms';
import { useBranch } from '../../hooks/branch/useBranch';
import { useBranchForm, type BranchFormData } from '../../hooks/branch/useBranchForm';
import { useI18n } from '@/shared/i18n/useI18n';
import { SPACING, COLORS } from '../../../01-ui-core/constants/tokens-constants';
import { type DayOfWeek } from '@/01-entities/branch/value-objects/BranchOperatingHours.vo';

const DAYS: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const DAY_LABELS: Record<DayOfWeek, string> = {
  monday: 'Thứ 2', tuesday: 'Thứ 3', wednesday: 'Thứ 4', thursday: 'Thứ 5', 
  friday: 'Thứ 6', saturday: 'Thứ 7', sunday: 'Chủ Nhật'
};

export const CreateBranchPage = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { createBranch, isLoading } = useBranch();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useBranchForm();

  // State riêng cho các phần chưa có trong useBranchForm (Financial & Operating Hours)
  // TODO: Nên đưa vào useBranchForm hoặc react-hook-form schema sau này
  const [financial, setFinancial] = useState({
    bankAccount: '',
    taxCode: '',
    yearlyTarget: ''
  });
  const [totalRooms, setTotalRooms] = useState<string>('');

  // State quản lý danh sách ngày hoạt động (động)
  const [operatingRows, setOperatingRows] = useState<{ id: string; day: DayOfWeek; open: string; close: string }[]>(() => {
    // Mặc định hiển thị từ Thứ 2 đến Thứ 6
    return DAYS.slice(0, 5).map((day, index) => ({
      id: Date.now().toString() + index,
      day,
      open: '08:00',
      close: '20:00'
    }));
  });

  const addOperatingDay = () => {
    setOperatingRows(prev => [...prev, {
      id: Date.now().toString(),
      day: 'monday', // Mặc định là Thứ 2, người dùng sẽ chọn lại
      open: '08:00',
      close: '20:00'
    }]);
  };

  const removeOperatingDay = (id: string) => {
    setOperatingRows(prev => prev.filter(r => r.id !== id));
  };

  const updateOperatingDay = (id: string, field: 'day' | 'open' | 'close', value: string) => {
    setOperatingRows(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const onSubmit = async (data: BranchFormData) => {
    // Chuyển đổi mảng rows thành object operatingHours
    const operatingHoursObj: any = {};
    operatingRows.forEach(row => {
      operatingHoursObj[row.day] = { open: row.open, close: row.close };
    });
    const success = await createBranch({
      name: data.name,
      code: data.code,
      address: {
        street: data.street,
        ward: data.ward,
        district: data.district,
        city: data.city
      },
      maxStudents: data.maxStudents,
      totalRooms: Number(totalRooms) || 0,
      financial: {
        ...financial,
        yearlyTarget: Number(financial.yearlyTarget) || 0
      },
      operatingHours: operatingHoursObj
    });

    if (success) {
      navigate('/branches');
    }
  };

  return (
    <Box p="xl" maxWidth="800px" mx="auto">
      <Box mb="lg">
        <Text as="h1" variant="heading-xl" weight="bold">{t('branch.create_title')}</Text>
        <Text color="SECONDARY">{t('branch.create_subtitle')}</Text>
      </Box>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap="md">
            <Input 
              label={t('branch.name_label')}
              placeholder={t('branch.name_placeholder')}
              {...register('name')}
              error={errors.name?.message}
            />
            <Input 
              label={t('branch.code_label')}
              placeholder={t('branch.code_placeholder')}
              {...register('code')}
              error={errors.code?.message}
            />

            <Text weight="semibold" sx={{ marginTop: SPACING.sm }}>{t('branch.address_section')}</Text>
            <Input 
              label={t('branch.street_label')} 
              {...register('street')}
              error={errors.street?.message}
            />
            <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap="md">
              <Input 
                label={t('branch.ward_label')} 
                {...register('ward')}
                error={errors.ward?.message}
              />
              <Input 
                label={t('branch.district_label')} 
                {...register('district')}
                error={errors.district?.message}
              />
              <Input 
                label={t('branch.city_label')} 
                {...register('city')}
                error={errors.city?.message}
              />
            </Box>

            <Text weight="semibold" sx={{ marginTop: SPACING.sm }}>{t('branch.capacity_section')}</Text>
            <Box display="grid" gridTemplateColumns="1fr 1fr" gap="md">
              <Input 
                label={t('branch.max_students_label')}
                type="number" 
                {...register('maxStudents', { valueAsNumber: true })}
                error={errors.maxStudents?.message}
              />
              <Input 
                label="Số phòng học"
                type="number"
                value={totalRooms}
                onChange={(e) => setTotalRooms(e.target.value)}
                placeholder="VD: 10"
              />
            </Box>

            <Text weight="semibold" sx={{ marginTop: SPACING.sm }}>Thông tin tài chính</Text>
            <Box display="grid" gridTemplateColumns="1fr 1fr" gap="md">
              <Input 
                label="Số tài khoản"
                placeholder="VD: 1903..."
                value={financial.bankAccount}
                onChange={(e) => setFinancial(prev => ({ ...prev, bankAccount: e.target.value }))}
              />
              <Input 
                label="Mã số thuế"
                placeholder="VD: 010..."
                value={financial.taxCode}
                onChange={(e) => setFinancial(prev => ({ ...prev, taxCode: e.target.value }))}
              />
              <Input 
                label="Doanh thu mục tiêu (Năm)"
                type="number"
                placeholder="VNĐ"
                value={financial.yearlyTarget}
                onChange={(e) => setFinancial(prev => ({ ...prev, yearlyTarget: e.target.value }))}
              />
            </Box>

            <Text weight="semibold" sx={{ marginTop: SPACING.sm }}>Giờ hoạt động</Text>
            <Box p="md" border={`1px solid ${COLORS.NEUTRAL_BORDER}`} borderRadius="md" overflow="auto">
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '400px' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', paddingBottom: '8px', width: '150px' }}>Ngày</th>
                    <th style={{ textAlign: 'center', paddingBottom: '8px' }}>Giờ mở cửa</th>
                    <th style={{ textAlign: 'center', paddingBottom: '8px' }}>Giờ đóng cửa</th>
                    <th style={{ width: '40px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {operatingRows.map((row) => (
                    <tr key={row.id} style={{ borderTop: `1px solid ${COLORS.NEUTRAL_LIGHT}` }}>
                      <td style={{ padding: '8px' }}>
                        <Select
                          value={row.day}
                          onChange={(e) => updateOperatingDay(row.id, 'day', e.target.value)}
                          options={DAYS.map(d => ({ label: DAY_LABELS[d], value: d }))}
                          fullWidth
                        />
                      </td>
                      <td style={{ padding: '8px', textAlign: 'center' }}>
                        <Box display="flex" justifyContent="center">
                          <Input 
                            type="time"
                            value={row.open} 
                            onChange={(e) => updateOperatingDay(row.id, 'open', e.target.value)}
                          />
                        </Box>
                      </td>
                      <td style={{ padding: '8px', textAlign: 'center' }}>
                        <Box display="flex" justifyContent="center">
                          <Input 
                            type="time"
                            value={row.close} 
                            onChange={(e) => updateOperatingDay(row.id, 'close', e.target.value)}
                          />
                        </Box>
                      </td>
                      <td style={{ textAlign: 'center', padding: '8px' }}>
                        <Button variant="ghost" intent="danger" size="sm" onClick={() => removeOperatingDay(row.id)} type="button">
                          <Icon><X size={16} /></Icon>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button variant="outline" size="sm" onClick={addOperatingDay} type="button" sx={{ marginTop: '12px' }} leftIcon={<Icon><Plus size={16} /></Icon>}>
                Thêm ngày
              </Button>
            </Box>

            <Box mt="lg" display="flex" justifyContent="flex-end" gap="sm">
              <Button variant="ghost" onClick={() => navigate(-1)} type="button">{t('branch.cancel_button')}</Button>
              <Button type="submit" isLoading={isLoading}>{t('branch.create_button')}</Button>
            </Box>
          </Box>
        </form>
      </Card>
    </Box>
  );
};