// src/04-frameworks-and-drivers/ui/web/components/atoms/Radio/Radio-test.tsx
import { useState } from 'react';
import { Radio, RadioWithStatus, RadioGroup } from './Radio';
import { useI18n } from '@/shared/i18n';
import { RADIO_CONFIG } from './Radio.constants';

export function RadioTest() {
  const { t, locale, setLocale } = useI18n();
  const [selectedVariant, setSelectedVariant] = useState('default');
  const [selectedSize, setSelectedSize] = useState('md');
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount(prev => prev + 1);
    alert(t(RADIO_I18N_KEYS.clickMessage, 'Radio clicked!'));
  };

  const variants = RADIO_CONFIG.variants;
  const sizes = RADIO_CONFIG.sizes;

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <h2 style={{ marginBottom: 24, color: '#333' }}>🧪 Radio Component Tests</h2>
      
      {/* I18N Demo */}
      <section style={{ marginBottom: 32, padding: 16, backgroundColor: '#f8fafc', borderRadius: 8 }}>
        <h3 style={{ marginBottom: 12, color: '#555' }}>🌐 I18N Demo</h3>
        <p style={{ marginBottom: 12, color: '#666' }}>
          Current locale: <strong>{locale}</strong>
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['en', 'vi', 'ja', 'zh'].map(lang => (
            <button
              key={lang}
              onClick={() => setLocale(lang)}
              style={{
                padding: '6px 12px',
                backgroundColor: locale === lang ? '#3b82f6' : '#e5e7eb',
                color: locale === lang ? 'white' : '#374151',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: 14
              }}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      {/* Variants Demo */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>🎨 Variants</h3>
        <p style={{ marginBottom: 12, color: '#666' }}>
          Selected: <strong>{selectedVariant}</strong>
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
          {variants.map(variant => (
            <Radio
              key={variant}
              variant={variant}
              size="md"
              onClick={() => setSelectedVariant(variant)}
              style={{
                border: selectedVariant === variant ? '2px solid #3b82f6' : 'none'
              }}
            >
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Radio>
          ))}
        </div>
      </section>

      {/* Sizes Demo */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>📏 Sizes</h3>
        <p style={{ marginBottom: 12, color: '#666' }}>
          Selected: <strong>{selectedSize}</strong>
        </p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
          {sizes.map(size => (
            <Radio
              key={size}
              size={size}
              variant="primary"
              onClick={() => setSelectedSize(size)}
              style={{
                border: selectedSize === size ? '2px solid #3b82f6' : 'none'
              }}
            >
              {size.toUpperCase()}
            </Radio>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {sizes.map(size => (
            <div key={size} style={{ textAlign: 'center' }}>
              <Radio size={size} variant="secondary">
                {size}
              </Radio>
              <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
                {RADIO_CONFIG.getSizeStyle(size).size}px
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* States Demo */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>⚡ States</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Radio variant="primary">
            Normal
          </Radio>
          <Radio variant="primary" disabled>
            Disabled
          </Radio>
          <Radio variant="primary" loading>
            {t(RADIO_I18N_KEYS.loadingText, 'Loading...')}
          </Radio>
          <Radio variant="primary" selected>
            Selected
          </Radio>
          <Radio 
            variant="primary" 
            onClick={handleClick}
          >
            Click Me ({clickCount})
          </Radio>
        </div>
      </section>

      {/* With Status */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>🔴 With Status</h3>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <RadioWithStatus 
            variant="default" 
            size="lg"
            status="online"
          >
            Online
          </RadioWithStatus>
          <RadioWithStatus 
            variant="default" 
            size="lg"
            status="away"
          >
            Away
          </RadioWithStatus>
          <RadioWithStatus 
            variant="default" 
            size="lg"
            status="busy"
          >
            Busy
          </RadioWithStatus>
          <RadioWithStatus 
            variant="default" 
            size="lg"
            status="offline"
          >
            Offline
          </RadioWithStatus>
        </div>
      </section>

      {/* Group Demo */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>👥 Group</h3>
        <div style={{ marginBottom: 16 }}>
          <h4 style={{ marginBottom: 8, color: '#666' }}>Basic Group</h4>
          <RadioGroup spacing={12}>
            <Radio variant="primary">Item 1</Radio>
            <Radio variant="secondary">Item 2</Radio>
            <Radio variant="default">Item 3</Radio>
            <Radio variant="primary">Item 4</Radio>
            <Radio variant="secondary">Item 5</Radio>
          </RadioGroup>
        </div>
        <div>
          <h4 style={{ marginBottom: 8, color: '#666' }}>With Max Limit</h4>
          <RadioGroup max={3} spacing={8}>
            <Radio size="sm" variant="primary">A</Radio>
            <Radio size="sm" variant="secondary">B</Radio>
            <Radio size="sm" variant="default">C</Radio>
            <Radio size="sm" variant="primary">D</Radio>
            <Radio size="sm" variant="secondary">E</Radio>
          </RadioGroup>
          <p style={{ fontSize: 14, color: '#666', marginTop: 8 }}>
            Showing 3 of 5 items
          </p>
        </div>
      </section>

      {/* Config Summary */}
      <section style={{ 
        padding: 20, 
        backgroundColor: '#f0f9ff', 
        borderRadius: 8,
        border: '1px solid #bae6fd'
      }}>
        <h4 style={{ marginTop: 0, color: '#0369a1' }}>📊 Config Summary</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 16 }}>
          <div>
            <strong>Variants:</strong>
            <ul style={{ margin: '8px 0 0 0', paddingLeft: 20 }}>
              {variants.map(v => <li key={v}>{v}</li>)}
            </ul>
          </div>
          <div>
            <strong>Sizes:</strong>
            <ul style={{ margin: '8px 0 0 0', paddingLeft: 20 }}>
              {sizes.map(s => (
                <li key={s}>{s}: {RADIO_CONFIG.getSizeStyle(s).size}px</li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Defaults:</strong>
            <ul style={{ margin: '8px 0 0 0', paddingLeft: 20 }}>
              <li>Variant: {RADIO_CONFIG.defaults.variant}</li>
              <li>Size: {RADIO_CONFIG.defaults.size}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Test */}
      <section style={{ 
        padding: 20, 
        backgroundColor: '#f8fafc', 
        borderRadius: 8,
        marginTop: 32
      }}>
        <h3 style={{ marginBottom: 12, color: '#555' }}>🔄 Interactive Test</h3>
        <p style={{ marginBottom: 16, color: '#666' }}>
          Create your custom Radio:
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 8, color: '#555' }}>
              Variant:
              <select 
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
                style={{ marginLeft: 8, padding: '6px 12px', borderRadius: 4 }}
              >
                {variants.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </label>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: 8, color: '#555' }}>
              Size:
              <select 
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                style={{ marginLeft: 8, padding: '6px 12px', borderRadius: 4 }}
              >
                {sizes.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </label>
          </div>
          
          <Radio
            variant={selectedVariant}
            size={selectedSize}
            onClick={handleClick}
            style={{ alignSelf: 'flex-start' }}
          >
            Test Radio
          </Radio>
          
          <div style={{ padding: 12, backgroundColor: '#e9ecef', borderRadius: 6 }}>
            <strong>Current config:</strong>
            <div style={{ marginTop: 4, fontSize: 14 }}>
              Variant: <code>{selectedVariant}</code>, 
              Size: <code>{selectedSize}</code> ({RADIO_CONFIG.getSizeStyle(selectedSize).size}px),
              Clicks: <code>{clickCount}</code>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
