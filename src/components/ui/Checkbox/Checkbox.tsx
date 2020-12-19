import { FC, InputHTMLAttributes } from 'react'
import css from './Checkbox.module.css'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const Checkbox: FC<CheckboxProps> = ({ label, ...props }) => (
  <div className="mb-6">
    <label className={css.container}>
      <input type="checkbox" className={css.input} {...props} />
      <span className={css.checkmark} />
      <span className={css.label}>{label}</span>
    </label>
  </div>
)

export default Checkbox
