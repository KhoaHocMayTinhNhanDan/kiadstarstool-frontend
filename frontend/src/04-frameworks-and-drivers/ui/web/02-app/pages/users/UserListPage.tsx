/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
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
import { Box, Text, Button, Icon, Input, Avatar, Badge } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING, RADIUS, SHADOWS } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { AppContext } from '@/00-core/app-context';
import { Pagination } from '@/04-frameworks-and-drivers/ui/web/00-design-system/02-organisms/navigation/Pagination';
import { useToast } from '../../../01-ui-core/hooks/useToast';

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
        const mappedUsers: UserListItem[] = data.map((u: any) => ({
          id: u.id,
          displayName: u.displayName || u.email.split('@')[0],
          email: u.email,
          photoURL: u.photoURL,
          role: u.role,
          status: u.isActive ? 'active' : 'inactive',
          lastActive: u.lastLoginAt || u.updatedAt
        }));
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
          <select 
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            style={{
              padding: '10px 10px 10px 36px',
              borderRadius: RADIUS.md,
              border: `1px solid ${COLORS.NEUTRAL_BORDER}`,
              outline: 'none',
              backgroundColor: 'white',
              minWidth: '180px',
              cursor: 'pointer'
            }}
          >
            <option value="all">Tất cả vai trò</option>
            <option value="admin">Quản trị viên</option>
            <option value="manager">Quản lý</option>
            <option value="teacher">Giáo viên</option>
            <option value="staff">Nhân viên</option>
            <option value="student">Học viên</option>
          </select>
        </Box>
      </Box>

      {/* 3. Data Table Section */}
      <Box bg="BACKGROUND_PAPER" overflow="hidden" css={{ 
        boxShadow: SHADOWS.sm,
        borderRadius: RADIUS.lg,
        border: `1px solid ${COLORS.NEUTRAL_BORDER}`
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${COLORS.NEUTRAL_BORDER}`, backgroundColor: COLORS.NEUTRAL_LIGHT }}>
              <th style={{ padding: SPACING.md, textAlign: 'left' }}><Text weight="semibold" size="sm">Người dùng</Text></th>
              <th style={{ padding: SPACING.md, textAlign: 'left' }}><Text weight="semibold" size="sm">Vai trò</Text></th>
              <th style={{ padding: SPACING.md, textAlign: 'left' }}><Text weight="semibold" size="sm">Trạng thái</Text></th>
              <th style={{ padding: SPACING.md, textAlign: 'left' }}><Text weight="semibold" size="sm">Hoạt động cuối</Text></th>
              <th style={{ padding: SPACING.md, textAlign: 'right' }}></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={5} style={{ padding: SPACING.xl, textAlign: 'center' }}><Text color="SECONDARY">Đang tải dữ liệu...</Text></td></tr>
            ) : paginatedUsers.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: SPACING.xl, textAlign: 'center' }}><Text color="SECONDARY">Không tìm thấy người dùng nào.</Text></td></tr>
            ) : (
              paginatedUsers.map(user => (
                <tr 
                  key={user.id} 
                  style={{ borderBottom: `1px solid ${COLORS.NEUTRAL_LIGHT}`, cursor: 'pointer', transition: 'background 0.2s' }}
                  onClick={() => navigate(`/users/${user.id}`)}
                  onMouseEnter={(e) => e.currentTarget.style.background = COLORS.NEUTRAL_LIGHT}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: SPACING.md }}>
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
                  </td>
                  <td style={{ padding: SPACING.md }}>
                    <Badge color={getRoleBadgeColor(user.role)} icon={<Shield size={12}/>}>{user.role.toUpperCase()}</Badge>
                  </td>
                  <td style={{ padding: SPACING.md }}>
                    <Box display="flex" alignItems="center" gap="xs">
                      <Icon size="xs" color={user.status === 'active' ? 'SUCCESS' : 'SECONDARY'}>
                        {user.status === 'active' ? <CheckCircle /> : <XCircle />}
                      </Icon>
                      <Text size="sm">{user.status === 'active' ? 'Hoạt động' : 'Vô hiệu'}</Text>
                    </Box>
                  </td>
                  <td style={{ padding: SPACING.md }}>
                    <Text size="sm" color="SECONDARY">{user.lastActive ? new Date(user.lastActive).toLocaleDateString('vi-VN') : '-'}</Text>
                  </td>
                  <td style={{ padding: SPACING.md, textAlign: 'right' }}>
                    <Box display="flex" justifyContent="flex-end" gap="xs">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={(e) => { e.stopPropagation(); handleDeleteUser(user.id, user.displayName); }}
                        title="Vô hiệu hóa"
                        sx={{ color: COLORS.DANGER, '&:hover': { backgroundColor: COLORS.DANGER_LIGHT } }}
                      >
                        <Icon size="sm"><Trash2 /></Icon>
                      </Button>
                    </Box>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Box>

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
