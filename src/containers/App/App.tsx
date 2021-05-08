import React, { FC, useState } from 'react'
import { RegisteredUsersContextProvider } from 'context/registeredUsersContext'
import { LoginUserContextProvider } from 'context/loginUserContext'
import {
  addStorageItem,
  getStorageItem,
  removeStorageItem,
} from '../../utils/localStorage'
import {
  Layout,
  UnregisteredContent,
  RegisteredContent,
} from 'components/index'

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

const App: FC = () => {
  const userFromStorage = getStorageItem('user')

  const [loggedUser, setLoggedUser] = useState(
    userFromStorage ? { email: userFromStorage } : null
  )
  const [regUsers, setRegUsers] = useState(defaultUsers)

  const addUser = (user) => {
    setRegUsers([...regUsers, user])
  }

  const logUser = (user, isRemember) => {
    setLoggedUser(user)

    if (isRemember) {
      addStorageItem('user', user.email)
    }
  }

  const logout = () => {
    setLoggedUser(null)
    removeStorageItem('user')
  }

  return (
    <LoginUserContextProvider value={loggedUser}>
      <RegisteredUsersContextProvider value={regUsers}>
        <Layout>
          {loggedUser ? (
            <RegisteredContent logout={logout} />
          ) : (
            <UnregisteredContent addUser={addUser} logUser={logUser} />
          )}
        </Layout>
      </RegisteredUsersContextProvider>
    </LoginUserContextProvider>
  )
}

export { App }
