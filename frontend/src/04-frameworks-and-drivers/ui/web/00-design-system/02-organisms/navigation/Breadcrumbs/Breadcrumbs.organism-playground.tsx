// src/04-frameworks-and-drivers/ui/web/components/02-organisms/navigation/Breadcrumbs/Breadcrumbs.organism-playground.tsx
/** @jsxImportSource @emotion/react */
import { Breadcrumbs } from './Breadcrumbs.organism';
import { Box, Text, Icon } from '../../../00-atoms';
import { Home, Folder, FileText, Slash } from 'lucide-react';

export const BreadcrumbsPlayground = () => {
  const basicItems = [
    { id: 'home', label: 'Home', href: '/', icon: <Home size={14} /> },
    { id: 'products', label: 'Products', href: '/products' },
    { id: 'electronics', label: 'Electronics', href: '/products/electronics' },
    { id: 'laptops', label: 'Laptops', href: '/products/electronics/laptops' },
    { id: 'macbook', label: 'MacBook Pro M3', isActive: true }, // Current page
  ];

  const longItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'docs', label: 'Documentation', href: '/docs' },
    { id: 'components', label: 'Components', href: '/docs/components' },
    { id: 'navigation', label: 'Navigation', href: '/docs/components/navigation' },
    { id: 'breadcrumbs', label: 'Breadcrumbs', href: '/docs/components/navigation/breadcrumbs' },
    { id: 'api', label: 'API Reference', href: '/docs/components/navigation/breadcrumbs/api' },
    { id: 'props', label: 'Props', isActive: true },
  ];

  return (
    <Box p="xl" display="flex" flexDirection="column" gap="xl">
      <Text as="h1" variant="heading-2xl" weight="bold">
        🍞 Breadcrumbs Demo
      </Text>

      {/* 1. Basic Usage */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            1. Basic Usage (Auto Collapse)
          </Text>
          <Text color="SECONDARY" size="sm">
            Mặc định collapse nếu {'>'} 4 items.
          </Text>
        </Box>
        <Box p="md" border="1px solid #e2e8f0" radius="md">
          <Breadcrumbs items={basicItems} />
        </Box>
      </Box>

      {/* 2. Custom Separator */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            2. Custom Separator (Slash)
          </Text>
        </Box>
        <Box p="md" border="1px solid #e2e8f0" radius="md">
          <Breadcrumbs 
            items={basicItems.slice(0, 3)} 
            separator={<Slash size={14} />} 
          />
        </Box>
      </Box>

      {/* 3. Deep Nesting (Collapsed) */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            3. Deep Nesting (Collapsed Middle)
          </Text>
          <Text color="SECONDARY" size="sm">
            Hiển thị 1 item đầu và 2 items cuối. Các items ở giữa nằm trong menu "...".
          </Text>
        </Box>
        <Box p="md" border="1px solid #e2e8f0" radius="md">
          <Breadcrumbs 
            items={longItems} 
            maxItems={4}
            itemsBeforeCollapse={1}
            itemsAfterCollapse={2}
          />
        </Box>
      </Box>
    </Box>
  );
};