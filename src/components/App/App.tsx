import React, { FC, useState } from 'react'
import css from './App.module.css'
import Header from '../Header'
import Tabs from '../ui/Tabs'
import TabPane from '../ui/TabPane'
import RegisterForm from '../RegisterForm'
import AuthForm from '../AuthForm'

const linkStyles =
  'text-indigo-600 underline cursor-pointer' +
  ' transition transition-all ease-in-out duration-200' +
  ' hover:no-underline'
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
            <Tabs defaultActiveKey={defaultActiveKey} activeTabKey={activeTab}>
              <TabPane tabKey="0" tab="sign in">
                <AuthForm>
                  <p className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <span className={linkStyles} onClick={signUpClick}>
                      Sign Up Here
                    </span>
                  </p>
                </AuthForm>
              </TabPane>
              <TabPane tabKey="1" tab="sign up">
                <RegisterForm>
                  <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <span className={linkStyles} onClick={signIpClick}>
                      Sign In Here
                    </span>
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
