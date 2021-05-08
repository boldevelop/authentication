import { FC, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  emailValidation,
  trimAllSpaces,
  validatePassword,
  validateSecondPwd,
} from '../../helpers'
import * as UI from '../ui'
import RegisteredUsersContext from 'context/registeredUsersContext'

const emailName = 'email'
const passwordName = 'password'
const confirmPwdName = 'confirmPassword'

interface Inputs {
  [emailName]: string
  [passwordName]: string
  [confirmPwdName]: string
}

interface RegisterFormProp {
  addUser: (user) => void
}

const RegisterForm: FC<RegisterFormProp> = ({ addUser, children }) => {
  const [onSubmitError, setOnsubmitError] = useState('')
  const { register, handleSubmit, errors, watch, setValue } = useForm<Inputs>({
    mode: 'onChange',
  })

  const registeredUsers = useContext(RegisteredUsersContext)

  const clearForm = () => {
    setValue(emailName, '', { shouldValidate: false })
    setValue(passwordName, '', { shouldValidate: false })
    setValue(confirmPwdName, '', { shouldValidate: false })
  }

  const onSubmit = (data) => {
    /* trim all spaces */
    for (const prop in data) {
      const value = data[prop]
      data[prop] = trimAllSpaces(value)
    }

    const isExist = registeredUsers.some(
      (registeredU) => registeredU.email === data[emailName]
    )
    if (isExist) {
      setOnsubmitError(`User with email '${data[emailName]}' already exist`)
    } else {
      setOnsubmitError('')
      addUser({ email: data[emailName], password: data[passwordName] })
      clearForm()
    }
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
      <UI.Title>Create Account</UI.Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <UI.Input
          register={register}
          rules={emailRules}
          name={emailName}
          type={emailName}
          errors={errors}
          label="Email"
          placeholder="example@gmail.com"
        />
        <UI.PasswordInput
          register={register}
          rules={passwordRules}
          name={passwordName}
          errors={errors}
          label="Password"
        />
        <UI.PasswordInput
          register={register}
          rules={confirmPwdRules}
          name={confirmPwdName}
          errors={errors}
          label="Confirm password"
        />

        <UI.Button>Create</UI.Button>
        {onSubmitError && (
          <p className="text-sm text-red-400 text-center mb-5">
            {onSubmitError}
          </p>
        )}
      </form>

      {children}
    </div>
  )
}

export { RegisterForm }
