/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { Box, Text, Divider, Code } from '../../../atoms';
import { AdvancedFilter } from './AdvancedFilter.form';
import type {
  FilterField,
  SavedFilter,
} from './AdvancedFilter.form.types';

/* ================= Mock fields ================= */
const filterFields: FilterField[] = [
  {
    id: 'keyword',
    label: 'Từ khóa',
    type: 'text',
    placeholder: 'Tìm theo tên, mã, mô tả...',
  },
  {
    id: 'status',
    label: 'Trạng thái',
    type: 'select',
    options: [
      { label: 'Đang hoạt động', value: 'active' },
      { label: 'Tạm ngưng', value: 'inactive' },
      { label: 'Đã xóa', value: 'deleted' },
    ],
  },
  {
    id: 'category',
    label: 'Danh mục',
    type: 'select',
    options: [
      { label: 'Điện tử', value: 'electronics' },
      { label: 'Thời trang', value: 'fashion' },
      { label: 'Gia dụng', value: 'home' },
    ],
  },
  {
    id: 'createdFrom',
    label: 'Tạo từ ngày',
    type: 'date',
  },
  {
    id: 'createdTo',
    label: 'Đến ngày',
    type: 'date',
  },
  {
    id: 'onlyMine',
    label: 'Chỉ dữ liệu của tôi',
    type: 'checkbox',
    defaultValue: false,
  },
];

/* ================= Mock saved filters ================= */
const savedFilters: SavedFilter[] = [
  {
    id: 'default',
    name: 'Tất cả dữ liệu',
    values: {},
  },
  {
    id: 'active-only',
    name: 'Đang hoạt động',
    values: {
      status: 'active',
    },
  },
  {
    id: 'my-active',
    name: 'Của tôi • Đang hoạt động',
    values: {
      status: 'active',
      onlyMine: true,
    },
  },
];

/* ================= Playground ================= */
export const AdvancedFilterPlayground = () => {
  const [values, setValues] = useState<Record<string, any>>({});

  return (
    <Box padding="xl" display="flex" flexDirection="column" gap="lg">
      {/* ===== Header ===== */}
      <Box>
        <Text size="xl" weight="bold">
          Advanced Filter – Playground
        </Text>
        <Text size="sm" color="neutral">
          Nhập tới đâu → thấy tới đó (product-ready)
        </Text>
      </Box>

      <Divider />

      {/* ===== Filter ===== */}
      <AdvancedFilter
        fields={filterFields}

        /** 👈 UI realtime */
        onValuesChange={(v) => {
          setValues(v);
        }}

        /** 👈 Business logic */
        onFilter={(v) => {
          console.log('[API CALL]', v);
        }}

        onReset={() => {
          setValues({});
          console.log('[AdvancedFilter] Reset');
        }}
      />

      {/* ===== Debug ===== */}
      <Box>
        <Text weight="semibold" size="md">
          Current filter values (realtime)
        </Text>

        <Code block>
          {JSON.stringify(values, null, 2)}
        </Code>
      </Box>
    </Box>
  );
};
