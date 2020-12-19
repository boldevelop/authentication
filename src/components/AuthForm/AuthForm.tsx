import { FC, useContext, useEffect, useState } from 'react'
import Title from '../ui/Title'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { useForm } from 'react-hook-form'
import { emailValidation, trimAllSpaces } from '../../helpers'
import PasswordInput from '../ui/PasswordInput'
import Link from '../ui/Link'
import Checkbox from '../ui/Checkbox'
import RegisteredUsersContext from '../../context/registeredUsersContext'

const emailName = 'authEmail'
const passwordName = 'authPassword'
const rememberName = 'remember'

interface Inputs {
  [emailName]: string
  [passwordName]: string
  [rememberName]: string
}

interface AuthFormProps {
  setLoggedUser: (user, isRemember) => void
}

const AuthForm: FC<AuthFormProps> = ({ setLoggedUser, children }) => {
  const [onSubmitError, setOnsubmitError] = useState('')
  const { register, handleSubmit, errors, setValue } = useForm<Inputs>({
    mode: 'onChange',
  })

  const registeredUsers = useContext(RegisteredUsersContext)

  useEffect(() => {
    /** костыль чтоб при первом отображение не подставлялись поля */
    if (registeredUsers.length !== 3) {
      const lastUser = registeredUsers[registeredUsers.length - 1]
      setValue(emailName, lastUser.email, { shouldValidate: false })
      setValue(passwordName, lastUser.password, { shouldValidate: false })
    }
  }, [registeredUsers])

  const clearForm = () => {
    setValue(emailName, '', { shouldValidate: false })
    setValue(passwordName, '', { shouldValidate: false })
    setValue(rememberName, false, { shouldValidate: false })
  }

  const onSubmit = (data) => {
    /* trim all spaces */
    for (const prop in data) {
      const value = data[prop]
      if (typeof value === 'string') {
        data[prop] = trimAllSpaces(value)
      }
    }

    let isSuccess = false
    registeredUsers.forEach((regUser) => {
      if (
        regUser.email === data[emailName] &&
        regUser.password === data[passwordName]
      ) {
        isSuccess = true
      }
    })

    if (isSuccess) {
      clearForm()
      setLoggedUser(
        {
          email: data[emailName],
          password: data[passwordName],
        },
        data[rememberName]
      )
    } else {
      setOnsubmitError('Password or email incorrect')
    }
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
          labelSuffix={<Link className="text-xs">forgot password?</Link>}
        />

        <Checkbox register={register} name={rememberName} label="Remember me" />
        <Button>Login</Button>
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

export default AuthForm
