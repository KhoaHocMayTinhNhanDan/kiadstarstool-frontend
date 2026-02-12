// src/04-frameworks-and-drivers/ui/web/components/02-organisms/previews/PDFPreview/PDFPreview.organism-playground.tsx
/** @jsxImportSource @emotion/react */
import { PDFPreview } from './PDFPreview.organism';
import { Box, Text } from '../../../00-atoms';

export const PDFPreviewPlayground = () => {
  // Sample PDF URL (W3C dummy pdf)
  const samplePdf = 'https://pdfobject.com/pdf/sample.pdf';
  const errorPdf = 'https://invalid-url.com/non-existent.pdf';

  return (
    <Box p="xl" display="flex" flexDirection="column" gap="xl">
      <Text as="h1" variant="heading-2xl" weight="bold">
        📄 PDFPreview Demo
      </Text>

      {/* 1. Basic Usage */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            1. Basic Usage
          </Text>
        </Box>
        <PDFPreview 
          src={samplePdf} 
          title="W3C Dummy Document.pdf"
          height={400}
        />
      </Box>

      {/* 2. Error State */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            2. Error State (Invalid URL)
          </Text>
        </Box>
        <PDFPreview 
          src={errorPdf} 
          title="Missing File.pdf"
          height={300}
        />
      </Box>
    </Box>
  );
};