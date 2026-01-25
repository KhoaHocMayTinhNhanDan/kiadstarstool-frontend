import { Input } from './Input';

export const InputTest = () => {
  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui' }}>
      <h2 style={{ marginBottom: '32px', color: '#1a202c', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
        ⌨️ Input Component Demo
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '400px' }}>
        
        {/* Sizes */}
        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>Sizes</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input size="sm" placeholder="Small Input" />
            <Input size="md" placeholder="Medium Input (Default)" />
            <Input size="lg" placeholder="Large Input" />
          </div>
        </section>

        {/* States */}
        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>States</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input placeholder="Normal" />
            <Input placeholder="Disabled" disabled />
            <Input placeholder="Error State" error defaultValue="Invalid Value" />
            <Input placeholder="Error with Message" error="Email không hợp lệ" />
          </div>
        </section>

        {/* With Icons */}
        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>With Icons</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input 
              placeholder="Search..." 
              leftIcon={<span>🔍</span>} 
            />
            <Input 
              placeholder="Enter amount" 
              rightIcon={<span>$</span>} 
            />
            <Input 
              placeholder="Email" 
              leftIcon={<span>📧</span>}
              rightIcon={<span>✅</span>}
              defaultValue="user@example.com"
            />
          </div>
        </section>

        {/* Real-world Examples */}
        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>Real-world Examples: Login Form</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'white' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: 500, color: '#4a5568' }}>Email</label>
              <Input placeholder="john@example.com" leftIcon={<span>✉️</span>} fullWidth />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: 500, color: '#4a5568' }}>Password</label>
              <Input type="password" placeholder="••••••••" leftIcon={<span>🔒</span>} fullWidth />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: 500, color: '#4a5568' }}>Website (Optional)</label>
              <Input placeholder="https://" leftIcon={<span>🌐</span>} fullWidth />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};