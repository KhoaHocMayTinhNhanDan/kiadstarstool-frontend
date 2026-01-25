/** @jsxImportSource @emotion/react */
import React from 'react';
import { Button, LoadingSpinner, Checkbox, Text } from '../../../atoms';
import * as styles from './DataTable.organism.styles';

export interface Column<T> {
  key: string;
  header: string;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  render?: (item: T) => React.ReactNode;
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

export const DataTable = <T extends object>({
  data,
  columns,
  isLoading = false,
  keyExtractor,
  onRowClick,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  selectedIds,
  onSelectionChange,
  emptyMessage = 'Không có dữ liệu',
}: DataTableProps<T>) => {
  
  const handleSelectAll = (checked: boolean) => {
    if (!onSelectionChange) return;
    if (checked) {
      const allIds = data.map(keyExtractor);
      onSelectionChange(allIds);
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectRow = (id: string | number, checked: boolean) => {
    if (!onSelectionChange || !selectedIds) return;
    if (checked) {
      onSelectionChange([...selectedIds, id]);
    } else {
      onSelectionChange(selectedIds.filter(selectedId => selectedId !== id));
    }
  };

  const isAllSelected = data.length > 0 && selectedIds?.length === data.length;
  // const isIndeterminate = selectedIds && selectedIds.length > 0 && selectedIds.length < data.length;

  return (
    <div css={styles.container}>
      <div css={styles.tableWrapper}>
        <table css={styles.table}>
          <thead css={styles.thead}>
            <tr>
              {onSelectionChange && (
                <th css={styles.th} style={{ width: '48px', textAlign: 'center' }}>
                  <Checkbox 
                    checked={isAllSelected} 
                    onCheckedChange={(checked) => handleSelectAll(!!checked)}
                  />
                </th>
              )}
              {columns.map((col) => (
                <th 
                  key={col.key} 
                  css={styles.th} 
                  style={{ 
                    width: col.width, 
                    textAlign: col.align || 'left' 
                  }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody css={styles.tbody}>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length + (onSelectionChange ? 1 : 0)}>
                  <div css={styles.loadingOverlay}>
                    <LoadingSpinner size="md" />
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (onSelectionChange ? 1 : 0)}>
                  <div css={styles.emptyState}>
                    <Text color="secondary">{emptyMessage}</Text>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item) => {
                const id = keyExtractor(item);
                const isSelected = selectedIds?.includes(id);

                return (
                  <tr 
                    key={id} 
                    css={styles.tr}
                    onClick={() => onRowClick?.(item)}
                    style={{ 
                      cursor: onRowClick ? 'pointer' : 'default', 
                      backgroundColor: isSelected ? 'var(--color-primary-light-opacity, #f0f9ff)' : undefined 
                    }}
                  >
                    {onSelectionChange && (
                      <td css={styles.td} style={{ textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                        <Checkbox 
                          checked={!!isSelected}
                          onCheckedChange={(checked) => handleSelectRow(id, !!checked)}
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td 
                        key={`${id}-${col.key}`} 
                        css={styles.td}
                        style={{ textAlign: col.align || 'left' }}
                      >
                        {col.render ? col.render(item) : (item as any)[col.key]}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 0 && (
        <div css={styles.paginationContainer}>
          <div>
            Trang <strong>{currentPage}</strong> / {totalPages}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button 
              size="sm" 
              variant="outline" 
              disabled={currentPage <= 1 || isLoading}
              onClick={() => onPageChange?.(currentPage - 1)}
            >
              Trước
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              disabled={currentPage >= totalPages || isLoading}
              onClick={() => onPageChange?.(currentPage + 1)}
            >
              Sau
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;