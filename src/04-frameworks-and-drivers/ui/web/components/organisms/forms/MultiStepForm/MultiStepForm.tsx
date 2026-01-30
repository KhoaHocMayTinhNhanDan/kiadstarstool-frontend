/** @jsxImportSource @emotion/react */
import { Button } from '../../../atoms/Button';
import { Box } from '../../../atoms/Box/Box';
import { Card } from '../../../atoms/Card';
import { Text } from '../../../atoms/Text/Text';

import * as S from './MultiStepForm.styles';
import type { MultiStepFormProps } from './MultiStepForm.types';

export const MultiStepForm = ({
  steps,
  currentStep,
  onStepChange,
  onSubmit,
  isSubmitting = false,
  showStepIndicator = true,
}: MultiStepFormProps) => {
  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;
  const canNext = step?.isValid ? step.isValid() : true;

  return (
    <Box css={S.container}>
      {/* ===== Progress ===== */}
      {showStepIndicator && (
        <Box css={S.progress}>
          {steps.map((s, i) => {
            const state =
              i < currentStep
                ? 'done'
                : i === currentStep
                ? 'active'
                : 'upcoming';

            return (
              <Box
                key={s.id}
                css={S.progressItem(state)}
                aria-current={state === 'active' ? 'step' : undefined}
                aria-disabled={state === 'upcoming'}
              >
                <Box css={S.circle(state)}>{i + 1}</Box>
                <Text size="sm" weight={state === 'active' ? 'semibold' : 'normal'}>
                  {s.title}
                </Text>
              </Box>
            );
          })}
        </Box>
      )}

      {/* ===== Content ===== */}
      <Card css={S.card}>
        <Box css={S.cardHeader}>
          <Text as="h3" weight="semibold">
            {step.title}
          </Text>
          {step.description && (
            <Text size="sm" color="TEXT_MUTED">
              {step.description}
            </Text>
          )}
        </Box>

        <Box css={S.cardBody}>{step.content}</Box>

        <Box css={S.cardFooter}>
          <Button
            variant="ghost"
            disabled={currentStep === 0 || isSubmitting}
            onClick={() => onStepChange(currentStep - 1)}
          >
            Back
          </Button>

          <Button
            variant="primary"
            isLoading={isSubmitting}
            disabled={!canNext || isSubmitting}
            onClick={isLast ? onSubmit : () => onStepChange(currentStep + 1)}
          >
            {isLast ? 'Submit' : 'Next'}
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

MultiStepForm.displayName = 'MultiStepForm';
