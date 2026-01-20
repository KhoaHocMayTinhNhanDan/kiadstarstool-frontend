// src/04-frameworks-and-drivers/ui/web/components/atoms/Loading-spinner/Loading-spinner-test.tsx
import { useState } from 'react';
import { LoadingSpinner } from './Loading-spinner';
import { useI18n } from '@/shared/i18n';
import { 
  LOADING_SPINNER_SIZES, 
  LOADING_SPINNER_VARIANTS, 
  LOADING_SPINNER_TYPES,
  LOADING_SPINNER_CONFIG 
} from './Loading-spinner.constants';

export function LoadingSpinnerTest() {
  const { t, locale, setLocale } = useI18n();
  const [fullScreenMode, setFullScreenMode] = useState(false);
  const [withBackdrop, setWithBackdrop] = useState(true);
  const [selectedSpinner, setSelectedSpinner] = useState<string | null>(null);
  const [delayTime, setDelayTime] = useState(0);

  const delayOptions = [0, 300, 1000, 2000];
  const speedOptions = [500, 1000, 1500, 2000];

  // Demo loading states
  const loadingTasks = [
    { id: 1, name: 'Fetching user data', status: 'loading' as const },
    { id: 2, name: 'Processing payment', status: 'success' as const },
    { id: 3, name: 'Uploading files', status: 'loading' as const },
    { id: 4, name: 'Generating report', status: 'loading' as const },
  ];

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <h2 style={{ marginBottom: 32, color: '#333' }}>🌀 Loading Spinner Component Tests</h2>
      
      {/* I18N Demo */}
      <section style={{ marginBottom: 40, padding: 20, backgroundColor: '#f8fafc', borderRadius: 8 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>🌐 I18N Demo</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
          {['en', 'vi', 'ja', 'zh'].map(lang => (
            <button
              key={lang}
              onClick={() => setLocale(lang)}
              style={{
                padding: '8px 16px',
                backgroundColor: locale === lang ? '#3b82f6' : '#e5e7eb',
                color: locale === lang ? 'white' : '#374151',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 14,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (locale !== lang) {
                  e.currentTarget.style.backgroundColor = '#dbeafe';
                }
              }}
              onMouseLeave={(e) => {
                if (locale !== lang) {
                  e.currentTarget.style.backgroundColor = '#e5e7eb';
                }
              }}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
        <p style={{ margin: 0, color: '#666', fontSize: 14 }}>
          Current locale: <strong>{locale}</strong> | Loading text: {t('loadingSpinner.loading', 'Loading...')}
        </p>
      </section>

      {/* Size Variations */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 20, color: '#555' }}>📏 Sizes</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', 
          gap: 24 
        }}>
          {LOADING_SPINNER_SIZES.map(size => (
            <div key={size} style={{ textAlign: 'center' }}>
              <div style={{ 
                minHeight: 80, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: 12 
              }}>
                <LoadingSpinner 
                  size={size}
                  variant="primary"
                  onClick={() => setSelectedSpinner(`${size} spinner`)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>
                {size.toUpperCase()}
              </div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>
                {LOADING_SPINNER_CONFIG.getSizeStyle(size).width}px
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Variants */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 20, color: '#555' }}>🎨 Variants</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
          gap: 20 
        }}>
          {LOADING_SPINNER_VARIANTS.map(variant => (
            <div key={variant} style={{ textAlign: 'center' }}>
              <div style={{ 
                minHeight: 70, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: 12 
              }}>
                <LoadingSpinner 
                  variant={variant}
                  type="spinner"
                  onClick={() => setSelectedSpinner(`${variant} variant`)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </div>
              <div style={{ 
                fontSize: 10, 
                color: LOADING_SPINNER_CONFIG.getVariantStyle(variant).primaryColor,
                marginTop: 4 
              }}>
                {LOADING_SPINNER_CONFIG.getVariantStyle(variant).primaryColor}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spinner Types */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 20, color: '#555' }}>🌀 Spinner Types</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', 
          gap: 24 
        }}>
          {LOADING_SPINNER_TYPES.map(type => (
            <div key={type} style={{ textAlign: 'center' }}>
              <div style={{ 
                minHeight: 80, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: 12 
              }}>
                <LoadingSpinner 
                  type={type}
                  variant="primary"
                  onClick={() => setSelectedSpinner(`${type} type`)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>
                {type.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Label Positions */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 20, color: '#555' }}>📝 Label Positions</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
          gap: 30,
          alignItems: 'center' 
        }}>
          {(['top', 'bottom', 'left', 'right'] as const).map(position => (
            <div key={position} style={{ textAlign: 'center' }}>
              <LoadingSpinner 
                size="lg"
                variant="primary"
                label={`Loading ${position}`}
                labelPosition={position}
                onClick={() => setSelectedSpinner(`Label ${position}`)}
                style={{ cursor: 'pointer' }}
              />
              <div style={{ fontSize: 12, color: '#6b7280', marginTop: 8 }}>
                Position: {position}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customization Controls */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 20, color: '#555' }}>⚙️ Customization</h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: 30,
          marginBottom: 30 
        }}>
          {/* Delay Settings */}
          <div style={{ padding: 20, backgroundColor: '#f9fafb', borderRadius: 8 }}>
            <h4 style={{ marginTop: 0, marginBottom: 16, color: '#4b5563' }}>Delay Settings</h4>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
              {delayOptions.map(delay => (
                <button
                  key={delay}
                  onClick={() => setDelayTime(delay)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: delayTime === delay ? '#10b981' : '#e5e7eb',
                    color: delayTime === delay ? 'white' : '#374151',
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontSize: 14,
                  }}
                >
                  {delay === 0 ? 'No Delay' : `${delay}ms`}
                </button>
              ))}
            </div>
            <LoadingSpinner 
              size="md"
              variant="success"
              label={delayTime > 0 ? `Delay: ${delayTime}ms` : 'No delay'}
              delay={delayTime}
            />
          </div>

          {/* Speed Settings */}
          <div style={{ padding: 20, backgroundColor: '#f9fafb', borderRadius: 8 }}>
            <h4 style={{ marginTop: 0, marginBottom: 16, color: '#4b5563' }}>Speed Settings</h4>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
              {speedOptions.map(speed => (
                <button
                  key={speed}
                  onClick={() => {}}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#e5e7eb',
                    color: '#374151',
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontSize: 14,
                  }}
                >
                  {speed}ms
                </button>
              ))}
            </div>
            <LoadingSpinner 
              size="md"
              variant="warning"
              label="Custom speed"
              speed={1000}
            />
          </div>
        </div>

        {/* Thickness Demo */}
        <div style={{ padding: 20, backgroundColor: '#f9fafb', borderRadius: 8 }}>
          <h4 style={{ marginTop: 0, marginBottom: 20, color: '#4b5563' }}>Thickness Variations</h4>
          <div style={{ display: 'flex', gap: 30, alignItems: 'center', justifyContent: 'center' }}>
            {[1, 2, 3, 4, 5].map(thickness => (
              <div key={thickness} style={{ textAlign: 'center' }}>
                <LoadingSpinner 
                  size="lg"
                  variant="primary"
                  thickness={thickness}
                />
                <div style={{ fontSize: 12, color: '#6b7280', marginTop: 8 }}>
                  {thickness}px
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Screen Mode */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 20, color: '#555' }}>🖥️ Full Screen Mode</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: 20,
          marginBottom: 20 
        }}>
          <div style={{ padding: 20, backgroundColor: '#f0f9ff', borderRadius: 8, border: '1px solid #bae6fd' }}>
            <h4 style={{ marginTop: 0, marginBottom: 16, color: '#0369a1' }}>Full Screen Controls</h4>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
              <button
                onClick={() => setFullScreenMode(!fullScreenMode)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: fullScreenMode ? '#ef4444' : '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {fullScreenMode ? 'Exit Full Screen' : 'Show Full Screen'}
              </button>
              
              <button
                onClick={() => setWithBackdrop(!withBackdrop)}
                disabled={!fullScreenMode}
                style={{
                  padding: '10px 20px',
                  backgroundColor: !fullScreenMode ? '#9ca3af' : withBackdrop ? '#3b82f6' : '#e5e7eb',
                  color: !fullScreenMode ? '#6b7280' : withBackdrop ? 'white' : '#374151',
                  border: 'none',
                  borderRadius: 6,
                  cursor: fullScreenMode ? 'pointer' : 'not-allowed',
                  fontSize: 14,
                  opacity: !fullScreenMode ? 0.6 : 1,
                }}
              >
                {withBackdrop ? 'Hide Backdrop' : 'Show Backdrop'}
              </button>
            </div>
            
            <div style={{ 
              height: 200, 
              position: 'relative', 
              border: '2px dashed #d1d5db',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f9fafb'
            }}>
              {fullScreenMode ? (
                <div style={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: withBackdrop ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 20
                }}>
                  <LoadingSpinner 
                    size="xl"
                    variant="light"
                    label="Full Screen Loading"
                    fullScreen={false}
                  />
                  <p style={{ color: 'white', margin: 0, fontSize: 14 }}>
                    {withBackdrop ? 'With backdrop' : 'Without backdrop'}
                  </p>
                </div>
              ) : (
                <p style={{ color: '#6b7280', textAlign: 'center' }}>
                  Click "Show Full Screen" to preview full screen loading
                </p>
              )}
            </div>
          </div>

          {/* Real-world loading examples */}
          <div style={{ padding: 20, backgroundColor: '#fef3c7', borderRadius: 8, border: '1px solid #fcd34d' }}>
            <h4 style={{ marginTop: 0, marginBottom: 16, color: '#92400e' }}>Loading Tasks Demo</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {loadingTasks.map(task => (
                <div 
                  key={task.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 12,
                    backgroundColor: 'white',
                    borderRadius: 6,
                    border: '1px solid #e5e7eb',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {task.status === 'loading' ? (
                      <LoadingSpinner size="sm" variant="primary" />
                    ) : (
                      <div style={{ width: 20, height: 20 }}>✅</div>
                    )}
                    <span style={{ fontSize: 14, color: '#374151' }}>{task.name}</span>
                  </div>
                  <div style={{ 
                    fontSize: 12, 
                    color: task.status === 'loading' ? '#f59e0b' : '#10b981',
                    fontWeight: 500 
                  }}>
                    {task.status === 'loading' ? 'Processing...' : 'Completed'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Custom Color Demo */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 20, color: '#555' }}>🎨 Custom Colors</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
          gap: 20 
        }}>
          {['#8b5cf6', '#ec4899', '#f97316', '#06b6d4', '#84cc16'].map(color => (
            <div key={color} style={{ textAlign: 'center' }}>
              <LoadingSpinner 
                size="md"
                color={color}
                label="Custom"
              />
              <div style={{ 
                fontSize: 12, 
                color: '#6b7280', 
                marginTop: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4
              }}>
                <div style={{ 
                  width: 12, 
                  height: 12, 
                  backgroundColor: color, 
                  borderRadius: 2 
                }} />
                {color}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Test Summary */}
      <section style={{
        padding: 24,
        backgroundColor: '#f8fafc',
        borderRadius: 8,
        border: '1px solid #e2e8f0',
        marginBottom: 40
      }}>
        <h4 style={{ marginTop: 0, marginBottom: 16, color: '#1e293b' }}>📊 Test Summary</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          <div>
            <strong style={{ color: '#374151' }}>Sizes ({LOADING_SPINNER_SIZES.length}):</strong>
            <ul style={{ margin: '8px 0 0 0', paddingLeft: 20, fontSize: 14, color: '#475569' }}>
              {LOADING_SPINNER_SIZES.map(size => (
                <li key={size}>
                  {size}: {LOADING_SPINNER_CONFIG.getSizeStyle(size).width}px
                </li>
              ))}
            </ul>
          </div>
          <div>
            <strong style={{ color: '#374151' }}>Variants ({LOADING_SPINNER_VARIANTS.length}):</strong>
            <ul style={{ margin: '8px 0 0 0', paddingLeft: 20, fontSize: 14, color: '#475569' }}>
              {LOADING_SPINNER_VARIANTS.map(variant => (
                <li key={variant} style={{ color: LOADING_SPINNER_CONFIG.getVariantStyle(variant).primaryColor }}>
                  {variant}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <strong style={{ color: '#374151' }}>Types ({LOADING_SPINNER_TYPES.length}):</strong>
            <ul style={{ margin: '8px 0 0 0', paddingLeft: 20, fontSize: 14, color: '#475569' }}>
              {LOADING_SPINNER_TYPES.map(type => (
                <li key={type}>{type}</li>
              ))}
            </ul>
          </div>
          <div>
            <strong style={{ color: '#374151' }}>Features:</strong>
            <ul style={{ margin: '8px 0 0 0', paddingLeft: 20, fontSize: 14, color: '#475569' }}>
              <li>Full screen mode</li>
              <li>Custom delay</li>
              <li>Speed control</li>
              <li>Label positioning</li>
              <li>Custom colors</li>
              <li>I18N support</li>
              <li>Thickness control</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section style={{
        padding: 24,
        backgroundColor: '#ecfdf5',
        borderRadius: 8,
        border: '1px solid #a7f3d0',
      }}>
        <h4 style={{ marginTop: 0, marginBottom: 20, color: '#065f46' }}>💡 Usage Examples</h4>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {/* Example 1: Page Loading */}
          <div style={{ padding: 16, backgroundColor: 'white', borderRadius: 6, border: '1px solid #d1fae5' }}>
            <h5 style={{ marginTop: 0, marginBottom: 12, color: '#047857' }}>Page Loading</h5>
            <pre style={{ 
              margin: 0, 
              fontSize: 12, 
              backgroundColor: '#f0fdf4', 
              padding: 12, 
              borderRadius: 4,
              overflow: 'auto'
            }}>
{`<LoadingSpinner 
  fullScreen
  variant="primary"
  label="Loading page..."
  withBackdrop
/>`}
            </pre>
          </div>

          {/* Example 2: Button Loading */}
          <div style={{ padding: 16, backgroundColor: 'white', borderRadius: 6, border: '1px solid #d1fae5' }}>
            <h5 style={{ marginTop: 0, marginBottom: 12, color: '#047857' }}>Button Loading</h5>
            <pre style={{ 
              margin: 0, 
              fontSize: 12, 
              backgroundColor: '#f0fdf4', 
              padding: 12, 
              borderRadius: 4,
              overflow: 'auto'
            }}>
{`<button disabled>
  <LoadingSpinner 
    size="sm"
    variant="light"
    label="Saving..."
    labelPosition="right"
  />
</button>`}
            </pre>
          </div>

          {/* Example 3: Inline Loading */}
          <div style={{ padding: 16, backgroundColor: 'white', borderRadius: 6, border: '1px solid #d1fae5' }}>
            <h5 style={{ marginTop: 0, marginBottom: 12, color: '#047857' }}>Inline Loading</h5>
            <pre style={{ 
              margin: 0, 
              fontSize: 12, 
              backgroundColor: '#f0fdf4', 
              padding: 12, 
              borderRadius: 4,
              overflow: 'auto'
            }}>
{`<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <LoadingSpinner 
    size="xs"
    variant="success"
    type="dots"
  />
  <span>Processing request...</span>
</div>`}
            </pre>
          </div>
        </div>
      </section>

      {/* Selected Spinner Info */}
      {selectedSpinner && (
        <div style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          padding: '12px 20px',
          backgroundColor: '#3b82f6',
          color: 'white',
          borderRadius: 8,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          animation: 'fadeIn 0.3s ease',
        }}>
          <span>Clicked: <strong>{selectedSpinner}</strong></span>
          <button
            onClick={() => setSelectedSpinner(null)}
            style={{
              marginLeft: 12,
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              borderRadius: 4,
              padding: '4px 8px',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}