// src/04-frameworks-and-drivers/ui/web/components/02-organisms/previews/CodePreview/CodePreview.organism-playground.tsx
/** @jsxImportSource @emotion/react */
import { CodePreview } from './CodePreview.organism';
import { Box, Text } from '../../../00-atoms';

export const CodePreviewPlayground = () => {
  const sampleJson = `{
  "name": "kiadstars-tool",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}`;

  const sampleTs = `import React from 'react';

interface Props {
  name: string;
}

export const Greeting: React.FC<Props> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};`;

  return (
    <Box p="xl" display="flex" flexDirection="column" gap="xl">
      <Text as="h1" variant="heading-2xl" weight="bold">
        💻 CodePreview Demo
      </Text>

      {/* 1. Basic Usage */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            1. Basic Usage
          </Text>
        </Box>
        <CodePreview code="console.log('Hello World');" />
      </Box>

      {/* 2. With Title & Language */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            2. With Title & Language
          </Text>
        </Box>
        <CodePreview 
          code={sampleJson} 
          language="json" 
          title="package.json" 
        />
      </Box>

      {/* 3. Line Numbers & Max Height */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            3. Line Numbers & Scrollable
          </Text>
        </Box>
        <CodePreview 
          code={sampleTs} 
          language="typescript" 
          title="Greeting.tsx"
          showLineNumbers
          maxHeight={150}
        />
      </Box>
    </Box>
  );
};