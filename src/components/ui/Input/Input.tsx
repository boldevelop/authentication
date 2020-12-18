import { FC, InputHTMLAttributes, useRef, useState } from 'react'
import css from './Input.module.css'
import cn from 'classnames'
import { UseFormMethods } from 'react-hook-form'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  register: UseFormMethods['register']
  rules: RegisterOptions
  errors: UseFormMethods['errors']
  trigger: UseFormMethods['trigger']
}

const Input: FC<InputProps> = ({
  label,
  register,
  trigger,
  rules,
  errors,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>()

  const onFocusBlurHandler = (currentRef) => {
    setIsFocused(document.activeElement === currentRef)
  }
  const errorObject = errors && errors[props.name]

  return (
    <div className="flex flex-col mb-6">
      <label
        htmlFor={props.name}
        className={cn(css.label, {
          [css.labelError]: errorObject,
          [css.labelRequired]: rules && rules.required,
        })}
      >
        <span>{label}</span>
      </label>

      <div
        className={cn({
          [css.inputUpperDiv]: true,
          [css.inputUpperDivFocused]: isFocused,
        })}
      >
        <input
          className={cn(css.input, { [css.inputError]: errorObject })}
          id={props.name}
          aria-invalid={errorObject ? 'true' : 'false'}
          {...props}
          ref={(e) => {
            register(e, rules)
            inputRef.current = e
          }}
          onFocus={() => onFocusBlurHandler(inputRef.current)}
          onBlur={() => onFocusBlurHandler(inputRef.current)}
        />
      </div>
      {errorObject && (
        <span role="alert" className="text-red-400 text-sm">
          {errorObject.message}
        </span>
      )}
    </div>
  )
}

export default Input
