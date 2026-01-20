// src/04-frameworks-and-drivers/ui/web/components/atoms/Checkbox/Checkbox-test.tsx
import { useState } from 'react';
import { Checkbox } from './Checkbox';
import type { CheckboxProps } from './Checkbox.types';

export function CheckboxTest() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    option1: false,
    option2: true,
    option3: false,
  });

  const [groupSelected, setGroupSelected] = useState<string[]>(['apple']);

  const handleChange = (name: string) => (checked: boolean) => {
    setCheckedItems(prev => ({ ...prev, [name]: checked }));
  };

  const handleGroupChange = (value: string) => {
    setGroupSelected(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  const foodOptions = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange', disabled: true },
    { value: 'grape', label: 'Grape' },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 24, color: '#333' }}>✅ Checkbox Component Tests</h2>
      
      {/* Basic Checkboxes */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>Basic Checkboxes</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Checkbox
            label="Unchecked checkbox"
            checked={checkedItems.option1}
            onChange={handleChange('option1')}
          />
          <Checkbox
            label="Checked checkbox"
            checked={checkedItems.option2}
            onChange={handleChange('option2')}
          />
          <Checkbox
            label="Disabled unchecked"
            disabled
            checked={false}
            onChange={handleChange('option3')}
          />
          <Checkbox
            label="Disabled checked"
            disabled
            checked={true}
            onChange={handleChange('option3')}
          />
        </div>
      </section>

      {/* Checkbox Group */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>Checkbox Group</h3>
        <p style={{ marginBottom: 12, color: '#666' }}>
          Selected: {groupSelected.join(', ') || 'None'}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {foodOptions.map(option => (
            <Checkbox
              key={option.value}
              label={option.label}
              checked={groupSelected.includes(option.value)}
              disabled={option.disabled}
              onChange={() => handleGroupChange(option.value)}
            />
          ))}
        </div>
      </section>

      {/* Checkbox with Description */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>With Description</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Checkbox
            label="Enable notifications"
            description="Receive email notifications for important updates"
            checked={checkedItems.option1}
            onChange={handleChange('option1')}
          />
          <Checkbox
            label="Accept terms and conditions"
            description="You must agree to continue"
            checked={checkedItems.option2}
            onChange={handleChange('option2')}
            required
          />
        </div>
      </section>

      {/* Different States */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#555' }}>Different States</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 16 
        }}>
          <div style={{ padding: 12, border: '1px solid #e5e7eb', borderRadius: 8 }}>
            <Checkbox
              label="Default"
              checked={false}
              onChange={() => {}}
            />
          </div>
          <div style={{ padding: 12, border: '1px solid #e5e7eb', borderRadius: 8 }}>
            <Checkbox
              label="Checked"
              checked={true}
              onChange={() => {}}
            />
          </div>
          <div style={{ padding: 12, border: '1px solid #e5e7eb', borderRadius: 8 }}>
            <Checkbox
              label="Disabled"
              checked={false}
              disabled
              onChange={() => {}}
            />
          </div>
          <div style={{ padding: 12, border: '1px solid #e5e7eb', borderRadius: 8 }}>
            <Checkbox
              label="Error"
              checked={false}
              error="This field is required"
              onChange={() => {}}
            />
          </div>
        </div>
      </section>

      {/* Interactive Example */}
      <section style={{ 
        padding: 20, 
        backgroundColor: '#f8f9fa', 
        borderRadius: 8 
      }}>
        <h3 style={{ marginBottom: 12, color: '#555' }}>Interactive Example</h3>
        <p style={{ marginBottom: 16, color: '#666' }}>
          Create your perfect breakfast:
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Checkbox
            label="Coffee"
            checked={checkedItems.coffee || false}
            onChange={handleChange('coffee')}
          />
          <Checkbox
            label="Eggs"
            checked={checkedItems.eggs || false}
            onChange={handleChange('eggs')}
          />
          <Checkbox
            label="Toast"
            checked={checkedItems.toast || false}
            onChange={handleChange('toast')}
          />
          <Checkbox
            label="Juice"
            checked={checkedItems.juice || false}
            onChange={handleChange('juice')}
          />
        </div>
        
        <div style={{ marginTop: 16, padding: 12, backgroundColor: '#e9ecef', borderRadius: 6 }}>
          <strong>Your breakfast:</strong> {Object.keys(checkedItems).filter(k => checkedItems[k]).join(', ') || 'Nothing selected'}
        </div>
      </section>
    </div>
  );
}