import React, { FC } from 'react'
import css from './App.module.css'
import Header from '../Header'
import Tabs from '../ui/Tabs'
import TabPane from '../ui/TabPane'

const App: FC = () => (
  <>
    <Header />
    <main className="container h-full pt-20">
      <div className="flex justify-center">
        <div className={css.form}>
          <Tabs defaultActiveKey={'0'}>
            <TabPane tabKey="0" tab="sign in">
              sign in content
            </TabPane>
            <TabPane tabKey="1" tab="sign up">
              sign up content
            </TabPane>
          </Tabs>
        </div>
      </div>
    </main>
  </>
)

export default App
