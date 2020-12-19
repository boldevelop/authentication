import { FC, HTMLAttributes } from 'react'
import css from './Icon.module.css'
import cn from 'classnames'
import { ReactComponent as EyeOpened } from './svg/eye-opened.svg'
import { ReactComponent as EyeClosed } from './svg/eye-closed.svg'

interface Props extends HTMLAttributes<HTMLDivElement> {
  type: string
  onClick?: (e?) => void
}

const getIcon = (type: string): JSX.Element => {
  switch (type) {
    case 'eyeOpened':
      return <EyeOpened />
    case 'eyeClosed':
      return <EyeClosed />
    default:
      return <div>noIcon</div>
  }
}

const Icon: FC<Props> = ({ type, className, onClick, ...props }) => {
  const icon = getIcon(type)
  const handleClick = (e) => {
    onClick && onClick(e)
  }

  return (
    <div className={cn(css.icon, className)} onClick={handleClick} {...props}>
      {icon}
    </div>
  )
}

export default Icon
