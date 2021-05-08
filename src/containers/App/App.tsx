import React, { FC } from 'react'
import {
  Layout,
  UnregisteredContent,
  RegisteredContent,
} from 'components/index'
import { useUser } from 'context/UserContext/UserContext'

const App: FC = () => {
  const { user, logout } = useUser()

  return (
    <Layout>
      {user ? <RegisteredContent logout={logout} /> : <UnregisteredContent />}
    </Layout>
  )
}

export { App }
