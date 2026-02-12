// src/04-frameworks-and-drivers/ui/web/components/02-organisms/previews/CodePreview/CodePreview.organism.tsx
/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Check, Copy, FileCode } from 'lucide-react';
import { Box } from '../../../00-atoms';
import * as styles from './CodePreview.styles';
import type { CodePreviewProps } from './CodePreview.types';

export const CodePreview: React.FC<CodePreviewProps> = ({
  code,
  language,
  title,
  showLineNumbers = false,
  maxHeight,
  copyable = true,
  className,
  sx,
  testId = 'code-preview',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const lineCount = code.split('\n').length;

  return (
    <Box
      css={[styles.container, sx]}
      className={className}
      data-testid={testId}
    >
      {(title || language || copyable) && (
        <div css={styles.header}>
          <div css={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {title && (
              <>
                <FileCode size={14} css={{ color: '#64748b' }} />
                <span css={styles.title}>{title}</span>
              </>
            )}
          </div>
          
          <div css={{ display: 'flex', alignItems: 'center' }}>
            {language && <span css={styles.languageBadge}>{language}</span>}
            {copyable && (
              <button 
                css={styles.copyButton} 
                onClick={handleCopy}
                title="Copy code"
              >
                {copied ? <Check size={14} color="#2e7d32" /> : <Copy size={14} />}
              </button>
            )}
          </div>
        </div>
      )}

      <div css={styles.content(maxHeight)}>
        {showLineNumbers && (
          <div css={styles.lineNumbers} aria-hidden="true">
            {Array.from({ length: lineCount }).map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
        )}
        <pre css={[styles.pre, showLineNumbers && styles.codeWithLines]}>
          <code css={styles.code}>{code}</code>
        </pre>
      </div>
    </Box>
  );
};