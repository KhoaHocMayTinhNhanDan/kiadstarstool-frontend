/** @jsxImportSource @emotion/react */
import { 
  Filter,
  Check,
  Calendar
} from 'lucide-react';
import { Box, Text, Icon, Button } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { useI18n } from '@/shared/i18n/useI18n';

interface DashboardFiltersProps {
  branches: any[];
  selectedBranchIds: string[];
  onToggleBranch: (branchId: string) => void;
  onClearBranchSelection: () => void;
  timeRange: 'week' | 'month' | 'year';
  onTimeRangeChange: (range: 'week' | 'month' | 'year') => void;
}

export const DashboardFilters = ({ 
  branches, 
  selectedBranchIds, 
  onToggleBranch, 
  onClearBranchSelection,
  timeRange,
  onTimeRangeChange
}: DashboardFiltersProps) => {
  const { t } = useI18n();

  return (
    <Box display="flex" flexDirection="column" gap="md">
      {/* Branch Filter */}
      <Box display="flex" alignItems="center" gap="sm" mb="sm">
        <Icon size="sm" color="SECONDARY"><Filter /></Icon>
        <Text size="sm" weight="semibold" color="SECONDARY">{t('dashboard.filter_by_branch')}:</Text>
      </Box>
      <Box display="flex" gap="sm" flexWrap="wrap">
        <Button 
          size="sm"
          variant={selectedBranchIds.length === 0 ? 'primary' : 'outline'}
          onClick={onClearBranchSelection}
          leftIcon={selectedBranchIds.length === 0 ? <Icon><Check /></Icon> : undefined}
        >
          {t('dashboard.all_branches')}
        </Button>

        {branches.map((branch: any) => {
          const isSelected = selectedBranchIds.includes(branch.id);
          return (
            <Button
              key={branch.id}
              size="sm"
              variant={isSelected ? 'primary' : 'outline'}
              onClick={() => onToggleBranch(branch.id)}
              leftIcon={isSelected ? <Icon><Check /></Icon> : undefined}
            >
              {branch.name}
            </Button>
          );
        })}
      </Box>

      {/* Time Range Filter */}
      <Box display="flex" alignItems="center" gap="sm" mt="xs">
        <Icon size="sm" color="SECONDARY"><Calendar /></Icon>
        <Text size="sm" weight="semibold" color="SECONDARY">{t('dashboard.time_period')}:</Text>
        <Box display="flex" gap="xs" bg="NEUTRAL_LIGHT" p="xxs" borderRadius="md">
          {(['week', 'month', 'year'] as const).map((range) => (
            <Button 
              key={range}
              size="sm" 
              variant="ghost" 
              onClick={() => onTimeRangeChange(range)}
              sx={{ 
                backgroundColor: timeRange === range ? 'white' : undefined,
                boxShadow: timeRange === range ? 'sm' : 'none' 
              }}
            >
              {t(`dashboard.this_${range}`)}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};