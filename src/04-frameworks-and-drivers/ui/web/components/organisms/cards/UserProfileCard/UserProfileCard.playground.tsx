import { useState } from 'react';
import { UserProfileCard } from './UserProfileCard';
import { Box } from '../../../atoms/Box/Box';
import { Text } from '../../../atoms/Text/Text';
import { Button } from '../../../atoms/Button';

export const UserProfileCardPlayground = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <Box p="lg">
      <Text as="h2" variant="heading-2xl" sx={{ mb: '24px' }}>
        👤 UserProfileCard Demo
      </Text>

      <Box
        display="grid"
        gap="lg"
        sx={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        }}
      >
        {/* Full Profile */}
        <UserProfileCard
          name="Sarah Jenkins"
          role="Senior Product Designer"
          avatarSrc="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&q=80"
          avatarFallback="SJ"
          coverSrc="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80"
          description="Passionate about creating intuitive and beautiful user experiences. Coffee lover & travel enthusiast."
          stats={[
            { label: 'Posts', value: '142' },
            { label: 'Followers', value: '12.5k' },
            { label: 'Following', value: '450' },
          ]}
          isFollowing={isFollowing}
          onFollow={() => setIsFollowing(!isFollowing)}
          actions={<Button variant="secondary" fullWidth>Message</Button>}
        />

        {/* Minimal Profile */}
        <UserProfileCard
          name="Alex Chen"
          role="Frontend Developer"
          avatarFallback="AC"
          stats={[
            { label: 'Projects', value: '24' },
            { label: 'Commits', value: '1.2k' },
          ]}
          actions={<Button variant="outline" fullWidth>View Profile</Button>}
        />

        {/* No Cover, No Stats */}
        <UserProfileCard
          name="Emily Davis"
          role="Marketing Manager"
          avatarSrc="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&q=80"
          avatarFallback="ED"
          description="Helping brands grow through storytelling and data-driven strategies."
          actions={
            <Button variant="primary" fullWidth>Connect</Button>
          }
        />

        {/* 3 Buttons Case (Equal Width) */}
        <UserProfileCard
          name="3 Buttons Layout"
          role="Team Lead"
          avatarFallback="3B"
          stats={[{ label: 'Items', value: '3' }]}
          onFollow={() => {}}
          actions={
            <>
              <Button variant="secondary" fullWidth>Chat</Button>
              <Button variant="ghost" fullWidth>More</Button>
            </>
          }
        />

        {/* 4 Buttons Case (Equal Width) */}
        <UserProfileCard
          name="4 Buttons Layout"
          role="Director"
          avatarFallback="4B"
          stats={[{ label: 'Items', value: '4' }]}
          onFollow={() => {}}
          actions={
            <>
              <Button variant="secondary" fullWidth>Chat</Button>
              <Button variant="outline" fullWidth>Call</Button>
              <Button variant="ghost" fullWidth>...</Button>
            </>
          }
        />
      </Box>
    </Box>
  );
};