/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { Box, Button, Text, Chip, Icon } from '../../../atoms';
import { SearchInput } from '../../../molecules/SearchInput';
import { FormField } from '../../../molecules/FormField';
import { Select } from '../../../atoms/Select';
import { Input } from '../../../atoms/Input';
import { Checkbox } from '../../../atoms/Checkbox';
import * as styles from './SearchFilterForm.styles';
import type { SearchFilterFormProps, FilterConfig } from './SearchFilterForm.types';

const FilterIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/></svg>
);

export const SearchFilterForm = ({
  onSearch,
  onFilterChange,
  filterConfigs = [],
  placeholder = 'Search...',
  isLoading = false,
  className,
  sx,
}: SearchFilterFormProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterUpdate = (id: string, value: any) => {
    const newFilters = { ...filters, [id]: value };
    // Remove empty values
    if (value === '' || value === false || value === undefined) {
      delete newFilters[id];
    }
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilter = (id: string) => {
    const newFilters = { ...filters };
    delete newFilters[id];
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  const activeFilterCount = Object.keys(filters).length;

  return (
    <div css={[styles.container, sx]} className={className}>
      {/* Top Bar: Search + Toggle Filters */}
      <div css={styles.searchBarWrapper}>
        <div css={styles.searchInputContainer}>
          <SearchInput
            placeholder={placeholder}
            value={searchQuery}
            onSearch={handleSearch}
            disabled={isLoading}
          />
        </div>
        {filterConfigs.length > 0 && (
          <Button
            variant={isFiltersOpen ? 'primary' : 'outline'}
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            leftIcon={<Icon>{FilterIcon}</Icon>}
          >
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </Button>
        )}
      </div>

      {/* Active Filters Chips */}
      {activeFilterCount > 0 && (
        <div css={styles.activeFiltersWrapper}>
          {Object.entries(filters).map(([key, value]) => {
            const config = filterConfigs.find(c => c.id === key);
            if (!config) return null;
            
            let label = `${config.label}: ${value}`;
            if (config.type === 'select') {
              const option = config.options?.find(o => o.value === value);
              label = `${config.label}: ${option?.label || value}`;
            } else if (config.type === 'checkbox') {
              label = config.label;
            }

            return (
              <Chip
                key={key}
                label={label}
                onDelete={() => clearFilter(key)}
                color="primary"
                variant="outlined"
              />
            );
          })}
          <Text 
            as="span" 
            css={styles.clearAllButton} 
            onClick={clearAllFilters}
          >
            Clear all
          </Text>
        </div>
      )}

      {/* Collapsible Filters Panel */}
      <div css={styles.filtersContainer(isFiltersOpen)}>
        {filterConfigs.map((config) => (
          <FormField key={config.id} label={config.label} id={config.id}>
            {config.type === 'select' && (
              <Select
                options={config.options || []}
                value={filters[config.id] || ''}
                onChange={(e) => handleFilterUpdate(config.id, e.target.value)}
                placeholder={config.placeholder || 'Select...'}
              />
            )}
            {config.type === 'date' && (
              <Input
                type="date"
                value={filters[config.id] || ''}
                onChange={(e) => handleFilterUpdate(config.id, e.target.value)}
              />
            )}
            {config.type === 'checkbox' && (
              <Checkbox
                checked={!!filters[config.id]}
                onCheckedChange={(checked) => handleFilterUpdate(config.id, checked)}
              />
            )}
          </FormField>
        ))}
      </div>
    </div>
  );
};

SearchFilterForm.displayName = 'SearchFilterForm';