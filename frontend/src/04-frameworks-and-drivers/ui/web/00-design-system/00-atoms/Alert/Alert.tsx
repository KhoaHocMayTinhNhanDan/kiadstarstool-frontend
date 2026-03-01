/** @jsxImportSource @emotion/react */
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';
import { Box } from '../Box';
import { Text } from '../Text';
import { Icon } from '../Icon';
import type { AlertProps } from './Alert.types';
import { getAlertStyles, STATUS_CONFIG } from './Alert.styles';

const ICONS = {
  info: Info,
  success: CheckCircle,
  warning: AlertCircle,
  error: XCircle,
};

export const Alert = ({
  status = 'info',
  title,
  description,
  icon,
  isClosable,
  onClose,
  children,
  ...rest
}: AlertProps) => {
  const { iconColor } = STATUS_CONFIG[status];
  const DefaultIcon = ICONS[status];

  return (
    <Box
      role="alert"
      p="md"
      borderRadius="md"
      display="flex"
      gap="md"
      alignItems="flex-start"
      css={getAlertStyles(status)}
      {...rest}
    >
      {/* Icon Section */}
      <Box color={iconColor} pt="2px">
        <Icon size="md">
          {icon || <DefaultIcon />}
        </Icon>
      </Box>

      {/* Content Section */}
      <Box flex={1}>
        {title && (
          <Text weight="bold" mb={(description || children) ? 'xs' : undefined} color={iconColor}>
            {title}
          </Text>
        )}
        {(description || children) && (
          <Box color={iconColor} sx={{ opacity: 0.9 }}>
             {description && <Text size="sm">{description}</Text>}
             {children}
          </Box>
        )}
      </Box>

      {/* Close Button Section */}
      {isClosable && (
        <Box 
          as="button"
          onClick={onClose} 
          color={iconColor}
          bg="transparent"
          border="none"
          p="xs"
          sx={{ cursor: 'pointer', opacity: 0.7, '&:hover': { opacity: 1 }, lineHeight: 0 }}
          aria-label="Close alert"
        >
           <Icon size="sm"><X /></Icon>
        </Box>
      )}
    </Box>
  );
};