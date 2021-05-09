import React from 'react'

export type CapsLockOnContextType = {
  isCapsLockOn: boolean
}

export type ProviderValue = CapsLockOnContextType
export type DefaultValue = {}
export type ContextValue = DefaultValue | ProviderValue

export type Props = {
  children: React.ReactNode
}
