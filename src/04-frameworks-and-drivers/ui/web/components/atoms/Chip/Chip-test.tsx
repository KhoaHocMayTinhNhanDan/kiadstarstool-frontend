// src/04-frameworks-and-drivers/ui/web/components/atoms/Chip/Chip-test.tsx
import { useState } from 'react';
import { Chip, ChipGroup } from './Chip';
import { useI18n } from '@/shared/i18n';
import { CHIP_CONFIG, CHIP_VARIANTS, CHIP_SIZES } from './Chip.constants';

// Icon components
const StarIcon = () => <span>⭐</span>;
const CheckIcon = () => <span>✅</span>;
const WarningIcon = () => <span>⚠️</span>;
const ErrorIcon = () => <span>❌</span>;
const BellIcon = () => <span>🔔</span>;
const ChartIcon = () => <span>📊</span>;
const SearchIcon = () => <span>🔍</span>;
const FolderIcon = () => <span>📁</span>;
const CalendarIcon = () => <span>📅</span>;
const ClockIcon = () => <span>⏳</span>;
const PencilIcon = () => <span>📝</span>;

export function ChipTest() {
  const { t, locale, setLocale } = useI18n();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [removableChips, setRemovableChips] = useState<string[]>([
    'React', 'TypeScript', 'Styled Components', 'Vite', 'ESLint'
  ]);
  const [chipCount, setChipCount] = useState(0);

  // Chip data for examples
  const categoryChips = [
    { label: 'Technology', variant: 'primary' as const },
    { label: 'Design', variant: 'secondary' as const },
    { label: 'Business', variant: 'success' as const },
    { label: 'Marketing', variant: 'warning' as const },
    { label: 'Development', variant: 'error' as const },
  ];

  const skillChips = [
    { label: 'JavaScript', value: 'js' },
    { label: 'TypeScript', value: 'ts' },
    { label: 'React', value: 'react' },
    { label: 'Node.js', value: 'node' },
    { label: 'GraphQL', value: 'graphql' },
    { label: 'Docker', value: 'docker' },
    { label: 'AWS', value: 'aws' },
    { label: 'Kubernetes', value: 'k8s' },
  ];

  const handleRemoveChip = (chipLabel: string) => {
    setRemovableChips(prev => prev.filter(chip => chip !== chipLabel));
  };

  const handleAddChip = () => {
    const newChip = `Chip ${chipCount + 1}`;
    setRemovableChips(prev => [...prev, newChip]);
    setChipCount(prev => prev + 1);
  };

  const handleSelectionChange = (selected: string[]) => {
    setSelectedValues(selected);
    console.log('Selected chips:', selected);
  };

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <h2 style={{ marginBottom: 24, color: '#333' }}>🧪 Chip Component Tests</h2>
      
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

      {/* Variants */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>🎨 Variants</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          {CHIP_VARIANTS.map(variant => (
            <Chip
              key={variant}
              variant={variant}
              label={variant.charAt(0).toUpperCase() + variant.slice(1)}
            />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {CHIP_VARIANTS.map(variant => (
            <Chip
              key={`${variant}-selected`}
              variant={variant}
              label={`${variant} (Selected)`}
              selected
            />
          ))}
        </div>
      </section>

      {/* Sizes */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>📏 Sizes</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          {CHIP_SIZES.map(size => (
            <div key={size} style={{ textAlign: 'center' }}>
              <Chip
                size={size}
                variant="primary"
                label={size.toUpperCase()}
              />
              <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
                {CHIP_CONFIG.getSizeStyle(size).height}px
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* With Icons */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>🔘 With Icons</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Chip
            variant="primary"
            leftIcon={<StarIcon />}
            label="Starred"
          />
          <Chip
            variant="success"
            leftIcon={<CheckIcon />}
            label="Completed"
          />
          <Chip
            variant="warning"
            leftIcon={<WarningIcon />}
            label="Warning"
          />
          <Chip
            variant="error"
            leftIcon={<ErrorIcon />}
            label="Error"
            rightIcon={<ChartIcon />}
          />
          <Chip
            variant="outline"
            leftIcon={<BellIcon />}
            label="Notifications"
            rightIcon={<span>3</span>}
          />
        </div>
      </section>

      {/* Removable Chips */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>🗑️ Removable Chips</h3>
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {removableChips.map(chip => (
              <Chip
                key={chip}
                variant="default"
                label={chip}
                removable
                onRemove={() => handleRemoveChip(chip)}
              />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button
              onClick={handleAddChip}
              style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 14
              }}
            >
              Add New Chip
            </button>
            <span style={{ color: '#666', fontSize: 14 }}>
              {removableChips.length} chips remaining
            </span>
          </div>
        </div>
      </section>

      {/* Clickable Chips */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>🖱️ Clickable Chips</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {categoryChips.map((category, index) => (
            <Chip
              key={index}
              variant={category.variant}
              label={category.label}
              clickable
              onClick={() => alert(`Clicked: ${category.label}`)}
            />
          ))}
        </div>
      </section>

      {/* Selectable Chip Group */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>✅ Selectable Chip Group</h3>
        <div style={{ marginBottom: 16 }}>
          <h4 style={{ marginBottom: 8, color: '#666' }}>Single Selection</h4>
          <ChipGroup
            size="md"
            spacing={8}
            selectable="single"
            onSelectionChange={handleSelectionChange}
          >
            {skillChips.slice(0, 4).map(skill => (
              <Chip
                key={skill.value}
                variant="outline"
                label={skill.label}
                value={skill.value}
              />
            ))}
          </ChipGroup>
        </div>
        <div style={{ marginBottom: 16 }}>
          <h4 style={{ marginBottom: 8, color: '#666' }}>Multiple Selection</h4>
          <ChipGroup
            size="sm"
            spacing={8}
            selectable="multiple"
            onSelectionChange={handleSelectionChange}
          >
            {skillChips.map(skill => (
              <Chip
                key={skill.value}
                variant="default"
                label={skill.label}
                value={skill.value}
              />
            ))}
          </ChipGroup>
        </div>
        <div style={{ padding: 12, backgroundColor: '#f0f9ff', borderRadius: 6 }}>
          <p style={{ margin: 0, color: '#0369a1', fontSize: 14 }}>
            <strong>Selected:</strong> {selectedValues.length > 0 ? selectedValues.join(', ') : 'None'}
          </p>
        </div>
      </section>

      {/* Chip Group with Max Limit */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>👥 Chip Group with Max Limit</h3>
        <div style={{ marginBottom: 8 }}>
          <ChipGroup max={3} spacing={8}>
            {['Design', 'Development', 'Testing', 'Deployment', 'Maintenance', 'Documentation'].map((item, index) => (
              <Chip
                key={index}
                variant="secondary"
                label={item}
              />
            ))}
          </ChipGroup>
        </div>
        <p style={{ fontSize: 14, color: '#666' }}>
          Showing 3 of 6 items (+3 more)
        </p>
      </section>

      {/* Disabled State */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>🚫 Disabled State</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Chip
            variant="primary"
            label="Disabled Chip"
            disabled
          />
          <Chip
            variant="success"
            label="Disabled with Remove"
            removable
            disabled
          />
          <Chip
            variant="outline"
            label="Disabled Clickable"
            clickable
            disabled
          />
          <Chip
            variant="warning"
            label="Disabled Selected"
            selected
            disabled
          />
        </div>
      </section>

      {/* Real World Examples */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>🌍 Real World Examples</h3>
        
        {/* Email Tags */}
        <div style={{ marginBottom: 24 }}>
          <h4 style={{ marginBottom: 8, color: '#666' }}>Email Recipients</h4>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Chip
              variant="primary"
              label="john@example.com"
              removable
              onRemove={() => console.log('Removed john')}
            />
            <Chip
              variant="primary"
              label="jane@example.com"
              removable
              onRemove={() => console.log('Removed jane')}
            />
            <Chip
              variant="outline"
              label="Add recipient..."
              clickable
              onClick={() => alert('Add new recipient')}
            />
          </div>
        </div>

        {/* Filter Chips */}
        <div style={{ marginBottom: 24 }}>
          <h4 style={{ marginBottom: 8, color: '#666' }}>Active Filters</h4>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Chip
              variant="default"
              label="Status: Active"
              removable
              leftIcon={<SearchIcon />}
            />
            <Chip
              variant="default"
              label="Category: Technology"
              removable
              leftIcon={<FolderIcon />}
            />
            <Chip
              variant="default"
              label="Date: Last 30 days"
              removable
              leftIcon={<CalendarIcon />}
            />
            <Chip
              variant="outline"
              label="Clear All"
              clickable
              onClick={() => console.log('Clear all filters')}
            />
          </div>
        </div>

        {/* Status Indicators */}
        <div>
          <h4 style={{ marginBottom: 8, color: '#666' }}>Status Indicators</h4>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Chip
              variant="success"
              label="Published"
              leftIcon={<CheckIcon />}
            />
            <Chip
              variant="warning"
              label="Pending Review"
              leftIcon={<ClockIcon />}
            />
            <Chip
              variant="error"
              label="Failed"
              leftIcon={<ErrorIcon />}
            />
            <Chip
              variant="primary"
              label="Draft"
              leftIcon={<PencilIcon />}
            />
          </div>
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
            <strong>Variants ({CHIP_VARIANTS.length}):</strong>
            <ul style={{ margin: '8px 0 0 0', paddingLeft: 20, fontSize: 14 }}>
              {CHIP_VARIANTS.map(v => <li key={v}>{v}</li>)}
            </ul>
          </div>
          <div>
            <strong>Sizes ({CHIP_SIZES.length}):</strong>
            <ul style={{ margin: '8px 0 0 0', paddingLeft: 20, fontSize: 14 }}>
              {CHIP_SIZES.map(s => (
                <li key={s}>
                  {s}: {CHIP_CONFIG.getSizeStyle(s).height}px
                </li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Features:</strong>
            <ul style={{ margin: '8px 0 0 0', paddingLeft: 20, fontSize: 14 }}>
              <li>Removable chips</li>
              <li>Clickable chips</li>
              <li>Selectable groups</li>
              <li>Icon support</li>
              <li>I18N ready</li>
              <li>Accessibility</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section style={{ 
        padding: 20, 
        backgroundColor: '#f8fafc', 
        borderRadius: 8,
        marginTop: 32
      }}>
        <h3 style={{ marginBottom: 12, color: '#555' }}>💡 Usage Examples</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {/* Example 1 */}
          <div style={{ padding: 16, backgroundColor: 'white', borderRadius: 6, border: '1px solid #e5e7eb' }}>
            <h4 style={{ marginTop: 0, color: '#374151' }}>Filter Chips</h4>
            <pre style={{ 
              margin: 0, 
              fontSize: 12, 
              backgroundColor: '#f9fafb', 
              padding: 12, 
              borderRadius: 4,
              overflow: 'auto'
            }}>
{`<ChipGroup spacing={8}>
  <Chip variant="default" label="Active" removable />
  <Chip variant="default" label="Category: Tech" removable />
  <Chip variant="outline" label="Clear All" clickable />
</ChipGroup>`}
            </pre>
          </div>

          {/* Example 2 */}
          <div style={{ padding: 16, backgroundColor: 'white', borderRadius: 6, border: '1px solid #e5e7eb' }}>
            <h4 style={{ marginTop: 0, color: '#374151' }}>Selectable Skills</h4>
            <pre style={{ 
              margin: 0, 
              fontSize: 12, 
              backgroundColor: '#f9fafb', 
              padding: 12, 
              borderRadius: 4,
              overflow: 'auto'
            }}>
{`<ChipGroup 
  selectable="multiple"
  onSelectionChange={setSelectedSkills}
>
  <Chip label="React" value="react" />
  <Chip label="TypeScript" value="ts" />
  <Chip label="Node.js" value="node" />
</ChipGroup>`}
            </pre>
          </div>

          {/* Example 3 */}
          <div style={{ padding: 16, backgroundColor: 'white', borderRadius: 6, border: '1px solid #e5e7eb' }}>
            <h4 style={{ marginTop: 0, color: '#374151' }}>Status Indicators</h4>
            <pre style={{ 
              margin: 0, 
              fontSize: 12, 
              backgroundColor: '#f9fafb', 
              padding: 12, 
              borderRadius: 4,
              overflow: 'auto'
            }}>
{`<>
  <Chip variant="success" label="Published" leftIcon={<CheckIcon />} />
  <Chip variant="warning" label="Draft" leftIcon={<PencilIcon />} />
  <Chip variant="error" label="Failed" leftIcon={<ErrorIcon />} removable />
</>`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}