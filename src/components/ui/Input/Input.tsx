import { FC, InputHTMLAttributes, useRef, useState } from 'react'
import css from './Input.module.css'
import cn from 'classnames'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const Input: FC<InputProps> = ({ label, ...props }) => {
  const [isFocused, setIsFocused] = useState(false)
  const ref = useRef()

  const onFocusBlurHandler = (currentRef) => {
    setIsFocused(document.activeElement === currentRef)
  }

  return (
    <div className="flex flex-col mb-6">
      <label htmlFor={props.name} className={css.label}>
        {label}
      </label>

      <div
        className={cn({
          [css.inputUpperDiv]: true,
          [css.inputUpperDivFocused]: isFocused,
        })}
      >
        <input
          className={css.input}
          id={props.name}
          ref={ref}
          {...props}
          onFocus={() => onFocusBlurHandler(ref.current)}
          onBlur={() => onFocusBlurHandler(ref.current)}
        />
      </div>
    </div>
  )
}

export default Input
