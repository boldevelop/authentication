import { FC } from 'react'
import Button from '../ui/Button'
import Title from '../ui/Title'

interface Props {
  logout: () => void
}

const RegisteredContent: FC<Props> = ({ logout }) => {
  return (
    <div className="px-6 pb-6">
      <Title subtitle="You can reload page">Welcome!</Title>
      <Button onClick={logout}>logout</Button>
    </div>
  )
}

export default RegisteredContent
