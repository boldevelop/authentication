import { FC } from 'react'
import Title from '../ui/Title'
import Input from '../ui/Input'

const AuthForm: FC = () => {
  return (
    <div>
      <Title>Login</Title>
      <h3 className="text-lg font-bold text-gray-300">
        Please sign in to continue
      </h3>

      <Input type="email" label="Email" />
      <Input type="text" label="Password" />
      <button>login</button>
    </div>
  )
}

export default AuthForm
