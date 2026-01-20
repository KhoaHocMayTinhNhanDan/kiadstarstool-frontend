// src/04-frameworks-and-drivers/ui/web/components/atoms/Avatar/Avatar-test.tsx
import { useState } from 'react';
import { Avatar, AvatarGroup } from './Avatar';

export function AvatarTest() {
  const [activeAvatar, setActiveAvatar] = useState<string | null>(null);

  const users = [
    { name: 'John Doe', status: 'online' as const, src: 'https://i.pravatar.cc/150?img=1' },
    { name: 'Jane Smith', status: 'away' as const, src: 'https://i.pravatar.cc/150?img=2' },
    { name: 'Bob Johnson', status: 'busy' as const, src: 'https://i.pravatar.cc/150?img=3' },
    { name: 'Alice Brown', status: 'offline' as const, src: 'https://i.pravatar.cc/150?img=4' },
    { name: 'Charlie Wilson', status: 'online' as const, src: 'https://i.pravatar.cc/150?img=5' },
    { name: 'Diana Prince', status: 'online' as const, src: 'https://i.pravatar.cc/150?img=6' },
    { name: 'Ethan Hunt', status: 'away' as const, src: 'https://i.pravatar.cc/150?img=7' },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 32, color: '#333' }}>👤 Avatar Component Tests</h2>
      
      {/* Size Variations */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>Sizes</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          {(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const).map(size => (
            <div key={size} style={{ textAlign: 'center' }}>
              <Avatar size={size} alt={`${size} avatar`} />
              <div style={{ fontSize: 12, color: '#666', marginTop: 8 }}>{size}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Variants */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>Variants</h3>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <Avatar variant="circle" alt="Circle" src="https://i.pravatar.cc/150?img=8" />
            <div style={{ fontSize: 12, color: '#666', marginTop: 8 }}>Circle</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar variant="rounded" alt="Rounded" src="https://i.pravatar.cc/150?img=9" />
            <div style={{ fontSize: 12, color: '#666', marginTop: 8 }}>Rounded</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar variant="square" alt="Square" src="https://i.pravatar.cc/150?img=10" />
            <div style={{ fontSize: 12, color: '#666', marginTop: 8 }}>Square</div>
          </div>
        </div>
      </section>

      {/* Status Indicators */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>Status</h3>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          {(['online', 'away', 'busy', 'offline', 'none'] as const).map(status => (
            <div key={status} style={{ textAlign: 'center' }}>
              <Avatar
                status={status}
                alt={`${status} status`}
                src="https://i.pravatar.cc/150?img=11"
              />
              <div style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* With Border */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>With Border</h3>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <Avatar border alt="With border" src="https://i.pravatar.cc/150?img=12" />
          <Avatar border borderColor="#3b82f6" alt="Blue border" src="https://i.pravatar.cc/150?img=13" />
        </div>
      </section>

      {/* Fallback States */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>Fallback States</h3>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <Avatar alt="John Doe" />
          <Avatar alt="Jane Smith" fallback="JS" />
          <Avatar alt="Broken Image" src="invalid-url.jpg" />
          <Avatar fallback={<span style={{ color: '#8b5cf6' }}>💼</span>} />
        </div>
      </section>

      {/* Interactive */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>Interactive</h3>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          {users.slice(0, 3).map((user, index) => (
            <Avatar
              key={index}
              src={user.src}
              alt={user.name}
              status={user.status}
              onClick={() => setActiveAvatar(user.name)}
              style={{
                cursor: 'pointer',
                opacity: activeAvatar === user.name ? 0.8 : 1,
              }}
            />
          ))}
        </div>
        {activeAvatar && (
          <p style={{ marginTop: 12, color: '#3b82f6' }}>
            Selected: <strong>{activeAvatar}</strong>
          </p>
        )}
      </section>

      {/* Avatar Group */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>Avatar Group</h3>
        <div style={{ marginBottom: 20 }}>
          <h4 style={{ marginBottom: 12, color: '#666' }}>Basic Group</h4>
          <AvatarGroup>
            {users.map((user, index) => (
              <Avatar
                key={index}
                src={user.src}
                alt={user.name}
                status={user.status}
              />
            ))}
          </AvatarGroup>
        </div>
        
        <div>
          <h4 style={{ marginBottom: 12, color: '#666' }}>With Max Limit</h4>
          <AvatarGroup max={4}>
            {users.map((user, index) => (
              <Avatar
                key={index}
                src={user.src}
                alt={user.name}
                status={user.status}
              />
            ))}
          </AvatarGroup>
          <p style={{ fontSize: 14, color: '#666', marginTop: 8 }}>
            Showing 4 of {users.length} avatars
          </p>
        </div>
      </section>

      {/* Test Coverage */}
      <section style={{
        padding: 20,
        backgroundColor: '#f8fafc',
        borderRadius: 8,
        border: '1px solid #e2e8f0',
      }}>
        <h4 style={{ marginTop: 0, color: '#1e293b' }}>✅ Test Coverage</h4>
        <ul style={{ margin: 0, paddingLeft: 20, color: '#475569' }}>
          <li>All size variants (xs, sm, md, lg, xl, xxl)</li>
          <li>All shape variants (circle, rounded, square)</li>
          <li>All status indicators (online, away, busy, offline)</li>
          <li>Border variations</li>
          <li>Image fallback scenarios</li>
          <li>Interactive click handlers</li>
          <li>Avatar groups with max limits</li>
          <li>Custom fallback content</li>
        </ul>
      </section>
    </div>
  );
}