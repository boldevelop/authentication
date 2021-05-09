import { ContextValue, Props, ProviderValue } from './type'
import React, { useEffect, useState } from 'react'
import { addWindowListenerIfNone } from '../../utils/listeners'

/** See https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState */
const isPressedCapsLock = (event: KeyboardEvent) =>
  event.getModifierState && event.getModifierState('CapsLock')

const CapsLockOnContextContext = React.createContext<ContextValue>({})

function CapsLockOnContextProvider(props: Props) {
  const [isCapsLockOn, setCapsLockOn] = useState(false)

  const setCapsIsPressed = (event: KeyboardEvent) => {
    setCapsLockOn(isPressedCapsLock(event))
  }

  useEffect(() => {
    addWindowListenerIfNone('keydown', setCapsIsPressed)
    return () => {
      document.removeEventListener('keydown', setCapsIsPressed)
    }
  }, [])

  return (
    <CapsLockOnContextContext.Provider value={{ isCapsLockOn }} {...props} />
  )
}

function isProviderType(value: ContextValue): value is ProviderValue {
  return value !== undefined
}

function useCapsLockOnListener(): ProviderValue {
  const context = React.useContext(CapsLockOnContextContext)

  if (!isProviderType(context)) {
    throw new Error(
      `useCapsLockOnListener must be used within a CapsLockOnContextContext`
    )
  }

  return context
}

export { useCapsLockOnListener, CapsLockOnContextProvider }
