import { useState } from 'react';
import { ConfirmDialog } from './ConfirmDialog';
import { Box } from '../../../atoms/Box/Box';
import { Button } from '../../../atoms/Button';
import { Text } from '../../../atoms/Text/Text';
import type { ConfirmDialogVariant } from './ConfirmDialog.types';

export const ConfirmDialogPlayground = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [variant, setVariant] = useState<ConfirmDialogVariant>('danger');
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = (v: ConfirmDialogVariant) => {
    setVariant(v);
    setIsOpen(true);
  };

  const handleConfirm = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsOpen(false);
      alert('Confirmed!');
    }, 1000);
  };

  return (
    <Box p="lg">
      <Text as="h2" variant="heading-2xl" sx={{ mb: '24px' }}>
        🛑 ConfirmDialog Demo
      </Text>

      <Box display="flex" gap="md" flexWrap="wrap">
        <Button 
          variant="primary"
          intent="danger" 
          onClick={() => handleOpen('danger')}
        >
          Delete Action
        </Button>

        <Button 
          variant="primary"
          intent="warning" 
          onClick={() => handleOpen('warning')}
        >
          Warning Action
        </Button>

        <Button 
          variant="primary"
          intent="success" 
          onClick={() => handleOpen('success')}
        >
          Success Action
        </Button>

        <Button 
          variant="primary"
          intent="default" 
          onClick={() => handleOpen('info')}
        >
          Info Action
        </Button>
      </Box>

      <ConfirmDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirm}
        title={variant === 'danger' ? 'Delete Account' : 'Confirm Action'}
        description={
          variant === 'danger' 
            ? 'Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.' 
            : 'Please confirm that you want to proceed with this action.'
        }
        confirmText={variant === 'danger' ? 'Delete' : 'Confirm'}
        variant={variant}
        isLoading={isLoading}
      />
    </Box>
  );
};