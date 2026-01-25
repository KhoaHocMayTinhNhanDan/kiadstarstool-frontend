import { Avatar } from './Avatar';
import { Button } from '../Button/Button';

export const AvatarTest = () => {
  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui' }}>
      <h2 style={{ marginBottom: '32px', color: '#1a202c', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
        👤 Avatar Component Demo
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Sizes */}
        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>Sizes</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Avatar size="sm" fallback="SM" />
            <Avatar size="md" fallback="MD" />
            <Avatar size="lg" fallback="LG" />
            <Avatar size="xl" fallback="XL" />
          </div>
        </section>

        {/* Image vs Fallback */}
        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>Image vs Fallback</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'center' }}>
              <Avatar 
                size="lg" 
                src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80" 
                alt="Colm Tuite" 
                fallback="CT" 
              />
              <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Image Loaded</div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <Avatar 
                size="lg" 
                src="broken-link.jpg" 
                fallback="JD" 
              />
              <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Fallback (Initials)</div>
            </div>
          </div>
        </section>

        {/* Real-world Examples */}
        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>Real-world Examples</h3>
          
          {/* User Profile Card */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'white', maxWidth: '350px' }}>
            <Avatar size="lg" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80" fallback="JD" />
            <div>
              <div style={{ fontWeight: 600, color: '#2d3748' }}>John Doe</div>
              <div style={{ fontSize: '14px', color: '#718096' }}>Software Engineer</div>
            </div>
            <Button size="sm" variant="outline" style={{ marginLeft: 'auto' }}>Follow</Button>
          </div>

          {/* Comment Item */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px', maxWidth: '400px' }}>
            <Avatar size="sm" fallback="AL" />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#2d3748' }}>Alice <span style={{ fontWeight: 400, color: '#718096' }}>• 2h ago</span></div>
              <div style={{ fontSize: '14px', color: '#4a5568', marginTop: '4px' }}>This looks amazing! Great job on the implementation.</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};