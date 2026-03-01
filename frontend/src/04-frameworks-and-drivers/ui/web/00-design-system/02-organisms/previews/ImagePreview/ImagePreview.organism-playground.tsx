// src/04-frameworks-and-drivers/ui/web/components/02-organisms/previews/ImagePreview/ImagePreview.organism-playground.tsx
/** @jsxImportSource @emotion/react */
import { ImagePreview } from './ImagePreview.organism';
import { Box, Text } from '../../../00-atoms';

export const ImagePreviewPlayground = () => {
  return (
    <Box p="xl" display="flex" flexDirection="column" gap="xl">
      <Text as="h1" variant="heading-2xl" weight="bold">
        🖼️ ImagePreview Demo
      </Text>

      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">Basic Usage (Zoomable)</Text>
        </Box>
        <ImagePreview 
          src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&w=600&q=80" 
          width={300}
          height={200}
          caption="Beautiful Landscape"
        />
      </Box>

      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">Non-zoomable (Thumbnail)</Text>
        </Box>
        <ImagePreview 
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=200&q=80" 
          width={100}
          height={100}
          zoomable={false}
          sx={{ borderRadius: '50%' } as any}
        />
      </Box>
    </Box>
  );
};