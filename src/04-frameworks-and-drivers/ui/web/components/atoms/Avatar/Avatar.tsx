// src/04-frameworks-and-drivers/ui/web/components/atoms/Avatar/Avatar.tsx
import React, { forwardRef, useState } from 'react';
import {
  AvatarContainer,
  AvatarImage,
  AvatarFallback,
  StatusIndicator,
  AvatarGroupContainer,
  RemainingCount,
} from './Avatar.css';
import type { AvatarProps, AvatarGroupProps, AvatarSize } from './Avatar.types';

// Type guard để kiểm tra string fallback
const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = 'Avatar',
      size = 'md',
      variant = 'circle',
      status = 'none',
      fallback,
      border = false,
      borderColor,
      className,
      style,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const [imgError, setImgError] = useState(false);
    const hasImage = src && !imgError;
    const isClickable = !!onClick;

    // Generate initials from alt text or children
    const getInitials = (): string => {
      // Check if fallback is a string
      if (isString(fallback) && fallback) {
        return fallback.substring(0, 2).toUpperCase();
      }
      
      // Check if children is a string
      if (isString(children) && children) {
        return children.substring(0, 2).toUpperCase();
      }
      
      // Use alt text
      if (isString(alt) && alt) {
        const words = alt.trim().split(/\s+/);
        if (words.length >= 2) {
          const firstChar = words[0]?.[0] || '';
          const secondChar = words[1]?.[0] || '';
          return (firstChar + secondChar).toUpperCase();
        }
        if (words.length === 1 && words[0]) {
          return words[0].substring(0, 2).toUpperCase();
        }
      }
      
      return 'US';
    };

    // Font size based on avatar size - SỬA LỖI Ở ĐÂY
    const getFontSize = (): number => {
      const sizeMap: { [key in AvatarSize]: number } = { 
        xs: 10, 
        sm: 12, 
        md: 14, 
        lg: 16, 
        xl: 18, 
        xxl: 20 
      };
      return sizeMap[size];
    };

    const handleImageError = () => {
      setImgError(true);
    };

    return (
      <AvatarContainer
        ref={ref}
        $size={size}
        $variant={variant}
        $border={border}
        $borderColor={borderColor}
        $clickable={isClickable}
        className={`avatar ${className || ''}`}
        style={style}
        onClick={onClick}
        role={isClickable ? 'button' : 'img'}
        aria-label={alt}
        {...props}
      >
        {hasImage ? (
          <AvatarImage
            src={src}
            alt={alt}
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <AvatarFallback style={{ fontSize: getFontSize() }}>
            {fallback || getInitials()}
          </AvatarFallback>
        )}
        
        <StatusIndicator $status={status} $size={size} />
      </AvatarContainer>
    );
  }
);

Avatar.displayName = 'Avatar';

// Avatar Group Component
export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  max = 5,
  size = 'md',
  spacing = 8,
  className,
}) => {
  const childrenArray = React.Children.toArray(children);
  const totalAvatars = childrenArray.length;
  const avatarsToShow = max ? childrenArray.slice(0, max) : childrenArray;
  const remainingCount = max ? Math.max(0, totalAvatars - max) : 0;

  return (
    <AvatarGroupContainer
      $spacing={spacing}
      className={`avatar-group ${className || ''}`}
      aria-label={`Group of ${totalAvatars} avatars`}
    >
      {avatarsToShow.map((child, index) => {
        // SỬA LỖI Ở ĐÂY: Kiểm tra và xử lý an toàn
        if (React.isValidElement<AvatarProps>(child)) {
          // Lấy style hiện tại
          const currentStyle = child.props.style || {};
          
          // Clone element với các props mới
          return React.cloneElement(child, {
            ...child.props,
            size, // Override size
            key: child.key || `avatar-group-${index}`,
            style: {
              ...currentStyle,
              zIndex: avatarsToShow.length - index,
            },
          });
        }
        return child;
      })}
      
      {remainingCount > 0 && (
        <RemainingCount
          $size={size}
          title={`${remainingCount} more`}
          aria-label={`${remainingCount} more avatars`}
        >
          +{remainingCount}
        </RemainingCount>
      )}
    </AvatarGroupContainer>
  );
};

AvatarGroup.displayName = 'AvatarGroup';