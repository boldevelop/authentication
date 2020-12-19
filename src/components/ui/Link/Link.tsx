import { FC, HTMLAttributes } from 'react'
import cn from 'classnames'

const linkStyles =
  'text-indigo-600 underline cursor-pointer' +
  ' transition transition-all ease-in-out duration-200' +
  ' hover:no-underline'

const Link: FC<HTMLAttributes<HTMLSpanElement>> = ({
  children,
  className,
  ...props
}) => (
  <span className={cn(linkStyles, className)} {...props}>
    {children}
  </span>
)

export default Link
