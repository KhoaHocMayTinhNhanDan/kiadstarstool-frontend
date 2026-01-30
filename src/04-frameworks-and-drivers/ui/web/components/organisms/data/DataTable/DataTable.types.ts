import type { ReactNode } from 'react';

export interface Column<T> {
  key: string;
  header: string;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  render?: (item: T) => ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  keyExtractor: (item: T) => string | number;
  onRowClick?: (item: T) => void;
  
  // Pagination
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;

  // Selection
  selectedIds?: (string | number)[];
  onSelectionChange?: (ids: (string | number)[]) => void;

  emptyMessage?: string;
}