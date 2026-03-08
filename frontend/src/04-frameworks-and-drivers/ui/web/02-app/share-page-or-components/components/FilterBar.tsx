// src/04-frameworks-and-drivers/ui/web/02-app/share-page-or-components/components/FilterBar.tsx
/** @jsxImportSource @emotion/react */
import { Filter, Check, Calendar } from 'lucide-react';
import { Box, Text, Icon, Button, Input } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { useI18n } from '@/shared/i18n/useI18n';

export type TimeRangeType = 'today' | 'day' | 'week' | 'month' | 'year' | 'custom';

interface FilterBarProps {
  branches: any[];
  selectedBranchIds: string[];
  onToggleBranch: (branchId: string) => void;
  onClearBranchSelection: () => void;
  timeRange: TimeRangeType;
  onTimeRangeChange: (range: TimeRangeType) => void;
  customStartDate: string;
  onCustomStartDateChange: (date: string) => void;
  customEndDate: string;
  onCustomEndDateChange: (date: string) => void;
}

export const FilterBar = ({ 
  branches, 
  selectedBranchIds, 
  onToggleBranch, 
  onClearBranchSelection,
  timeRange,
  onTimeRangeChange,
  customStartDate, onCustomStartDateChange,
  customEndDate, onCustomEndDateChange
}: FilterBarProps) => {
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
          {(['today', 'day', 'week', 'month', 'year', 'custom'] as const).map((range) => (
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
              {t(`dashboard.filter_${range}`)}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Custom Date Range Picker */}
      {timeRange === 'custom' && (
        <Box display="flex" alignItems="center" gap="sm" pl="2xl">
          <Input 
            type="date" 
            label="Từ ngày"
            value={customStartDate}
            onChange={(e) => onCustomStartDateChange(e.target.value)}
          />
          <Input 
            type="date" 
            label="Đến ngày"
            value={customEndDate}
            onChange={(e) => onCustomEndDateChange(e.target.value)}
          />
        </Box>
      )}
    </Box>
  );
};
