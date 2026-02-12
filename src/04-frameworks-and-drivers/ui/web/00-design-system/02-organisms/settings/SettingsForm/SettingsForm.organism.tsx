// src/04-frameworks-and-drivers/ui/web/components/02-organisms/settings/SettingsForm/SettingsForm.organism.tsx
/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { Box, Text, Button, Input, Switch, Textarea } from '../../../00-atoms';
import { DropdownSelect } from '../../../01-molecules/Dropdown/DropdownSelect';
import * as styles from './SettingsForm.styles';
import type { SettingsFormProps, SettingField } from './SettingsForm.types';

export const SettingsForm: React.FC<SettingsFormProps> = ({
  sections,
  initialValues = {},
  onSave,
  onCancel,
  isLoading = false,
  className,
  sx,
  testId = 'settings-form',
}) => {
  const [values, setValues] = useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDirty, setIsDirty] = useState(false);

  // Initialize default values
  useEffect(() => {
    const defaults: Record<string, any> = {};
    sections.forEach(section => {
      section.fields.forEach(field => {
        if (initialValues[field.id] === undefined && field.defaultValue !== undefined) {
          defaults[field.id] = field.defaultValue;
        }
      });
    });
    if (Object.keys(defaults).length > 0) {
      setValues(prev => ({ ...prev, ...defaults }));
    }
  }, [sections, initialValues]);

  const handleChange = (id: string, value: any) => {
    setValues(prev => ({ ...prev, [id]: value }));
    setIsDirty(true);
    
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    sections.forEach(section => {
      section.fields.forEach(field => {
        if (field.required && (values[field.id] === undefined || values[field.id] === '')) {
          newErrors[field.id] = 'This field is required';
          isValid = false;
        }
        if (field.validation) {
          const error = field.validation(values[field.id]);
          if (error) {
            newErrors[field.id] = error;
            isValid = false;
          }
        }
      });
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate() && onSave) {
      await onSave(values);
      setIsDirty(false);
    }
  };

  const renderFieldInput = (field: SettingField) => {
    const value = values[field.id] ?? '';
    const error = errors[field.id];

    switch (field.type) {
      case 'switch':
        return (
          <Box display="flex" alignItems="center" height="40px">
            <Switch
              checked={!!value}
              onCheckedChange={(checked) => handleChange(field.id, checked)}
              disabled={field.disabled || isLoading}
              id={field.id}
            />
          </Box>
        );
      
      case 'select':
        return (
          <DropdownSelect
            options={field.options?.map(opt => ({ 
              id: String(opt.value), 
              label: opt.label, 
              value: String(opt.value) 
            })) || []}
            value={String(value)}
            onChange={(val) => handleChange(field.id, val)}
            placeholder={field.placeholder}
            disabled={field.disabled || isLoading}
            error={!!error}
            errorMessage={error}
          />
        );

      case 'textarea':
        return (
          <Textarea
            id={field.id}
            value={value}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            disabled={field.disabled || isLoading}
            error={!!error}
            rows={4}
          />
        );

      case 'text':
      case 'email':
      case 'password':
      default:
        return (
          <Box width="100%">
            <Input
              id={field.id}
              type={field.type}
              value={value}
              onChange={(e) => handleChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              disabled={field.disabled || isLoading}
              error={!!error}
            />
            {error && <Text css={styles.errorText}>{error}</Text>}
          </Box>
        );
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      css={[styles.container, sx]} 
      className={className}
      data-testid={testId}
    >
      {sections.map((section) => (
        <div key={section.id} css={styles.section}>
          <div css={styles.sectionHeader}>
            <h3 css={styles.sectionTitle}>{section.title}</h3>
            {section.description && (
              <p css={styles.sectionDescription}>{section.description}</p>
            )}
          </div>

          <div css={styles.fieldsContainer}>
            {section.fields.map((field) => (
              <div key={field.id} css={styles.fieldRow}>
                <div css={styles.fieldInfo}>
                  <label htmlFor={field.id} css={styles.fieldLabel}>
                    {field.label} {field.required && <span css={{ color: 'red' }}>*</span>}
                  </label>
                  {field.description && (
                    <span css={styles.fieldDescription}>{field.description}</span>
                  )}
                </div>
                <div css={styles.fieldInput}>
                  {renderFieldInput(field)}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div css={styles.actions}>
        {onCancel && (
          <Button 
            type="button" 
            variant="ghost" 
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        )}
        <Button 
          type="submit" 
          variant="primary" 
          isLoading={isLoading}
          disabled={!isDirty && !isLoading}
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};