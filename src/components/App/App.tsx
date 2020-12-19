import React, { FC, useState } from 'react'
import css from './App.module.css'
import Header from '../Header'
import Tabs from '../ui/Tabs'
import TabPane from '../ui/TabPane'
import RegisterForm from '../RegisterForm'
import AuthForm from '../AuthForm'
import Link from '../ui/Link'
import { RegisteredUsersContextProvider } from 'context/registeredUsersContext'
import { LoginUserContextProvider } from 'context/loginUserContext'
import RegisteredContent from '../RegisteredContent'
import {
  addStorageItem,
  getStorageItem,
  removeStorageItem,
} from '../../utils/localStorage'

const defaultActiveKey = '0'

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

  const [activeTab, setActiveTab] = useState(defaultActiveKey)
  const [loggedUser, setLoggedUser] = useState(
    userFromStorage ? { email: userFromStorage } : null
  )
  const [regUsers, setRegUsers] = useState(defaultUsers)
  const signUpClick = () => setActiveTab('1')
  const signIpClick = () => setActiveTab('0')

  const addUser = (user) => {
    setRegUsers([...regUsers, user])
    setActiveTab('0')
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

  const unregisteredContent = (
    <Tabs
      defaultActiveKey={defaultActiveKey}
      activeTabKey={activeTab}
      onChange={setActiveTab}
    >
      <TabPane tabKey="0" tab="sign in">
        <AuthForm setLoggedUser={logUser}>
          <p className="text-center text-sm text-gray-600 mt-3">
            Don't have an account?{' '}
            <Link onClick={signUpClick}>Sign Up Here</Link>
          </p>
        </AuthForm>
      </TabPane>
      <TabPane tabKey="1" tab="sign up">
        <RegisterForm addUser={addUser}>
          <p className="text-center text-xs text-gray-400 mb-5 mt-1">
            By clicking create, you are agreeing <br />
            <Link>Terms of use</Link> and <Link>Privacy policy</Link>
          </p>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link onClick={signIpClick}>Sign In Here</Link>
          </p>
        </RegisterForm>
      </TabPane>
    </Tabs>
  )

  return (
    <LoginUserContextProvider value={loggedUser}>
      <RegisteredUsersContextProvider value={regUsers}>
        <Header />
        <main className="container h-full pt-20">
          <div className="flex justify-center">
            <div className={css.form}>
              {loggedUser ? (
                <RegisteredContent logout={logout} />
              ) : (
                unregisteredContent
              )}
            </div>
          </div>
        </main>
      </RegisteredUsersContextProvider>
    </LoginUserContextProvider>
  )
}

export default App
