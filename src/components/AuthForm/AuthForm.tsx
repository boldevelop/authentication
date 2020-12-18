import { FC } from 'react'
import Title from '../ui/Title'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { useForm } from 'react-hook-form'
import { emailValidation, trimAllSpaces } from '../../helpers'

const emailName = 'email'
const passwordName = 'password'

interface Inputs {
  [emailName]: string
  [passwordName]: string
}

const AuthForm: FC = () => {
  const { register, handleSubmit, errors, trigger } = useForm<Inputs>({
    mode: 'onChange',
  })
  const onSubmit = (data) => {
    /* trim all spaces */
    for (const prop in data) {
      const value = data[prop]
      data[prop] = trimAllSpaces(value)
    }
    console.log(data)
  }

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
          trigger={trigger}
          errors={errors}
          label="Email"
          placeholder="example@gmail.com"
        />
        <Input
          register={register}
          rules={passwordRules}
          name={passwordName}
          errors={errors}
          trigger={trigger}
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
