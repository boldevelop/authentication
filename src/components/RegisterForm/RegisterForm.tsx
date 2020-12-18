import { FC } from 'react'
import Title from '../ui/Title'
import Input from '../ui/Input'
import Button from '../ui/Button'

const RegisterForm: FC = () => {
  return (
    <div>
      <Title>Create Account</Title>

      {/*<Input type="email" label="Email" placeholder="example@gmail.com" />
      <Input type="password" label="Password" placeholder="••••••••" />
      <Input type="password" label="Confirm password" placeholder="••••••••" />
      */}
      <Button>Create</Button>
    </div>
  )
}

export default RegisterForm
