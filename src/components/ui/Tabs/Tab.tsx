import React, { FC } from 'react'
import cn from 'classnames'
import css from './Tabs.module.css'

interface TabProps {
  tabKey: string
  activeTab: string
  setActiveTab: (key, e) => void
  handlerKeyDown: (key, e) => void
  tabsRef: any
  index: number
}

const calculateTabIndex = (activeTab, tabKey) => {
  return activeTab === tabKey ? 0 : -1
}

const Tab: FC<TabProps> = ({
  children,
  tabKey,
  setActiveTab,
  activeTab,
  handlerKeyDown,
  tabsRef,
  index,
}) => {
  const onKeyDown = (e) => {
    handlerKeyDown(tabKey, e)
  }
  const isActiveKey = activeTab === tabKey

  return (
    <li
      onClick={(e) => setActiveTab(tabKey, e)}
      onKeyDown={onKeyDown}
      className={cn(css.tabsListItem, {
        [css.tabsListItemActive]: isActiveKey,
      })}
      /* accessibility */
      tabIndex={calculateTabIndex(activeTab, tabKey)}
      aria-selected={isActiveKey ? 'true' : 'false'}
      role="tab"
      id={tabKey}
      ref={(el) => {
        tabsRef.current[index] = el
      }}
    >
      {children}
    </li>
  )
}

export { Tab }
