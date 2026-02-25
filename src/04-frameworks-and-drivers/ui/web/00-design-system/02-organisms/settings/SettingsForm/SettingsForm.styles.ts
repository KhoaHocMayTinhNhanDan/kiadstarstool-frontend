// src/04-frameworks-and-drivers/ui/web/components/02-organisms/settings/SettingsForm/SettingsForm.styles.ts
import { css } from '@emotion/react';
import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from '../../../../01-ui-core/constants/tokens-constants';

export const container = css`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.xl};
  width: 100%;
  max-width: 800px;
`;

export const section = css`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.lg};
  padding-bottom: ${SPACING.xl};
  border-bottom: 1px solid ${COLORS.NEUTRAL_BORDER};

  &:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const sectionHeader = css`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.xs};
`;

export const sectionTitle = css`
  font-size: ${TYPOGRAPHY.FONT_SIZE.lg};
  font-weight: ${TYPOGRAPHY.FONT_WEIGHT.bold};
  color: ${COLORS.TEXT_PRIMARY};
  margin: 0;
`;

export const sectionDescription = css`
  font-size: ${TYPOGRAPHY.FONT_SIZE.sm};
  color: ${COLORS.TEXT_SECONDARY};
  margin: 0;
`;

export const fieldsContainer = css`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.lg};
`;

export const fieldRow = css`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.sm};

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: ${SPACING.xl};
  }
`;

export const fieldInfo = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const fieldLabel = css`
  font-size: ${TYPOGRAPHY.FONT_SIZE.sm};
  font-weight: ${TYPOGRAPHY.FONT_WEIGHT.medium};
  color: ${COLORS.TEXT_PRIMARY};
`;

export const fieldDescription = css`
  font-size: ${TYPOGRAPHY.FONT_SIZE.xs};
  color: ${COLORS.TEXT_MUTED};
`;

export const fieldInput = css`
  flex: 2;
  max-width: 100%;
  
  @media (min-width: 768px) {
    max-width: 400px;
  }
`;

export const actions = css`
  display: flex;
  justify-content: flex-end;
  gap: ${SPACING.md};
  margin-top: ${SPACING.lg};
  padding-top: ${SPACING.lg};
  border-top: 1px solid ${COLORS.NEUTRAL_BORDER};
`;

export const errorText = css`
  font-size: ${TYPOGRAPHY.FONT_SIZE.xs};
  color: ${COLORS.DANGER};
  margin-top: ${SPACING.xs};
`;