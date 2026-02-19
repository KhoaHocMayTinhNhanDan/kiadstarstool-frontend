/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Text, Button, Input, Card } from '../../../00-design-system/00-atoms';
import { useBranch } from '../../hooks/branch/useBranch';
import { useBranchForm, type BranchFormData } from '../../hooks/branch/useBranchForm';
import { AppContext } from '@/00-core/app-context';
import { useI18n } from '@/shared/i18n/useI18n';
import { useToast } from '../../../01-ui-core/hooks/useToast';
import { SPACING } from '../../../00-design-system/00-atoms/00-core/tokens-constants';

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
            street: branch.street,
            ward: branch.ward,
            district: branch.district,
            city: branch.city,
            maxStudents: branch.capacity.max,
          });
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
  }, [branchId]);

  const onSubmit = async (data: BranchFormData) => {
    if (!branchId) return;
    
    const success = await updateBranchInfo({
      branchId,
      name: data.name,
      code: data.code,
      address: {
        street: data.street,
        ward: data.ward,
        district: data.district,
        city: data.city
      },
      maxStudents: data.maxStudents
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
            <Input 
              label={t('branch.max_students_label')}
              type="number" 
              {...register('maxStudents', { valueAsNumber: true })}
              error={errors.maxStudents?.message}
            />

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