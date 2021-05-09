import { FC, InputHTMLAttributes, useState } from 'react'
import { UseFormMethods } from 'react-hook-form'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import { Input } from '../index'
import { InputType } from './constants'
import { EyeIcon } from './EyeIcon'
import { useCapsLockOnListener } from 'context/CapsLockContext/CapsLockContext'

const toggleType = (type) =>
  type === InputType.password ? InputType.text : InputType.password

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  register: UseFormMethods['register']
  rules: RegisterOptions
  errors: UseFormMethods['errors']
  labelSuffix?: JSX.Element
}

const PasswordInput: FC<PasswordInputProps> = ({ ...props }) => {
  const [type, setType] = useState(InputType.password)
  const onToggle = () => setType(toggleType(type))
  const { isCapsLockOn } = useCapsLockOnListener()

  return (
    <Input
      {...props}
      type={type}
      isCapsLockOn={isCapsLockOn}
      placeholder="••••••••"
      suffix={<EyeIcon onToggle={onToggle} />}
    />
  )
}

export { PasswordInput }
