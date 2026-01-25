import { Button } from './Button';
import { Icon } from '../Icon/Icon';

const PlusIcon = <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>;

export const ButtonTest = () => {
  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui' }}>
      <h2 style={{ marginBottom: '32px', color: '#1a202c', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
        🔘 Button Component Demo
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>Variants</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="link">Link Button</Button>
          </div>
        </section>

        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>Sizes</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="icon"><Icon size="sm">{PlusIcon}</Icon></Button>
          </div>
        </section>

        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>States</h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
            <Button variant="outline" loading>Loading</Button>
          </div>
        </section>

        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>With Icons</h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button leftIcon={<Icon size="sm">{PlusIcon}</Icon>}>Create New</Button>
            <Button variant="outline" leftIcon={<Icon size="sm">{PlusIcon}</Icon>}>Add Item</Button>
          </div>
        </section>

        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>Full Width</h3>
          <div style={{ maxWidth: '300px' }}>
            <Button fullWidth>Full Width Button</Button>
          </div>
        </section>

        {/* Real-world Examples */}
        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>Real-world Examples</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'white', maxWidth: '500px' }}>
            
            {/* Form Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <Button variant="ghost">Cancel</Button>
              <Button>Save Changes</Button>
            </div>

            {/* Toolbar */}
            <div style={{ display: 'flex', gap: '8px', padding: '8px', backgroundColor: '#f7fafc', borderRadius: '6px' }}>
              <Button size="icon" variant="ghost"><Icon size="sm">{PlusIcon}</Icon></Button>
              <Button size="icon" variant="ghost"><Icon size="sm">{PlusIcon}</Icon></Button>
              <div style={{ width: '1px', backgroundColor: '#e2e8f0', margin: '0 4px' }} />
              <Button size="sm" variant="secondary">Export</Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};