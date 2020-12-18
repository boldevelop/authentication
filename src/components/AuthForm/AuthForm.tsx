import { FC } from 'react'
import Title from '../ui/Title'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { useForm } from 'react-hook-form'
import { emailValidation } from '../../helpers'

const emailName = 'email'
const passwordName = 'password'

interface Inputs {
  [emailName]: string
  [passwordName]: string
}

const AuthForm: FC = () => {
  const { register, handleSubmit, errors } = useForm<Inputs>()
  const onSubmit = (data) => console.log(data)

  const emailRules = {
    required: 'Email is required',
    validate: (value) => emailValidation(value),
  }
  const passwordRules = { required: 'Password is required' }

  return (
    <div>
      <Title subtitle="Please sign in to continue">Login</Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          rules={emailRules}
          name={emailName}
          type={emailName}
          errors={errors}
          label="Email"
          placeholder="example@gmail.com"
        />
        <Input
          register={register}
          rules={passwordRules}
          name={passwordName}
          errors={errors}
          type="password"
          label="Password"
          placeholder="••••••••"
        />
        <Button>Login</Button>
      </form>
    </div>
  )
}

export default AuthForm
