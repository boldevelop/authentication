import { FC, useEffect, useState, useCallback } from 'react'
import css from './Header.module.css'
import { useUser } from 'context/UserContext/UserContext'
import { useUsersDB } from 'context/UsersDataBase/UsersDataBaseContext'
import { defaultMessage, loggedMessage, registrationMessage } from './messages'

const Header: FC = () => {
  const [content, setContent] = useState(defaultMessage)

  const onAddUser = useCallback((email: string) => {
    setContent(registrationMessage(email))
  }, [])

  const { user } = useUser()
  useUsersDB(onAddUser)

  useEffect(() => {
    setContent(user ? loggedMessage(user.email) : defaultMessage)
  }, [user])

  return (
    <header className={css.header}>
      <div className="container text-center">{content}</div>
    </header>
  )
}

export { Header }
