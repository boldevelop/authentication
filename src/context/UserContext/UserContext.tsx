import React, { useState } from 'react'
import {
  addStorageItem,
  getStorageItem,
  removeStorageItem,
} from '../../utils/localStorage'
import { ContextValue, Props, ProviderValue } from './type'

const userStorageKey = 'user'

const UserContext = React.createContext<ContextValue>({})

function UserContextProvider(props: Props) {
  const userFromStorage = getStorageItem(userStorageKey)

  const [user, setUser] = useState(
    userFromStorage ? { email: userFromStorage } : null
  )

  const login = (user, isRemember) => {
    setUser(user)

    if (isRemember) {
      addStorageItem(userStorageKey, user.email)
    }
  }

  const logout = () => {
    setUser(null)
    removeStorageItem(userStorageKey)
  }

  return <UserContext.Provider value={{ user, login, logout }} {...props} />
}

function isProviderType(value: ContextValue): value is ProviderValue {
  return value !== undefined
}

function useUser(): ProviderValue {
  const context = React.useContext(UserContext)
  if (!isProviderType(context)) {
    throw new Error(`useUser must be used within a UserContext`)
  }
  return context
}

export { UserContextProvider, useUser }
