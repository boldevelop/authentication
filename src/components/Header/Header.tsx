import { FC, useContext, useEffect, useState } from 'react'
import css from './Header.module.css'
import RegisteredUsersContext from 'context/registeredUsersContext'
import LoginUserContext from 'context/loginUserContext'

const registrationMessage = (email) => (
  <>
    Successful registration for: <span className="font-bold">{email}</span>
  </>
)
const loggedMessage = (email) => (
  <>
    Email: <span className="font-bold">{email}</span>
  </>
)
const defaultMessage = <span>Authentication app</span>

const Header: FC = () => {
  const [content, setContent] = useState(defaultMessage)
  const registeredUsers = useContext(RegisteredUsersContext)
  const loggedUser = useContext(LoginUserContext)

  useEffect(() => {
    /** костыль чтоб при первом отображение не подставлялись поля */
    if (registeredUsers.length !== 3) {
      const lastUser = registeredUsers[registeredUsers.length - 1]
      setContent(registrationMessage(lastUser.email))
    }
  }, [registeredUsers])

  useEffect(() => {
    setContent(loggedUser ? loggedMessage(loggedUser.email) : defaultMessage)
  }, [loggedUser])

  return (
    <header className={css.header}>
      <div className="container text-center">{content}</div>
    </header>
  )
}

export { Header }
