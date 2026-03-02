/** @jsxImportSource @emotion/react */
import { useState, useEffect, useMemo, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  Shield, 
  CheckCircle, 
  XCircle,
  User as UserIcon,
  Trash2
} from 'lucide-react';
import { Box, Text, Button, Icon, Input, Avatar, Badge, Select } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING, RADIUS, SHADOWS } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { AppContext } from '@/05-bootstrap/app-context';
import { Pagination } from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/navigation/Pagination';
import { useToast } from '../../../01-ui-core/hooks/useToast';
import { DataTable, type Column } from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/data/DataTable';

// Định nghĩa interface cho dữ liệu hiển thị (có thể thay thế bằng DTO thực tế từ UseCase)
interface UserListItem {
  id: string;
  displayName: string;
  email: string;
  photoURL?: string;
  role: 'admin' | 'manager' | 'teacher' | 'staff';
  status: 'active' | 'inactive';
  lastActive?: string;
}

export const UserListPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State
  const [users, setUsers] = useState<UserListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  const ITEMS_PER_PAGE = 10;

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const controller = AppContext.getUsersController();
      const result = await controller.listUsers({});
      
      if (result.isSuccess) {
        const data = result.getValue();
        const mappedUsers: UserListItem[] = data
          .map((u: any) => ({
          // FIX: API trả về 'uid', cần ưu tiên lấy 'uid' trước, sau đó mới fallback sang 'id'
          id: u.uid || (typeof u.id === 'object' ? u.id.value : u.id) || '',
          displayName: u.displayName || u.email?.split('@')[0] || 'Unknown',
          email: u.email || '',
          photoURL: u.photoURL,
          role: u.role as UserListItem['role'],
          status: (u.isActive ? 'active' : 'inactive') as UserListItem['status'],
          lastActive: u.lastLoginAt || u.updatedAt
        }))
        .filter(u => u.id); // Chỉ giữ lại user có ID hợp lệ sau khi đã map xong
        
        setUsers(mappedUsers);
      } else {
        toast.error(result.getErrorValue());
      }
    } catch (error) {
      console.error(error);
      toast.error('Không thể tải danh sách người dùng');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filtering
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.displayName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      user.email.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Helpers UI
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'primary';
      case 'manager': return 'primary';
      case 'teacher': return 'info';
      case 'staff': return 'warning';
      default: return 'neutral';
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn vô hiệu hóa người dùng "${userName}" không?`)) {
      return;
    }

    try {
      const controller = AppContext.getUsersController();
      const result = await controller.deactivateUser(userId);
      if (result.isSuccess) {
        toast.success(`Đã vô hiệu hóa người dùng ${userName}`);
        fetchUsers(); // Refresh list
      } else {
        toast.error(result.getErrorValue());
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi xóa người dùng');
    }
  };

  // Cấu hình cột cho DataTable
  const columns = useMemo<Column<UserListItem>[]>(() => [
    {
      key: 'user',
      header: 'Người dùng',
      render: (user) => (
        <Box display="flex" alignItems="center" gap="md">
          <Avatar src={user.photoURL} alt={user.displayName} fallback={<UserIcon />} size="md" />
          <Box>
            <Text weight="medium">{user.displayName}</Text>
            <Box display="flex" alignItems="center" gap="xs">
              <Icon size="xs" color="SECONDARY"><Mail /></Icon>
              <Text size="xs" color="SECONDARY">{user.email}</Text>
            </Box>
          </Box>
        </Box>
      )
    },
    {
      key: 'role',
      header: 'Vai trò',
      render: (user) => (
        <Badge color={getRoleBadgeColor(user.role)} icon={<Shield size={12}/>}>{user.role.toUpperCase()}</Badge>
      )
    },
    {
      key: 'status',
      header: 'Trạng thái',
      render: (user) => (
        <Box display="flex" alignItems="center" gap="xs">
          <Icon size="xs" color={user.status === 'active' ? 'SUCCESS' : 'SECONDARY'}>
            {user.status === 'active' ? <CheckCircle /> : <XCircle />}
          </Icon>
          <Text size="sm">{user.status === 'active' ? 'Hoạt động' : 'Vô hiệu'}</Text>
        </Box>
      )
    },
    {
      key: 'lastActive',
      header: 'Hoạt động cuối',
      render: (user) => (
        <Text size="sm" color="SECONDARY">{user.lastActive ? new Date(user.lastActive).toLocaleDateString('vi-VN') : '-'}</Text>
      )
    },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: (user) => (
        <Box display="flex" justifyContent="flex-end" gap="xs" onClick={(e: MouseEvent) => e.stopPropagation()}>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={(e: MouseEvent) => { e.stopPropagation(); handleDeleteUser(user.id, user.displayName); }}
            title="Vô hiệu hóa"
            sx={{ color: COLORS.DANGER, '&:hover': { backgroundColor: COLORS.DANGER_LIGHT } }}
          >
            <Icon size="sm"><Trash2 /></Icon>
          </Button>
        </Box>
      )
    }
  ], []);

  return (
    <Box display="flex" flexDirection="column" gap="lg">
      {/* 1. Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Text as="h1" variant="heading-lg" weight="bold">Quản lý Người dùng</Text>
          <Text color="SECONDARY">Quản lý tài khoản, phân quyền và trạng thái hoạt động.</Text>
        </Box>
        <Button 
          variant="primary" 
          leftIcon={<Icon><Plus /></Icon>}
          onClick={() => navigate('/users/new')}
        >
          Thêm người dùng
        </Button>
      </Box>

      {/* 2. Filters Section */}
      <Box 
        display="flex" 
        gap="md" 
        alignItems="center" 
        flexWrap="wrap"
        p="md"
        bg="BACKGROUND_PAPER"
        css={{ 
          boxShadow: SHADOWS.sm,
          borderRadius: RADIUS.md,
          border: `1px solid ${COLORS.NEUTRAL_BORDER}`
        }}
      >
        {/* Search Input */}
        <Box flex="1" display="flex" alignItems="center" gap="sm" bg="BACKGROUND_NEUTRAL" px="md" css={{ minWidth: '250px', borderRadius: RADIUS.md }}>
          <Icon color="SECONDARY" size="sm"><Search /></Icon>
          <Input 
            placeholder="Tìm kiếm theo tên, email..." 
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            style={{ border: 'none', background: 'transparent', padding: '10px 0', width: '100%' }}
          />
        </Box>
        
        {/* Role Filter */}
        <Box display="flex" gap="sm" alignItems="center" position="relative">
          <Box position="absolute" left="10px" style={{ pointerEvents: 'none' }}>
             <Icon color="SECONDARY" size="sm"><Filter /></Icon>
          </Box>
          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            options={[
              { label: 'Tất cả vai trò', value: 'all' },
              { label: 'Quản trị viên', value: 'admin' },
              { label: 'Quản lý', value: 'manager' },
              { label: 'Giáo viên', value: 'teacher' },
              { label: 'Nhân viên', value: 'staff' },
              { label: 'Học viên', value: 'student' }
            ]}
            sx={{ paddingLeft: '36px', minWidth: '180px' }}
          />
        </Box>
      </Box>

      {/* 3. Data Table Section */}
      <DataTable
        data={paginatedUsers}
        columns={columns}
        keyExtractor={(user) => user.id}
        isLoading={isLoading}
        onRowClick={(user) => navigate(`/users/${user.id}`)}
        emptyMessage="Không tìm thấy người dùng nào."
        totalPages={0} // Ẩn pagination mặc định của DataTable để dùng component Pagination bên dưới
      />

      {/* 4. Pagination */}
      {!isLoading && filteredUsers.length > ITEMS_PER_PAGE && (
        <Box display="flex" justifyContent="center" mt="md">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </Box>
      )}
    </Box>
  );
};
// File: UserListPage.tsx
