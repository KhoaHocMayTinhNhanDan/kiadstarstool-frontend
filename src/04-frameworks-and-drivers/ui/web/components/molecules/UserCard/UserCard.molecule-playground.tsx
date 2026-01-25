import { Box } from '../../atoms/Box';
import { Text } from '../../atoms/Text';
import { UserCard } from './UserCard.molecule';

export const UserCardTest = () => {
  return (
    <Box p="24px">
      <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: 24 }}>
        👤 UserCard Demo
      </Text>

      <Box display="flex" flexDirection="column" gap="24px" maxW="400px">
        <section>
          <Text size="lg" weight="bold" style={{ marginBottom: 16 }}>Basic</Text>
          <UserCard 
            name="Alice Johnson" 
            role="Administrator" 
            avatarUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
          />
        </section>

        <section>
          <Text size="lg" weight="bold" style={{ marginBottom: 16 }}>Interactive</Text>
          <UserCard 
            name="Bob Smith" 
            role="Editor" 
            onClick={() => alert('Clicked Bob!')}
          />
        </section>

        <section>
          <Text size="lg" weight="bold" style={{ marginBottom: 16 }}>No Avatar URL</Text>
          <UserCard 
            name="Charlie Brown" 
            role="Viewer" 
          />
        </section>
      </Box>
    </Box>
  );
};