import { Box } from '../../atoms/Box';
import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Text';
import { Icon } from '../../atoms/Icon';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator
} from './DropdownMenu.molecule';

const MoreIcon = <svg viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>;

export const DropdownMenuTest = () => {
  return (
    <Box p="24px">
      <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: 24 }}>
        👇 DropdownMenu Demo
      </Text>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
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