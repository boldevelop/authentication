import React from 'react'
import type { User } from '../../entities/User'

export type UserContextType = {
  user: User
  login: (user: User, isRemember: boolean) => void
  logout: () => void
}

export type ProviderValue = UserContextType
export type DefaultValue = {}
export type ContextValue = DefaultValue | ProviderValue

export type Props = {
  children: React.ReactNode
}
