import React, { FC, useState } from 'react'
import css from './App.module.css'
import Header from '../Header'
import Tabs from '../ui/Tabs'
import TabPane from '../ui/TabPane'
import RegisterForm from '../RegisterForm'
import AuthForm from '../AuthForm'
import Link from '../ui/Link'

const defaultActiveKey = '0'

const App: FC = () => {
  const [activeTab, setActiveTab] = useState(defaultActiveKey)
  const signUpClick = () => setActiveTab('1')
  const signIpClick = () => setActiveTab('0')

  return (
    <>
      <Header />
      <main className="container h-full pt-20">
        <div className="flex justify-center">
          <div className={css.form}>
            <Tabs
              defaultActiveKey={defaultActiveKey}
              activeTabKey={activeTab}
              onChange={setActiveTab}
            >
              <TabPane tabKey="0" tab="sign in">
                <AuthForm>
                  <p className="text-center text-sm text-gray-600 mt-3">
                    Don't have an account?{' '}
                    <Link onClick={signUpClick}>Sign Up Here</Link>
                  </p>
                </AuthForm>
              </TabPane>
              <TabPane tabKey="1" tab="sign up">
                <RegisterForm>
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
          </div>
        </div>
      </main>
    </>
  )
}

export default App
