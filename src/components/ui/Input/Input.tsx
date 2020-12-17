import { FC, InputHTMLAttributes } from 'react'
import css from './Input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const Input: FC<InputProps> = ({ label, name, type }) => {
  return (
    <div className="flex flex-col mb-3">
      <label htmlFor={name}>{label}</label>
      <input className={css.input} type={type} name={name} id={name} />
    </div>
  )
}

export default Input
