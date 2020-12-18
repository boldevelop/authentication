import { FC } from 'react'
import Title from '../ui/Title'
import Input from '../ui/Input'
import Button from '../ui/Button'

const AuthForm: FC = () => {
  return (
    <div>
      <Title subtitle="Please sign in to continue">Login</Title>

      <Input type="email" label="Email" placeholder="example@gmail.com" />
      <Input type="password" label="Password" placeholder="••••••••" />
      <Button>Login</Button>
    </div>
  )
}

export default AuthForm
