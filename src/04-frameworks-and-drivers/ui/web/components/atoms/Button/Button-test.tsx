// src/04-frameworks-and-drivers/ui/web/components/atoms/Button/Button-test.tsx
import { useState } from 'react';
import { Button } from './Button';
import type { ButtonVariant, ButtonSize } from './Button.types';

export function ButtonTest() {
  const [loading, setLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount(prev => prev + 1);
  };

  const handleAsyncClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  const variants: ButtonVariant[] = ['primary', 'secondary', 'outline', 'danger', 'success', 'ghost'];
  const sizes: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 24, color: '#333' }}>🧪 Button Component Tests</h2>
      
      {/* Variants Section */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>Variants</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
          {variants.map(variant => (
            <Button 
              key={variant} 
              variant={variant} 
              onClick={handleClick}
            >
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {variants.map(variant => (
            <Button 
              key={`${variant}-disabled`} 
              variant={variant} 
              disabled 
              onClick={handleClick}
            >
              Disabled
            </Button>
          ))}
        </div>
      </section>

      {/* Sizes Section */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>Sizes</h3>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          {sizes.map(size => (
            <Button 
              key={size} 
              size={size} 
              variant="primary" 
              onClick={handleClick}
            >
              {size.toUpperCase()}
            </Button>
          ))}
        </div>
      </section>

      {/* States Section */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>States</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Button loading onClick={handleClick}>
            Loading
          </Button>
          
          <Button loading={loading} onClick={handleAsyncClick}>
            {loading ? 'Processing...' : 'Async Action'}
          </Button>

          <Button disabled onClick={handleClick}>
            Disabled
          </Button>

          {/* Sửa: leftIcon thay vì leftElement */}
          <Button leftIcon="⭐" onClick={handleClick}>
            With Icon
          </Button>

          {/* Sửa: rightIcon thay vì rightElement */}
          <Button rightIcon="→" onClick={handleClick}>
            With Icon
          </Button>
        </div>
      </section>

      {/* Interactive Test */}
      <section style={{ 
        padding: 20, 
        backgroundColor: '#f8f9fa', 
        borderRadius: 8,
        marginBottom: 32 
      }}>
        <h3 style={{ marginBottom: 12, color: '#555' }}>Interactive Test</h3>
        <p style={{ marginBottom: 16, color: '#666' }}>
          Click count: <strong>{clickCount}</strong>
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Button variant="primary" onClick={handleClick}>
            Click Me
          </Button>
          <Button variant="secondary" onClick={() => setClickCount(0)}>
            Reset Counter
          </Button>
        </div>
      </section>

      {/* Full Width */}
      <section>
        <h3 style={{ marginBottom: 16, color: '#555' }}>Full Width Button</h3>
        <Button fullWidth variant="primary" onClick={handleClick}>
          Full Width Button
        </Button>
      </section>
    </div>
  );
}