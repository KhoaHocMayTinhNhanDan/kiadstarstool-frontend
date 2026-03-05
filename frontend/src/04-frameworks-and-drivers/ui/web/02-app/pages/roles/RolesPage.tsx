/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { Box, Text, Button, Checkbox, Icon, Card } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { useToast } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/hooks/useToast';
import {
  ROLES,
  ROLE_PRESETS,
  PERMISSION_GROUPS,
  getRoleLabel,
  getPermissionLabel,
  type RoleCode,
  type PermissionCode,
  PERMISSIONS,
} from '@/shared/constants/authorization';
import { Save, Shield } from 'lucide-react';

export const RolesPage = () => {
  const { toast } = useToast();
  const [policies, setPolicies] = useState<Record<RoleCode, PermissionCode[]>>(ROLE_PRESETS);
  const [isSaving, setIsSaving] = useState(false);

  const handlePermissionChange = (role: RoleCode, permission: PermissionCode, isChecked: boolean) => {
    setPolicies(prev => {
      const currentPermissions = prev[role] || [];
      let newPermissions: PermissionCode[];

      if (isChecked) {
        newPermissions = [...currentPermissions, permission];
      } else {
        newPermissions = currentPermissions.filter(p => p !== permission);
      }
      
      // Handle wildcard logic for UI feedback
      if (isChecked && permission === PERMISSIONS.ALL) {
        const allPermissionsInGroups = PERMISSION_GROUPS.flatMap(g => g.codes);
        newPermissions = [...new Set([...allPermissionsInGroups, PERMISSIONS.ALL])];
      }
      if (!isChecked && policies[role]?.includes(PERMISSIONS.ALL)) {
        // If unchecking anything while wildcard is active, assume intent is to remove wildcard
        newPermissions = newPermissions.filter(p => p !== PERMISSIONS.ALL);
      }

      return { ...prev, [role]: [...new Set(newPermissions)] };
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    // In a real application, this would call a controller/interactor
    // to save the updated policies to the database.
    console.log('Saving updated policies:', policies);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    toast.success('Cập nhật quyền cho các vai trò thành công!');
    setIsSaving(false);
  };

  return (
    <Box p="lg" display="flex" flexDirection="column" gap="lg">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Text as="h1" variant="heading-lg" weight="bold">Quản lý Vai trò & Quyền</Text>
          <Text color="SECONDARY">Chỉnh sửa các quyền mặc định cho từng vai trò trong hệ thống.</Text>
        </Box>
        <Button 
          variant="primary" 
          leftIcon={<Icon><Save /></Icon>}
          onClick={handleSave}
          isLoading={isSaving}
        >
          Lưu thay đổi
        </Button>
      </Box>

      <Box display="grid" gridTemplateColumns={{ base: '1fr', xl: '1fr 1fr' }} gap="lg">
        {Object.values(ROLES).map(role => (
          <Card key={role} p="lg">
            <Box display="flex" alignItems="center" gap="sm" mb="lg">
              <Icon color="PRIMARY"><Shield /></Icon>
              <Text variant="heading-md" weight="bold">{getRoleLabel(role)}</Text>
            </Box>

            <Box display="flex" flexDirection="column" gap="xl">
              {PERMISSION_GROUPS.map(group => (
                <Box key={group.name}>
                  <Text weight="semibold">{group.name}</Text>
                  <Text size="sm" color="SECONDARY" mb="md">{group.description}</Text>
                  <Box display="flex" flexDirection="column" gap="md">
                    {group.codes.map(code => {
                      const isAdminRole = role === ROLES.ADMIN;
                      const isChecked = policies[role]?.includes(code) || policies[role]?.includes(PERMISSIONS.ALL);

                      return (
                        <Box key={code} p="sm" bg="BACKGROUND_NEUTRAL" borderRadius="md" display="flex" alignItems="flex-start" gap="sm">
                          <Checkbox id={`perm-${role}-${code}`} checked={isChecked} disabled={isAdminRole} onCheckedChange={(checked) => handlePermissionChange(role, code, checked === true)} />
                          <Box>
                            <Text as="label" htmlFor={`perm-${role}-${code}`} weight="medium" size="sm" sx={{ cursor: isAdminRole ? 'not-allowed' : 'pointer' }}>{getPermissionLabel(code)}</Text>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              ))}
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
