// src/04-frameworks-and-drivers/ui/web/components/organisms/forms/MultiStepForm/MultiStepForm.types.ts

import type { ReactNode } from 'react';

export interface MultiStepFormStep {
  id: string;
  title: string;
  description?: string;
  content: ReactNode;

  /**
   * Return true if step is valid
   * Used to enable/disable Next / Submit
   */
  isValid?: () => boolean;
}

export interface MultiStepFormProps {
  steps: MultiStepFormStep[];
  currentStep: number;

  /** Controlled navigation */
  onStepChange: (step: number) => void;

  /** Final submit action */
  onSubmit: () => void;

  /** Loading state for submit */
  isSubmitting?: boolean;

  /** Show / hide progress indicator */
  showStepIndicator?: boolean;
}
