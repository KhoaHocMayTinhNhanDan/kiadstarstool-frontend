/** @jsxImportSource @emotion/react */
import { useState, useRef, useCallback } from 'react';
import { Box, Button, Input, Text, Checkbox, Icon, Select } from '../../../atoms';
import { FormField } from '../../../molecules/FormField';
import { SearchInput } from '../../../molecules/SearchInput';
import * as styles from './AdvancedFilter.form.styles';
import type {
  AdvancedFilterProps,
  FilterField,
  FilterValue,
} from './AdvancedFilter.form.types';

/* ================= Icons ================= */
const FilterIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
  </svg>
);

/* ================= Helpers ================= */
const buildInitialValues = (
  fields: FilterField[]
): Record<string, FilterValue> => {
  const values: Record<string, FilterValue> = {};
  fields.forEach((f) => {
    values[f.id] =
      f.defaultValue ??
      (f.type === 'checkbox' ? false : undefined);
  });
  return values;
};

/* ================= Component ================= */
export const AdvancedFilter = ({
  fields,
  onFilter,
  onValuesChange,
  onReset,
  isLoading = false,
  className,
  sx,
}: AdvancedFilterProps) => {
  const [values, setValues] = useState<Record<string, FilterValue>>(
    () => buildInitialValues(fields)
  );

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ===== Change handler ===== */
  const updateValues = useCallback(
    (field: FilterField, value: FilterValue) => {
      if (isLoading) return;

      setValues((prev) => {
        const next = { ...prev, [field.id]: value };

        // 🔹 UI realtime
        onValuesChange?.(next);

        // 🔹 Business logic
        if (field.type === 'text') {
          if (debounceRef.current) clearTimeout(debounceRef.current);

          debounceRef.current = setTimeout(() => {
            onFilter(next);
          }, 300);
        } else {
          onFilter(next);
        }

        return next;
      });
    },
    [isLoading, onFilter, onValuesChange]
  );

  /* ===== Submit (Apply) ===== */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(values);
  };

  /* ===== Reset ===== */
  const handleReset = () => {
    const next = buildInitialValues(fields);
    setValues(next);
    onValuesChange?.(next);
    onFilter(next);
    onReset?.();
  };

  return (
    <Box
      as="form"
      css={[styles.container, sx]}
      className={className}
      onSubmit={handleSubmit}
    >
      {/* ===== Header ===== */}
      <Box display="flex" alignItems="center" gap="sm">
        <Icon size="md">{FilterIcon}</Icon>
        <Text weight="semibold" size="lg">
          Bộ lọc tìm kiếm
        </Text>
      </Box>

      {/* ===== Fields ===== */}
      <div css={styles.grid}>
        {fields.map((field) => {
          if (field.type === 'checkbox') {
            return (
              <Box
                key={field.id}
                display="flex"
                alignItems="center"
                gap="sm"
                sx={styles.gridItem(field.type)}
              >
                <Checkbox
                  id={field.id}
                  checked={Boolean(values[field.id])}
                  disabled={isLoading}
                  onCheckedChange={(checked) =>
                    updateValues(field, checked)
                  }
                />
                <Text as="label" htmlFor={field.id} size="sm">
                  {field.placeholder || field.label}
                </Text>
              </Box>
            );
          }

          return (
            <FormField
              key={field.id}
              label={field.label}
              id={field.id}
              disabled={isLoading}
              sx={styles.gridItem(field.type)}
            >
              {field.type === 'text' && (
                <SearchInput
                  value={(values[field.id] as string) ?? ''}
                  placeholder={field.placeholder}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateValues(field, e.target.value)
                  }
                />
              )}

              {field.type === 'select' && (
                <Select
                  value={(values[field.id] as string | number) ?? ''}
                  options={field.options || []}
                  placeholder="Tất cả"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    updateValues(field, e.target.value)
                  }
                />
              )}

              {field.type === 'date' && (
                <Input
                  type="date"
                  value={(values[field.id] as string) ?? ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateValues(field, e.target.value)
                  }
                />
              )}
            </FormField>
          );
        })}
      </div>

      {/* ===== Actions ===== */}
      <div css={styles.actions}>
        <Button
          type="button"
          variant="ghost"
          onClick={handleReset}
          disabled={isLoading}
        >
          Đặt lại
        </Button>

        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
        >
          Áp dụng
        </Button>
      </div>
    </Box>
  );
};

export default AdvancedFilter;
