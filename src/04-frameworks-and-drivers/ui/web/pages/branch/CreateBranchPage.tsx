/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import { Box, Text, Button, Input, Card } from '../../00-design-system/00-atoms';
import { useBranch } from '../../app/hooks/branch/useBranch';
import { useBranchForm, type BranchFormData } from '../../app/hooks/branch/useBranchForm';
import { SPACING } from '../../00-design-system/00-atoms/00-core/tokens-constants';
import { useI18n } from '@/shared/i18n/useI18n';

export const CreateBranchPage = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { createBranch, isLoading } = useBranch();
  
  // 2. Setup Form using Custom Hook
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useBranchForm();

  const onSubmit = async (data: BranchFormData) => {
    const success = await createBranch({
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
      // Navigate back to list or dashboard
      navigate('/dashboard');
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
            {/* Basic Info */}
            <Box display="grid" gridTemplateColumns="1fr 1fr" gap="md">
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
            </Box>

            {/* Address */}
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

            {/* Capacity */}
            <Text weight="semibold" sx={{ marginTop: SPACING.sm }}>{t('branch.capacity_section')}</Text>
            <Input 
              label={t('branch.max_students_label')}
              type="number" 
              {...register('maxStudents', { valueAsNumber: true })}
              error={errors.maxStudents?.message}
            />

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