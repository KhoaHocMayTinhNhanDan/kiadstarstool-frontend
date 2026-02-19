/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Text, Button, Icon, Card } from '../../../00-design-system/00-atoms';
import { AppContext } from '@/00-core/app-context';
import { type ListBranchesOutput } from '@/02-usecases/branch/ports/output/ListBranches.output';
import { useToast } from '../../../01-ui-core/hooks/useToast';
import { Plus, MapPin, Users, ChevronRight } from 'lucide-react';
import { SPACING, COLORS, RADIUS } from '../../../00-design-system/00-atoms/00-core/tokens-constants';
import { useI18n } from '@/shared/i18n/useI18n';

export const BranchListPage = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { toast } = useToast();
  const [branches, setBranches] = useState<ListBranchesOutput>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBranches = async () => {
      setIsLoading(true);
      try {
        const controller = AppContext.getBranchController();
        const result = await controller.listBranches({});

        if (result.isSuccess) {
          setBranches(result.getValue());
        } else {
          toast.error(result.getErrorValue() as string);
        }
      } catch (error) {
        toast.error('Failed to load branches');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBranches();
  }, []);

  return (
    <Box p="xl" maxWidth="1200px" mx="auto">
      <Box mb="lg" display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Text as="h1" variant="heading-xl" weight="bold">{t('branch.list_title')}</Text>
          <Text color="SECONDARY">{t('branch.list_subtitle')}</Text>
        </Box>
        <Button 
          leftIcon={<Icon><Plus /></Icon>} 
          onClick={() => navigate('/branches/new')}
        >
          {t('branch.create_button')}
        </Button>
      </Box>

      {isLoading ? (
        <Text>Loading...</Text>
      ) : branches.length === 0 ? (
        <Box p="xl" textAlign="center" bg="BACKGROUND_PAPER" borderRadius="md" border="1px dashed" borderColor="NEUTRAL_BORDER">
          <Text color="SECONDARY">No branches found. Create your first one!</Text>
        </Box>
      ) : (
        <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap="lg">
          {branches.map((branch) => (
            <Card 
              key={branch.id} 
              onClick={() => navigate(`/branches/${branch.id}`)}
              sx={{ 
                cursor: 'pointer', 
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: 'md' }
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb="md">
                <Box>
                  <Text weight="bold" size="lg">{branch.name}</Text>
                  <Text size="sm" color="SECONDARY">{branch.code}</Text>
                </Box>
                <Box 
                  px="sm" py="xxs" 
                  bg={branch.isActive ? 'SUCCESS_LIGHT' : 'NEUTRAL_LIGHT'} 
                  color={branch.isActive ? 'SUCCESS_DARK' : 'TEXT_SECONDARY'}
                  borderRadius="full"
                >
                  <Text size="xs" weight="bold">{branch.isActive ? t('branch.detail_status_active') : t('branch.detail_status_inactive')}</Text>
                </Box>
              </Box>
              
              <Box display="flex" flexDirection="column" gap="sm">
                <Box display="flex" gap="sm" alignItems="center">
                  <Icon size="sm" color="SECONDARY"><MapPin /></Icon>
                  <Text size="sm" color="SECONDARY" truncate>{branch.address}</Text>
                </Box>
                <Box display="flex" gap="sm" alignItems="center">
                  <Icon size="sm" color="SECONDARY"><Users /></Icon>
                  <Text size="sm" color="SECONDARY">{branch.studentCount} {t('branch.detail_capacity_unit')}</Text>
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};