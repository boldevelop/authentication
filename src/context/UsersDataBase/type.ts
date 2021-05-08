import React from 'react'
import type { User } from '../../entities/User'

export type UsersDataBaseContextType = {
  usersDB: User[]
  addUser: (user: User) => void
  getLastUser: () => User
  isRightCredit: (credit: User) => boolean
  isExist: (email: string) => boolean
}

export type ProviderValue = UsersDataBaseContextType
export type DefaultValue = null
export type ContextValue = DefaultValue | ProviderValue

export type Props = {
  children: React.ReactNode
}

export type callbackOnAddUserType = (email: string, pass?: string) => void
