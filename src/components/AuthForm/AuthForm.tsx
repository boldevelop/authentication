import { FC } from 'react'
import Title from '../ui/Title'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { useForm } from 'react-hook-form'
import { emailValidation, trimAllSpaces } from '../../helpers'
import PasswordInput from '../ui/PasswordInput'

const emailName = 'AuthEmail'
const passwordName = 'AuthPassword'

interface Inputs {
  [emailName]: string
  [passwordName]: string
}

const AuthForm: FC = ({ children }) => {
  const { register, handleSubmit, errors } = useForm<Inputs>({
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
    validate: emailValidation,
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
        <PasswordInput
          register={register}
          rules={passwordRules}
          name={passwordName}
          errors={errors}
          label="Password"
        />
        <Button className="mb-3">Login</Button>
      </form>

      {children}
    </div>
  )
}

export default AuthForm
