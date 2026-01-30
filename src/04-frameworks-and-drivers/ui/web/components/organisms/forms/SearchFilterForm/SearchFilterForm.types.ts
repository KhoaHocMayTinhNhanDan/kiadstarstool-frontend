import type { CSSObject } from '@emotion/react';

export interface FilterOption {
  label: string;
  value: string | number;
}

export interface FilterConfig {
  id: string;
  label: string;
  type: 'select' | 'date' | 'checkbox';
  options?: FilterOption[];
  placeholder?: string;
}

export interface SearchFilterFormProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: Record<string, any>) => void;
  filterConfigs?: FilterConfig[];
  placeholder?: string;
  isLoading?: boolean;
  className?: string;
  sx?: CSSObject;
}