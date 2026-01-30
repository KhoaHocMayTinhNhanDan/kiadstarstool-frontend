import { Box } from '../../atoms/Box';
import { Text } from '../../atoms/Text';
import { Input } from '../../atoms/Input';
import { FormField } from './FormField.molecule';

export const FormFieldPlayground = () => {
  return (
    <Box p="lg" style={{ fontFamily: 'system-ui' }}>
      <Box mb="3xl">
        <Text as="h2" size="2xl" weight="bold">
          📝 FormField – Playground
        </Text>
      </Box>

      <Box display="flex" flexDirection="column" gap="3xl" maxW="420px">
        
        <section>
          <Box mb="lg">
            <Text as="h3" weight="semibold">
              Basic usage
            </Text>
          </Box>

          <FormField label="Username" id="username" required>
            <Input id="username" placeholder="Enter username" />
          </FormField>
        </section>

        <section>
          <Box mb="lg">
            <Text as="h3" weight="semibold">
              Error state
            </Text>
          </Box>

          <FormField
            label="Email"
            id="email"
            required
            error="Invalid email address"
          >
            <Input
              id="email"
              defaultValue="invalid-email"
              error
              aria-invalid
            />
          </FormField>
        </section>

        <section>
          <Box mb="lg">
            <Text as="h3" weight="semibold">
              Helper text
            </Text>
          </Box>

          <FormField
            label="Bio"
            id="bio"
            helperText="Write a short introduction about yourself."
          >
            <Input id="bio" placeholder="Tell us about yourself" />
          </FormField>
        </section>

        <section>
          <Box mb="lg">
            <Text as="h3" weight="semibold">
              Disabled & Readonly
            </Text>
          </Box>

          <FormField label="Website" id="website" disabled>
            <Input
              id="website"
              placeholder="https://example.com"
              disabled
            />
          </FormField>

          <Box mt="lg">
            <FormField
              label="User ID"
              id="user-id"
              helperText="This value cannot be changed"
            >
              <Input id="user-id" value="USR_001239" readOnly />
            </FormField>
          </Box>
        </section>

        <section>
          <Box mb="lg">
            <Text as="h3" weight="semibold">
              No label
            </Text>
          </Box>

          <FormField helperText="This field has no label but still valid">
            <Input placeholder="No label field" />
          </FormField>
        </section>

        <section>
          <Box mb="lg">
            <Text as="h3" weight="semibold">
              Real-world form section
            </Text>
          </Box>

          <Box
            p="lg"
            border="1px solid #e2e8f0"
            radius="md"
            display="flex"
            flexDirection="column"
            gap="md"
          >
            <FormField label="Full name" id="full-name" required>
              <Input id="full-name" placeholder="John Doe" />
            </FormField>

            <FormField
              label="Email address"
              id="email-real"
              helperText="We’ll never share your email."
            >
              <Input id="email-real" placeholder="john@example.com" />
            </FormField>

            <FormField
              label="Password"
              id="password"
              error="Password must be at least 8 characters"
            >
              <Input id="password" type="password" error />
            </FormField>
          </Box>
        </section>

      </Box>
    </Box>
  );
};
