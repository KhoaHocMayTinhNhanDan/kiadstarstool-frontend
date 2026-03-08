/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { Select } from './Select';
import { Box } from '../Box/Box';

export const SelectPlayground = () => {
  const [value, setValue] = useState('');

  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3 (Disabled)', value: '3', disabled: true },
  ];

  return (
    <Box p="md" display="flex" flexDirection="column" gap="md">
      <Select
        label="Basic Select"
        options={options}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Choose an option"
      />
      
      <Select
        label="Error Select"
        options={options}
        error="This field is required"
        value=""
        onChange={() => {}}
      />
    </Box>
  );
};