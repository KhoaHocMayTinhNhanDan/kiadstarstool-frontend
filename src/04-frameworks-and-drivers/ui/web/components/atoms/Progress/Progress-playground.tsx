import { useState, useEffect } from 'react';
import { Progress, type ProgressSize, type ProgressVariant } from './Progress';

export const ProgressTest = () => {
  const [progress, setProgress] = useState(13);

  // Giả lập loading effect
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  const sizes: ProgressSize[] = ['sm', 'md', 'lg'];
  const variants: ProgressVariant[] = ['primary', 'success', 'danger', 'neutral'];

  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h2 style={{ marginBottom: '32px', color: '#1a202c', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
        📊 Progress Component Demo
      </h2>

      {/* Sizes */}
      <section style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '16px', color: '#4a5568', fontSize: '18px' }}>Sizes</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
          {sizes.map((size) => (
            <div key={size}>
              <div style={{ marginBottom: '8px', fontSize: '12px', color: '#718096', fontFamily: 'monospace' }}>size="{size}"</div>
              <Progress value={50} size={size} />
            </div>
          ))}
        </div>
      </section>

      {/* Variants */}
      <section style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '16px', color: '#4a5568', fontSize: '18px' }}>Variants</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
          {variants.map((variant) => (
            <div key={variant}>
              <div style={{ marginBottom: '8px', fontSize: '12px', color: '#718096', fontFamily: 'monospace' }}>variant="{variant}"</div>
              <Progress value={75} variant={variant} />
            </div>
          ))}
        </div>
      </section>

      {/* States */}
      <section style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '16px', color: '#4a5568', fontSize: '18px' }}>States</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
          <div>
            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#2d3748' }}>Animated Loading (13% - 66%)</div>
            <Progress value={progress} />
          </div>
          
          <div>
            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#2d3748' }}>Indeterminate (Loading...)</div>
            <Progress indeterminate />
          </div>
        </div>
      </section>

      {/* Real-world Examples */}
      <section style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '16px', color: '#4a5568', fontSize: '18px' }}>Real-world Examples: File Upload</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px', padding: '24px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'white' }}>
          
          {/* File 1 */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '14px' }}>
              <span style={{ fontWeight: 500, color: '#2d3748' }}>report_2024.pdf</span>
              <span style={{ color: '#22c55e', fontWeight: 500 }}>Completed</span>
            </div>
            <Progress value={100} variant="success" size="sm" />
          </div>

          {/* File 2 */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '14px' }}>
              <span style={{ fontWeight: 500, color: '#2d3748' }}>large_video.mp4</span>
              <span style={{ color: '#718096' }}>45%</span>
            </div>
            <Progress value={45} variant="primary" size="sm" />
          </div>

          {/* File 3 */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '14px' }}>
              <span style={{ fontWeight: 500, color: '#2d3748' }}>processing_data.csv</span>
              <span style={{ color: '#718096' }}>Processing...</span>
            </div>
            <Progress indeterminate variant="neutral" size="sm" />
          </div>

        </div>
      </section>
    </div>
  );
};