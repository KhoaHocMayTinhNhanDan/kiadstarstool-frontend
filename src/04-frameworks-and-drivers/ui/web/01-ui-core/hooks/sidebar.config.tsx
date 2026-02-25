import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  BookOpen, 
  CalendarCheck, 
  DollarSign, 
  Settings 
} from 'lucide-react';
import { Box, Icon } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';

// Helper để render icon nhất quán
const NavIcon = ({ children }: { children: React.ReactNode }) => (
  <Icon size="sm">{children}</Icon>
);

export const SIDEBAR_ITEMS = [
  {
    id: 'dashboard',
    label: 'Tổng quan',
    icon: <NavIcon><LayoutDashboard /></NavIcon>,
    href: '/dashboard'
  },
  {
    id: 'management',
    label: 'Quản lý',
    items: [
      {
        id: 'branches',
        label: 'Cơ sở / Chi nhánh',
        icon: <NavIcon><Building2 /></NavIcon>,
        href: '/branches'
      },
      {
        id: 'classes',
        label: 'Lớp học',
        icon: <NavIcon><BookOpen /></NavIcon>,
        href: '/classes'
      },
      {
        id: 'students',
        label: 'Học viên',
        icon: <NavIcon><Users /></NavIcon>,
        href: '/students'
      },
      {
        id: 'attendance',
        label: 'Điểm danh',
        icon: <NavIcon><CalendarCheck /></NavIcon>,
        href: '/attendance'
      },
      {
        id: 'finance',
        label: 'Tài chính',
        icon: <NavIcon><DollarSign /></NavIcon>,
        href: '/finance'
      }
    ]
  }
];