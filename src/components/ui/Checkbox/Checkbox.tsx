import { FC, InputHTMLAttributes } from 'react'
import css from './Checkbox.module.css'
import { UseFormMethods } from 'react-hook-form'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormMethods['register']
  label: string
}

const Checkbox: FC<CheckboxProps> = ({ label, register, ...props }) => (
  <div className="mb-6">
    <label className={css.container}>
      <input
        type="checkbox"
        id={props.name}
        className={css.input}
        {...props}
        ref={(e) => {
          register(e, {})
        }}
        tabIndex={0}
      />
      <span className={css.checkmark} />
      <span className={css.label}>{label}</span>
    </label>
  </div>
)

export { Checkbox }
