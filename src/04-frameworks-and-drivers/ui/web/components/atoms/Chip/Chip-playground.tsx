import { Chip } from '../Chip/Chip';

export const ChipTest = () => {
  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui' }}>
      <h2 style={{ marginBottom: '32px', color: '#1a202c', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
        🏷️ Chip Component Demo
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>Variants</h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Chip label="Filled" variant="filled" color="primary" />
            <Chip label="Outlined" variant="outlined" color="primary" />
            <Chip label="Ghost" variant="ghost" color="primary" />
          </div>
        </section>

        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>Colors</h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Chip label="Neutral" color="neutral" />
            <Chip label="Primary" color="primary" />
            <Chip label="Success" color="success" />
            <Chip label="Danger" color="danger" />
          </div>
        </section>

        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>Features</h3>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Chip label="Deletable" onDelete={() => alert('Deleted!')} />
            <Chip label="Clickable" onClick={() => alert('Clicked!')} color="primary" variant="outlined" />
            <Chip 
              label="With Icon" 
              icon={<span>🔥</span>} 
              color="danger" 
              variant="ghost" 
            />
          </div>
        </section>

        {/* Real-world Examples */}
        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>Real-world Examples</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'white', maxWidth: '400px' }}>
            
            {/* Status Indicators */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', color: '#2d3748' }}>Order #1234</span>
              <Chip label="Processing" color="warning" variant="ghost" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', color: '#2d3748' }}>Order #1235</span>
              <Chip label="Delivered" color="success" variant="ghost" />
            </div>

            {/* Filter Tags */}
            <div>
              <div style={{ fontSize: '12px', color: '#718096', marginBottom: '8px' }}>Active Filters:</div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <Chip label="Size: Medium" onDelete={() => {}} />
                <Chip label="Color: Blue" onDelete={() => {}} />
                <Chip label="Price: $0-$50" onDelete={() => {}} />
                <Chip label="Clear all" variant="ghost" color="danger" onClick={() => {}} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};