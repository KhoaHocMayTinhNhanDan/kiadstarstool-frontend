import { Icon } from './Icon';
import { COLORS } from '../00-core/tokens-constants';

// Example SVG paths
const HomeIcon = <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>;
const StarIcon = <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>;

export const IconTest = () => {
  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui' }}>
      <h2 style={{ marginBottom: '32px', color: '#1a202c', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
        🎨 Icon Component Demo
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>Sizes</h3>
          <div style={{ display: 'flex', alignItems: 'end', gap: '16px' }}>
            <Icon size="xs">{HomeIcon}</Icon>
            <Icon size="sm">{HomeIcon}</Icon>
            <Icon size="md">{HomeIcon}</Icon>
            <Icon size="lg">{HomeIcon}</Icon>
            <Icon size="xl">{HomeIcon}</Icon>
          </div>
        </section>

        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#4a5568' }}>Colors</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Icon size="md" color={COLORS.PRIMARY}>{StarIcon}</Icon>
            <Icon size="md" color={COLORS.DANGER}>{StarIcon}</Icon>
            <Icon size="md" color={COLORS.SUCCESS}>{StarIcon}</Icon>
            <Icon size="md" color="#9c27b0">{StarIcon}</Icon>
          </div>
        </section>
      </div>
    </div>
  );
};