import { Box } from '../../atoms/Box';
import { Text } from '../../atoms/Text';
import { Input } from '../../atoms/Input';
import { FormField } from './FormField.molecule';

export const FormFieldTest = () => {
  return (
    <Box p="24px">
      <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: 24 }}>
        📝 FormField Demo
      </Text>

      <Box display="flex" flexDirection="column" gap="24px" maxW="400px">
        <FormField label="Username" id="username" required>
          <Input id="username" placeholder="Enter username" />
        </FormField>
        
        <FormField label="Email" id="email" error="Invalid email address" required>
          <Input id="email" defaultValue="invalid-email" error />
        </FormField>

        <FormField label="Bio" id="bio" helperText="Write a short introduction about yourself.">
          <Input id="bio" placeholder="Tell us about yourself" />
        </FormField>

        <FormField label="Website" id="website" disabled>
           <Input id="website" placeholder="https://example.com" disabled />
        </FormField>

        <FormField helperText="This field has no label but has helper text">
           <Input placeholder="No label field" />
        </FormField>
      </Box>
    </Box>
  );
};