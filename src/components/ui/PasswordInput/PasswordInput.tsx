import { FC, InputHTMLAttributes, useState } from 'react'
import { UseFormMethods } from 'react-hook-form'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import { Input, Icon } from '../index'

interface EyeIconProps {
  onClick: (e?) => void
}

const eyeOpened = 'eyeOpened'
const eyeClosed = 'eyeClosed'

const EyeIcon: FC<EyeIconProps> = ({ onClick }) => {
  const [type, setType] = useState(eyeOpened)
  const handleClick = () => {
    setType(type === eyeOpened ? eyeClosed : eyeOpened)
    onClick && onClick()
  }

  const title = type === eyeOpened ? 'Show password' : 'Hide password'

  return <Icon type={type} onClick={handleClick} title={title} />
}

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  register: UseFormMethods['register']
  rules: RegisterOptions
  errors: UseFormMethods['errors']
  labelSuffix?: JSX.Element
}

const password = 'password'
const text = 'text'

const PasswordInput: FC<PasswordInputProps> = ({ ...props }) => {
  const [type, setType] = useState(password)
  const handleClick = () => setType(type === password ? text : password)

  return (
    <Input
      {...props}
      type={type}
      placeholder="••••••••"
      suffix={<EyeIcon onClick={handleClick} />}
    />
  )
}

export { PasswordInput }
