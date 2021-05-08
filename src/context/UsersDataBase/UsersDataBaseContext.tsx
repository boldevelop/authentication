import React, { useEffect, useState } from 'react'
import {
  Props,
  ContextValue,
  ProviderValue,
  callbackOnAddUserType,
} from './type'

const defaultUsers = [
  {
    email: 'test@gmail.com',
    password: 'qwertyQ1!',
  },
  {
    email: 'user@gmail.com',
    password: 'qwertyQ1!',
  },
  {
    email: 'superuser@gmail.com',
    password: 'qwertyQ1!',
  },
]

const UsersDataBaseContext = React.createContext<ContextValue>(null)

function UsersDBProvider(props: Props) {
  const [usersDB, setUsersDB] = useState(defaultUsers)

  const addUser = (user) => {
    setUsersDB([...usersDB, user])
  }

  const getLastUser = () => {
    return usersDB[usersDB.length - 1]
  }

  const isRightCredit = (credentials) => {
    return usersDB.some((user) => {
      return (
        user.email === credentials.email &&
        user.password === credentials.password
      )
    })
  }

  const isExist = (email) => {
    return usersDB.some((user) => user.email === email)
  }

  return (
    <UsersDataBaseContext.Provider
      value={{ addUser, usersDB, getLastUser, isRightCredit, isExist }}
      {...props}
    />
  )
}

function isProviderType(value: ContextValue): value is ProviderValue {
  return value !== undefined
}

function useUsersDB(callbackOnAddUser?: callbackOnAddUserType): ProviderValue {
  const context = React.useContext(UsersDataBaseContext)

  if (!isProviderType(context)) {
    throw new Error(`useUsersDB must be used within a UsersDataBaseContext`)
  }

  useEffect(() => {
    /** костыль чтоб при первом отображение не подставлялись поля */
    const { usersDB, getLastUser } = context
    if (usersDB.length !== 3) {
      const { email, password } = getLastUser()
      callbackOnAddUser && callbackOnAddUser(email, password)
    }
  }, [context.usersDB, callbackOnAddUser, context])

  return context
}

export { UsersDBProvider, useUsersDB }
