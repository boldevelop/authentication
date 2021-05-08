import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { emailValidation, trimAllSpaces } from '../../helpers'
import * as UI from 'components/ui'
import { useUser } from 'context/UserContext/UserContext'
import { useUsersDB } from 'context/UsersDataBase/UsersDataBaseContext'
import { FormFieldsType } from './type'
import { FormFieldsName } from './constants'

const emailRules = {
  required: 'Email is required',
  validate: emailValidation,
}
const passwordRules = { required: 'Password is required' }

const AuthForm: FC = ({ children }) => {
  const [onSubmitError, setOnsubmitError] = useState('')
  const { register, handleSubmit, errors, setValue } = useForm<FormFieldsType>({
    mode: 'onChange',
  })

  const onAddUser = (email, password) => {
    setValue(FormFieldsName.emailName, email, { shouldValidate: false })
    setValue(FormFieldsName.passwordName, password, { shouldValidate: false })
  }

  const { login } = useUser()
  const { isRightCredit } = useUsersDB(onAddUser)

  const clearForm = () => {
    setValue(FormFieldsName.emailName, '', { shouldValidate: false })
    setValue(FormFieldsName.passwordName, '', { shouldValidate: false })
    setValue(FormFieldsName.rememberName, false, { shouldValidate: false })
  }

  const onSubmit = (data: FormFieldsType) => {
    trimAllSpaces(data)

    const credentials = {
      email: data[FormFieldsName.emailName],
      password: data[FormFieldsName.passwordName],
    }

    if (isRightCredit(credentials)) {
      clearForm()
      login(credentials, data[FormFieldsName.rememberName])
    } else {
      setOnsubmitError('Password or email incorrect')
    }
  }

  return (
    <div>
      <UI.Title subtitle="Please sign in to continue">Login</UI.Title>

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
          labelSuffix={<UI.Link className="text-xs">forgot password?</UI.Link>}
        />

        <UI.Checkbox
          register={register}
          name={FormFieldsName.rememberName}
          label="Remember me"
        />

        <UI.Button>Login</UI.Button>

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

export { AuthForm }
