// src/01-entities/users/base/PhoneNumber.vo.ts
import { ValueObject } from '../../shared/base/ValueObject'

interface PhoneNumberProps {
  value: string
  label?: string
}

export class PhoneNumber extends ValueObject<PhoneNumberProps> {
  get value(): string {
    return this.props.value
  }

  get label(): string | undefined {
    return this.props.label
  }

  private constructor(props: PhoneNumberProps) {
    super(props)
  }

  static create(value: string, label?: string): PhoneNumber {
    if (!value || value.trim().length < 6) {
      throw new Error('INVALID_PHONE_NUMBER')
    }

    return new PhoneNumber({
      value: value.trim(),
      label,
    })
  }

  toJSON() {
    return {
      value: this.value,
      label: this.label,
    }
  }
}
