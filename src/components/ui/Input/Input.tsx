import { FC, InputHTMLAttributes, useEffect, useRef, useState } from 'react'
import css from './Input.module.css'
import cn from 'classnames'
import { UseFormMethods } from 'react-hook-form'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import {
  getCapsIsPressed,
  isPressedCapsLock,
  setCapsIsPressedGlobal,
} from '../../../utils/capsLock'
import { addWindowListenerIfNone } from '../../../utils/listeners'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  suffix?: JSX.Element
  labelSuffix?: JSX.Element
  register: UseFormMethods['register']
  rules: RegisterOptions
  errors: UseFormMethods['errors']
}

const Input: FC<InputProps> = ({
  label,
  suffix,
  labelSuffix,
  register,
  rules,
  errors,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [capsIsPressed, setCapsIsPressed] = useState(false)

  const inputRef = useRef<HTMLInputElement | null>()

  const onFocusBlurHandler = (currentRef, isOnBlur = false) => {
    setIsFocused(document.activeElement === currentRef)

    // onBlur hide capslock message
    setCapsIsPressed(isOnBlur ? false : getCapsIsPressed())
  }

  /** detect capslock on change */
  const onChangeHandle = () => {
    /** if for avoiding rerender */
    if (getCapsIsPressed() !== capsIsPressed) {
      setCapsIsPressed(getCapsIsPressed())
    }
  }

  /** detect capslock when change capslock in focused */
  const onKeyDownHandle = (event) => {
    const isPressed = isPressedCapsLock(event)
    /** if for avoiding rerender */
    if (isPressed !== capsIsPressed) {
      setCapsIsPressed(isPressed)
    }
  }

  useEffect(() => {
    if (inputRef) {
      addWindowListenerIfNone('keydown', setCapsIsPressedGlobal)
    }
    return () => {
      document.removeEventListener('keydown', setCapsIsPressedGlobal)
    }
  }, [inputRef])

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
        {capsIsPressed && (
          <span className={css.labelCaps}>caps lock is active!</span>
        )}
        {labelSuffix && <span>{labelSuffix}</span>}
      </label>

      <div
        className={cn({
          [css.inputUpperDiv]: true,
          [css.inputUpperDivFocused]: isFocused,
        })}
      >
        <input
          className={cn(css.input, {
            [css.inputError]: errorObject,
            [css.inputSuffix]: suffix,
          })}
          id={props.name}
          // for accessibility (aria-invalid, role="alert")
          aria-invalid={errorObject ? 'true' : 'false'}
          {...props}
          ref={(e) => {
            register(e, rules)
            inputRef.current = e
          }}
          onFocus={() => onFocusBlurHandler(inputRef.current)}
          onBlur={() => onFocusBlurHandler(inputRef.current, true)}
          onChange={onChangeHandle}
          onKeyDown={onKeyDownHandle}
        />

        {suffix && <div className={css.suffix}>{suffix}</div>}
      </div>
      {errorObject && (
        <span role="alert" className="text-red-400 text-sm">
          {errorObject.message}
        </span>
      )}
    </div>
  )
}

export { Input }
