import { ButtonHTMLAttributes, FC } from 'react'
import cn from 'classnames'
import css from './Button.module.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<Props> = ({ children, className, ...props }) => {
  return (
    <button className={cn(css.button, className)} {...props}>
      {children}
    </button>
  )
}

export default Button
