import { useState } from 'react';
import { Box } from '../../atoms/Box';
import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Text';
import { Modal } from './Modal.molecule';
import * as DialogPrimitive from '@radix-ui/react-dialog';

export const ModalTest = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box p="24px">
      <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: 24 }}>
        🪟 Modal Demo
      </Text>

      <Box display="flex" gap="16px" flexWrap="wrap">
        {/* Basic Modal */}
        <Modal 
          trigger={<Button>Open Modal</Button>}
          title="Edit Profile"
          description="Make changes to your profile here. Click save when you're done."
        >
          <Box display="flex" flexDirection="column" gap="16px">
            <Text>Modal content goes here...</Text>
            <Box display="flex" justifyContent="flex-end" gap="12px" mt="16px">
              <DialogPrimitive.Close asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogPrimitive.Close>
              <Button>Save Changes</Button>
            </Box>
          </Box>
        </Modal>

        {/* Controlled Modal */}
        <Box>
          <Button variant="outline" onClick={() => setOpen(true)}>Controlled Modal</Button>
          <Modal 
            open={open} 
            onOpenChange={setOpen}
            title="Delete Account"
            description="Are you sure you want to delete your account? This action cannot be undone."
          >
            <Box display="flex" justifyContent="flex-end" gap="12px" mt="24px">
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={() => setOpen(false)}>Yes, Delete</Button>
            </Box>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
};