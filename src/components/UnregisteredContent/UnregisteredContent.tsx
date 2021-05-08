import React, { useState } from 'react'
import { AuthForm, RegisterForm } from 'components/index'
import * as UI from 'components/ui'
import { useUsersDB } from 'context/UsersDataBase/UsersDataBaseContext'
import { TabKey } from './constants'

const defaultActiveKey = TabKey.signIn

const UnregisteredContent = () => {
  const { addUser } = useUsersDB()

  const [activeTab, setActiveTab] = useState(defaultActiveKey)
  const signUpClick = () => setActiveTab(TabKey.signUp)
  const signInClick = () => setActiveTab(TabKey.signIn)

  const extendedAddUser = (user) => {
    addUser(user)
    signInClick()
  }

  return (
    <UI.Tabs
      defaultActiveKey={defaultActiveKey}
      activeTabKey={activeTab}
      onChange={setActiveTab}
    >
      <UI.TabPane tabKey={TabKey.signIn} tab="sign in">
        <AuthForm>
          <p className="text-center text-sm text-gray-600 mt-3">
            Don't have an account?{' '}
            <UI.Link onClick={signUpClick}>Sign Up Here</UI.Link>
          </p>
        </AuthForm>
      </UI.TabPane>
      <UI.TabPane tabKey={TabKey.signUp} tab="sign up">
        <RegisterForm addUser={extendedAddUser}>
          <p className="text-center text-xs text-gray-400 mb-5 mt-1">
            By logging in, you allow us to set cookies.
            <br />
            More about our <UI.Link>privacy</UI.Link>
          </p>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <UI.Link onClick={signInClick}>Sign In Here</UI.Link>
          </p>
        </RegisterForm>
      </UI.TabPane>
    </UI.Tabs>
  )
}

export { UnregisteredContent }
