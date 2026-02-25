/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { 
  Users, 
  Activity,
  Clock
} from 'lucide-react';
import { Box, Text, Icon, Button } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { COLORS, SPACING, SHADOWS } from '@/04-frameworks-and-drivers/ui/web/01-ui-core/constants/tokens-constants';
import { useI18n } from '@/shared/i18n/useI18n';

interface DashboardOngoingClassesProps {
  classes: any[];
}

export const DashboardOngoingClasses = ({ classes }: DashboardOngoingClassesProps) => {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="md">
        <Text as="h3" size="lg" weight="bold">{t('dashboard.ongoing_classes')}</Text>
        <Button variant="ghost" size="sm" onClick={() => navigate('/classes')}>{t('common.view_all')}</Button>
      </Box>
      
      <Box 
        css={css`
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: ${SPACING.md};
        `}
      >
        {classes.map((cls: any) => (
          <Box 
            key={cls.id}
            p="md" 
            bg="BACKGROUND_PAPER"
            border="1px solid" 
            borderColor="NEUTRAL_BORDER" 
            borderRadius="md"
            onClick={() => navigate(`/classes/${cls.id}`)}
            css={css`
              cursor: pointer; 
              transition: all 0.2s;
              &:hover { 
                border-color: ${COLORS.PRIMARY};
                box-shadow: ${SHADOWS.md};
              }
            `}
          >
            <Box display="flex" justifyContent="space-between" mb="sm">
              <Text weight="bold" size="md">{cls.name}</Text>
              <Icon size="sm" color="SUCCESS"><Activity /></Icon>
            </Box>
            
            <Box display="flex" flexDirection="column" gap="xs" mb="md">
              <Box display="flex" gap="xs" alignItems="center"><Icon size="xs" color="SECONDARY"><Users /></Icon><Text size="sm" color="SECONDARY">{cls.students} {t('dashboard.students_count')}</Text></Box>
              <Box display="flex" gap="xs" alignItems="center"><Icon size="xs" color="SECONDARY"><Clock /></Icon><Text size="sm" color="SECONDARY">{cls.time}</Text></Box>
            </Box>

            <Button size="sm" variant="primary" fullWidth onClick={(e) => { e.stopPropagation(); navigate(`/classes/${cls.id}`); }}>
              {t('dashboard.check_in_now')}
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};