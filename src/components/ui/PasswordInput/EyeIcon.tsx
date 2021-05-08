import { FC, useState } from 'react'
import { Icon } from '../Icon'
import { IconType } from '../Icon/constants'

type EyeIconProps = {
  onToggle: () => void
}

const toggleIconType = (type) =>
  type === IconType.eyeOpened ? IconType.eyeClosed : IconType.eyeOpened

const EyeIcon: FC<EyeIconProps> = ({ onToggle }) => {
  const [type, setType] = useState(IconType.eyeOpened)

  const toggleIcon = () => {
    setType(toggleIconType(type))
    onToggle && onToggle()
  }

  const title = type === IconType.eyeOpened ? 'Show password' : 'Hide password'

  return <Icon type={type} toggleIcon={toggleIcon} title={title} />
}

export { EyeIcon }
