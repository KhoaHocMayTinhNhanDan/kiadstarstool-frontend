import { LoadingSpinner } from './Loading-spinner';

export const LoadingSpinnerTest = () => {
  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui' }}>
      <h2 style={{ marginBottom: '32px', color: '#1a202c', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
        🌀 Loading Spinner Demo
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>Sizes</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <LoadingSpinner size="sm" />
            <LoadingSpinner size="md" />
            <LoadingSpinner size="lg" />
            <LoadingSpinner size="xl" />
          </div>
        </section>

        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>Variants</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', backgroundColor: '#eee', padding: '16px', borderRadius: '8px' }}>
            <LoadingSpinner variant="primary" />
            <LoadingSpinner variant="secondary" />
            <LoadingSpinner variant="neutral" />
            <div style={{ backgroundColor: '#2196f3', padding: '8px', borderRadius: '4px' }}>
              <LoadingSpinner variant="white" />
            </div>
          </div>
        </section>

        {/* Real-world Examples */}
        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>Real-world Examples</h3>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              padding: '10px 20px', background: '#2196f3', color: 'white', 
              border: 'none', borderRadius: '6px', cursor: 'wait',
              fontSize: '14px', fontWeight: 500
            }}>
              <LoadingSpinner size="sm" variant="white" />
              <span>Processing...</span>
            </button>

            <div style={{ 
              padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', 
              display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'white'
            }}>
              <LoadingSpinner size="md" variant="primary" />
              <span style={{ color: '#4a5568', fontSize: '14px' }}>Loading user data...</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};