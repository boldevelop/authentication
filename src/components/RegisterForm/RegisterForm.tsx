import { FC } from 'react'
import Title from '../ui/Title'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { useForm } from 'react-hook-form'
import {
  emailValidation,
  trimAllSpaces,
  validatePassword,
  validateSecondPwd,
} from '../../helpers'
import PasswordInput from '../ui/PasswordInput'

const emailName = 'email'
const passwordName = 'password'
const confirmPwdName = 'confirmPassword'

interface Inputs {
  [emailName]: string
  [passwordName]: string
  [confirmPwdName]: string
}

const RegisterForm: FC = ({ children }) => {
  const { register, handleSubmit, errors, watch } = useForm<Inputs>({
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

  const passwordValue = watch(passwordName)

  const emailRules = {
    required: 'Email is required',
    validate: emailValidation,
  }
  const passwordRules = {
    required: 'You must specify a password',
    minLength: {
      value: 8,
      message: 'Password must have at least 8 characters',
    },
    validate: validatePassword,
  }
  const confirmPwdRules = {
    required: 'You must specify a password',
    validate: (value) => validateSecondPwd(value, passwordValue),
  }

  return (
    <div>
      <Title>Create Account</Title>

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
        <PasswordInput
          register={register}
          rules={confirmPwdRules}
          name={confirmPwdName}
          errors={errors}
          label="Confirm password"
        />
        <Button className="mb-3">Create</Button>
      </form>

      {children}
    </div>
  )
}

export default RegisterForm
