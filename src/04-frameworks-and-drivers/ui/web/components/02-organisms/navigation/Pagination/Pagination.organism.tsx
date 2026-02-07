// src/04-frameworks-and-drivers/ui/web/components/02-organisms/navigation/Pagination/Pagination.organism.tsx
/** @jsxImportSource @emotion/react */
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Box } from '../../../00-atoms';
import { usePagination, DOTS } from './usePagination';
import * as styles from './Pagination.styles';
import type { PaginationProps } from './Pagination.types';

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  disabled = false,
  className,
  sx,
  testId = 'pagination',
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalPages,
    siblingCount,
  });

  // Nếu không có trang nào hoặc chỉ có 1 trang, không render
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    if (!disabled && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (!disabled && currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handlePageClick = (page: number | string) => {
    if (!disabled && typeof page === 'number' && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <Box 
      as="nav" 
      aria-label="Pagination" 
      css={[styles.nav, sx]} 
      className={className}
      data-testid={testId}
    >
      <ul css={styles.list}>
        {/* Previous Button */}
        <li css={styles.item}>
          <button
            css={styles.button(false, disabled || currentPage === 1)}
            onClick={onPrevious}
            disabled={disabled || currentPage === 1}
            aria-label="Go to previous page"
          >
            <ChevronLeft size={16} />
          </button>
        </li>

        {/* Page Numbers */}
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li key={`dots-${index}`} css={styles.item}>
                <span css={styles.dots}>&#8230;</span>
              </li>
            );
          }

          return (
            <li key={pageNumber} css={styles.item}>
              <button
                css={styles.button(pageNumber === currentPage, disabled)}
                onClick={() => handlePageClick(pageNumber)}
                disabled={disabled}
                aria-label={`Go to page ${pageNumber}`}
                aria-current={pageNumber === currentPage ? 'page' : undefined}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}

        {/* Next Button */}
        <li css={styles.item}>
          <button
            css={styles.button(false, disabled || currentPage === totalPages)}
            onClick={onNext}
            disabled={disabled || currentPage === totalPages}
            aria-label="Go to next page"
          >
            <ChevronRight size={16} />
          </button>
        </li>
      </ul>
    </Box>
  );
};