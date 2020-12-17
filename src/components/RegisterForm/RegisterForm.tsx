import { FC } from 'react'
import Title from '../ui/Title'

const RegisterForm: FC = () => {
  return (
    <div>
      <Title>Create Account</Title>

      <input type="email" />
      <input type="text" />
      <button>login</button>
    </div>
  )
}

export default RegisterForm
