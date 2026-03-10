/** @jsxImportSource @emotion/react */
import { Box, Button, Input } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { Save } from 'lucide-react';

interface UserInfoFormProps {
  displayName: string;
  phone: string;
  email: string;
  isSaving: boolean;
  onDisplayNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onSave: () => void;
}

export const UserInfoForm = ({
  displayName,
  phone,
  email,
  isSaving,
  onDisplayNameChange,
  onPhoneChange,
  onSave,
}: UserInfoFormProps) => {
  return (
    <Box display="flex" flexDirection="column" gap="md">
      <Input
        label="Họ và tên"
        value={displayName}
        onChange={(e) => onDisplayNameChange(e.target.value)}
      />
      <Input
        label="Số điện thoại"
        value={phone}
        onChange={(e) => onPhoneChange(e.target.value)}
      />
      <Input label="Email" value={email} disabled />
      <Box mt="md">
        <Button onClick={onSave} isLoading={isSaving} leftIcon={<Save size={18} />}>
          Lưu thay đổi
        </Button>
      </Box>
    </Box>
  );
};