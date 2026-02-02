// src/04-frameworks-and-drivers/ui/web/components/organisms/data/DataTable/DataTable.organism-playground.tsx
import { useState } from 'react';
import { DataTable } from './DataTable.organism';
import { Box, Chip, Text, Button } from '../../../atoms';
import {type Column} from './DataTable.types';


interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Editor';
  status: 'Active' | 'Inactive';
}

const MOCK_DATA: User[] = [
  { id: 1, name: 'Nguyễn Văn A', email: 'vana@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Trần Thị B', email: 'thib@example.com', role: 'User', status: 'Inactive' },
  { id: 3, name: 'Lê Văn C', email: 'vanc@example.com', role: 'Editor', status: 'Active' },
  { id: 4, name: 'Phạm Thị D', email: 'thid@example.com', role: 'User', status: 'Active' },
  { id: 5, name: 'Hoàng Văn E', email: 'vane@example.com', role: 'User', status: 'Inactive' },
];

export const DataTablePlayground = () => {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const columns: Column<User>[] = [
    { 
      key: 'id', 
      header: 'ID', 
      width: 60,
      align: 'center'
    },
    { 
      key: 'name', 
      header: 'Họ và tên',
      render: (user) => (
        <Box>
          <Text weight="medium">{user.name}</Text>
          <Text size="xs" color="SECONDARY">{user.email}</Text>
        </Box>
      )
    },
    { 
      key: 'role', 
      header: 'Vai trò',
      width: 120
    },
    { 
      key: 'status', 
      header: 'Trạng thái',
      width: 120,
      render: (user) => (
        <Chip 
          label={user.status} 
          color={user.status === 'Active' ? 'success' : 'neutral'} 
          variant="ghost"
        />
      )
    },
    {
      key: 'actions',
      header: '',
      width: 100,
      align: 'right',
      render: (user) => (
        <Button size="sm" variant="ghost" onClick={(e) => {
          e.stopPropagation();
          alert(`Edit user ${user.name}`);
        }}>
          Sửa
        </Button>
      )
    }
  ];

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    setCurrentPage(page);
    // Giả lập loading API
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <Box p="4xl" bg="LIGHT" minH="100vh">
      <Box mb="2xl">
        <Text as="h1" size="3xl" weight="bold">📊 DataTable Playground</Text>
      </Box>

      <DataTable
        data={MOCK_DATA}
        columns={columns}
        keyExtractor={(item) => item.id}
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={5}
        onPageChange={handlePageChange}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        onRowClick={(item) => console.log('Row clicked:', item)}
      />

      <Box mt="xl">
        <Text size="sm">Selected IDs: {JSON.stringify(selectedIds)}</Text>
      </Box>
    </Box>
  );
};