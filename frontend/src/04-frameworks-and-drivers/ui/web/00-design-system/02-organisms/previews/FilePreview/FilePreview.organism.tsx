// src/04-frameworks-and-drivers/ui/web/components/02-organisms/previews/FilePreview/FilePreview.organism.tsx
/** @jsxImportSource @emotion/react */
import React, { useMemo } from 'react';
import { 
  FileText, 
  Image as ImageIcon, 
  Trash2, 
  Download, 
  AlertCircle,
  File
} from 'lucide-react';
import { Box } from '../../../00-atoms';
import * as styles from './FilePreview.styles';
import type { FilePreviewProps } from './FilePreview.types';

const formatBytes = (bytes: number, decimals = 2) => {
  if (!bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const getFileIcon = (type: string = '') => {
  if (type.startsWith('image/')) return <ImageIcon size={20} />;
  if (type.includes('pdf')) return <FileText size={20} />;
  return <File size={20} />;
};

export const FilePreview: React.FC<FilePreviewProps> = ({
  src,
  name,
  size,
  type,
  loading = false,
  error = false,
  onRemove,
  onDownload,
  onClick,
  variant = 'list',
  className,
  sx,
  testId = 'file-preview',
}) => {
  const isImage = type?.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp)$/i.test(name);
  
  const imageUrl = useMemo(() => {
    if (!isImage || !src) return null;
    if (typeof src === 'string') return src;
    return URL.createObjectURL(src);
  }, [src, isImage]);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDownload?.();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.();
  };

  return (
    <Box
      css={[styles.container(variant, error), sx]}
      className={className}
      data-testid={testId}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {/* Preview Area (Image or Icon) */}
      <div css={styles.previewArea(variant, !!imageUrl)}>
        {loading ? (
          <div css={styles.spinner} />
        ) : error ? (
          <AlertCircle size={24} color="#e53e3e" />
        ) : imageUrl ? (
          <img src={imageUrl} alt={name} />
        ) : (
          getFileIcon(type)
        )}
      </div>

      {/* Info Area */}
      <div css={styles.infoArea(variant)}>
        <div css={styles.fileName} title={name}>
          {name}
        </div>
        {variant !== 'minimal' && size !== undefined && (
          <div css={styles.fileSize}>
            {formatBytes(size)}
          </div>
        )}
        {error && variant !== 'minimal' && (
          <div css={{ fontSize: '12px', color: '#e53e3e', marginTop: '2px' }}>
            Upload failed
          </div>
        )}
      </div>

      {/* Actions */}
      {!loading && (
        <div css={styles.actions(variant)}>
          {onDownload && (
            <button 
              css={styles.actionButton} 
              onClick={handleDownload}
              title="Download"
            >
              <Download size={16} />
            </button>
          )}
          {onRemove && (
            <button 
              css={styles.actionButton} 
              onClick={handleRemove}
              title="Remove"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      )}
    </Box>
  );
};