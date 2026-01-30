import { useState } from 'react';
import { Modal } from './Modal';
import { Box } from '../../atoms/Box/Box';
import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Text/Text';
import { Input } from '../../atoms/Input';
import { FormField } from '../../molecules/FormField';
import type { ModalSize } from './Modal.types';

export const ModalPlayground = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [size, setSize] = useState<ModalSize>('md');
  const [hasFooter, setHasFooter] = useState(true);

  const handleOpen = (s: ModalSize, footer: boolean = true) => {
    setSize(s);
    setHasFooter(footer);
    setIsOpen(true);
  };

  return (
    <Box p="lg">
      <Text as="h2" variant="heading-2xl" sx={{ mb: '24px' }}>
        🪟 Modal Demo
      </Text>

      <Box display="flex" gap="md" flexWrap="wrap">
        <Button onClick={() => handleOpen('sm')}>Small Modal</Button>
        <Button onClick={() => handleOpen('md')}>Medium Modal</Button>
        <Button onClick={() => handleOpen('lg')}>Large Modal</Button>
        <Button onClick={() => handleOpen('md', false)}>No Footer</Button>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit Profile"
        size={size}
        footer={
          hasFooter ? (
            <>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>Save Changes</Button>
            </>
          ) : undefined
        }
      >
        <Box display="flex" flexDirection="column" gap="lg">
          <Text color="SECONDARY">
            Make changes to your profile here. Click save when you're done.
          </Text>

          <Box display="grid" gap="md">
            <FormField label="Name" required>
              <Input placeholder="Pedro Duarte" defaultValue="Pedro Duarte" />
            </FormField>
            <FormField label="Username" required>
              <Input placeholder="@peduarte" defaultValue="@peduarte" />
            </FormField>
          </Box>

          {size === 'lg' && (
            <Box p="md" bg="LIGHT" radius="md">
              <Text weight="semibold">Additional Info (Large Modal)</Text>
              <Text size="sm" color="SECONDARY">
                This content is only visible in the large modal variant to demonstrate
                how the modal handles more content. The body area will scroll if the
                content exceeds the maximum height.
              </Text>
              <Box h="200px" mt="md" bg="WHITE" border="1px dashed #ccc" display="flex" alignItems="center" justifyContent="center">
                Placeholder Content
              </Box>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};