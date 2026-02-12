/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Text, Button, Card, Icon } from '../../00-design-system/00-atoms';
import { AppContext } from '@/00-core/app-context';
import { type GetBranchDetailsOutput } from '@/02-usecases/branch/ports/output/GetBranchDetails.output';
import { useToast } from '../../app/hooks/user/useToast';
import { ArrowLeft, MapPin, Users, Clock, Edit } from 'lucide-react';
import { SPACING } from '../../00-design-system/00-atoms/00-core/tokens-constants';
import { useI18n } from '@/shared/i18n/useI18n';

export const BranchDetailPage = () => {
  const { branchId } = useParams<{ branchId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useI18n();
  const [branch, setBranch] = useState<GetBranchDetailsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBranch = async () => {
      if (!branchId) return;
      
      setIsLoading(true);
      try {
        const controller = AppContext.getBranchController();
        const result = await controller.getBranchDetails({ branchId });

        if (result.isSuccess) {
          setBranch(result.getValue());
        } else {
          toast.error(result.getErrorValue() as string);
          navigate('/dashboard'); // Redirect if not found
        }
      } catch (error) {
        toast.error('Failed to load branch details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBranch();
  }, [branchId]);

  if (isLoading) {
    return <Box p="xl"><Text>{t('branch.loading_detail')}</Text></Box>;
  }

  if (!branch) {
    return <Box p="xl"><Text>{t('branch.not_found')}</Text></Box>;
  }

  return (
    <Box p="xl" maxWidth="800px" mx="auto">
      <Button 
        variant="ghost" 
        leftIcon={<Icon><ArrowLeft /></Icon>} 
        onClick={() => navigate(-1)}
        sx={{ marginBottom: SPACING.lg }}
      >
        {t('branch.detail_back_button')}
      </Button>

      <Box mb="lg" display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Text as="h1" variant="heading-xl" weight="bold">{branch.name}</Text>
          <Text color="SECONDARY">{t('branch.detail_code_label')}: {branch.code}</Text>
        </Box>
        <Box display="flex" gap="sm" alignItems="center">
          <Box 
            px="md" py="xs" 
            bg={branch.isActive ? 'SUCCESS_LIGHT' : 'NEUTRAL_LIGHT'} 
            color={branch.isActive ? 'SUCCESS_DARK' : 'TEXT_SECONDARY'}
            borderRadius="full"
          >
            <Text size="sm" weight="bold">{branch.isActive ? t('branch.detail_status_active') : t('branch.detail_status_inactive')}</Text>
          </Box>
          <Button 
            variant="outline" 
            leftIcon={<Icon><Edit /></Icon>}
            onClick={() => navigate(`/branches/${branchId}/edit`)}
          >
            {t('branch.edit_button')}
          </Button>
        </Box>
      </Box>

      <Card>
        <Box display="flex" flexDirection="column" gap="lg">
          <Box display="flex" gap="md" alignItems="flex-start">
            <Icon color="PRIMARY"><MapPin /></Icon>
            <Box>
              <Text weight="semibold">{t('branch.detail_address_label')}</Text>
              <Text color="SECONDARY">{branch.address}</Text>
            </Box>
          </Box>

          <Box display="flex" gap="md" alignItems="flex-start">
            <Icon color="PRIMARY"><Users /></Icon>
            <Box>
              <Text weight="semibold">{t('branch.detail_capacity_label')}</Text>
              <Text color="SECONDARY">{branch.capacity.current} / {branch.capacity.max} {t('branch.detail_capacity_unit')}</Text>
            </Box>
          </Box>

          <Box display="flex" gap="md" alignItems="flex-start">
            <Icon color="PRIMARY"><Clock /></Icon>
            <Box>
              <Text weight="semibold">{t('branch.detail_operating_hours_label')}</Text>
              <Text color="SECONDARY">{branch.operatingHours.open} - {branch.operatingHours.close}</Text>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};