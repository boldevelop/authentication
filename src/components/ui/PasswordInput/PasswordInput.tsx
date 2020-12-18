import { FC, InputHTMLAttributes } from 'react'
import { UseFormMethods } from 'react-hook-form'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import Input from '../Input'

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  register: UseFormMethods['register']
  rules: RegisterOptions
  errors: UseFormMethods['errors']
}

const PasswordInput: FC<PasswordInputProps> = ({ ...props }) => {
  return (
    <Input
      {...props}
      type="password"
      placeholder="••••••••"
      suffix={<p>P</p>}
    />
  )
}

export default PasswordInput
