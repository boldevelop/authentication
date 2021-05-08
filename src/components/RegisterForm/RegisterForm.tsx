import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  emailValidation,
  trimAllSpaces,
  validatePassword,
  validateSecondPwd,
} from '../../helpers'
import * as UI from 'components/ui'
import { useUsersDB } from 'context/UsersDataBase/UsersDataBaseContext'
import { FormFieldsType } from './type'
import { FormFieldsName } from './constants'

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

type RegisterFormProp = {
  addUser: (user) => void
}

const RegisterForm: FC<RegisterFormProp> = ({ addUser, children }) => {
  const { isExist } = useUsersDB()

  const [onSubmitError, setOnsubmitError] = useState('')
  const {
    register,
    handleSubmit,
    errors,
    watch,
    setValue,
  } = useForm<FormFieldsType>({
    mode: 'onChange',
  })

  const clearForm = () => {
    setValue(FormFieldsName.emailName, '', { shouldValidate: false })
    setValue(FormFieldsName.passwordName, '', { shouldValidate: false })
    setValue(FormFieldsName.confirmPwdName, '', { shouldValidate: false })
  }

  const onSubmit = (data: FormFieldsType) => {
    trimAllSpaces(data)

    const credential = {
      email: data[FormFieldsName.emailName],
      password: data[FormFieldsName.passwordName],
    }

    if (isExist(credential.email)) {
      setOnsubmitError(`User with email '${credential.email}' already exist`)
    } else {
      setOnsubmitError('')
      addUser(credential)
      clearForm()
    }
  }

  const passwordValue = watch(FormFieldsName.passwordName)

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
          name={FormFieldsName.emailName}
          type={FormFieldsName.emailName}
          errors={errors}
          label="Email"
          placeholder="example@gmail.com"
        />
        <UI.PasswordInput
          register={register}
          rules={passwordRules}
          name={FormFieldsName.passwordName}
          errors={errors}
          label="Password"
        />
        <UI.PasswordInput
          register={register}
          rules={confirmPwdRules}
          name={FormFieldsName.confirmPwdName}
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
