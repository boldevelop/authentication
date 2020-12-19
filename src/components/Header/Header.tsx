import { FC, useContext, useEffect, useState } from 'react'
import css from './Header.module.css'
import RegisteredUsersContext from '../../context/registeredUsersContext'

const registrationMessage = (email) => (
  <>
    Successful registration for: <span className="font-bold">{email}</span>
  </>
)

const Header: FC = () => {
  const [content, setContent] = useState(<span>Authentication app</span>)
  const registeredUsers = useContext(RegisteredUsersContext)

  useEffect(() => {
    /** костыль чтоб при первом отображение не подставлялись поля */
    if (registeredUsers.length !== 3) {
      const lastUser = registeredUsers[registeredUsers.length - 1]
      setContent(registrationMessage(lastUser.email))
    }
  }, [registeredUsers])

  return (
    <header className={css.header}>
      <div className="container text-center">{content}</div>
    </header>
  )
}

export default Header
