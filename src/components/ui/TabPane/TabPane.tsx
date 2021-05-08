import React, { FC } from 'react'

export interface TabPaneProps {
  tabKey: string
  tab: string
  children: JSX.Element | string
}

const TabPane: FC<TabPaneProps> = ({ children }) => <div>{children}</div>

export { TabPane }
