import React, { useState } from 'react'
import { AuthForm, RegisterForm } from 'components/index'
import * as UI from '../ui'

const defaultActiveKey = '0'

const UnregisteredContent = ({ addUser, logUser }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveKey)
  const signUpClick = () => setActiveTab('1')
  const signInClick = () => setActiveTab('0')

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
      <UI.TabPane tabKey="0" tab="sign in">
        <AuthForm setLoggedUser={logUser}>
          <p className="text-center text-sm text-gray-600 mt-3">
            Don't have an account?{' '}
            <UI.Link onClick={signUpClick}>Sign Up Here</UI.Link>
          </p>
        </AuthForm>
      </UI.TabPane>
      <UI.TabPane tabKey="1" tab="sign up">
        <RegisterForm addUser={extendedAddUser}>
          <p className="text-center text-xs text-gray-400 mb-5 mt-1">
            By clicking create, you are agreeing <br />
            <UI.Link>Terms of use</UI.Link> and{' '}
            <UI.Link>Privacy policy</UI.Link>
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
