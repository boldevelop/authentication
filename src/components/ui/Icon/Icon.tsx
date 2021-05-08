import { FC, HTMLAttributes, useEffect, useRef } from 'react'
import css from './Icon.module.css'
import cn from 'classnames'
import { ReactComponent as EyeOpened } from './svg/eye-opened.svg'
import { ReactComponent as EyeClosed } from './svg/eye-closed.svg'
import { isSelectKeyPressed } from '../../../helpers/helpers'
import { IconType } from './constants'

interface Props extends HTMLAttributes<HTMLDivElement> {
  type: IconType
  toggleIcon?: () => void
}

const getIcon = (type: IconType): JSX.Element => {
  switch (type) {
    case IconType.eyeOpened:
      return <EyeOpened />
    case IconType.eyeClosed:
      return <EyeClosed />
    default:
      return <div>noIcon</div>
  }
}

const Icon: FC<Props> = ({ type, className, toggleIcon, ...props }) => {
  const iconRef = useRef(null)
  const icon = getIcon(type)

  const _toggleIcon = () => {
    if (toggleIcon) {
      toggleIcon()
    }
  }

  const handleClick = () => {
    _toggleIcon()
  }

  const onKeyDown = (e) => {
    if (isSelectKeyPressed(e.code)) {
      _toggleIcon()
    }
  }

  useEffect(() => {
    if (toggleIcon && iconRef) {
      iconRef.current.setAttribute('role', 'switch')
    }
  }, [iconRef, toggleIcon])

  return (
    <div
      className={cn(css.icon, className)}
      onClick={handleClick}
      onKeyDown={onKeyDown}
      {...props}
      ref={(e) => (iconRef.current = e)}
      aria-checked={type === IconType.eyeClosed ? 'true' : 'false'}
      tabIndex={0}
    >
      {icon}
    </div>
  )
}

export { Icon }
