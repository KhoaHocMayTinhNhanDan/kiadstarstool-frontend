import { type SelectHTMLAttributes } from 'react'
import { type Interpolation, type Theme } from '@emotion/react'

export type SelectSize = 'sm' | 'md' | 'lg'

export interface SelectOption {
label: string
value: string | number
disabled?: boolean
}

export interface SelectProps
extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
options: SelectOption[]
label?: string
error?: string | boolean
helperText?: string
fullWidth?: boolean
size?: SelectSize
sx?: Interpolation<Theme>
placeholder?: string
}
