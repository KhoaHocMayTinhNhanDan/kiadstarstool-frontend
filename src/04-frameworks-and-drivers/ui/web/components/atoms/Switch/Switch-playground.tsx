import { useState } from 'react';
import { Switch, type SwitchSize, type SwitchVariant } from './Switch';

export const SwitchTest = () => {
  const [checked, setChecked] = useState(true);
  
  const sizes: SwitchSize[] = ['sm', 'md', 'lg'];
  const variants: SwitchVariant[] = ['primary', 'success', 'danger', 'neutral'];

  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h2 style={{ marginBottom: '32px', color: '#1a202c', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
        🎚️ Switch Component Demo
      </h2>

      {/* Sizes Section */}
      <section style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '16px', color: '#4a5568', fontSize: '18px' }}>Sizes</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
          {sizes.map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Switch size={size} checked={true} />
              <span style={{ fontSize: '12px', color: '#718096', fontFamily: 'monospace' }}>size="{size}"</span>
            </div>
          ))}
        </div>
      </section>

      {/* Variants Section */}
      <section style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '16px', color: '#4a5568', fontSize: '18px' }}>Variants</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
          {variants.map((variant) => (
            <div key={variant} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Switch variant={variant} checked={true} />
              <span style={{ fontSize: '12px', color: '#718096', fontFamily: 'monospace' }}>variant="{variant}"</span>
            </div>
          ))}
        </div>
      </section>

      {/* States Section */}
      <section style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '16px', color: '#4a5568', fontSize: '18px' }}>States</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ fontSize: '14px', color: '#2d3748' }}>Unchecked</label>
            <Switch checked={false} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ fontSize: '14px', color: '#2d3748' }}>Checked</label>
            <Switch checked={true} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ fontSize: '14px', color: '#2d3748' }}>Disabled (Off)</label>
            <Switch disabled checked={false} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ fontSize: '14px', color: '#2d3748' }}>Disabled (On)</label>
            <Switch disabled checked={true} />
          </div>
        </div>
      </section>

      {/* Interactive Playground */}
      <section style={{ 
        padding: '24px', 
        backgroundColor: '#f7fafc', 
        borderRadius: '12px', 
        border: '1px solid #edf2f7' 
      }}>
        <h3 style={{ marginBottom: '16px', color: '#2d3748', fontSize: '18px', marginTop: 0 }}>Interactive Playground</h3>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <Switch 
            id="interactive-switch"
            checked={checked} 
            onCheckedChange={setChecked} 
            size="lg"
            variant="success"
          />
          <label htmlFor="interactive-switch" style={{ fontSize: '16px', fontWeight: 500, cursor: 'pointer' }}>
            Toggle me!
          </label>
        </div>

        <div style={{ padding: '12px', backgroundColor: '#2d3748', borderRadius: '6px', color: '#63b3ed', fontFamily: 'monospace', fontSize: '14px' }}>
          Current State: {checked ? 'ON' : 'OFF'}
        </div>
      </section>

      {/* Real-world Examples */}
      <section style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '16px', color: '#4a5568', fontSize: '18px' }}>Real-world Examples: Settings</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'white' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#2d3748' }}>Notification Preferences</h4>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 500, fontSize: '14px', color: '#2d3748' }}>Email Notifications</div>
              <div style={{ fontSize: '12px', color: '#718096' }}>Receive daily summaries</div>
            </div>
            <Switch size="sm" />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 500, fontSize: '14px', color: '#2d3748' }}>Push Notifications</div>
              <div style={{ fontSize: '12px', color: '#718096' }}>Receive real-time alerts</div>
            </div>
            <Switch size="sm" checked variant="success" />
          </div>
        </div>
      </section>
    </div>
  );
};