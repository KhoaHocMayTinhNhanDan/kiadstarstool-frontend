// src/04-frameworks-and-drivers/ui/web/components/02-organisms/navigation/Breadcrumbs/Breadcrumbs.organism.tsx
/** @jsxImportSource @emotion/react */
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import { Box } from '../../../00-atoms';
import { Button } from '../../../00-atoms/Button';
import { DropdownMenu } from '../../../01-molecules/Dropdown/DropdownMenu';
import * as styles from './Breadcrumbs.styles';
import type { BreadcrumbsProps, BreadcrumbItem } from './Breadcrumbs.types';

const BreadcrumbSeparator: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <li aria-hidden="true" css={styles.separator}>
    {children || <ChevronRight size={16} />}
  </li>
);

const BreadcrumbLink: React.FC<{ item: BreadcrumbItem; isLast: boolean }> = ({ item, isLast }) => {
  const Component = item.href && !isLast ? Link : 'span';
  const isInteractive = !!item.href || !!item.onClick;

  return (
    <Component
      to={item.href as string}
      css={styles.itemContent(isLast, isInteractive && !isLast)}
      onClick={!isLast ? item.onClick : undefined}
      aria-current={isLast ? 'page' : undefined}
    >
      {item.icon && <span css={{ display: 'flex' }}>{item.icon}</span>}
      <span>{item.label}</span>
    </Component>
  );
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  maxItems = 4,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1,
  separator,
  sx,
  className,
}) => {
  // Logic thu gọn items
  const renderItems = () => {
    // Trường hợp ít items, hiển thị hết
    if (items.length <= maxItems) {
      return items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={item.id}>
            <li css={styles.listItem}>
              <BreadcrumbLink item={item} isLast={isLast} />
            </li>
            {!isLast && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
          </React.Fragment>
        );
      });
    }

    // Trường hợp nhiều items, cần thu gọn
    const startItems = items.slice(0, itemsBeforeCollapse);
    const endItems = items.slice(-itemsAfterCollapse);
    const collapsedItems = items.slice(itemsBeforeCollapse, items.length - itemsAfterCollapse);

    return (
      <>
        {/* Render phần đầu */}
        {startItems.map((item) => (
          <React.Fragment key={item.id}>
            <li css={styles.listItem}>
              <BreadcrumbLink item={item} isLast={false} />
            </li>
            <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
          </React.Fragment>
        ))}

        {/* Render phần thu gọn (Dropdown) */}
        <li css={styles.listItem}>
          <DropdownMenu
            trigger={
              <Button 
                variant="ghost" 
                size="sm" 
                css={styles.ellipsisButton}
                aria-label="Show more breadcrumbs"
              >
                <MoreHorizontal size={16} />
              </Button>
            }
            items={collapsedItems.map(item => ({
              id: item.id,
              label: item.label,
              icon: item.icon,
              // Nếu có href thì dùng onClick để navigate (hoặc DropdownMenu hỗ trợ href)
              // Ở đây giả định DropdownMenu xử lý onClick
              onClick: () => {
                if (item.onClick) item.onClick();
                // Nếu dùng react-router, cần xử lý navigate ở đây nếu DropdownMenu không hỗ trợ Link
                if (item.href) window.location.href = item.href; // Fallback đơn giản
              }
            }))}
          />
        </li>
        <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>

        {/* Render phần cuối */}
        {endItems.map((item, index) => {
          const isLast = index === endItems.length - 1;
          return (
            <React.Fragment key={item.id}>
              <li css={styles.listItem}>
                <BreadcrumbLink item={item} isLast={isLast} />
              </li>
              {!isLast && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
            </React.Fragment>
          );
        })}
      </>
    );
  };

  return (
    <Box 
      as="nav" 
      aria-label="Breadcrumb" 
      css={[styles.nav, sx]} 
      className={className}
    >
      <ol css={styles.list}>
        {renderItems()}
      </ol>
    </Box>
  );
};