// src/04-frameworks-and-drivers/ui/web/components/atoms/Switch/Switch.tsx
import React, { useState, forwardRef, useCallback, useId } from 'react';
import { useI18n } from '@/shared/i18n';
import {
  SwitchWrapper,
  SwitchContainer,
  SwitchTrack,
  SwitchThumb,
  LabelWrapper,
  SwitchLabel,
  SwitchDescription,
  RequiredIndicator,
} from './Switch.styles';
import type { SwitchProps, SwitchGroupProps } from './Switch.types';
import {
  SWITCH_CONFIG,
  SWITCH_ICON_CONFIG,
} from './Switch.constants';

// ===== ICON COMPONENTS =====
interface IconProps {
  size?: number;
  color?: string;
}

const CheckIcon: React.FC<IconProps> = ({ size = 12, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox={SWITCH_ICON_CONFIG.check.viewBox}
    fill="none"
    stroke={color}
    strokeWidth={SWITCH_ICON_CONFIG.check.strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CrossIcon: React.FC<IconProps> = ({ size = 12, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox={SWITCH_ICON_CONFIG.cross.viewBox}
    fill="none"
    stroke={color}
    strokeWidth={SWITCH_ICON_CONFIG.cross.strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ===== MAIN SWITCH COMPONENT =====
export const Switch = forwardRef<HTMLDivElement, SwitchProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onChange,

      size = SWITCH_CONFIG.defaults.size,
      variant = SWITCH_CONFIG.defaults.variant,
      label,
      labelPosition = SWITCH_CONFIG.defaults.labelPosition,
      description,

      disabled = false,
      loading = false,
      readOnly = false,
      required = false,

      checkedColor,
      uncheckedColor,
      thumbColor,

      withIcons = false,
      checkedIcon,
      uncheckedIcon,

      className,
      style,
      id,
      name,
      value,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedby,

      onClick,
      onKeyDown,
      onFocus,
      onBlur,

      'data-group': dataGroup,
      'data-group-index': dataGroupIndex,

      ...props
    },
    ref
  ) => {
    const { t } = useI18n();
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const [isFocused, setIsFocused] = useState(false);

    const generatedId = useId();
    const switchId = id || `switch-${generatedId.replace(/:/g, '')}`;
    const descriptionId = description ? `${switchId}-description` : undefined;

    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : internalChecked;

    const handleToggle = useCallback(
      (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled || loading || readOnly) return;

        e.preventDefault();
        e.stopPropagation();

        const newChecked = !checked;

        if (!isControlled) {
          setInternalChecked(newChecked);
        }

        onChange?.(newChecked);

        if (onClick && e.type === 'click') {
          onClick(e as React.MouseEvent<HTMLDivElement>);
        }
      },
      [checked, disabled, loading, readOnly, isControlled, onChange, onClick]
    );

    const handleKeyDownInternal = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === ' ' || e.key === 'Enter') {
          handleToggle(e);
        }
        onKeyDown?.(e);
      },
      [handleToggle, onKeyDown]
    );

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLDivElement>) => {
        setIsFocused(true);
        onFocus?.(e);
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLDivElement>) => {
        setIsFocused(false);
        onBlur?.(e);
      },
      [onBlur]
    );

    // ===== i18n handling (KEY-FIRST, NO ENUMS) =====
    const translatedLabel = label
      ? t(label)
      : t(checked ? 'switch.on' : 'switch.off');

    const translatedDescription = description ? t(description) : undefined;

    const translatedRequired = t('required');

    const resolvedAriaLabel =
      ariaLabel
        ? t(ariaLabel)
        : label
          ? `${t(label)} ${t(checked ? 'switch.on' : 'switch.off')}`
          : t(checked ? 'switch.on' : 'switch.off');

    const resolvedAriaDescribedby = ariaDescribedby || descriptionId;

    const renderIcon = (): React.ReactNode => {
      if (!withIcons) return null;

      const iconSize = SWITCH_CONFIG.getSizeStyle(size).thumbSize * 0.6;
      const iconColor = thumbColor || SWITCH_CONFIG.getVariantStyle(variant).thumbColor;

      if (checkedIcon && uncheckedIcon) {
        return checked ? checkedIcon : uncheckedIcon;
      }

      return checked
        ? <CheckIcon size={iconSize} color={iconColor} />
        : <CrossIcon size={iconSize} color={iconColor} />;
    };

    const handleLabelClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (disabled || loading) return;
        handleToggle(e);
      },
      [disabled, loading, handleToggle]
    );

    return (
      <SwitchContainer
        $labelPosition={labelPosition}
        $size={size}
        $hasLabel={!!(label || description)}
        className={`switch-container ${className || ''}`}
        style={style}
        data-size={size}
        data-variant={variant}
        data-checked={checked}
        data-disabled={disabled}
        data-loading={loading}
        data-focused={isFocused}
        data-group={dataGroup}
        data-group-index={dataGroupIndex}
      >
        <SwitchWrapper
          ref={ref}
          $disabled={disabled}
          $loading={loading}
          onClick={handleToggle}
          onKeyDown={handleKeyDownInternal}
          onFocus={handleFocus}
          onBlur={handleBlur}
          tabIndex={disabled || loading || readOnly ? -1 : 0}
          role="switch"
          aria-checked={checked}
          aria-disabled={disabled || loading || readOnly}
          aria-label={resolvedAriaLabel}
          aria-describedby={resolvedAriaDescribedby}
          aria-busy={loading}
          aria-readonly={readOnly}
          id={switchId}
          {...props}
        >
          <SwitchTrack
            $size={size}
            $variant={variant}
            $checked={checked}
            $disabled={disabled || readOnly}
            $loading={loading}
            $checkedColor={checkedColor}
            $uncheckedColor={uncheckedColor}
          >
            <SwitchThumb
              $size={size}
              $variant={variant}
              $checked={checked}
              $disabled={disabled || readOnly}
              $thumbColor={thumbColor}
              $withIcons={withIcons}
            >
              {renderIcon()}
            </SwitchThumb>
          </SwitchTrack>
        </SwitchWrapper>

        {(label || description) && (
          <LabelWrapper
            $clickable={!disabled && !loading && !readOnly}
            onClick={handleLabelClick}
          >
            {label && (
              <div style={{ position: 'relative' }}>
                <SwitchLabel
                  $size={size}
                  $disabled={disabled || loading}
                  $required={required}
                  title={required ? translatedRequired : undefined}
                >
                  {translatedLabel}
                </SwitchLabel>

                {required && (
                  <RequiredIndicator>
                    {translatedRequired}
                  </RequiredIndicator>
                )}
              </div>
            )}

            {description && (
              <SwitchDescription
                $size={size}
                $disabled={disabled || loading}
                id={descriptionId}
              >
                {translatedDescription}
              </SwitchDescription>
            )}
          </LabelWrapper>
        )}

        {(name || value !== undefined) && (
          <input
            type="checkbox"
            name={name}
            id={`${switchId}-input`}
            value={value}
            checked={checked}
            readOnly
            disabled={disabled || loading}
            required={required}
            onChange={() => {}}
            aria-hidden="true"
            tabIndex={-1}
            style={{ display: 'none' }}
          />
        )}
      </SwitchContainer>
    );
  }
);

Switch.displayName = 'Switch';

// ===== SWITCH GROUP =====
export const SwitchGroup: React.FC<SwitchGroupProps> = ({
  children,
  label,
  description,
  disabled = false,
  direction = 'vertical',
  spacing = 12,
  className,
  style,
  id,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  ...props
}) => {
  const { t } = useI18n();
  const groupId = useId();
  const uniqueId = id || `switch-group-${groupId.replace(/:/g, '')}`;

  const labelId = label ? `${uniqueId}-label` : undefined;
  const descriptionId = description ? `${uniqueId}-description` : undefined;

  return (
    <div
      className={`switch-group ${className || ''}`}
      style={style}
      role="group"
      aria-labelledby={labelId}
      aria-describedby={ariaDescribedby || descriptionId}
      aria-label={!labelId ? (ariaLabel ? t(ariaLabel) : undefined) : undefined}
      id={uniqueId}
      {...props}
    >
      {(label || description) && (
        <div style={{ marginBottom: 8 }}>
          {label && <label id={labelId}>{t(label)}</label>}
          {description && <p id={descriptionId}>{t(description)}</p>}
        </div>
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: direction === 'vertical' ? 'column' : 'row',
          gap: spacing,
        }}
      >
        {React.Children.map(children, (child, index) =>
          React.isValidElement(child)
            ? React.cloneElement(child, {
                disabled: child.props.disabled || disabled,
                id: child.props.id || `switch-${uniqueId}-${index}`,
                'data-group': uniqueId,
                'data-group-index': index,
              })
            : child
        )}
      </div>
    </div>
  );
};

SwitchGroup.displayName = 'SwitchGroup';

export default Switch;
