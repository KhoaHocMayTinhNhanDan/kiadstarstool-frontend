/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, X } from 'lucide-react';
import { Box, Text, Button, Input, Card, Icon, Select } from '../../../00-design-system/00-atoms';
import { useBranch } from '../../hooks/branch/useBranch';
import { useBranchForm, type BranchFormData } from '../../hooks/branch/useBranchForm';
import { AppContext } from '@/05-bootstrap/app-context';
import { useI18n } from '@/shared/i18n/useI18n';
import { useToast } from '../../../01-ui-core/hooks/useToast';
import { SPACING, COLORS } from '../../../01-ui-core/constants/tokens-constants';
import { type DayOfWeek } from '@/01-entities/branch/value-objects/BranchOperatingHours.vo';

const DAYS: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const DAY_LABELS: Record<DayOfWeek, string> = {
  monday: 'Thứ 2', tuesday: 'Thứ 3', wednesday: 'Thứ 4', thursday: 'Thứ 5', 
  friday: 'Thứ 6', saturday: 'Thứ 7', sunday: 'Chủ Nhật'
};

export const EditBranchPage = () => {
  const { branchId } = useParams<{ branchId: string }>();
  const navigate = useNavigate();
  const { t } = useI18n();
  const { toast } = useToast();
  const { updateBranchInfo, isLoading: isSaving } = useBranch();
  const [isLoading, setIsLoading] = useState(true);
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useBranchForm();

  // State for fields not in react-hook-form
  const [financial, setFinancial] = useState({
    bankAccount: '',
    taxCode: '',
    yearlyTarget: ''
  });
  const [totalRooms, setTotalRooms] = useState<string>('');
  const [operatingRows, setOperatingRows] = useState<{ id: string; day: DayOfWeek; open: string; close: string }[]>([]);

  useEffect(() => {
    const fetchBranch = async () => {
      if (!branchId) return;
      
      setIsLoading(true);
      try {
        const controller = AppContext.getBranchController();
        const result = await controller.getBranchDetails({ branchId });

        if (result.isSuccess) {
          const branch = result.getValue();
          // Reset form with fetched data
          reset({
            name: branch.name,
            code: branch.code,
            houseNumber: branch.houseNumber,
            lane: branch.lane,
            street: branch.street,
            ward: branch.ward,
            province: branch.province,
            postalCode: branch.postalCode,
            maxStudents: branch.capacity.max,
          });

          // Populate additional states
          if ((branch as any).financial) {
            setFinancial({
              bankAccount: (branch as any).financial.bankAccount || '',
              taxCode: (branch as any).financial.taxCode || '',
              yearlyTarget: (branch as any).financial.yearlyTarget?.toString() || ''
            });
          }
          setTotalRooms((branch as any).capacity?.totalRooms?.toString() || '');

          if (branch.operatingHours) {
            const rows = Object.entries(branch.operatingHours).map(([day, hours]) => ({
              id: day, day: day as DayOfWeek, open: hours.open, close: hours.close
            }));
            setOperatingRows(rows);
          }
        } else {
          toast.error(result.getErrorValue() as string);
          navigate('/branches');
        }
      } catch (error) {
        toast.error('Failed to load branch details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBranch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branchId]);

  const addOperatingDay = () => {
    setOperatingRows(prev => [...prev, {
      id: Date.now().toString(),
      day: 'monday',
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
    if (!branchId) return;
    
    const operatingHoursObj: any = {};
    operatingRows.forEach(row => {
      operatingHoursObj[row.day] = { open: row.open, close: row.close };
    });

    const success = await updateBranchInfo({
      branchId,
      name: data.name,
      code: data.code,
      address: {
        houseNumber: data.houseNumber,
        lane: data.lane,
        street: data.street,
        ward: data.ward,
        province: data.province,
        postalCode: (data as any).postalCode,
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
      navigate(`/branches/${branchId}`);
    }
  };

  if (isLoading) {
    return <Box p="xl"><Text>{t('branch.loading_detail')}</Text></Box>;
  }

  return (
    <Box p="xl" maxWidth="800px" mx="auto">
      <Box mb="lg">
        <Text as="h1" variant="heading-xl" weight="bold">{t('branch.edit_title')}</Text>
      </Box>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap="md">
            <Input 
              label={t('branch.name_label')}
              {...register('name')}
              error={errors.name?.message}
            />
            <Input 
              label={t('branch.code_label')}
              {...register('code')}
              error={errors.code?.message}
              disabled={true} // Mã chi nhánh không nên sửa đổi
            />

            <Text weight="semibold" sx={{ marginTop: SPACING.sm }}>{t('branch.address_section')}</Text>
            <Box display="grid" gridTemplateColumns="1fr 1fr" gap="md">
              <Input 
                label={t('branch.house_number_label')} 
                {...register('houseNumber')}
                error={errors.houseNumber?.message}
              />
              <Input 
                label={t('branch.lane_label')} 
                {...register('lane')}
                error={errors.lane?.message}
              />
            </Box>
            <Input 
              label={t('branch.street_label')} 
              {...register('street')}
              error={errors.street?.message}
            />
            <Box display="grid" gridTemplateColumns="1fr 1fr" gap="md">
              <Input 
                label={t('branch.ward_label')} 
                {...register('ward')}
                error={errors.ward?.message}
              />
              <Input 
                label={t('branch.province_label')} 
                {...register('province')}
                error={errors.province?.message}
              />
              <Input 
                label={t('branch.postal_code_label')} 
                {...register('postalCode')}
                // error={errors.postalCode?.message}
                placeholder="VD: 100000"
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
                      <td style={{ padding: '8px', textAlign: 'center' }}><Box display="flex" justifyContent="center"><Input type="time" value={row.open} onChange={(e) => updateOperatingDay(row.id, 'open', e.target.value)} /></Box></td>
                      <td style={{ padding: '8px', textAlign: 'center' }}><Box display="flex" justifyContent="center"><Input type="time" value={row.close} onChange={(e) => updateOperatingDay(row.id, 'close', e.target.value)} /></Box></td>
                      <td style={{ textAlign: 'center', padding: '8px' }}><Button variant="ghost" intent="danger" size="sm" onClick={() => removeOperatingDay(row.id)} type="button"><Icon><X size={16} /></Icon></Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button variant="outline" size="sm" onClick={addOperatingDay} type="button" sx={{ marginTop: '12px' }} leftIcon={<Icon><Plus size={16} /></Icon>}>Thêm ngày</Button>
            </Box>

            <Box mt="lg" display="flex" justifyContent="flex-end" gap="sm">
              <Button variant="ghost" onClick={() => navigate(-1)} type="button">{t('branch.cancel_button')}</Button>
              <Button type="submit" isLoading={isSaving}>{t('branch.save_button')}</Button>
            </Box>
          </Box>
        </form>
      </Card>
    </Box>
  );
};