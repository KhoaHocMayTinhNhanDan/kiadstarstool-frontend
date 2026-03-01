// src/04-frameworks-and-drivers/ui/web/components/02-organisms/previews/PDFPreview/PDFPreview.organism.tsx
/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { ExternalLink, Download, FileText, AlertCircle } from 'lucide-react';
import { Box, Text } from '../../../00-atoms';
import { Button } from '../../../00-atoms/Button';
import * as styles from './PDFPreview.styles';
import type { PDFPreviewProps } from './PDFPreview.types';

export const PDFPreview: React.FC<PDFPreviewProps> = ({
  src,
  title = 'PDF Document',
  width = '100%',
  height = '500px',
  className,
  sx,
  testId = 'pdf-preview',
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <Box
      css={[styles.container, sx]}
      className={className}
      data-testid={testId}
      style={{ width, height }}
    >
      {/* Header */}
      <div css={styles.header}>
        <div css={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={16} css={{ color: '#e53e3e' }} /> {/* Red icon for PDF */}
          <span css={styles.title} title={title}>{title}</span>
        </div>
        
        <div css={styles.actions}>
          <a 
            href={src} 
            download 
            css={styles.actionButton} 
            title="Download PDF"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download size={16} />
          </a>
          <a 
            href={src} 
            target="_blank" 
            rel="noopener noreferrer" 
            css={styles.actionButton}
            title="Open in new tab"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* Content */}
      <div css={styles.content}>
        {isLoading && !hasError && (
          <div css={styles.loader}>
            <div css={styles.spinner} />
          </div>
        )}

        {hasError ? (
          <div css={styles.errorState}>
            <AlertCircle size={32} color="#e53e3e" />
            <Text>Unable to load PDF preview.</Text>
            <Button variant="outline" size="sm" onClick={() => window.open(src, '_blank')}>
              Download to view
            </Button>
          </div>
        ) : (
          <iframe
            src={`${src}#toolbar=0`} // Hide default toolbar if supported
            title={title}
            css={styles.iframe(isLoading)}
            onLoad={handleLoad}
            onError={handleError}
          />
        )}
      </div>
    </Box>
  );
};