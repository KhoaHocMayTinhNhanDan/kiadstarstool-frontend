// src/04-frameworks-and-drivers/ui/web/components/02-organisms/previews/FilePreview/FilePreview.organism-playground.tsx
/** @jsxImportSource @emotion/react */
import { FilePreview } from './FilePreview.organism';
import { Box, Text } from '../../../00-atoms';

export const FilePreviewPlayground = () => {
  const handleRemove = () => console.log('Remove clicked');
  const handleDownload = () => console.log('Download clicked');

  return (
    <Box p="xl" display="flex" flexDirection="column" gap="xl">
      <Text as="h1" variant="heading-2xl" weight="bold">
        📄 FilePreview Demo
      </Text>

      {/* 1. List Variant (Default) */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            1. List Variant (Default)
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" gap="sm" maxWidth="400px">
          <FilePreview
            name="document-report.pdf"
            size={1024 * 1024 * 2.5} // 2.5 MB
            type="application/pdf"
            onRemove={handleRemove}
            onDownload={handleDownload}
          />
          <FilePreview
            name="vacation-photo.jpg"
            size={1024 * 500} // 500 KB
            type="image/jpeg"
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=100&q=80"
            onRemove={handleRemove}
          />
        </Box>
      </Box>

      {/* 2. Card Variant */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            2. Card Variant (Grid Layout)
          </Text>
        </Box>
        <Box display="flex" gap="md" flexWrap="wrap">
          <FilePreview
            variant="card"
            name="design-mockup.png"
            size={1024 * 1024 * 1.2}
            type="image/png"
            src="https://images.unsplash.com/photo-1558655146-d09347e0b7a8?auto=format&fit=crop&w=300&q=80"
            onRemove={handleRemove}
            onDownload={handleDownload}
          />
          <FilePreview
            variant="card"
            name="project-specs.docx"
            size={1024 * 25}
            type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onRemove={handleRemove}
          />
        </Box>
      </Box>

      {/* 3. Minimal Variant */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            3. Minimal Variant (Chips)
          </Text>
        </Box>
        <Box display="flex" gap="sm" flexWrap="wrap">
          <FilePreview
            variant="minimal"
            name="notes.txt"
            onRemove={handleRemove}
          />
          <FilePreview
            variant="minimal"
            name="avatar.png"
            type="image/png"
            onRemove={handleRemove}
          />
        </Box>
      </Box>

      {/* 4. States (Loading & Error) */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            4. States (Loading & Error)
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" gap="sm" maxWidth="400px">
          <FilePreview
            name="uploading-file.zip"
            size={1024 * 1024 * 50}
            loading
            onRemove={handleRemove}
          />
          <FilePreview
            name="failed-upload.mp4"
            size={1024 * 1024 * 120}
            error
            onRemove={handleRemove} // Retry logic could be added here
          />
        </Box>
      </Box>
    </Box>
  );
};