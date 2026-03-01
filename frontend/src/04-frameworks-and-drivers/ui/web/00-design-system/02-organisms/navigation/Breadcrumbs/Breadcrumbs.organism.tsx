/** @jsxImportSource @emotion/react */
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Icon } from '../../../00-atoms';
import { useI18n } from '@/shared/i18n/useI18n';
import * as styles from './Breadcrumbs.styles';
import type { BreadcrumbsProps, BreadcrumbItem } from './Breadcrumbs.types';

// Map các segment của URL sang key trong file ngôn ngữ
const breadcrumbNameMap: Record<string, string> = {
  dashboard: 'sidebar.dashboard',
  branches: 'sidebar.branches',
  classes: 'sidebar.classes',
  new: 'common.create_new',
  edit: 'common.edit',
  users: 'sidebar.users',
  settings: 'sidebar.settings',
};

export const Breadcrumbs = ({ items }: Partial<BreadcrumbsProps>) => {
  const location = useLocation();
  const { t } = useI18n();

  // Logic xác định danh sách items:
  // 1. Nếu props `items` được truyền vào -> Sử dụng nó (Chế độ Dumb Component)
  // 2. Nếu không -> Tự động generate từ URL hiện tại (Chế độ Smart Component)
  const displayItems: BreadcrumbItem[] = items || (() => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    
    // Không hiển thị nếu đang ở Dashboard root
    if (pathnames.length === 0 || (pathnames.length === 1 && pathnames[0] === 'dashboard')) {
      return [];
    }

    return pathnames.map((value, index) => {
      const to = `/${pathnames.slice(0, index + 1).join('/')}`;
      let label = value;

      // Xử lý nhãn hiển thị
      if (breadcrumbNameMap[value]) {
        label = t(breadcrumbNameMap[value]);
      } else if (value.length > 8 || /\d/.test(value)) {
        // Nếu là ID (chuỗi dài hoặc chứa số), hiển thị "Chi tiết"
        label = t('common.detail');
      }

      return {
        id: to,
        label,
        href: to
      };
    });
  })();

  if (displayItems.length === 0) return null;

  return (
    <nav css={styles.nav} aria-label="Breadcrumb">
      <ol css={styles.list}>
        {/* Home Icon luôn hiển thị đầu tiên */}
        <li css={styles.listItem}>
          <Link to="/dashboard" css={styles.itemContent(false, true)}>
            <Icon size="sm"><Home size={16} /></Icon>
          </Link>
          <span css={styles.separator}><ChevronRight size={16} /></span>
        </li>

        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          
          return (
            <li key={item.id} css={styles.listItem}>
              {isLast ? (
                <span css={styles.itemContent(true, false)}>
                  {item.label}
                </span>
              ) : (
                <Link to={item.href || '#'} css={styles.itemContent(false, true)}>
                  {item.label}
                </Link>
              )}
              
              {!isLast && (
                <span css={styles.separator}><ChevronRight size={16} /></span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};