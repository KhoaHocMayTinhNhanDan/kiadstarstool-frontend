// src/04-frameworks-and-drivers/ui/web/components/02-organisms/settings/SettingsForm/SettingsForm.organism-playground.tsx
/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { SettingsForm } from './SettingsForm.organism';
import { Box, Text, Code } from '../../../00-atoms';

export const SettingsFormPlayground = () => {
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async (values: any) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormData(values);
    setLoading(false);
  };

  return (
    <Box p="xl" display="flex" flexDirection="column" gap="xl">
      <Text as="h1" variant="heading-2xl" weight="bold">
        ⚙️ SettingsForm Demo
      </Text>

      <Box>
        <SettingsForm
          isLoading={loading}
          onSave={handleSave}
          onCancel={() => console.log('Cancelled')}
          initialValues={{
            siteName: 'My Awesome App',
            theme: 'light',
            notifications: true
          }}
          sections={[
            {
              id: 'general',
              title: 'General Settings',
              description: 'Basic configuration for your application.',
              fields: [
                {
                  id: 'siteName',
                  label: 'Site Name',
                  type: 'text',
                  required: true,
                  description: 'The name that appears in the browser tab.'
                },
                {
                  id: 'description',
                  label: 'Description',
                  type: 'textarea',
                  placeholder: 'Enter site description...'
                }
              ]
            },
            {
              id: 'preferences',
              title: 'Preferences',
              description: 'Customize your experience.',
              fields: [
                {
                  id: 'theme',
                  label: 'Theme',
                  type: 'select',
                  options: [
                    { label: 'Light', value: 'light' },
                    { label: 'Dark', value: 'dark' },
                    { label: 'System', value: 'system' }
                  ]
                },
                {
                  id: 'notifications',
                  label: 'Enable Notifications',
                  type: 'switch',
                  description: 'Receive email updates about activity.'
                }
              ]
            }
          ]}
        />
      </Box>

      {formData && (
        <Box mt="lg" p="md" bg="NEUTRAL_LIGHT" radius="md">
          <Text weight="bold" >Saved Data:</Text>
          <Code block>{JSON.stringify(formData, null, 2)}</Code>
        </Box>
      )}
    </Box>
  );
};