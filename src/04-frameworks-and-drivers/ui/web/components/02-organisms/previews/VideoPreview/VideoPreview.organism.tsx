// src/04-frameworks-and-drivers/ui/web/components/02-organisms/previews/VideoPreview/VideoPreview.organism.tsx
/** @jsxImportSource @emotion/react */
import React, { useRef, useState } from 'react';
import { Play, Pause, AlertCircle } from 'lucide-react';
import { Box, Text } from '../../../00-atoms';
import * as styles from './VideoPreview.styles';
import type { VideoPreviewProps } from './VideoPreview.types';

export const VideoPreview: React.FC<VideoPreviewProps> = ({
  src,
  poster,
  width = '100%',
  height = 'auto',
  autoplay = false,
  controls = true,
  loop = false,
  muted = false,
  title,
  className,
  sx,
  testId = 'video-preview',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [hasError, setHasError] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      // State update handled by onPlay/onPause events
    }
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleError = () => setHasError(true);

  if (hasError) {
    return (
      <Box
        css={[styles.container, sx]}
        className={className}
        data-testid={`${testId}-error`}
        style={{ width, height: typeof height === 'number' ? height : 200 }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" gap="sm" color="DANGER">
          <AlertCircle size={32} />
          <Text size="sm">Failed to load video</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      css={[styles.container, sx]}
      className={className}
      data-testid={testId}
      style={{ width, height }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoplay}
        controls={controls}
        loop={loop}
        muted={muted}
        title={title}
        css={styles.video}
        onPlay={handlePlay}
        onPause={handlePause}
        onError={handleError}
        playsInline
      />
      
      {/* Custom Play Button Overlay (Only shown when controls are disabled) */}
      {!controls && (
        <div 
          css={styles.playOverlay(isPlaying)} 
          onClick={togglePlay}
          role="button"
          tabIndex={0}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          <div css={styles.playButton}>
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" style={{ marginLeft: 4 }} />}
          </div>
        </div>
      )}
    </Box>
  );
};