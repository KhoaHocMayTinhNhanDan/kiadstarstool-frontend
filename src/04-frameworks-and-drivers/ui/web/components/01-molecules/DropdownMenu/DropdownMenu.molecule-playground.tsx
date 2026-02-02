// src/04-frameworks-and-drivers/ui/web/components/molecules/DropdownMenu/DropdownMenu.molecule-playground.tsx
import { Box } from '../../00-atoms/Box';
import { Button } from '../../00-atoms/Button';
import { Text } from '../../00-atoms/Text';
import { Icon } from '../../00-atoms/Icon';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator
} from './DropdownMenu.molecule';

const MoreIcon = <svg viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>;

export const DropdownMenuPlayground = () => {
  return (
    <Box p="lg">
      <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: 24 }}>
        👇 DropdownMenu Demo
      </Text>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="md">
            <Icon size="sm">{MoreIcon}</Icon>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent sideOffset={5}>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuItem>Archive</DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem>Share</DropdownMenuItem>
          <DropdownMenuItem disabled>Export</DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem style={{ color: 'red' }}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Box>
  );
};