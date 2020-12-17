import React, { FC, ReactElement, useState } from 'react'

import cn from 'classnames'
import { TabPaneProps } from '../TabPane'

interface TabProps {
  tabKey: string
  activeTab: string
  setActiveTab: (key, e) => void
}

const Tab: FC<TabProps> = ({ children, tabKey, setActiveTab, activeTab }) => {
  return (
    <li
      onClick={(e) => setActiveTab(tabKey, e)}
      className={cn({ active: activeTab === tabKey })}
    >
      {children}
    </li>
  )
}

interface TabsProps {
  defaultActiveKey: string
  children: ReactElement<TabPaneProps>[]
  onChange?: (key, e) => void
}

const Tabs: FC<TabsProps> = ({ children, defaultActiveKey, onChange }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveKey)

  const handleClick = (key, e) => {
    onChange && onChange(key, e)
    setActiveTab(key)
  }

  return (
    <div>
      <ol>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return (
              <Tab
                tabKey={child.props.tabKey}
                setActiveTab={handleClick}
                activeTab={activeTab}
              >
                {child.props.tab}
              </Tab>
            )
          }
        })}
      </ol>
      <div>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return (
              <div className={cn({ active: activeTab === child.key })}>
                {child.props.children}
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export default Tabs
