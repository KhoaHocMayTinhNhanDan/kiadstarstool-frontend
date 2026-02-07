// src/04-frameworks-and-drivers/ui/web/components/01-molecules/Dropdown/DropdownBase/DropdownBase.molecule-playground.tsx
/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { DropdownBase } from './DropdownBase.molecule';
import { Box, Text, Icon } from '../../../00-atoms';
import { Button } from '../../../00-atoms/Button';
import { Input } from '../../../00-atoms/Input';
import { Avatar } from '../../../00-atoms/Avatar';

export const DropdownBasePlayground = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box p="xl" display="flex" flexDirection="column" gap="xl">
      <Text as="h1" variant="heading-2xl" weight="bold">
        💧 DropdownBase Demo
      </Text>
      <Text color="SECONDARY">
        Component nền tảng (Base) xử lý logic đóng/mở, portal, positioning và animation. 
        Cho phép render bất kỳ nội dung React Node nào bên trong.
      </Text>

      {/* 1. Basic Usage */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            1. Basic Usage (Rich Content)
          </Text>
        </Box>
        <DropdownBase
          trigger={<Button>Open Content</Button>}
          minWidth={280}
        >
          <Box p="md">
            <Box mb="xs">
              <Text weight="bold">Information</Text>
            </Box>
            <Box mb="md">
              <Text size="sm" color="SECONDARY">
                DropdownBase không giới hạn ở danh sách menu. Bạn có thể đặt text, hình ảnh, hoặc bất kỳ UI nào.
              </Text>
            </Box>
            <Box p="sm" bg="NEUTRAL_LIGHT" radius="sm" mb="md">
              <Text size="xs" sx={{ fontFamily: 'monospace' }}>Custom content area</Text>
            </Box>
            <Button size="sm" fullWidth variant="secondary">Action Button</Button>
          </Box>
        </DropdownBase>
      </Box>

      {/* 2. Variants */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            2. Variants
          </Text>
        </Box>
        <Box display="flex" gap="md" flexWrap="wrap">
          <DropdownBase
            trigger={<Button variant="outline">Default</Button>}
            variant="default"
          >
            <Box p="md"><Text>Default Variant (Shadow + Border)</Text></Box>
          </DropdownBase>

          <DropdownBase
            trigger={<Button variant="outline">Compact</Button>}
            variant="compact"
          >
            <Box p="sm"><Text size="sm">Compact Variant (Less Padding)</Text></Box>
          </DropdownBase>

          <DropdownBase
            trigger={<Button variant="outline">Minimal</Button>}
            variant="minimal"
          >
            <Box p="md"><Text>Minimal Variant (Clean look)</Text></Box>
          </DropdownBase>
        </Box>
      </Box>

      {/* 3. Scrollable Content */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            3. Scrollable Content
          </Text>
        </Box>
        <DropdownBase
          trigger={<Button>Long List (Scrollable)</Button>}
          maxHeight={200}
          scrollable
          minWidth={220}
        >
          <Box p="sm">
            {Array.from({ length: 15 }).map((_, i) => (
              <Box 
                key={i} 
                p="sm" 
                sx={{ 
                  '&:hover': { backgroundColor: '#f7fafc', cursor: 'pointer', borderRadius: '4px' } 
                }}
              >
                <Text size="sm">Scrollable Item {i + 1}</Text>
              </Box>
            ))}
          </Box>
        </DropdownBase>
      </Box>

      {/* 4. Positioning & Custom Trigger */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            4. Positioning & Custom Trigger
          </Text>
        </Box>
        <Box display="flex" gap="xl" alignItems="center" flexWrap="wrap">
          {/* Right Side with Avatar Trigger */}
          <Box>
            <Box mb="sm"><Text size="sm" color="SECONDARY">Side: Right, Align: Start</Text></Box>
            <DropdownBase
              trigger={
                <Button variant="ghost" sx={{ borderRadius: '50%', padding: 0, width: 40, height: 40 }}>
                   <Avatar name="John Doe" size="md" />
                </Button>
              }
              side="right"
              align="start"
            >
              <Box p="md">
                <Text weight="bold">John Doe</Text>
                <Text size="sm" color="SECONDARY">john@example.com</Text>
              </Box>
            </DropdownBase>
          </Box>

          {/* Top Side */}
          <Box>
            <Box mb="sm"><Text size="sm" color="SECONDARY">Side: Top, Align: Center</Text></Box>
            <DropdownBase
              trigger={<Button variant="secondary">Top Side</Button>}
              side="top"
              align="center"
            >
              <Box p="md"><Text>Revealed from Top</Text></Box>
            </DropdownBase>
          </Box>
        </Box>
      </Box>

      {/* 5. Controlled State & Form */}
      <Box>
        <Box mb="md">
          <Text as="h3" variant="heading-md" weight="semibold">
            5. Controlled State (Login Form)
          </Text>
        </Box>
        <Box display="flex" gap="md" alignItems="flex-start" flexDirection="column">
          <Box display="flex" gap="md">
            <Button onClick={() => setIsOpen(!isOpen)} variant="outline">
                {isOpen ? 'Close Dropdown' : 'Open Dropdown Programmatically'}
            </Button>
            
            <DropdownBase
              trigger={<Button variant="primary">Sign In Form</Button>}
              open={isOpen}
              onOpenChange={setIsOpen}
              closeOnOutsideClick={false} // Giữ mở khi click ra ngoài (nếu muốn) hoặc để mặc định
              minWidth={320}
            >
              <Box p="lg" display="flex" flexDirection="column" gap="md">
                <Box display="flex" alignItems="center" gap="sm">
                  <Icon size="md">🔐</Icon>
                  <Text weight="bold" size="lg">Welcome Back</Text>
                </Box>
                
                <Box>
                    <Box mb="xs">
                      <Text size="sm" weight="medium">Email</Text>
                    </Box>
                    <Input placeholder="Enter email..." autoFocus />
                </Box>
                
                <Box>
                    <Box mb="xs">
                      <Text size="sm" weight="medium">Password</Text>
                    </Box>
                    <Input type="password" placeholder="Enter password..." />
                </Box>

                <Box display="flex" justifyContent="flex-end" gap="sm" mt="sm">
                    <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button size="sm" onClick={() => setIsOpen(false)}>Login</Button>
                </Box>
              </Box>
            </DropdownBase>
          </Box>
          
          <Text size="sm" color="SECONDARY">
            State `isOpen` hiện tại: <strong>{isOpen.toString()}</strong>
          </Text>
        </Box>
      </Box>

    </Box>
  );
};
