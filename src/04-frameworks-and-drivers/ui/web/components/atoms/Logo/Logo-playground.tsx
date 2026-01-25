import { Logo } from './Logo';

export const LogoTest = () => {
  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui' }}>
      <h2 style={{ marginBottom: '32px', color: '#1a202c', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
        ⭐ Logo Component Demo
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>Sizes</h3>
          <div style={{ display: 'flex', alignItems: 'end', gap: '24px' }}>
            <Logo size="sm" />
            <Logo size="md" />
            <Logo size="lg" />
            <Logo size="xl" />
          </div>
        </section>

        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>Variants</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', backgroundColor: '#eee', padding: '16px', borderRadius: '8px' }}>
            <Logo variant="color" />
            <Logo variant="black" />
            <div style={{ backgroundColor: '#2196f3', padding: '8px', borderRadius: '4px' }}>
              <Logo variant="white" />
            </div>
          </div>
        </section>

        {/* Real-world Examples */}
        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>Real-world Examples</h3>
          
          {/* Header Simulation */}
          <div style={{ 
            padding: '12px 24px', border: '1px solid #e2e8f0', borderRadius: '8px 8px 0 0',
            display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', backgroundColor: 'white'
          }}>
            <Logo size="md" />
            <span style={{ fontWeight: 700, fontSize: '18px', color: '#1a202c' }}>KiadStars</span>
            <nav style={{ marginLeft: 'auto', display: 'flex', gap: '24px', fontSize: '14px', color: '#4a5568', fontWeight: 500 }}>
              <span>Products</span>
              <span>Solutions</span>
              <span>Pricing</span>
            </nav>
          </div>

          {/* Footer Simulation */}
          <div style={{ 
            padding: '24px', backgroundColor: '#1a202c', color: 'white', borderRadius: '0 0 8px 8px',
            display: 'flex', flexDirection: 'column', gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Logo size="md" variant="white" />
              <span style={{ fontWeight: 700, fontSize: '18px' }}>KiadStars</span>
            </div>
            <div style={{ fontSize: '14px', color: '#a0aec0' }}>
              © 2024 KiadStars Inc. All rights reserved.
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};