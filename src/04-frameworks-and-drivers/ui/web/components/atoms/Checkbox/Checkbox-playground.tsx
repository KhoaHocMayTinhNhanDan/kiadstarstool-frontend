import { useState } from 'react';
import { Checkbox } from './Checkbox';

export const CheckboxTest = () => {
  const [checked, setChecked] = useState<boolean | 'indeterminate'>(true);

  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui' }}>
      <h2 style={{ marginBottom: '32px', color: '#1a202c', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
        ☑️ Checkbox Component Demo
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '300px' }}>
        
        {/* Basic */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Checkbox id="c1" checked={checked === true} onCheckedChange={(c) => setChecked(c)} />
          <label htmlFor="c1" style={{ fontSize: '14px', cursor: 'pointer', userSelect: 'none' }}>
            Accept terms and conditions
          </label>
        </div>

        {/* Unchecked */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Checkbox id="c2" />
          <label htmlFor="c2" style={{ fontSize: '14px', cursor: 'pointer', userSelect: 'none' }}>
            Subscribe to newsletter
          </label>
        </div>

        {/* Disabled */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: 0.6 }}>
          <Checkbox id="c3" disabled checked />
          <label htmlFor="c3" style={{ fontSize: '14px', cursor: 'not-allowed', userSelect: 'none' }}>
            Disabled Checked
          </label>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: 0.6 }}>
          <Checkbox id="c4" disabled />
          <label htmlFor="c4" style={{ fontSize: '14px', cursor: 'not-allowed', userSelect: 'none' }}>
            Disabled Unchecked
          </label>
        </div>

        {/* Real-world Examples */}
        <section style={{ marginTop: '24px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>Real-world Examples</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'white' }}>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <Checkbox id="terms" style={{ marginTop: '2px' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="terms" style={{ fontSize: '14px', fontWeight: 500, color: '#2d3748', cursor: 'pointer' }}>I agree to the Terms and Privacy Policy</label>
                <span style={{ fontSize: '12px', color: '#718096' }}>By creating an account, you agree to our Conditions of Use and Privacy Notice.</span>
              </div>
            </div>

            <div style={{ height: '1px', backgroundColor: '#e2e8f0' }} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Checkbox id="marketing" checked />
                <label htmlFor="marketing" style={{ fontSize: '14px', color: '#2d3748', cursor: 'pointer' }}>Marketing emails</label>
              </div>
              <span style={{ fontSize: '12px', color: '#718096', backgroundColor: '#edf2f7', padding: '2px 6px', borderRadius: '4px' }}>Optional</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};