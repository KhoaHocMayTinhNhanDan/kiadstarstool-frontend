import { Textarea } from './Textarea';

export const TextareaTest = () => {
  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui' }}>
      <h2 style={{ marginBottom: '32px', color: '#1a202c', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
        📝 Textarea Component Demo
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '500px' }}>
        
        {/* Sizes */}
        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>Sizes</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Textarea size="sm" placeholder="Small Textarea" rows={2} />
            <Textarea size="md" placeholder="Medium Textarea (Default)" rows={3} />
            <Textarea size="lg" placeholder="Large Textarea" rows={4} />
          </div>
        </section>

        {/* States */}
        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>States</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Textarea placeholder="Normal" />
            <Textarea placeholder="Disabled" disabled />
            <Textarea placeholder="Error State" error defaultValue="Invalid content" />
            <Textarea placeholder="Error with Message" error="Description is required" />
          </div>
        </section>

        {/* Resize Options */}
        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>Resize Options</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Vertical (Default)</label>
              <Textarea resize="vertical" placeholder="Can resize vertically" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>No Resize</label>
              <Textarea resize="none" placeholder="Fixed size" />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};