// src/04-frameworks-and-drivers/ui/web/components/atoms/Input/Input-test.tsx
import { Input } from './Input'

export function InputTest() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h3>Input Variants</h3>
      
      <Input label="Default Input" placeholder="Enter text" />
      <Input label="Disabled" placeholder="Cannot edit" disabled />
      <Input label="With Error" error="This field is required" />
      <Input label="With Left Icon" leftElement="🔍" />
      <Input label="Textarea" type="textarea" rows={3} />
      
      <h3>Sizes</h3>
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  )
}