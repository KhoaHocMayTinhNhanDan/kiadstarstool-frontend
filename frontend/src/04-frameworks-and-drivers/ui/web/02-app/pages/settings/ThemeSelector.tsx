// 02-app/pages/settings/ThemeSelector.tsx
import { useTheme } from '../../../01-ui-core/hooks/useTheme';
import { useMode } from '../../../01-ui-core/hooks/useLightDarkMode';
import { availableThemes } from '../../../01-ui-core/themes/themes';
import { Button } from '../../../00-design-system/00-atoms/Button';
import { Card } from '../../../00-design-system/00-atoms/Card';
import { Box, Text } from '../../../00-design-system/00-atoms';

export const ThemeSelector = () => {
  const { currentTheme, theme, setTheme } = useTheme();
  const { mode, toggleMode } = useMode();

  return (
    <Box display="flex" flexDirection="column" gap="xl" maxWidth="900px" mx="auto">
      <Text as="h1" variant="heading-xl" weight="bold">Cài đặt giao diện</Text>
      
      {/* Mode Toggle */}
      <Card >
        <Text as="h3" variant="heading-md" weight="semibold" mb="md">Chế độ</Text>
        <Button onClick={toggleMode} variant="outline">
          {mode.id === 'light' ? '🌞 Chế độ Sáng' : '🌙 Chế độ Tối'}
        </Button>
      </Card>

      {/* Theme Selection */}
      <Card>
        <Text as="h3" variant="heading-md" weight="semibold" mb="md">Phong cách</Text>
        <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap="lg">
          {availableThemes.map(meta => (
            <Card
              key={meta.id}
              onClick={() => setTheme(meta.id)}
      
           
              sx={{
                cursor: 'pointer',
                border: currentTheme === meta.id 
                  ? `2px solid ${theme.colors?.primary || mode.colors.text.primary}` 
                  : `1px solid ${mode.colors.border.default}`,
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 'lg',
                }
              }}
            >
              <Text>{meta.icon}</Text>
              <Text as="h4" weight="bold" mb="xs">{meta.name}</Text>
              <Text size="sm" color="secondary">{meta.description}</Text>
            </Card>
          ))}
        </Box>
      </Card>

      {/* Preview */}
      <Card>
        <Text as="h3" variant="heading-md" weight="semibold" mb="md">Xem trước</Text>
        <div style={{
          padding: '24px',
          backgroundColor: mode.colors.surface.primary,
          borderRadius: theme.layout.cards.borderRadius,
          border: `1px solid ${mode.colors.border.default}`,
        }}>
          <p style={{ color: mode.colors.text.primary }}>Text primary</p>
          <p style={{ color: mode.colors.text.secondary, marginBottom: '16px' }}>Text secondary</p>
          <Button variant="primary">Button mẫu</Button>
        </div>
      </Card>
    </Box>
  );
};