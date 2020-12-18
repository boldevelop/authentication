import { FC } from 'react'
import css from './Title.module.css'

interface Props {
  subtitle?: string
}

const Title: FC<Props> = ({ children, subtitle }) => {
  return (
    <div className="mb-8">
      <h2 className={css.title}>{children}</h2>
      {subtitle && <h3 className="text-lg text-gray-500">{subtitle}</h3>}
    </div>
  )
}

export default Title
