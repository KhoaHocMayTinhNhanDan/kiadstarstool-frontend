import { useState } from 'react';
import { RadioGroup, RadioItem, type RadioSize, type RadioVariant } from './Radio';

export const RadioTest = () => {
  const [value, setValue] = useState('default');
  
  const sizes: RadioSize[] = ['sm', 'md', 'lg'];
  const variants: RadioVariant[] = ['primary', 'success', 'danger', 'neutral'];

  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h2 style={{ marginBottom: '32px', color: '#1a202c', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
        🔘 Radio Component Demo
      </h2>

      {/* Sizes Section */}
      <section style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '16px', color: '#4a5568', fontSize: '18px' }}>Sizes</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {sizes.map((size) => (
            <div key={size} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RadioGroup defaultValue="1">
                <RadioItem value="1" size={size} />
              </RadioGroup>
              <span style={{ fontSize: '12px', color: '#718096', fontFamily: 'monospace' }}>{size}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Variants Section */}
      <section style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '16px', color: '#4a5568', fontSize: '18px' }}>Variants</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {variants.map((variant) => (
            <div key={variant} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RadioGroup defaultValue="1">
                <RadioItem value="1" variant={variant} />
              </RadioGroup>
              <span style={{ fontSize: '12px', color: '#718096', fontFamily: 'monospace' }}>{variant}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Example */}
      <section style={{ 
        padding: '24px', 
        backgroundColor: '#f7fafc', 
        borderRadius: '12px', 
        border: '1px solid #edf2f7' 
      }}>
        <h3 style={{ marginBottom: '16px', color: '#2d3748', fontSize: '18px', marginTop: 0 }}>Interactive Form</h3>
        
        <form>
          <RadioGroup value={value} onValueChange={setValue} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <RadioItem value="default" id="r1" variant="primary" />
              <label htmlFor="r1" style={{ fontSize: '14px', cursor: 'pointer', color: '#2d3748' }}>Default Option</label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <RadioItem value="comfortable" id="r2" variant="success" />
              <label htmlFor="r2" style={{ fontSize: '14px', cursor: 'pointer', color: '#2d3748' }}>Comfortable (Success)</label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <RadioItem value="compact" id="r3" variant="danger" />
              <label htmlFor="r3" style={{ fontSize: '14px', cursor: 'pointer', color: '#2d3748' }}>Compact (Danger)</label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: 0.5 }}>
              <RadioItem value="disabled" id="r4" disabled />
              <label htmlFor="r4" style={{ fontSize: '14px', cursor: 'not-allowed', color: '#2d3748' }}>Disabled Option</label>
            </div>
          </RadioGroup>
        </form>

        <div style={{ marginTop: '20px', padding: '12px', backgroundColor: '#2d3748', borderRadius: '6px', color: '#63b3ed', fontFamily: 'monospace', fontSize: '14px' }}>
          Selected Value: {value}
        </div>
      </section>

      {/* Real-world Examples */}
      <section style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '16px', color: '#4a5568', fontSize: '18px' }}>Real-world Examples: Plan Selection</h3>
        <RadioGroup defaultValue="pro" style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
          {['basic', 'pro', 'enterprise'].map((plan) => (
            <div key={plan} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '16px', 
              border: '1px solid #e2e8f0', 
              borderRadius: '8px',
              gap: '12px',
              backgroundColor: 'white'
            }}>
              <RadioItem value={plan} id={`plan-${plan}`} />
              <label htmlFor={`plan-${plan}`} style={{ flex: 1, cursor: 'pointer' }}>
                <div style={{ fontWeight: 600, textTransform: 'capitalize', color: '#2d3748' }}>{plan} Plan</div>
                <div style={{ fontSize: '12px', color: '#718096' }}>
                  {plan === 'basic' ? '$10/mo' : plan === 'pro' ? '$29/mo' : 'Contact us'}
                </div>
              </label>
            </div>
          ))}
        </RadioGroup>
      </section>
    </div>
  );
};