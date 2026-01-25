import { Badge } from './Badge';
import { Avatar } from '../Avatar/Avatar';
import { Box } from '../Box/Box';
import { Icon } from '../Icon/Icon';

const BellIcon = <svg viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/></svg>;

export const BadgeTest = () => {
  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui' }}>
      <h2 style={{ marginBottom: '32px', color: '#1a202c', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
        🔴 Badge Component Demo
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Standalone */}
        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>Standalone</h3>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Badge content="New" color="primary" />
            <Badge content="Beta" color="warning" variant="outline" />
            <Badge content={5} color="success" />
            <Badge content={120} max={99} color="danger" />
          </div>
        </section>

        {/* With Children (Avatar) */}
        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>With Avatar</h3>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Badge dot color="success" position="bottom-right">
              <Avatar fallback="ON" />
            </Badge>
            
            <Badge content={3} color="danger">
              <Avatar src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80" fallback="U" />
            </Badge>
          </div>
        </section>

        {/* With Children (Icon) */}
        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>With Icon</h3>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Badge content={5} color="danger">
              <Box p="8px" bg="#f7fafc" style={{ borderRadius: '50%' }}>
                <Icon size="md">{BellIcon}</Icon>
              </Box>
            </Badge>

            <Badge dot color="primary">
              <Icon size="lg">{BellIcon}</Icon>
            </Badge>
          </div>
        </section>

      </div>
    </div>
  );
};