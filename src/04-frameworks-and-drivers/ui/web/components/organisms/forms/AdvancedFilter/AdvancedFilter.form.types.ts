// AdvancedFilter.form.types.ts
import type { CSSObject } from '@emotion/react';

export type FilterType = 'text' | 'select' | 'date' | 'checkbox';

export type FilterValue = string | number | boolean | null | undefined;

export interface FilterOption {
  label: string;
  value: string | number;
}

export interface FilterField {
  id: string;
  label: string;
  type: FilterType;
  placeholder?: string;
  options?: FilterOption[];
  defaultValue?: FilterValue;
}

export interface SavedFilter {
  id: string;
  name: string;
  values: Record<string, FilterValue>;
}

export interface AdvancedFilterProps {
  fields: FilterField[];

  /** 🔹 Realtime UI change (typing tới đâu biết tới đó) */
  onValuesChange?: (values: Record<string, FilterValue>) => void;

  /** 🔹 Business action (API, table filter, router, etc.) */
  onFilter: (values: Record<string, FilterValue>) => void;

  onReset?: () => void;
  isLoading?: boolean;
  className?: string;
  sx?: CSSObject;

  /** Saved filters */
  savedFilters?: SavedFilter[];
  onSelectSavedFilter?: (filter: SavedFilter) => void;
}
