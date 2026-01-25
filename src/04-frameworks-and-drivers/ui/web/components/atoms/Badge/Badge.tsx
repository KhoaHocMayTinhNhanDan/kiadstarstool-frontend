/** @jsxImportSource @emotion/react */
import React from 'react';
import { getBadgeStyles, getBadgeWrapperStyles, getBadgePositionStyles } from './Badge.styles';

export type BadgeVariant = 'filled' | 'outline';
export type BadgeColor = 'primary' | 'success' | 'danger' | 'warning' | 'neutral';
export type BadgePosition = 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';

export interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'content'> {
  content?: React.ReactNode;
  variant?: BadgeVariant;
  color?: BadgeColor;
  dot?: boolean;
  max?: number;
  
  // Wrapper props
  children?: React.ReactNode;
  position?: BadgePosition;
  invisible?: boolean;
}

export const Badge = ({ 
  content, 
  variant = 'filled', 
  color = 'danger', 
  dot = false, 
  max = 99,
  children,
  position = 'top-right',
  invisible = false,
  className,
  ...props 
}: BadgeProps) => {
  
  // Logic hiển thị số lượng (99+)
  const displayContent = React.useMemo(() => {
    if (dot) return null;
    if (typeof content === 'number' && content > max) {
      return `${max}+`;
    }
    return content;
  }, [content, dot, max]);

  const badgeElement = !invisible && (content !== 0 || dot) ? (
    <span 
      css={[
        getBadgeStyles(variant, color, dot),
        children ? getBadgePositionStyles(position) : undefined // Chỉ position absolute nếu có children
      ]}
      className={className}
      {...props}
    >
      {displayContent}
    </span>
  ) : null;

  // Nếu có children, bọc trong wrapper để định vị badge
  if (children) {
    return (
      <span css={getBadgeWrapperStyles()}>
        {children}
        {badgeElement}
      </span>
    );
  }

  // Nếu đứng một mình
  return badgeElement;
};