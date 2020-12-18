import { ButtonHTMLAttributes, FC } from 'react'
import css from './Button.module.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<Props> = ({ children, ...props }) => {
  return (
    <button className={css.button} {...props}>
      {children}
    </button>
  )
}

export default Button
