import { FC } from 'react'
import * as UI from 'components/ui'

interface Props {
  logout: () => void
}

const RegisteredContent: FC<Props> = ({ logout }) => {
  return (
    <div className="px-6 pb-6">
      <UI.Title subtitle="You can reload page">Welcome!</UI.Title>
      <UI.Button onClick={logout}>logout</UI.Button>
    </div>
  )
}

export { RegisteredContent }
