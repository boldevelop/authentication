import { FC } from 'react'
import css from './Title.module.css'

const Title: FC = ({ children }) => {
  return <h2 className={css.title}>{children}</h2>
}

export default Title
