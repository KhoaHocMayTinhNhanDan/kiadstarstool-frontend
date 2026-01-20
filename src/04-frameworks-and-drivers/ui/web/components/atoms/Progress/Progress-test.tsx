// src/04-frameworks-and-drivers/ui/web/components/atoms/Progress/Progress-test.tsx
import { useState } from 'react';
import { Progress, ProgressWithStatus, ProgressGroup } from './Progress';
import { useI18n } from '@/shared/i18n';
import { PROGRESS_CONFIG } from './Progress.constants';

export function ProgressTest() {
  const { t, locale, setLocale } = useI18n();
  const [selectedVariant, setSelectedVariant] = useState('default');
  const [selectedSize, setSelectedSize] = useState('md');
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount(prev => prev + 1);
    alert(t(PROGRESS_I18N_KEYS.clickMessage, 'Progress clicked!'));
  };

  const variants = PROGRESS_CONFIG.variants;
  const sizes = PROGRESS_CONFIG.sizes;

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <h2 style={{ marginBottom: 24, color: '#333' }}>🧪 Progress Component Tests</h2>
      
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
            <Progress
              key={variant}
              variant={variant}
              size="md"
              onClick={() => setSelectedVariant(variant)}
              style={{
                border: selectedVariant === variant ? '2px solid #3b82f6' : 'none'
              }}
            >
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Progress>
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
            <Progress
              key={size}
              size={size}
              variant="primary"
              onClick={() => setSelectedSize(size)}
              style={{
                border: selectedSize === size ? '2px solid #3b82f6' : 'none'
              }}
            >
              {size.toUpperCase()}
            </Progress>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {sizes.map(size => (
            <div key={size} style={{ textAlign: 'center' }}>
              <Progress size={size} variant="secondary">
                {size}
              </Progress>
              <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
                {PROGRESS_CONFIG.getSizeStyle(size).size}px
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* States Demo */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>⚡ States</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Progress variant="primary">
            Normal
          </Progress>
          <Progress variant="primary" disabled>
            Disabled
          </Progress>
          <Progress variant="primary" loading>
            {t(PROGRESS_I18N_KEYS.loadingText, 'Loading...')}
          </Progress>
          <Progress variant="primary" selected>
            Selected
          </Progress>
          <Progress 
            variant="primary" 
            onClick={handleClick}
          >
            Click Me ({clickCount})
          </Progress>
        </div>
      </section>

      {/* With Status */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>🔴 With Status</h3>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <ProgressWithStatus 
            variant="default" 
            size="lg"
            status="online"
          >
            Online
          </ProgressWithStatus>
          <ProgressWithStatus 
            variant="default" 
            size="lg"
            status="away"
          >
            Away
          </ProgressWithStatus>
          <ProgressWithStatus 
            variant="default" 
            size="lg"
            status="busy"
          >
            Busy
          </ProgressWithStatus>
          <ProgressWithStatus 
            variant="default" 
            size="lg"
            status="offline"
          >
            Offline
          </ProgressWithStatus>
        </div>
      </section>

      {/* Group Demo */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>👥 Group</h3>
        <div style={{ marginBottom: 16 }}>
          <h4 style={{ marginBottom: 8, color: '#666' }}>Basic Group</h4>
          <ProgressGroup spacing={12}>
            <Progress variant="primary">Item 1</Progress>
            <Progress variant="secondary">Item 2</Progress>
            <Progress variant="default">Item 3</Progress>
            <Progress variant="primary">Item 4</Progress>
            <Progress variant="secondary">Item 5</Progress>
          </ProgressGroup>
        </div>
        <div>
          <h4 style={{ marginBottom: 8, color: '#666' }}>With Max Limit</h4>
          <ProgressGroup max={3} spacing={8}>
            <Progress size="sm" variant="primary">A</Progress>
            <Progress size="sm" variant="secondary">B</Progress>
            <Progress size="sm" variant="default">C</Progress>
            <Progress size="sm" variant="primary">D</Progress>
            <Progress size="sm" variant="secondary">E</Progress>
          </ProgressGroup>
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
                <li key={s}>{s}: {PROGRESS_CONFIG.getSizeStyle(s).size}px</li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Defaults:</strong>
            <ul style={{ margin: '8px 0 0 0', paddingLeft: 20 }}>
              <li>Variant: {PROGRESS_CONFIG.defaults.variant}</li>
              <li>Size: {PROGRESS_CONFIG.defaults.size}</li>
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
          Create your custom Progress:
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
          
          <Progress
            variant={selectedVariant}
            size={selectedSize}
            onClick={handleClick}
            style={{ alignSelf: 'flex-start' }}
          >
            Test Progress
          </Progress>
          
          <div style={{ padding: 12, backgroundColor: '#e9ecef', borderRadius: 6 }}>
            <strong>Current config:</strong>
            <div style={{ marginTop: 4, fontSize: 14 }}>
              Variant: <code>{selectedVariant}</code>, 
              Size: <code>{selectedSize}</code> ({PROGRESS_CONFIG.getSizeStyle(selectedSize).size}px),
              Clicks: <code>{clickCount}</code>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
