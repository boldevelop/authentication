import React, { FC } from 'react'
import css from './App.module.css'
import Header from '../Header'
import Tabs from '../ui/Tabs'
import TabPane from '../ui/TabPane'
import RegisterForm from '../RegisterForm'
import AuthForm from '../AuthForm'

const App: FC = () => (
  <>
    <Header />
    <main className="container h-full pt-20">
      <div className="flex justify-center">
        <div className={css.form}>
          <Tabs defaultActiveKey={'0'}>
            <TabPane tabKey="0" tab="sign in">
              <AuthForm />
            </TabPane>
            <TabPane tabKey="1" tab="sign up">
              <RegisterForm />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </main>
  </>
)

export default App
