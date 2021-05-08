import React, { FC, ReactElement, useEffect, useState } from 'react'
import css from './Tabs.module.css'
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
      className={cn(css.tabsListItem, {
        [css.tabsListItemActive]: activeTab === tabKey,
      })}
    >
      {children}
    </li>
  )
}

interface TabsProps {
  defaultActiveKey: string
  children: ReactElement<TabPaneProps>[]
  onChange?: (key, e) => void
  activeTabKey?: string
}

const Tabs: FC<TabsProps> = ({
  children,
  defaultActiveKey,
  onChange,
  activeTabKey,
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveKey)

  const handleClick = (key, e) => {
    onChange && onChange(key, e)
    setActiveTab(key)
  }

  useEffect(() => {
    if (activeTabKey) {
      setActiveTab(activeTabKey)
    }
  }, [activeTab, activeTabKey])

  return (
    <div>
      <ol className="flex px-6">
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
      <div className="flex">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            const isFirst = index === 0

            return (
              <div
                className={cn(css.tabContent, {
                  [css.tabContentActive]: activeTab === child.props.tabKey,
                  [css.right]: isFirst,
                  [css.left]: !isFirst,
                })}
              >
                {child.props.children}
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export { Tabs }
