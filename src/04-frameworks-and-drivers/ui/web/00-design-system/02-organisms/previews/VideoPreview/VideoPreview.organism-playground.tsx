// src/04-frameworks-and-drivers/ui/web/components/02-organisms/previews/VideoPreview/VideoPreview.organism-playground.tsx
/** @jsxImportSource @emotion/react */
import { VideoPreview } from './VideoPreview.organism';
import { Box, Text } from '../../../00-atoms';

export const VideoPreviewPlayground = () => {
  const sampleVideo = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
  const poster = "https://interactive-examples.mdn.mozilla.net/media/cc0-images/flower.jpg";

  return (
    <Box p="xl" display="flex" flexDirection="column" gap="xl">
      <Text as="h1" variant="heading-2xl" weight="bold">
        🎥 VideoPreview Demo
      </Text>

      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">1. Native Controls</Text>
        </Box>
        <VideoPreview 
          src={sampleVideo} 
          poster={poster}
          width={400}
        />
      </Box>

      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">2. Custom Play Button (No Native Controls)</Text>
        </Box>
        <VideoPreview 
          src={sampleVideo}
          width={400}
          controls={false}
        />
      </Box>
      
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">3. Autoplay & Muted & Loop</Text>
        </Box>
        <VideoPreview 
          src={sampleVideo}
          width={300}
          autoplay
          muted
          loop
          controls={false}
        />
      </Box>
    </Box>
  );
};